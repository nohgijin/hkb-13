const express = require('express')
const { getReportsListController } = require('../controller/reportsList')

const router = express.Router()

router.get('/api', getReportsListController)

module.exports = { reportsListRouter: router }
