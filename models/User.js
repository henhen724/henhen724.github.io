const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  fortniteprofile: {
    handle: {
      type: String,
      required: false
    },
    playerId: {
      type: String,
      require: false
    },
    personaHandle: {
      type: String,
      require: false
    },
    personaId: {
      type: String,
      required: false
    },

    required: false
  },
  friends: [{ id: String, name: String }],
  friendRequests: [{ id: String, name: String}]
})

const User = mongoose.model('User', UserSchema)

module.exports = User
