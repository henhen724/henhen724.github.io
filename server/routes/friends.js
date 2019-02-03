const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

const User = require('../models/User')

// Add Friend page
router.get('/add', ensureAuthenticated, (req, res) => res.render('addfriend'))

router.post('/add', ensureAuthenticated, (req, res) => {
  const name = req.body.name
  User.find({ name: name })
   .then(friends => {
     res.render('addfriend', { friends })
   })
   .catch(err => console.log(err))
})

router.get('/addid', ensureAuthenticated, (req, res) => {
  const { id } = req.query
  User.findById(id)
    .then(thefri => {
      var sendId = req.user._id
      var sendName = req.user.name
      var newfriend = { id: sendId, name: sendName }
      if(thefri.friendRequests.find(elem => elem.id == newfriend.id) == undefined) {
        thefri.friendRequests = thefri.friendRequests.concat([newfriend])
        thefri.save()
        var friName = thefri.name
        res.render('friendadded', { friName })
      } else {
        req.flash('error_msg', 'This person already has a friend request from you.')
        res.redirect('/link/addfriend')
      }
    })
    .catch(err => console.log(err))
  
})

module.exports = router