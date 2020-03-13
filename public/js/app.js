const socket = window.io('/')

const issue = document.querySelector('#issue-template').content.cloneNode(true)
const nodeList = issue.querySelectorAll('*')
console.log(nodeList[1])

// document.querySelector('#issues').prepend(issue)
