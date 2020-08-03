const { connection } = require('../model/connection')

exports.findUser = async ({ name, email, site }) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM user WHERE name='${name}' AND email='${email}' AND site='${site}'`
    )
    return rows
  } catch (err) {
    throw err
  }
}

exports.createUser = async ({ name, email, site }) => {
  try {
    const [rows] = await connection.execute(
      `
      INSERT INTO user (\`name\`, \`email\`, \`site\`) VALUES (?,?,?);
      `,
      [name, email, site]
    )
    return rows
  } catch (err) {
    throw err
  }
}
