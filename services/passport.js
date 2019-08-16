const passport = require('passport');
const db = require('../db');
const { Pool, Client } = require('pg');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');

const pool = new Pool({
  user: 'ricky', 
  password: '1111',
  host: 'localhost', 
  database: 'bookstax'
});

const googleStrategy = new GoogleStrategy({
    clientID: '92911553908-au3ga69itoq2okdlkmu5erbnd8s1mlf0.apps.googleusercontent.com',
    clientSecret: 'oQjI41GY7ywx-KB1_ETe8q0f',
    callbackURL: `${process.env.SERVER_HOSTNAME}/signin/redirect`
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    
    const username = profile.displayName.split(' ').join('_');

    const query1 = {
      text: 'SELECT * from Users where email = $1',
      values: [profile.emails[0].value],
    }


    // create a new Bookshelf record first and then create a new user record and use the id of the new Bookshelf record as the user's list_id and
    // return the user's id
    const query2 = {
      text: `with t1 AS(INSERT INTO Bookshelf(backlog, currently, completed, like_count, created_at) VALUES('[]','[]','[]',0,NOW()) RETURNING id),
                  t2 AS(INSERT INTO Favourites(books, created_at) values('[]', NOW()) RETURNING id) 
                  INSERT INTO Users (name, username, email, list_id, favourite_books_id, created_at)
              SELECT $1, $2, $3, t1.id, t2.id, NOW() FROM t1,t2 RETURNING id`,
      values: [profile.displayName, username, profile.emails[0].value],
    }
    
    const q1 = await pool.query(query1);

    if(q1.rows.length === 0) {
      // user doesnt exist, add user to db
      const q2 = await pool.query(query2);

      console.log(q2)
      return cb(null, q2);  
      
    } else {
      // user exists
      const user = q1.rows[0];
      return cb(null, user);  
    }
  }
);

// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

const localOptions = { usernameField: 'login'};
const localLogin = new LocalStrategy(localOptions, async function(login, passwordInput, done) {
  // Verify username and password, call done with the user if it is the correct username and password
  // otherwise, call done with false
  const findUser = {
    text:`
      SELECT * FROM Users
      WHERE email = $1
      OR username = $1;
    `,
    values: [login]
  }

  const q1 = await db.query(findUser);
  const user = q1.rows;

  // If user not found, return error
  if (!user.length) { return done(err); }

  // if user found, compare password  
  bcrypt.compare(passwordInput, user[0].password, function(err, isMatch) {
    if(err) { return done(err); }
    if(!isMatch) {return done(null, false); }
    return done(null, user);
  });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(googleStrategy);
passport.use(localLogin);