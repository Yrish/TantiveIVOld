const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const mongoConnectionPath = 'mongodb://localhost'
const sessionStore = mongoose.createConnection(`${mongoConnectionPath}/tantiveiv`)

const {expressSessionCookieConfig} = require('./services/cookie')

//ws handling
const enableWs = require('express-ws')
const wsHandler = require('./services/websocket/webSocketHandler')

//sessions
let session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//app
const app = express()
enableWs(app)

//connect to database
mongoose.connect(`${mongoConnectionPath}/tantiveiv`, (error) => {
  if (error){
    console.error(`Could not connect to mongoose (check to see if it is running)\n\tError Details: ${error}`)
  }
})

//view engine ejs
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
  cookie: expressSessionCookieConfig,
}))

//middle ware for getting user
app.use((req, res, next) => {
  if (req.session && req.session.userID) {
    mongoose.connection.models.Account.find({_id: req.session.userID}, (err, docs) => {
      if (err || !docs) {
        next()
      }
      req.User = docs[0]
      next()
    })
  }
  next()
})

app.use(passport.initialize())
app.use(passport.session())

//body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const Account = require('./models/account');
passport.use(new localStrategy(Account.authenticate()))

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

//websocket
app.ws('/ws', wsHandler)

//routes

app.use('/accounts', require('./routes/accounts'))

app.get('/', (req, res) => {
  res.send(`${req.User ? req.User.username ? req.User.username: 'bad user' : '<a href="accounts/login">sign in</a>'}`)
})

app.get('/html/:name', (req, res) => {
  res.render(__dirname + "/views/"+ req.props.name)
})

//404
app.get('*', (req, res) => {
  res.status(404)
  res.render('Error404', {input: `path ${req.url} does not exist`})
})

//error handling

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    //res.status(err.status || 500)
    console.error(err)
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // })
  })
}

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   console.log(err)
// });

module.exports = app;
