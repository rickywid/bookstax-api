var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users books from bookshelf. */
router.get('/', function(req, res, next) {
  db.query(`
    SELECT * FROM Users where id = 1`, (err, result)=>{
    if(err) {
      console.log(err)
      return next(err);
    } else {
      data = result;
      res.json(data.rows);
    }
  });
});

module.exports = router;
