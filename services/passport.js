const passport = require('passport');
// const User = require('../models/user');
// const config = require('../config');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const LocalStrategy = require('passport-local');
// const bcrypt = require('bcrypt-nodejs');
var db = require('../db');
const { Pool, Client } = require('pg');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const pool = new Pool({
  user: 'ricky', 
  password: '1111',
  host: 'localhost', 
  database: 'bookstax'
});

const googleStrategy = new GoogleStrategy({
    clientID: '92911553908-au3ga69itoq2okdlkmu5erbnd8s1mlf0.apps.googleusercontent.com',
    clientSecret: 'oQjI41GY7ywx-KB1_ETe8q0f',
    callbackURL: "http://localhost:3001/signin/redirect"
  },
  async function(accessToken, refreshToken, profile, cb) {
        console.log(profile)

    const query1 = {
      text: 'SELECT * from Users where email = $1',
      values: [profile.emails[0].value],
    }


    // create a new Bookshelf record first and then create a new user record and use the id of the new Bookshelf record as the user's list_id
    const query2 = {
      text: `with t1 AS(INSERT INTO Bookshelf(backlog, currently, completed, like_count, created_at) VALUES('[]','[]','[]',0,NOW()) RETURNING id) 
                  INSERT INTO Users (name, email, list_id, created_at)

              SELECT $1, $2, t1.id, NOW() FROM t1 RETURNING id`,
      values: [profile.displayName, profile.emails[0].value],
    }
    
    const q1 = await pool.query(query1);

    if(q1.rows.length === 0) {
      // user doesnt exist, add user to db
      const q2 = await pool.query(query2);


      console.log('not found');
      return cb(null, q2);  
      
    } else {
      // user exists
      console.log('found')
      return cb(null, q1.rows);  
    }

    // db.query(`
    //   SELECT * from Users where email = $1;
    //   `, [`${profile.displayName}@gmail.com`], (err, result)=>{
    //     console.log(result)
    //   if(err) {
    //     console.log(err)
    //     return next(err);
    //   } else {
    //     if(result.rows.length === 0) {
    //       console.log(result.rows)
    //       // user doesnt exist, add user to db
    //     } else {
    //       // user exists
    //       return cb(err, result);  
    //     }
    //   }
    // });
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