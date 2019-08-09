var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.post('/:user_id/update', async function(req, res, next) {
  console.log(req.body);

  // update user's profile
  const query1 = { 
    text: ``,
    values: []
  }

  // update users's genres
  const query2 = {
    text: `
      with d 
      as (
        delete from users_genres 
        where user_id=$1 
        and genre_id <> ALL ($2)
      ) 

      insert into users_genres(user_id, genre_id) 

      select $1, u.genre_id 
      from unnest($2) 
      as u(genre_id) 
      on conflict do nothing;                                             
    `,
    values: [17, [4,5,6,7,8,9,10]]
  }

  const q2 = await db.query(query2);
  console.log(q2);

});

module.exports = router;

