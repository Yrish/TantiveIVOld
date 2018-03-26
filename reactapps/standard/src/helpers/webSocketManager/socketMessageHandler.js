import types from "../../types"

export default (event) => {
  if (typeof event.data !== 'string') {
    console.error(`[Socket] Message must be sent as a string! Not ${typeof event.data}!`)
    return
  }
  let type, data, payload = event.data
  try {
    payload = JSON.parse(payload)
  } catch (e) {
    console.error(`[Socket] Error, message is not of type JSON: ${e}`)
    return
  }
  ({type, data} = payload)
  if (!type) {
    console.error(`[Socket] Error, messsage must have a type`)
    return
  }
  if (!messageFunctions[type]) {
    console.error(`[Socket] Error, unable to handle message type: ${type}`)
    return
  }
  if (type == types.ERROR) {
    console.error(`[Socket] Error, error from server: \n${data}`)
    return
  }
  messageFunctions[type](data)
}

var messageFunctions = {
  [types.PRINT]: (data) => {
    console.log(data)
  }
}
