var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.post('/:user_id/update', async function(req, res, next) {
  const userId = req.params.user_id;
  const name = req.body.name;
  // const username = req.body.username;
  const email = req.body.email;
  const location = req.body.country;
  const description = req.body.bio;
  const twitter = req.body.twitter;
  const instagram = req.body.instagram;
  const genres = req.body.genres;
  const avatarUrl = req.body.file;
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('avatar', avatarUrl)
  // update user's profile
  const query1 = { 
    text: `
      UPDATE Users
      SET 
        name = $1,
        description = $2,
        email = $3,
        location = $4,
        twitter_id = $5,
        instagram_id = $6,
        avatar_url = $7
      WHERE
         id = $8;
    `,
    values: [name, description, email, location, twitter, instagram, avatarUrl, userId]
  }

  // update users's genres
  const query2 = {
    text: `
      WITH d 
      AS (
        DELETE FROM users_genres 
        WHERE user_id=$1 
        AND genre_id <> ALL ($2)
      ) 

      INSERT INTO users_genres(user_id, genre_id) 

      SELECT $1, u.genre_id 
      FROM unnest($2) 
      AS u(genre_id) 
      ON conflict do nothing;                                             
    `,
    values: [userId, genres]
  }

  const q1 = await db.query(query1);
  const q2 = await db.query(query2);
  
  res.status(200); 

});

module.exports = router;

