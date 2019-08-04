var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users books from bookshelf. */
router.get('/:list_id', async function(req, res, next) {
  console.log(req.params.list_id);
  const query = {
    text: `SELECT 
              Users.id as user_id,
              Users.name, 
              Comments.comment, 
              Comments.created_at
            FROM 
              Comments
            JOIN 
              Users on Comments.user_id = Users.id
              WHERE Comments.list_id = $1;`,
    values: [req.params.list_id]
  }

  const q = await db.query(query);
  console.log(q)
  res.json({
    comments: q.rows
  })
});

module.exports = router;
