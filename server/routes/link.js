const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const Scout = require('@scoutsdk/server-sdk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const LinkedAccount = require('../models/LinkedAccount')
const Persona = require('../models/Persona')

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
        if (errors.length > 0) {
          res.render('gamertag', {
            errors,
            name
          })
        }
        LinkedAccount.getAccountById(platform, oneResult.player.playerId)
          .then(result => {
            if (result.length != 0)
            {
              errors.push({ msg: 'That epic games account is already registered with a different user.'})
              res.render('gamertag', {
                errors,
                name
              })
            } else {
              let state = '&platform='+ encodeURIComponent(platform) +'&slug='+ encodeURIComponent('fortnite') + '&handle='+ encodeURIComponent(oneResult.player.handle) + '&playerId=' + encodeURIComponent(oneResult.player.playerId) + '&personaHandle=' + encodeURIComponent(oneResult.persona.handle) + '&personaId=' + encodeURIComponent(oneResult.persona.id)
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
      })
      .catch(err => console.log(err))
  }
})

// Verification Reception
router.get('/returnscout', ensureAuthenticated, (req, res) => {
  try {
    const { token, state, platform, slug, handle, playerId, personaHandle, personaId } = req.query
    const decoded = jwt.verify(token, require('../config/keys').ScoutClientSecret)
    const thisUser = req.user
    const newPersona = new Persona({'game': slug, 'handle': personaHandle, 'id': personaId})
    thisUser.LinkedAccounts.find(account => account.id === playerId).then( result => {
      if(result.length != 0)
        account.addPersona(newPersona).then(() => res.render('returnscout', { handle }))
      else{
        newAccount = new LinkedAccount({'platform': platform, 'handle': playerId, 'id': playerId})
        thisUser.addLinkedAccount(newAccount)
          .then(
            newAccount.addPersona(newPersona)
          )
      }
    })
    
  } catch (err) {
    console.log(err)
    errors = [{ msg:'It appears the JSON Webtoken in your URL might have been fabricated. Make sure your connection is secure.' }]
    res.render('gamertag', { errors })
  }
})

module.exports = router
