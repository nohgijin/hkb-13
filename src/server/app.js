const createError = require('http-errors')
const express = require('express')
const path = require('path')
const appRoot = require('app-root-path')

const logger = require('morgan')
const app = express()

const { reportsListRouter } = require('./router')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(appRoot.resolve('/dist')))

app.use(reportsListRouter)

app.use(function (req, res, next) {
  res.sendFile(appRoot.resolve('/dist/index.html'))
})

app.listen(3000, () => console.log(`Listening on port 3000`))
