var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.post('/', async function(req, res, next) {
  
  const query1 = {
    text: `INSERT INTO likes(user_id, list_id, created_at) VALUES ($1, $2, NOW())`,
    values: [req.body.user_id, req.body.list_id]
  }

  const query2 = {
    text: `SELECT COUNT(*) FROM LIKES where list_id = $1`,
    values: [req.body.list_id]
  }

  const q1 = await db.query(query1);
  const q2 = await db.query(query2);


  console.log('**************************************')
  console.log('ADD LIKE');
  console.log('user id: ',req.body.user_id);
  console.log('list id: ',req.body.list_id);


  res.json(
    {
      count: q2.rows[0].count,
      voted: q1.rows.length > 0 ? true : false
    }
  );
});

module.exports = router;


//select users.name from users join likes on users.id = likes.user_id;
