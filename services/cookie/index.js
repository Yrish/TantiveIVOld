const config = require("../../config")
const types = require("../../types")

//default cookie options
const DEFAULT_OPTIONS = {
  path: "/",
  domain: config.sessionDomain,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: false
}

//used for express session parsing in ../../app.js
const expressSessionCookieConfig = {
  httpOnly: false,
  secure: false,
  domain: config.sessionDomain,
  maxAge: 24 * 60 * 60 * 1000,
}

function createCookie(name, value, options) {
  //create correct options
  options = Object.assign({}, DEFAULT_OPTIONS, options)

  //compute experation time
  let expire = new Date()
  expire.setTime(expire.getTime() + options.maxAge)
  delete options.maxAge
  options.expires = expire.toUTCString()

  return {name, value, options}

}

function makeCookieSendable(cookie, serverCode=ADD_TO_COOKIE) {
  return JSON.stringify({
    type: serverCode,
    payload: cookie,
  })
}

function createSessionCookie(sessionID) {
  return createCookie(config.cookieSessionKey, "s:" + SignCookie.sign(sessionID, config.sessionSecret), {domain:config.sessionDomain})
}

module.exports = {
  makeCookieSendable,
  createSessionCookie,
  expressSessionCookieConfig,
}
