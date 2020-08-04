const express = require('express')
const { getCalendarController } = require('../controller/calendar')
const { ensureAuthenticated } = require('./ensureAuth')
const router = express.Router()

router.get('/api/board/:boardId/:year/:month/calendar',ensureAuthenticated, getCalendarController)

module.exports = { calendarRouter: router }
