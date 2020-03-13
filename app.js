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
io.on('connection', function (socket) {
  console.log(`Socket ${socket.id} connected.`)
})

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: join(__dirname, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

// additional middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))
app.use(bodyParser.json())

// routes
app.use('/', router)
// Webhook route, receives events from GitLab webhook.
app.use('/event', router, async (req, res) => {
  io.on('connection', function (socket) {
    console.log(`Socket ${socket.id} connected.`)
    socket.broadcast.emit('broadcast', res.locals.event)
  })
})

/*
// Error handler.
app.use((err, req, res, next) => {
  // 404 Not Found.
  if (err.statusCode === 404) {
    return res.status(404).sendFile(join(__dirname, 'views', 'errors', '404.html'))
  }
  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res.status(500).sendFile(join(__dirname, 'views', 'errors', '500.html'))
  }

  // Render the error page.
  res.status(err.statusCode || 500).render('errors/error', { err })
})
*/
// Starts the server.
server.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`))
