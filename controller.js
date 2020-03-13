/**
 * Controller.
 *
 * @author Fredrik Norrman
 * @version 1.0.0
 */

'use strict'

const controller = {}
const fetch = require('node-fetch')
const moment = require('moment')
require('dotenv').config()

// GitLab api URL to open issues in assignment 3 project.
const url = `https://gitlab.lnu.se/api/v4/projects/2651/issues?state=opened&\
private_token=${process.env.ACCESS_TOKEN}`

/**
 * Index route, fetching all open issues and render the result.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */

controller.index = async (req, res) => {
  try {
    const request = await fetch(url)
    const issues = await request.json()
    const viewData = {
      issues: issues.map(issue => ({
        author: issue.author.name,
        username: issue.author.username,
        title: issue.title,
        description: issue.description,
        url: issue.web_url,
        id: issue.id,
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

/**
 * Webhook route, receives events from GitLab webhook.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} next - Express forward object.
 */
controller.webhook = async (req, res, next) => {
  const secretToken = req.headers['x-gitlab-token']
  let event = {}
  if (secretToken === process.env.SECRET_TOKEN) {
    if (req.body.event_type === 'issue') {
      event = createIssueObject(req.body)
      res.locals.event = event
      return next()
    } else if (req.body.event_type === 'note') {
      event = createNoteObject(req.body)
      res.locals.event = event
      return next()
    }
    return res.sendStatus(500)
  }
}

/** Creates an IssueObject and returns it.
 *
 * @param {object} issue Data to make a IssueObject from webhook.
 * @returns {object} IssueObject.
 */
function createIssueObject (issue) {
  return {
    author: issue.user.name,
    username: issue.user.username,
    title: issue.object_attributes.title,
    description: issue.object_attributes.description,
    url: issue.object_attributes.url,
    id: issue.object_attributes.id,
    eventType: issue.event_type,
    state: issue.object_attributes.state,
    createdAt: moment(issue.object_attributes.created_at.replace(' +0100', ''))
      .format('YYYY-MM-DD HH:mm'),
    updatedAt: moment(issue.object_attributes.updated_at.replace(' +0100', ''))
      .format('YYYY-MM-DD HH:mm')
  }
}

/** Creates an NoteObject and returns it.
 *
 * @param {object} note Data to make a NoteObject from webhook.
 * @returns {object} NoteObject.
 */
function createNoteObject (note) {
  return {
    author: note.user.name,
    username: note.user.username,
    description: note.object_attributes.description,
    url: note.object_attributes.url,
    id: note.issue.id,
    eventType: note.event_type,
    createdAt: moment.utc(note.object_attributes.created_at.replace(' UTC', ''))
      .local().format('YYYY-MM-DD HH:mm'),
    updatedAt: moment.utc(note.object_attributes.updated_at.replace(' UTC', ''))
      .local().format('YYYY-MM-DD HH:mm')
  }
}

// Exporting module
module.exports = controller
