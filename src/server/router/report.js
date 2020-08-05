const express = require('express')

const {
  getReportsListController,
  createAReportController,
  modifyAReportController,
  removeAReportController,
} = require('../controller/reportsList')

const router = express.Router()
const { ensureAuthenticated } = require('./ensureAuth')

router.get(
  '/api/board/:boardId/:year/:month/report',
  ensureAuthenticated,
  getReportsListController
)
router.post(
  '/api/board/:boardId/report',
  ensureAuthenticated,
  createAReportController
)
router.put(
  '/api/board/:boardId/report/:reportId',
  ensureAuthenticated,
  modifyAReportController
)
router.delete(
  '/api/board/:boardId/report/:reportId',
  ensureAuthenticated,
  removeAReportController
)

module.exports = { reportRouter: router }
