import types from "../../types"
import {addToCookie} from "../cookies"

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
  messageFunctions[type](data)
}

var messageFunctions = {
  [types.ERROR]: (data) => {
    console.error(`[Socket] Error the following is all we know:`)
    console.log(data)
  },
  [types.PRINT]: (data) => {
    console.log(data)
  },
  [types.SET_COOKIE]: (data) => {
    addToCookie(data)
  }
}
