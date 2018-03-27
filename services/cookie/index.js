const config = require("../../config")
const types = require("../../types")
const cookieNames = require("./cookieNames")
const SignCookie = require("cookie-signature")

//default cookie options
const DEFAULT_OPTIONS = {
  path: "/",
  domain: config.domain,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: false
}

//used for express session parsing in ../../app.js
const expressSessionCookieConfig = {
  httpOnly: false,
  secure: false,
  domain: config.domain,
  maxAge: 24 * 60 * 60 * 1000,
}

function getCookie(data, req) {
  if (!data) {
    return
  }
  ({cookieName} = data)
  if (!cookieNames[cookieName]) {
    console.log(`Could not find cookie name:`)
    return
  }
  if (cookieName == cookieNames.SESSION) {
    return makeCookieSendable(createSessionCookie(req.sessionID))
  }
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

function makeCookieSendable(cookie) {
  return JSON.stringify({
    type: types.SET_COOKIE,
    data: cookie,
  })
}

function createSessionCookie(sessionID) {
  return createCookie(config.cookieSessionKey, "s:" + SignCookie.sign(sessionID, config.sessionSecret), {domain:config.sessionDomain})
}

module.exports = {
  makeCookieSendable,
  createSessionCookie,
  expressSessionCookieConfig,
  getCookie,
}
