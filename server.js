const path = require('path')

const next = require('next')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const voter = require('./routes/voter')
const company = require('./routes/company')
const candidate = require('./routes/candidate')

const exp = express()

require('dotenv').config({ path: __dirname + '/.env' })

exp.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
exp.use(bodyParser.json())
exp.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/home.js'))
})

exp.use('/company', company)
exp.use('/voter', voter)
exp.use('/candidate', candidate)

exp.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message, data })
})

const app = next({
  dev: process.env.NODE_ENV !== 'production',
})
const routes = require('./routes')
const handler = routes.getRequestHandler(app)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}
connect()

app.prepare().then(() => {
  exp.use(handler).listen(3000, function () {
    console.log('Node server listening on port 3000')
  })
})
