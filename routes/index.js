const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Home Page
router.get('/', (req, res) => res.render('welcome'))

// About
router.get('/about', (req, res) => res.render('about'))

// FAQ
router.get('/faq', (req, res) => res.render('faq'))

// Users Profile
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,
    friends: req.user.friends,
    friendRequests: req.user.friendRequests
  })
)

module.exports = router
