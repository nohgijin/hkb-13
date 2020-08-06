const { connection } = require('../model/connection')

exports.getCategoryStatisticsData = async ({ boardId, month, year }) => {
  try {
    const [rows] = await connection.execute(
      `
      SELECT category, SUM(price) price FROM report 
      WHERE boardId=? AND YEAR(date)=? AND MONTH(date)=? AND type='expense'
      GROUP BY category ORDER BY price DESC;
    `,
      [boardId, year, month]
    )

    return rows
  } catch (err) {
    throw err
  }
}

exports.getdailyStatisticsData = async ({ boardId, month, year }) => {
  try {
    const [rows] = await connection.execute(
      `
      SELECT DATE_FORMAT(\`date\`, '%Y-%m-%d') date, type, SUM(price) price FROM report
      WHERE boardId=? AND YEAR(date)=? AND MONTH(date)=? AND type='expense'
      GROUP BY date, type ORDER BY date;
    `,
      [boardId, year, month]
    )

    return rows
  } catch (err) {
    throw err
  }
}
