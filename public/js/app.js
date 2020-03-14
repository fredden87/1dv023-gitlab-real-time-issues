const io = window.io('/')
HTMLCollection.prototype.forEach = Array.prototype.forEach,
NodeList.prototype.forEach = Array.prototype.forEach

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
  const template = document.querySelector('template').cloneNode(true)
  const clone = template.content.cloneNode(true).querySelectorAll('*')
  console.log(template)
  console.log(clone)
  const reverse = Array.from(clone).reverse()
  reverse.forEach((elem, i) => {
    document.querySelector('#issues').prepend(elem)
  })
}

/**
 * @param noteData
 */
function createNotificationCard (noteData) {

}
