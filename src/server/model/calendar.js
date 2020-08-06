const { connection } = require('./connection')

exports.getCalendar = async ({ boardId, month, year }) => {
  try {
    const [rows] = await connection.execute(
      `
      SELECT DATE_FORMAT(\`date\`, '%d') date, sum(price) as price, \`type\` FROM report
      WHERE boardId=? AND YEAR(date) = ? AND MONTH(date) = ?
      GROUP BY date, type;
    `,
      [boardId, year, month]
    )
    return rows
  } catch (err) {
    throw err
  }
}