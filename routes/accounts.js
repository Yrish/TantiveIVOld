const passport = require('passport')
const Account = require('../models/account')
const router = require('express').Router()

router.get('/register', (req, res) => {
  res.send(`<DOCTYPE html><html><head><title>Register</title><body><form action="/accounts/register" method="post"><label>Username</label><input type="text" name="username"/><label>email</label><input type="text" name="email"/><label>Password</label><input type="password" name="password"/><input type="submit" value="register"/></form></body></html>`)
})

router.post('/register', (req, res) => {
  Account.register(new Account({username:req.body.username, email:req.body.email}), req.body.password, (err) => {
    if (err) {
      console.err(`An error occured while registering:\n\t${err}`)
      return next(err)
    }

    res.redirect('/')
  })
})

router.get('/login', (req, res) => {
  res.send(`<DOCTYPE html><html><head><title>Login</title><body><form action="/accounts/login" method="post"><label>Username</label><input type="text" name="username"/><label>Password</label><input type="password" name="password"/><input type="submit" value="login"/></form></body></html>`)
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  req.session.userID = req.user._id
  req.session.save()
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.session.userID = null
  req.session.save()
  req.logout()
  res.redirect('/')
})

module.exports = router
