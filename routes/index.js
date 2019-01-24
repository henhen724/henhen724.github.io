const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Scout = require('@scoutsdk/server-sdk');

//Home Page
router.get('/', (req, res) => res.render('welcome'));

//About
router.get('/about', (req, res) => res.render('about'));

//Users Profile
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
  name: req.user.name
}));

module.exports = router;