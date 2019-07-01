var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query(`
    SELECT 
      Bookshelf.backlog,
      Bookshelf.currently,
      Bookshelf.completed
    FROM
      Bookshelf;
    `, (err, result)=>{
    if(err) {
      console.log(err)
      return next(err);
    } else {
      console.log('/users')
      data = result;
      res.json(data.rows);
    }
  });
});

module.exports = router;
