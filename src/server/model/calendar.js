const { connection } = require('./connection')

exports.getCalendar = async ({ boardId, month, year }) => {
  try {
    const [rows] = await connection.execute(
      `
      SELECT id, DATE_FORMAT(\`date\`, '%d') date, category, \`content\`, paymentMethod, price, \`type\` FROM report
      WHERE boardId=? AND YEAR(date) = ? AND MONTH(date) = ?
      ORDER BY date;
    `,
      [boardId, year, month]
    )
    
    return rows
  } catch (err) {
    throw err
  }
}
