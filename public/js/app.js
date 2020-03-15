const io = window.io('/')

// Listening to event 'webhook-event', server will send data here from webhook.
io.on('webhook-event', function (event) {
  console.log(event)
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
    elem.appendChild(document.createTextNode(issueDataArr[i]))
    console.log(i, elem)
    if (i === 3) {
      elem.setAttribute('href', issueDataArr[i])
    }
  })
  console.log(issueDataArr)
}

/**
 * @param issueData
 */
function removeIssueCard (issueData) {
  console.log('remove', issueData)
}

/**
 * @param arr
 */
function spliceArray (arr) {
  arr.splice(0, 1)
  arr.splice(1, 1)
  arr.splice(3, 1)
  return arr
}
