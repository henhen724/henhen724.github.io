const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const Scout = require('@scoutsdk/server-sdk')


// Link Gamertag Page
router.get('/gamertag', ensureAuthenticated, (req, res) => res.render('gamertag'))

async function findPlayer (platform, playerName){
  let titles = await Scout.titles.list();
  let search = await Scout.players.search(playerName, "steam", "pc", titles.find(t => t.slug === "csgo").id, true, true);
  console.log(search.results);
  if(search.results !== undefined && search.results.length !== 0){
    return search.results.find(res => typeof res.player.handle !== undefined && res.player.handle === playerName)
  }
  return null;
}

router.post('/gamertag', (req, res, next) => {
  const { platform, name } = req.body;
  let nameEnc = name.replace(/&/g, '&amp;');
  let errors = [];
  if (!platform || !nameEnc) {
    errors.push({ msg: 'Make sure you filled in all fields!' });
    res.render('gamertag', {
      errors,
      name
    });
  } else {
    console.log(platform);
    console.log(nameEnc);
    findPlayer(platform, nameEnc)
      .then(player => {
        console.log(player);
        if (player === undefined || player === null) {
          errors.push({ msg: 'That epic games account does not exist.' });
        }
        else if(player.persona === undefined || player.persona === null) {
          errors.push({ msg: 'No persona assoiated with that account.' });
        }
        if(errors.length > 0) {
          res.render('gamertag', {
            errors,
            name
          });
        } else {
          Scout.verification.request(player.persona.id, 'localhost:5000/link/returnscout', '')
            .then(data => res.redirect(data.verificationUrl))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err));
  }
  
})

// Verification Reception
router.get('/returnscout', ensureAuthenticated, (req, res) => {
  console.log(req.query);
  res.send('ok');
})

module.exports = router
