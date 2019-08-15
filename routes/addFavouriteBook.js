var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.post('/:user_id', async function(req, res, next) {
  const query1 = {
    text: 'UPDATE Favourites SET books = $1, created_at = NOW() WHERE id = $2;',
    values: [req.body.book, req.body.id]
  }

  const query2 = {
    text: 'SELECT favourites.books FROM favourites JOIN users ON favourites.id = users.favourite_books_id WHERE users.id = $1',
    values: [req.params.user_id]
  }

  const q1 = await db.query(query1);
  const q2 = await db.query(query2);


  return res.json(q2.rows[0])
});

module.exports = router;


// insert into Favourites(user_id, books, created_at)
//         values(1,'[]',NOW());