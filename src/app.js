const createError = require('http-errors')
const express = require('express')
const path = require('path')

const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
  res.sendFile('/dist/index.html')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.listen(3000)
