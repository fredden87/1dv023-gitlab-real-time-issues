const io = window.io('/')

// Listening to event 'webhook-event', and send data to the right function.
io.on('webhook-event', function (data) {
  if (data.eventType === 'issue') {
    if (data.state === 'closed') {
      createNotification(data, 'Issue closed')
      removeIssueCard(data)
    } else if (data.currentDescription) {
      createNotification(data, 'New issue description')
      updateIssueCardDescription(data)
    } else {
      createNotification(data, 'New issue')
      createIssueCard(data)
    }
  } else if (data.eventType === 'note') {
    createNotification(data, 'New comment')
    updateIssueCardComments(data)
  }
})

/**
 * Adds an issue to the issuelist.
 *
 * @param {object} issueData Containing data about the issue.
 */
function createIssueCard (issueData) {
  const issueDataArr = Object.values(issueData)
  const template = document.cloneNode(true).querySelector('#issue-template').content
  const html = template.querySelector('li, ul, div')
  const issueCardHead = html.querySelector('.issue-card-head')
  document.querySelector('#issues').prepend(html)
  const nodeArray = spliceArray(Array.from(document.querySelector('#issues')
    .firstChild.querySelectorAll('*')))
  nodeArray.forEach((elem, i) => {
    if (i === 0) {
      elem.setAttribute('data-issue-id', issueDataArr[i])
    } else if (i === 4) {
      elem.setAttribute('href', issueDataArr[i])
      elem.appendChild(document.createTextNode(issueDataArr[i]))
    } else {
      elem.appendChild(document.createTextNode(issueDataArr[i]))
    }
  })
  flashIssueHead(issueCardHead)
}

/**
 * Creates an issuecard based on type of event.
 *
 * @param {object} noteData Data about the notification.
 * @param {string} event Type of notification.
 */
function createNotification (noteData, event) {
  const template = document.cloneNode(true).querySelector('#note-template').content
  const html = template.querySelector('li, ul, div')
  document.querySelector('#notifications').prepend(html)
  const nodeList = document.querySelector('#notifications').firstChild.querySelectorAll('*')
  nodeList[1].appendChild(document.createTextNode(event))
  nodeList[3].appendChild(document.createTextNode(noteData.author))
  nodeList[4].appendChild(document.createTextNode(noteData.updatedAt))
}

/**
 * Removes a issue from the issue list.
 *
 * @param {object} issueData Containing data about the issue.
 */
function removeIssueCard (issueData) {
  document.querySelectorAll(`[data-issue-id="${issueData.id}"]`).forEach(el => el.remove())
}

/**
 * Updates an issuecard with new amount of comments, and when is was updated.
 * And changes the issuecard head to green for 3 sec to show what card was updated.
 *
 * @param {object} noteData Containing update data about the issue.
 */
function updateIssueCardComments (noteData) {
  const issueCard = document.querySelector(`[data-issue-id="${noteData.id}"]`)
  const issueCardHead = issueCard.querySelector('.issue-card-head')
  const comments = issueCard.querySelector('#comments')
  const updated = issueCard.querySelector('#updated-at')
  const commentText = comments.textContent
  const newCommentsNumber = Number(commentText.slice(-1)) + 1
  comments.textContent = `Comments: ${newCommentsNumber}`
  updated.textContent = `Updated: ${noteData.updatedAt}`
  flashIssueHead(issueCardHead)
}

/**
 * Updates an issuecard with the new description, and when is was updated.
 * And changes the issuecard head to green for 3 sec to show what card was updated.
 *
 * @param {object} issueData Containing update data about the issue.
 */
function updateIssueCardDescription (issueData) {
  const issueCard = document.querySelector(`[data-issue-id="${issueData.id}"]`)
  const issueCardHead = issueCard.querySelector('.issue-card-head')
  const description = issueCard.querySelector('#description')
  const updated = issueCard.querySelector('#updated-at')
  description.textContent = `Description: ${issueData.newDescription}`
  updated.textContent = `Updated: ${issueData.updatedAt}`
  flashIssueHead(issueCardHead)
}

/**
 * Flashes the html element to notice the user something happend.
 *
 * @param {object} element Html element to flash.
 */
function flashIssueHead (element) {
  element.classList.add('issue-card-head-updated')
  setTimeout(() => {
    element.classList.remove('issue-card-head-updated')
  }, 3000)
}

/**
 * Takes an array and modifies it.
 *
 * @param {Array} arr Array to be modifies.
 * @returns {Array} Returns the modified array.
 */
function spliceArray (arr) {
  arr.splice(2, 1)
  arr.splice(4, 1)
  return arr
}
