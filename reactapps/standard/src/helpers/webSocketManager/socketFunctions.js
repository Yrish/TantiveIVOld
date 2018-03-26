import types from "../../types"

export function createFunctions(socket) {
  return {
    [types.PRINT]: (data) => {
      socket.send(JSON.stringify({type:types.PRINT, data}))
    },
    [types.LOGIN]: (username, password) => {
      socket.send(JSON.stringify({type:types.LOGIN, data: {username, password}}))
    },
    [types.GET_COOKIE]: (cookieName) => {
      socket.send(JSON.stringify({type:types.GET_COOKIE, data: {cookieName}}))
    }
  }
}
