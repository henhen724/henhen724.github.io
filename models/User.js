const mongoose = require('mongoose');

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
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  emailVerified: {
    type: Boolean,
    default: false
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
      ref: 'users'
    }
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

UserSchema.method.requestFriend = sender => {
  this.friendRequests.push(sender.ObjectId);
  return this.save();
};
UserSchema.method.addFriend = sender => {
  this.friends.push(sender.ObjectId);
  return this.save();
};

module.exports = User = mongoose.model('users', UserSchema);
