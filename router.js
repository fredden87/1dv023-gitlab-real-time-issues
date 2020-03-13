/**
 * Router.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('./controller')

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)
router.post('/', controller.webhook)
// Exports.
module.exports = router
