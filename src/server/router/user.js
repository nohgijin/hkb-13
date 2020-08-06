const express = require('express')
const { getUserController } = require('../controller/user')
const { ensureAuthenticated } = require('./ensureAuth')
const router = express.Router()

router.get('/api/user',ensureAuthenticated, getUserController)

module.exports = { userRouter: router }
