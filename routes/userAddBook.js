var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('====== REQUEST ========')
  console.log(req.body)
  db.query(`
    UPDATE 
      bookshelf
       SET backlog = backlog || $1::jsonb
    WHERE bookshelf.id = 1;
    `, [req.body.content], (err, result)=>{
    if(err) {
      console.log(err);
      return next(err);
    } else {
      data = result;

      console.log(data)
      res.json(data.rows);
    }
  });
});

module.exports = router;