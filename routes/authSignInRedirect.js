var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');
const passport = require('passport');
const jwt = require('jwt-simple');

// Google Strategy
const googleAuthSignIn = passport.authenticate(
  'google', 
  { 
    scope: ['profile'],
    failureRedirect: 'http://localhost:3000/signin/',
    successRedirect: 'http://localhost:3000/redirect',
    session: true
  });

router.get('/', function(req, res){
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: '1', iat: timestamp }, 'somesecretstring')
  
  console.log(token)
  res.redirect(`http://localhost:3000/redirect?token=${token}`);
});

module.exports = router;
