/**
 * Home controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const homeController = {}
const fetch = require('node-fetch')
require('dotenv').config()

const url = `https://gitlab.lnu.se/api/v4/projects/2651/issues?private_token=${process.env.ACCESS_TOKEN}`

/**
 * Renders the index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

homeController.index = async (req, res) => {
  const request = await fetch(url)
  const json = await request.json()
  const issues = {
    title: json[0].title,
    description: json[0].description
  }
  console.log(issues)
  res.render('home/index')
}

module.exports = homeController
