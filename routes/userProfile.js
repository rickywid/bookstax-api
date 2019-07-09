var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users books from bookshelf. */
router.get('/', function(req, res, next) {
  console.log(req.cookies)
  db.query(`
    SELECT * FROM Users where id = 2`, (err, result)=>{
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
