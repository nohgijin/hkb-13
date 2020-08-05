const {
  getCategoryStatisticsData,
  getdailyStatisticsData,
} = require('../model/statistics')

exports.getCagegoryStatisticsDataController = async (req, res) => {
  const boardId = req.user.board_id
  const year = parseInt(req.params.year)
  const month = parseInt(req.params.month)

  if (!boardId || !month || month < 1 || month > 12) {
    res.sendStatus(400)
    return
  }

  const categoryStatisticsData = await getCategoryStatisticsData({
    boardId,
    month,
    year,
  })

  res.json({ categoryStatisticsData })
}

exports.getDailyStatisticsDataController = async (req, res) => {
  const boardId = req.user.board_id
  const year = parseInt(req.params.year)
  const month = parseInt(req.params.month)

  if (!boardId || !month || month < 1 || month > 12) {
    res.sendStatus(400)
    return
  }

  const dailyStatisticsData = await getdailyStatisticsData({
    boardId,
    month,
    year,
  })

  res.json({ dailyStatisticsData })
}
