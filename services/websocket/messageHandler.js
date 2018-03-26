const types = require('../../types')
const {getCookie} = require('../cookie')

module.exports =  {
  [types.PRINT]: (data, ws, req) => {console.log(data); ws.send(JSON.stringify({type:"PRINT", data:"Hello World"}))},
  [types.GET_COOKIE]: getCookie,
}
