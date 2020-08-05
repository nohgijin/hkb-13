const { connection } = require('../model/connection')

const payments = [
  ["'신한카드'", '@user_id'],
  ["'삼성카드'", '@user_id'],
  ["'국민카드'", '@user_id'],
  ["'카카오뱅크'", '@user_id'],
  ["'신한은행'", '@user_id'],
  ["'우리은행'", '@user_id'],
  ["'농협은행'", '@user_id'],
  ["'국민은행'", '@user_id'],
  ["'현금'", '@user_id'],
]
const categories = [
  ["'월급'", '@user_id',"'income'"],
  ["'용돈'", '@user_id',"'income'"],
  ["'기타수입'", '@user_id',"'income'"],
  ["'식비'", '@user_id',"'expense'"],
  ["'생활'", '@user_id',"'expense'"],
  ["'쇼핑/뷰티'", '@user_id',"'expense'"],
  ["'교통'", '@user_id',"'expense'"],
  ["'의료/건강'", '@user_id',"'expense'"],
  ["'문화/여가'", '@user_id',"'expense'"],
  ["'미분류'", '@user_id',"'expense'"],
]

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

function getValuesQuery(arr) {
  return arr.map((data) => data.join(', '))
    .map((str) => '(' + str + ')')
    .join(',')
}

exports.createUser = async ({ name, email, site, image }) => {
  try {
    const result = await connection.query(
      `
      INSERT INTO user (\`name\`, \`email\`, \`site\`, \`image\`) VALUES (?,?,?,?);
      SET @user_id=LAST_INSERT_ID();
      INSERT INTO board (\`userId\`) VALUES (@user_id);
      INSERT INTO payment (\`name\`, \`userId\`) VALUES 
      ${getValuesQuery(payments)}; 
      INSERT INTO category (\`name\`, \`userId\`, \`type\`) VALUES 
      ${getValuesQuery(categories)};
      `,
      [name, email, site, image]
    )
    return result
  } catch (err) {
    throw err
  }
}
