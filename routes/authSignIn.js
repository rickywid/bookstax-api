var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');
const passportService = require('../services/passport');
const passport = require('passport');
// Local Strategy
const requireSignin = passport.authenticate('local', { session: false });
const jwt = require('jwt-simple');

function tokenForUser() {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: 1, iat: timestamp }, 'somesecretstring')
}

// Google Strategy
const googleAuthSignIn = passport.authenticate(
  'google', 
  { 
    scope: ['email', 'profile'],
    failureRedirect: 'http://localhost:3000/signin/',
    successRedirect: 'http://localhost:3000/redirect',
  });

router.get('/', googleAuthSignIn);

router.post('/local', requireSignin, (req, res, next) => {
  const userId = req.user[0].id;
  res.send({ id: userId, token: tokenForUser()});
})

module.exports = router;
