const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// Login Page
router.get('/login', (req, res) => res.render('login'))

// User model
const User = require('../models/User')

// Registration Page
router.get('/register', (req, res) => res.render('register'))

// Registration Request
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  // Check the fields are filled correctly
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Make sure you filled in all fields!' })
  }
  if (password !== password2) {
    errors.push({ msg: 'The passwords you entered are different from one another.' })
  }
  // Check that the password is long enough
  if (password.length < 6) {
    errors.push({ msg: 'Passwords must be at least 6 charaters long.' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  }
  else {
    // Validation passed
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          // User already exists
          errors.push({ msg: 'This email already has an account assoiated with it.' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            emailVerified: false,
            password
          });

          // Hashing Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              //Setting password to the HASHED password
              newUser.password = hash;
              //Saving user
              newUser.save()
                .then(user => {
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err))
            }))
        }
      });
  }
});

//Login Handling
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: './login',
    failureFlash: true
  })(req, res, next);
});

//Logout Handling
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.');
  res.redirect('/users/login');
})

module.exports = router;
