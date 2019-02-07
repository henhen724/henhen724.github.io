const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get('/place', ensureAuthenticated, (req, res) => res.render('place'))

router.get('/addroyal', ensureAuthenticated, (req, res) => res.render('addroyal'))

module.exports = router