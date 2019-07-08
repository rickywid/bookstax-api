var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');
const passportService = require('../services/passport');
const passport = require('passport');



// Google Strategy
const googleAuthSignIn = passport.authenticate(
  'google', 
  { 
    scope: ['email', 'profile'],
    failureRedirect: 'http://localhost:3000/signin/',
    successRedirect: 'http://localhost:3000/redirect',
  });

router.get('/', googleAuthSignIn);

module.exports = router;
