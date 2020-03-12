/**
 * Home controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const homeController = {}

/**
 * Renders the start page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

homeController.index = (req, res) => {
  res.render('home/index')
}

module.exports = homeController
