var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {
  db.query(`
    INSERT INTO likes(user_id, list_id, created_at)
    VALUES ($1, $2, NOW())
    `, [req.body.user_id, req.body.list_id], (err, result)=>{
    if(err) {
      console.log(err)
      return next(err);
    } else {
      console.log('/users')
      data = result;
      res.json(data.rows);
    }
  });

  console.log('add like!!!')
});

module.exports = router;
