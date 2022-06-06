const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10

const Schema = mongoose.Schema
const VoterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  election_address: {
    type: String,
    required: true,
  },
})

VoterSchema.pre('save', function (cb) {
  this.password = bcrypt.hashSync(this.password, saltRounds)
  cb()
})

module.exports = mongoose.model('Voter', VoterSchema)
