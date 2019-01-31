const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const Scout = require('@scoutsdk/server-sdk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// Link Gamertag Page
router.get('/gamertag', ensureAuthenticated, (req, res) => res.render('gamertag'))

async function findPlayer (platform, playerName) {
  let titles = await Scout.titles.list()
  let search = await Scout.players.search(playerName, 'epic', platform, titles.find(t => t.slug === 'fortnite').id, true, true)
  encPlayerName = encodeURIComponent(playerName)
  if (search.results !== undefined && search.results.length !== 0) {
    return search.results.find(res => typeof res.player.handle !== 'undefined' && res.player.handle === encPlayerName)
  }
  return null
}

router.post('/gamertag', (req, res, next) => {
  const { platform, name } = req.body
  let errors = []
  if (!platform || !name) {
    errors.push({ msg: 'Make sure you filled in all fields!' })
    res.render('gamertag', {
      errors,
      name
    })
  } else {
    findPlayer(platform, name)
      .then(oneResult => {
        if (oneResult === undefined || oneResult === null) {
          errors.push({ msg: 'That epic games account does not exist.' })
        } else if(oneResult.player === undefined || oneResult.player === null || oneResult.player.handle === undefined || oneResult.player.handle === null) {
          errors.push({ msg: 'That epic games account does not exist.' })
        } else if (oneResult.persona === undefined || oneResult.persona === null) {
          errors.push({ msg: 'No persona assoiated with that account. Check FAQ for more information.' })
        }
        var isTaken = false;
        User.find({ fortniteprofile: { id: oneResult.player.playerId } })
          .then(result => {
            console.log(result);
            isTaken = true;
          })
          .catch(err => console.log(err))
        if (isTaken)
        {
          errors.push({ msg: 'That epic games account is already registered with a different user.'})
        }
        if (errors.length > 0) {
          res.render('gamertag', {
            errors,
            name
          })
        } else {
          let state = '&handle='+ encodeURIComponent(oneResult.player.handle) + '&playerId=' + encodeURIComponent(oneResult.player.playerId) + '&personaHandle=' + encodeURIComponent(oneResult.persona.handle) + '&personaId=' + encodeURIComponent(oneResult.persona.id)
          console.log(state)
          Scout.verification.request(oneResult.persona.id, 'http://localhost:5000/link/returnscout', state)
            .then(data => {
              console.log(data)
              res.redirect(data.verificationUrl) 
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }
})

// Verification Reception
router.get('/returnscout', ensureAuthenticated, (req, res) => {
  try {
    const { token, state, handle, playerId, personaHandle, personaId } = req.query
    const decoded = jwt.verify(token, require('../config/keys').ScoutClientSecret)
    const thisUser = req.user
    thisUser.fortniteprofile = { handle: decodeURIComponent(handle), playerId: decodeURIComponent(playerId), personaHandle: decodeURIComponent(personaHandle), personaId: decodeURIComponent(personaId) }
    thisUser.save()
    res.render('returnscout', { handle })
  } catch (err) {
    console.log(err)
    errors = []
    errors.push({ msg:'It appears the JSON Webtoken in your URL might have been fabricated. Make sure your connection is secure.' })
    res.render('gamertag', { errors })
  }
})


// Add Payment Page 
router.get('/payment', ensureAuthenticated, (req, res) => res.render('payment'))

// Create User Credit Card Token
router.post('/payment', (req, res) => {
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

// Add Friend page
router.get('/addfriend', ensureAuthenticated, (req, res) => res.render('addfriend'))

router.post('/addfriend', ensureAuthenticated, (req, res) => {
  const name = req.body.name
  User.find({ name: name })
   .then(friends => {
     res.render('addfriend', { friends })
   })
   .catch(err => console.log(err))
})

router.get('/addfriendid', ensureAuthenticated, (req, res) => {
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
