const { connection } = require('../model/connection')
const { payments, categories } = require('../../client/utils/constants')
exports.findUser = async ({ name, email, site }) => {
  try {
    const [rows] = await connection.execute(
      `SELECT user.*,board.id as board_id FROM user INNER JOIN board ON user.id = board.userId  WHERE name='${name}' AND email='${email}' AND site='${site}'`
    )
    return rows.length ? rows[0] : null
  } catch (err) {
    throw err
  }
}

exports.createUser = async ({ name, email, site, image }) => {
  try {
    const result = await connection.query(
      `
      INSERT INTO user (\`name\`, \`email\`, \`site\`, \`image\`) VALUES (?,?,?,?);
      SET @user_id=LAST_INSERT_ID();
      INSERT INTO board (\`userId\`) VALUES (@user_id);
      INSERT INTO payment (\`name\`, \`userId\`) VALUES 
      ${payments.map((payment) => `('${payment}', @user_id)`).join(', ')}; 
      INSERT INTO category (\`name\`, \`userId\`, \`type\`) VALUES 
      ${categories
        .map(({ name, type }) => `('${name}', @user_id, '${type}')`)
        .join(', ')};
      `,
      [name, email, site, image]
    )
    return result
  } catch (err) {
    throw err
  }
}
