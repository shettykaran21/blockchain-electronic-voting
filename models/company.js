const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10

const Schema = mongoose.Schema
const CompanySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

CompanySchema.pre('save', function (cb) {
  this.password = bcrypt.hashSync(this.password, saltRounds)
  cb()
})

module.exports = mongoose.model('CompanyList', CompanySchema)
