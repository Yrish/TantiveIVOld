const messageHandler = require('./messageHandler')
const types = require('../../types')

module.exports =  function ConnectionHandler(ws, req) {


  //don't crash on close
  ws.on('close', ()=>{})

  //don't crash on error
  ws.on('error', (err) => {})

  //handle messages
  ws.on('message', (message) => {HandleMessage(message, ws, req)})
}

function HandleMessage(messagejson, ws, req) {
  let message
  try {
    message = JSON.parse(messagejson)
  } catch (e) {
    ws.send(createErrorMessage("Server only accepts json messages", req))
    return
  }

  if (typeof message !== 'object') {
    ws.send(createErrorMessage(`Server can only handle object json not ${typeof message}`, message))
    return
  }

  if (!message.type) {
    ws.send(createErrorMessage(`Server can not handle message without a type`))
    return
  }

  message.type = message.type.toUpperCase()

  if (!messageHandler[message.type]) {
    ws.send(createErrorMessage(`Server does not know how to handle message type of '${message.type}'`))
    return
  }

  messageHandler[message.type](message.data, ws, req)
}


function createErrorMessage(errorMessage, snippet) {
  return JSON.stringify({type: types.ERROR, data: {message: errorMessage, snippet}})
}
