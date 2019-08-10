var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.get('/:user_id/genre', async function(req, res, next) {
  console.log(req.body);

  // get users's genres
  const query1 = {
    text: `
      SELECT 
        Genre.id, Genre.name 
      AS 
        genre, Users.name
      FROM 
        Genre
      JOIN 
        users_genres
      ON 
        Genre.id = users_genres.genre_id
      JOIN 
        Users
      ON users_genres.user_id = Users.id
      WHERE
        Users.id = $1;
    `,
    values: [17]
  }

  const q1 = await db.query(query1);
  res.json(q1.rows);

});

module.exports = router;

