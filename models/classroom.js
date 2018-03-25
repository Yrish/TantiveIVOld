let mongoose = require('mongoose'), schema = mongoose.Schema

const Account = new schema({
  name: String,
  students: [String],
  course: String,
})

module.exports = mongoose.model('Account', Account)
