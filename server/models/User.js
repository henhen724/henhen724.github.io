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
  LinkedAccounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LinkedAccount'
    }
  ],
  friends: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  ],
  friendRequests: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  ]
})

UserSchema.method.requestFriend = sender => {
  this.friendRequests.push(sender.ObjectId)
  return this.save()
}
UserSchema.method.addFriend = sender => {
  this.friends.push(sender.ObjectId)
  return this.save()
}
UserSchema.method.addLinkedAccount = account => {
  this.LinkedAccounts.push(account)
  return this.save()
}
UserSchema.method.getUserByName = name => {
  User.find({ 'name': name }).then(userF =>{
      return userF
    })
}
UserSchema.method.getUserByEmail = email => {
  User.find({ 'email': email }).then(userF =>{
      return userF
    })
}

const User = mongoose.model('User', UserSchema)
module.exports = User
