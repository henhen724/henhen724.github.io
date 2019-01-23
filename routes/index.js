const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) => res.render('welcome'));

router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
  name: req.user.name
}));

//Link Accounts Page
router.get('/link', ensureAuthenticated, (req, res) => res.render('link', {
  user: req.user
}));

module.exports = router;
