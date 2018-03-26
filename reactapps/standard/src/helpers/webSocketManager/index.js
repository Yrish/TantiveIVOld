import types from "../../types"
import config from "../../config"
import {createFunctions} from "./socketFunctions"
import socketMessageHandler from "./socketMessageHandler"
import cookieNames from "../cookies/cookieNames"

let socket



export function socketSetup(reduxDispatchFunction) {
  socket = new WebSocket(`ws://${config.webSocketHost}`)
  socket.functions = createFunctions(socket)
  socket.onopen = (event)=>{
    console.log(`[Socket] Web scoket is open`)
    socket.functions.GET_COOKIE(cookieNames.SESSION)
  }
  socket.onmessage = (event) => {
    console.log("[Socket] we got a message")
    socketMessageHandler(event)
  }
  socket.onclose = (event) => {
    console.log("[Socket] we closed")
  }
  socket.onerror = (event) => {
    console.log(`[Socket] on error`)
    console.log(event)
  }
}
