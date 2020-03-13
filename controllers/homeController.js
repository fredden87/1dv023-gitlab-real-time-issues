/**
 * Home controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const homeController = {}
const fetch = require('node-fetch')
const moment = require('moment')
require('dotenv').config()

// GitLab api URL to open issues in assignment 3 project.
const url = `https://gitlab.lnu.se/api/v4/projects/2651/issues?state
=opened&private_token=${process.env.ACCESS_TOKEN}`

/**
 * Fetching all known issues and rendering the index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

homeController.index = async (req, res) => {
  try {
    const request = await fetch(url)
    const json = await request.json()
    const viewData = {
      issues: json.map(issue => ({
        author: issue.author.name,
        username: issue.author.username,
        title: issue.title,
        description: issue.description,
        url: issue.web_url,
        comments: issue.user_notes_count,
        createdAt: moment(issue.created_at).format('YYYY-MM-DD HH:mm'),
        updatedAt: moment(issue.updated_at).format('YYYY-MM-DD HH:mm')
      }))
    }
    res.render('home/index', { viewData })
  } catch (error) {
    console.error(error)
    res.render('home/index')
  }
}

// Exporting module
module.exports = homeController
