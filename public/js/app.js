const io = window.io('/')

// Listening to event 'webhook-event', server will send data here from webhook.
io.on('webhook-event', function (event) {
  if (event.eventType === 'issue') {
    if (event.state === 'closed') {
      removeIssueCard(event)
      return
    }
    createIssueCard(event)
  } else if (event.eventType === 'note') {
    // console.log(event)
  }
})

// document.querySelector('#issues').prepend(issue)
/**
 * @param issueData
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
 * @param issueData
 */
function removeIssueCard (issueData) {
  console.log(document.querySelectorAll('#issues'))
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
