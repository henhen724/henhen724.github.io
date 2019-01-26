const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const Scout = require('@scoutsdk/server-sdk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        } else if(oneResult.player === undefined || oneResult.player === null) {
          errors.push({ msg: 'That epic games account does not exist.' })
        } else if (oneResult.persona === undefined || oneResult.persona === null) {
          errors.push({ msg: 'No persona assoiated with that account. Check FAQ for more information.' })
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
            .then(data => res.redirect(data.verificationUrl))
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
    const decoded = jwt.verify(token, require('../config/keys').ClientSecret)
    const thisUser = req.user
    thisUser.fortniteprofile = { handle: decodeURIComponent(handle), playerId: decodeURIComponent(playerId), personaHandle: decodeURIComponent(personaHandle), personaId: decodeURIComponent(personaId) }
    thisUser.save()
    res.render('returnscout', { handle })
  } catch (err) {
    console.log(err)
    errors = []
    errors.push({ msg:'It appears the JSON Webtoken in your URL might have been fabricated. Make sure you connect is secure.' })
    res.render('gamertag', { errors })
  }
})

router.get('/payment', ensureAuthenticated, (req, res) => res.render('payment'))


router.post('/payment', (req, res) => {
  
})
module.exports = router
