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
    failureRedirect: 'http://localhost:3000/signin/',
    successRedirect: `http://localhost:3000/redirect?token=${generateToken()}`,
  });

router.get('/', googleAuthSignIn);

module.exports = router;
 