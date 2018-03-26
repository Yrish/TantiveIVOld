import Cookies from "universal-cookie"

export function addToCookie(data) {
  if (data instanceof Array) {
    for (let element of data) {
      addSingleElementToCookie(element)
    }
    return
  }
  addSingleElementToCookie(data)
}

function addSingleElementToCookie(data) {
  let {name, value, options} = data
  if (!name) {
    console.error("[cookie] Error: can not set cookie: name not given")
    return
  }
  if (!value) {
    console.error("[cookie] Error: can not set cookie: value not given")
    return
  }
  const cookie = new Cookies()
  if (options.expires) {
    options.expires = new Date(options.expires)
  }
  if (options.httpOnly) {
    options.Httponly = true
  }
  cookie.set(name, value, options)
}
