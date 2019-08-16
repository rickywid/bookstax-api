var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');
const passport = require('passport');
const jwt = require('jwt-simple');

function generateToken() {
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: '1', iat: timestamp }, 'somesecretstring')

  return token;  
}

// Google Strategy
const googleAuthSignIn = passport.authenticate(
  'google', 
  { 
    scope: ['email', 'profile'],
    failureRedirect: `${process.env.HOSTNAME}/signin/`,
    successRedirect: `${process.env.HOSTNAME}/redirect?token=${generateToken()}`,
  });

router.get('/', googleAuthSignIn );

module.exports = router;
 