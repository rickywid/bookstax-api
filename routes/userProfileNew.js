var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.post('/', async function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const errors = [];
  // console.log(req.body);

  // check if username exists
  const query = {
    text: `
      SELECT * 
      FROM USERS
      WHERE username = $1
    `,
    values: [username]    
  }

  const query2 = {
    text: `
      SELECT * 
      FROM USERS
      WHERE email = $1
    `,
    values: [email]    
  }

  const q = await db.query(query);
  const q2 = await db.query(query2);

  if (q.rows.length > 0) {
    errors.push('username already taken!!!')
  }

  if (q2.rows.length > 0) {
   errors.push('email already taken!!!')
  }
  console.log('++++++++++++++++++++++++++++++++')
  console.log(errors)
  if (Object.keys(errors).length > 0) {
    
    res.status(400).json({errors: errors});

  } else {
    res.status(200).json({ success: 'success'})    
  }








  
  console.log(q)
  // check if email exists









  // const query1 = {
  //   text: `
  //     INSERT INTO USERS(name, email, password, username)
  //     VALUES($1, $2, $3, $4)
  //   `,
  //   values: [name, email, password, username]
  // }

  // try {
  //   await db.query(query1);
  // } catch(err) {
  //   console.log(false)
  //   console.log(err)
  //   res.status(400).send({ error: "error"});
  // }
  
  // console.log(query1)

  // res.json(
  //   {
  //     count: q2.rows[0].count,
  //     voted: q1.rows.length > 0 ? true : false
  //   }
  // );
});

module.exports = router;


//select users.name from users join likes on users.id = likes.user_id;
