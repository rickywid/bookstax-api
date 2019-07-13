var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.get('/:user_id/:list_id', async function(req, res, next) {
  // check to see if user has voted
  const query1 = {
    text: `select * from Likes where likes.user_id = $1 and likes.list_id = $2`,
    values: [req.params.user_id, req.params.list_id]
  }

  // get bookshelf like count
  const query2 = {
    text: `SELECT COUNT(*) FROM LIKES where list_id = $1`,
    values: [req.params.list_id]
  }

  // get list of users who liked the bookshelf
  const query3 = {
    text: `select users.id, users.name from users join likes on likes.user_id = users.id where likes.list_id = $1;`,
    values: [req.params.list_id]
  }

  console.log('**************************************')
  console.log('GET LIKES');
  console.log('user id: ',req.params.user_id);
  console.log('list id: ',req.params.list_id);
  console.log('**************************************')
  
  const q1 = await db.query(query1);
  const q2 = await db.query(query2);
  const q3 = await db.query(query3);
  
  res.json(
    {
      voted: q1.rows.length > 0 ? true : false,
      count: q2.rows[0].count,
      likedUsers: q3.rows
    }
  );
});

module.exports = router;