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
  const template = document.getElementsByTagName('template')[0]
  console.log(template)
  const content = template.content.querySelectorAll('div, ul, li')
  // document.querySelector('#issues').prepend(content)
  console.log('hej', document.getElementById('issues'))
  console.log(content)
  const issueCard = document.querySelector('.issue-card').querySelectorAll('div, ul, li')
  console.log(issueCard)
  content.forEach((elem, i) => {
    console.log(elem)
    elem.textContent = issueDataArr[i]
  })
}
/**
 * @param noteData
 */
function createNotificationCard (noteData) {

}
