const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const mongoConnectionPath = 'mongodb://localhost'
const sessionStore = mongoose.createConnection(`${mongoConnectionPath}/sessions`)

//sessions
let session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//app
const app = express()

//connect to database
mongoose.connect(`${mongoConnectionPath}/accounts`, (error) => {
  if (error){
    console.error(`Could not connect to mongoose (check to see if it is running)\n\tError Details: ${error}`)
  }
})

//place for view engine

app.set('view engine', 'ejs')

// set up session storage
app.use(session({
  secret: config.sessionSecret,
  name: config.cookieSessionKey,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: sessionStore,
  }),
  cookie: {
    httpOnly: false,
    secure: false,
    domain: config.domain,
    maxAge: 24 * 60 * 60 * 1000,
  },
}))

app.use(passport.initialize())
app.use(passport.session())

//body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const Account = require('./models/account');
passport.use(new localStrategy(Account.authenticate()))

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

app.use('/accounts', require('./routes/accounts'))

app.get('/', (req, res) => {
  console.log("########")
  console.log(req.session.user)
  res.send(`${req.user ? req.user.username ? req.user.username: 'bad user' : '<a href="accounts/login">sign in</a>'}`)
})

//error handling
app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status(404)
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err)
});

module.exports = app;
