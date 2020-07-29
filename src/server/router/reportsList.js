const express = require('express')
const { getReportsListController } = require('../controller/reportsList')

const router = express.Router()

router.get('/api/board/:boardId/:month/report', getReportsListController)

module.exports = { reportsListRouter: router }
