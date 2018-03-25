let mongoose = require('mongoose'), schema = mongoose.Schema

const Account = new schema({
  name: String,
  data: String,
})

module.exports = mongoose.model('Account', Account)
