let mongoose = require('mongoose'), schema = mongoose.Schema, passportLocalMongoose = require('passport-local-mongoose')

const Account = new schema({
  email: String
})

Account.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', Account)
