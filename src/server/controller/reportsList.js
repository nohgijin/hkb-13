const { getReportsList } = require('../model/reportsList')

exports.getReportsListController = async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const month = parseInt(req.params.month)

  const reportsList = await getReportsList({ boardId, month })

  res.status(200).json({ reportsList })
}
