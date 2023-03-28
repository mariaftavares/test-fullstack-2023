const cors = require('cors')
require('dotenv-safe').config()
const express = require('express')
const routes = require('./routes/index')
const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
module.exports = app