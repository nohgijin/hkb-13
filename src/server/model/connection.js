const mysql = require('mysql2')
const { config } = require('../../config/index')

const connection = mysql
  .createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PW,
    database: config.DB_NAME,
    charset: 'utf8mb4',
    timezone: 'UTC+9',
    multipleStatements: true,
  })
  .promise()

module.exports = { connection }
