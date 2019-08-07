var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.get('/:user_id', function(req, res, next) {
  console.log(req.body.content)
  db.query(`
    SELECT
      favourites.books 
    FROM favourites
    JOIN 
      users
    ON
      favourites.id = users.favourite_books_id
    WHERE users.id = $1
    `, [req.params.user_id], (err, result)=>{
    if(err) {
      console.log(err);
      return next(err);
    } else {
      data = result;
      console.log(data)
      res.json(data.rows[0].books);
    }
  });
});

module.exports = router;