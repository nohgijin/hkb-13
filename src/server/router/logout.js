const express = require('express')
const router = express.Router()

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid')
    req.logout()
    req.session = null
    res.redirect('/login')
  })
})

module.exports = { logoutRouter: router }
