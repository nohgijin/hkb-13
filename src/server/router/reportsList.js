const express = require('express')

const {
  getReportsListController,
  createAReportController,
  modifyAReportController,
  removeAReportController,
} = require('../controller/reportsList')

const router = express.Router()

router.get('/api/board/:boardId/:year/:month/report', getReportsListController)
router.post('/api/board/:boardId/report', createAReportController)
router.put('/api/board/:boardId/report/:reportId', modifyAReportController)
router.delete('/api/board/:boardId/report/:reportId', removeAReportController)

module.exports = { reportsListRouter: router }
