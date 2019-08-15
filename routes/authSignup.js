var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');



function tokenForUser() {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: 1, iat: timestamp }, 'somesecretstring')
}


router.post('/signup', async (req, res, next) => {
  
  const email = req.body.email;
  let password = req.body.password;
  const username = req.body.username;
  const errors = [];

  const getUser = {
    text:`
      SELECT * FROM USERS
      WHERE username = $1;
    `,
    values: [username]
  }

  const getEmail = {
    text:`
      SELECT * FROM USERS
      WHERE email = $1;
    `,
    values: [email]
  }

  const q1 = await db.query(getUser);
  const q2 = await db.query(getEmail);

  if (q1.rows.length || q2.rows.length) {
    // if username exists
    if (q1.rows.length) {
      errors.push('username already exists');
    }

    // if email exists
    if (q2.rows.length) {
      errors.push('email already exists')
    } 

    res.status(400).send({errors: errors});    
  } else {

    // generate a salt then run callback
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err);}

      // hash(encrypt) our password using the salt
      bcrypt.hash(password, salt, null, async (err, hash) => {
        if(err) { return next(err);}

        // overwrite plain text password with encrypted password

        password = hash;

        // create user 
        const createUser = {
          text: `
            with t1 AS(INSERT INTO Bookshelf(backlog, currently, completed, like_count, created_at) VALUES('[]','[]','[]',0,NOW()) RETURNING id),
                    t2 AS(INSERT INTO Favourites(books, created_at) values('[]', NOW()) RETURNING id) 
            INSERT INTO Users(username, email, password, list_id, favourite_books_id, created_at)
            SELECT $1, $2, $3, t1.id, t2.id, NOW() FROM t1,t2 RETURNING id`,

          values: [username, email, password]
        }

        const q3 = await db.query(createUser);
        console.log('===============================================================================================================')
        console.log('===============================================================================================================')
        console.log('===============================================================================================================')
        console.log('===============================================================================================================')
        console.log('===============================================================================================================')

        console.log(q3)
        const userId = q3.rows[0].id;

        res.send({
          id: userId,
          token: tokenForUser()
        });

      });
    });
  }
  





  // see if a user with the given email exists
  // User.findOne({ email: email }, function(err, existingUser){

  //   // if a user with email does exist, return an error
  //   if(existingUser) {
  //     return res.status(422).send({ error: 'Email is in use' });
  //   }

  //   // if a user with email does not exist, create and save user record
  //   const user = new User({
  //     email: email,
  //     password: password
  //   });

  //   user.save(function(err){ 
  //     if(err) { return next(err); }
  //   });

  //   // send generated token
  //   res.send({ token: tokenForUser(user) });
    
  // })
});

module.exports = router;







/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lower: true
  },
  password: String
});

// On Save Hook, encrypt password
// https://mongoosejs.com/docs/api.html#schema_Schema-pre
userSchema.pre('save', function(next){

  const user = this;
  
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err);}

    // hash(encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err);}

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();     
    });
  })
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
*/