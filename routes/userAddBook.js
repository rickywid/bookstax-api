var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('+++++++++++++++++')
  console.log(req.body.content)
  db.query(`
    UPDATE 
      bookshelf
       SET backlog = backlog || $1::jsonb
    WHERE bookshelf.id = $2;
    `, [req.body.content, req.body.id], (err, result)=>{
    if(err) {
      console.log(err);
      return next(err);
    } else {
      data = result;
      res.json(data.rows);
    }
  });
});

module.exports = router;