const passport = require('passport');
// const User = require('../models/user');
// const config = require('../config');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const LocalStrategy = require('passport-local');
// const bcrypt = require('bcrypt-nodejs');
var db = require('../db');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const googleStrategy = new GoogleStrategy({
    clientID: '92911553908-au3ga69itoq2okdlkmu5erbnd8s1mlf0.apps.googleusercontent.com',
    clientSecret: 'oQjI41GY7ywx-KB1_ETe8q0f',
    callbackURL: "http://localhost:3001/signin/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)

    db.query(`
      SELECT * from Users where email = $1;
      `, [`${profile.displayName}@gmail.com`], (err, result)=>{
        console.log(result)
      if(err) {
        console.log(err)
        return next(err);
      } else {
        if(result.rows.length === 0) {
          // user doesnt exist, add it to db
        } else {
          // user exists
          return cb(err, result);  
        }
      }
    });
  }
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Tell passport to use these strategies
// passport.use(jwtLogin);
// passport.use(localLogin);
passport.use(googleStrategy);