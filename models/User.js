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
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  scoutprofile: {
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
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
