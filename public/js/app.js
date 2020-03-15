const io = window.io('/')

// Listening to event 'webhook-event', and send data to the right function.
io.on('webhook-event', function (event) {
  if (event.eventType === 'issue') {
    if (event.state === 'closed') {
      removeIssueCard(event)
      return
    }
    createIssueCard(event)
  } else if (event.eventType === 'note') {
    updateIssueCard(event)
  }
})

/**
 * Adds an issue to the list.
 *
 * @param {object} issueData Containing data about the issue.
 */
function createIssueCard (issueData) {
  const issueDataArr = Object.values(issueData)
  const template = document.cloneNode(true).querySelector('#issue-template').content
  const html = template.querySelector('li, ul, div')
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
 *
 * @param {object} issueData Containing update data about the issue.
 */
function updateIssueCard (issueData) {
  console.log(issueData)
  const issueCard = document.querySelector(`[data-issue-id="${issueData.id}"]`)
  const comments = issueCard.querySelector('#comments')
  const updated = issueCard.querySelector('#updated-at')
  const commentText = comments.textContent
  const newCommentsNumber = Number(commentText.slice(-1)) + 1
  comments.textContent = `Comments: ${newCommentsNumber}`
  updated.textContent = `Updated: ${issueData.updatedAt}`
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
