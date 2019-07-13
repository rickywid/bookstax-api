var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.delete('/', async function(req, res, next) {

  const query1 = {
    text: `DELETE FROM likes WHERE list_id = $1 AND user_id = $2`,
    values: [req.body.list_id, req.body.user_id]
  }

  const query2 = {
    text: `SELECT COUNT(*) FROM LIKES where list_id = $1`,
    values: [req.body.list_id]
  }

  const q1 = await db.query(query1);
  const q2 = await db.query(query2);

  console.log('**************************************')
  console.log('DELETE LIKE');
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

