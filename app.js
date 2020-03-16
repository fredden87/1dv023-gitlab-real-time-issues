/**
 * The starting point of the application.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const hbs = require('express-hbs')
const { join } = require('path')
const logger = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const router = require('./router')
const server = require('http').Server(app)

// Starts a websocket server
const io = require('socket.io')(server)

// View engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: join(__dirname, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

// Additional middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))
app.use(bodyParser.json())

// Routes
app.use('/', router)
// Webhook route, receives events from GitLab webhook.
app.use('/event', router, async (req, res) => {
  io.emit('webhook-event', res.locals.event)
  res.sendStatus(200)
})

// Starts the server.
server.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`))
