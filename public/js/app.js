const io = window.io('/')
// const issue = document.querySelector('#issue-template').content.cloneNode(true)
// const issueNodeList = issue.querySelectorAll('*')
// console.log(issue)

// Listening to event 'webhook-event', server will send data here from webhook.
io.on('webhook-event', function (event) {
  if (event.eventType === 'issue') {
    console.log(event)
  } else if (event.eventType === 'note') {
    console.log(event)
  }
})

// document.querySelector('#issues').prepend(issue)
