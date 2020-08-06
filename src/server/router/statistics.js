const express = require('express')

const {
  getCagegoryStatisticsDataController,
  getDailyStatisticsDataController,
} = require('../controller/statistics')

const router = express.Router()
const { ensureAuthenticated } = require('./ensureAuth')

router.get(
  '/api/board/:year/:month/statistic/category',
  ensureAuthenticated,
  getCagegoryStatisticsDataController
)

router.get(
  '/api/board/:year/:month/statistic/daily',
  ensureAuthenticated,
  getDailyStatisticsDataController
)

module.exports = { statisticsRouter: router }
