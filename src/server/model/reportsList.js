const { connection } = require('../model/connection')

exports.getReportsList = async ({ boardId, month }) => {
  try {
    const [rows] = await connection.execute(
      `
      SELECT id, DATE_FORMAT(\`date\`, '%d') date, category, \`content\`, paymentMethod, price, \`type\` FROM report
      WHERE boardId=? AND DATE_FORMAT(\`date\`, '%m') < ? AND DATE_FORMAT(\`date\`, '%m') > ?
      ORDER BY date;
    `,
      [boardId, month + 1, month - 1]
    )

    return rows
  } catch (err) {
    throw err
  }
}

exports.createAReport = async ({
  content,
  category,
  paymentMethod,
  price,
  type,
  date,
  boardId,
}) => {
  try {
    const [{ insertId }] = await connection.execute(
      `
      INSERT INTO report (category, \`date\`, content, paymentMethod, price, \`type\`, boardId)
      VALUES (?, ?, ?, ?, ?, ?, ?);
      `,
      [category, date, content, paymentMethod, price, type, boardId]
    )

    return insertId
  } catch (err) {
    throw err
  }
}

exports.modifyAReport = async ({
  content,
  category,
  paymentMethod,
  price,
  type,
  date,
  boardId,
  reportId,
}) => {
  try {
    await connection.execute(
      `
      UPDATE report SET category=?, \`date\`=?, content=?,
      paymentMethod=?, price=?, \`type\`=?
      WHERE boardId=? AND id=?;
      `,
      [category, date, content, paymentMethod, price, type, boardId, reportId]
    )

    return true
  } catch (err) {
    throw err
  }
}

exports.removeAReport = async ({ boardId, reportId }) => {
  try {
    await connection.execute(
      `
      DELETE FROM report WHERE boardId=? AND id=?;
      `,
      [boardId, reportId]
    )

    return true
  } catch (err) {
    throw err
  }
}
