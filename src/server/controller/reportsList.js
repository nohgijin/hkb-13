const {
  getReportsList,
  createAReport,
  modifyAReport,
  removeAReport,
} = require('../model/reportsList')

exports.getReportsListController = async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const year = parseInt(req.params.year)
  const month = parseInt(req.params.month)

  if (!boardId || !month || month < 1 || month > 12) {
    res.sendStatus(400)
    return
  }

  const reportsList = await getReportsList({ boardId, month, year })

  res.json({ reportsList })
}

exports.createAReportController = async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const { content, category, paymentMethod, price, type, date } = req.body

  if (!boardId) {
    res.sendStatus(400)
    return
  }

  const createdReportId = await createAReport({
    content,
    category,
    paymentMethod,
    price,
    type,
    date,
    boardId,
  })

  res.json({ createdReportId })
}

exports.modifyAReportController = async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const reportId = parseInt(req.params.reportId)
  const { content, category, paymentMethod, price, type, date } = req.body

  if (!boardId || !reportId) {
    res.sendStatus(400)
    return
  }

  const success = await modifyAReport({
    content,
    category,
    paymentMethod,
    price,
    type,
    date,
    boardId,
    reportId,
  })

  res.json({ success })
}

exports.removeAReportController = async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const reportId = parseInt(req.params.reportId)

  if (!boardId || !reportId) {
    res.sendStatus(400)
    return
  }

  const success = await removeAReport({ boardId, reportId })

  res.json({ success })
}
