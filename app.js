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
app.use('/', require('./router'))
// Webhook route, receives events from GitLab webhook.
app.use('/event', async (req, res) => {
  const secretToken = req.headers['x-gitlab-token']
  if (secretToken === process.env.SECRET_TOKEN) {
    console.log(req.body)
    res.sendStatus(200)
  }
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
// listen to provided port
app.listen(3000, () => console.log('Server running at http://localhost:3000'))
