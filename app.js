const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Scout = require("@scoutsdk/server-sdk");

const app = express();
//Passport Configuration
require('./config/passport')(passport);

//Database Configuration
const db = require('./config/keys').MongoURI;

//Connect to The Database Using MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connection Made to MongoDB ...'))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparsing
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const secret = require('./config/keys').ClientSecret;
const SDKiD = require('./config/keys').ClientId;

//Scout Configuration
Scout.configure({
  clientId: SDKiD,
  clientSecret: secret,
  scope: "public.read"
})
  .then(() => console.log('Conection to Scout SDK Established ...'))
  .catch(err => console.log(err));

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/link', require('./routes/link'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
