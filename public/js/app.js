const io = window.io('/')

// Listening to event 'webhook-event', server will send data here from webhook.
io.on('webhook-event', function (event) {
  if (event.eventType === 'issue') {
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
  const issueCard = document.querySelector('#issue-template').content
    .cloneNode(true).firstElementChild

  issueCard.forEach(element => {
    console.log(element)
  })

  document.querySelector('#issues').prepend(issueCard)
}

/**
 * @param noteData
 */
function createNotificationCard (noteData) {

}

/**
 * @param elements
 * @param elem
 */
function getChildAndSiblings (elements) {
  for (const element of elements) {
    if (element.nextChild) {
      console.log(element.nextChild)
    } else if (element.nextSibling) {
      console.log(element.nextSibling.previousElementSibling)
    }
  }
}
