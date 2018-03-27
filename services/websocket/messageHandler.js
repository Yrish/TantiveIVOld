const types = require('../../types')
const {getCookie} = require('../cookie')

module.exports =  {
  [types.PRINT]: (data, ws, req) => {console.log(data)},
  [types.GET_COOKIE]: (data, ws, req) => {
    req.session.save()
    ws.send(getCookie(data, req) || createErrorMessage(`Cookie of name ${data.cookieName} could not be found`))
  },
}

function createErrorMessage(errorMessage, snippet) {
  return JSON.stringify({type: types.ERROR, data: {message: errorMessage, snippet}})
}
