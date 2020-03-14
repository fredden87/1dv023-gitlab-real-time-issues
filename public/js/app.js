const io = window.io('/')

// Listening to event 'webhook-event', server will send data here from webhook.
io.on('webhook-event', function (event) {
  if (event.eventType === 'issue') {
    if (event.state === 'closed') {
      removeIssueCard(event)
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
  const nodeList = document.querySelector('#issues').firstChild.querySelectorAll('*')
  nodeList.forEach((elem, i) => {
    if (i >= 0) {
      elem.appendChild(document.createTextNode(issueDataArr[i]))
    }
  })
}

/**
 * @param issueData
 */
function removeIssueCard (issueData) {
  console.log('remove', issueData)
}
