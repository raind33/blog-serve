const mongoose = require('mongoose')
const config = require('../config')
const crypto = require('crypto')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: config.USER.defaultUsername 
  },
  password: {
    type: String,
    default: crypto.createHash('md5').update(config.USER.defaultPassword).digest('hex')
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User