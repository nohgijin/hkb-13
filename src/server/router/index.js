const { reportRouter } = require('./report')
const { calendarRouter } = require('./calendar')
const { loginRouter } = require('./login')
const { logoutRouter } = require('./logout')
const { statisticsRouter } = require('./statistics')

module.exports = {
  reportRouter,
  calendarRouter,
  loginRouter,
  logoutRouter,
  statisticsRouter,
}
