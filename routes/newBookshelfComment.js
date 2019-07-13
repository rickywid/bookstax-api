var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', async function(req, res, next) {
 
  const query1 = {
    text: `insert into Comments (comment, user_id, list_id, created_at) values($1, $2, $3, NOW())`,
    values: [req.body.comment, req.body.user_id, req.body.list_id]
  }

  const q1 = await db.query(query1);


  // res.json(
  //   {
  //     count: q2.rows[0].count,
  //     voted: q1.rows.length > 0 ? true : false
  //   }
  // );
});

module.exports = router;


//select users.name from users join likes on users.id = likes.user_id;
