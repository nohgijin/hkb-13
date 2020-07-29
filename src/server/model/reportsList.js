const { connection } = require('../model/connection')

exports.getReportsList = async ({ boardId, month }) => {
  console.log(boardId, month)

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
