const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Add Payment Page 
router.get('/add', ensureAuthenticated, (req, res) => res.render('payment'))

// Create User Credit Card Token
router.post('/add', (req, res) => {
  res.send('THIS IS NOT COMPLETE TURN BACK')
  const { name, cardnumber, CVC, expMonth, expYear, streetAddress, city, region, country, postalCode } = req.body
  const cardInfo = {
    name: name,
    card: {
      cvc: CVC,
      number: cardnumber,
      expYear: expYear,
      expMonth: expMonth,
      address: {
        region: region,
        postalCode: postalCode,
        streetAddress: streetAddress,
        country: country,
        city: city
      }
    }
  }

})

module.exports = router