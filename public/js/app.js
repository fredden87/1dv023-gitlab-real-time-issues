const socket = window.io('/')
socket.emit('event', { message: 'Hey, I have an important message!' })
const issue = document.querySelector('#issue-template').content.cloneNode(true)
const nodeList = issue.querySelectorAll('*')
// console.log(issue)

// document.querySelector('#issues').prepend(issue)
