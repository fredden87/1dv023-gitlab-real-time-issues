const io = window.io('/')
const issue = document.querySelector('#issue-template').content.cloneNode(true)
const issueNodeList = issue.querySelectorAll('*')
// console.log(issue)

// Listening to event 'message', server will send data here from webhook.
io.on('message', function (message) {
  console.log(message)
})

// document.querySelector('#issues').prepend(issue)
