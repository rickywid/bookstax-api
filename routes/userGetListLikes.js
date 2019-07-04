var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

router.get('/', function(req, res, next) {
  db.query(`select * from Likes where likes.user_id = 1 and likes.list_id = 1;`, (err, result)=>{
    if(err) {
      console.log(err);
      return next(err);
    } else {
      data = result;
      
      // if any data is returned means user has already casted a vote. like should show active state onclient.
      res.json(data.rows.length > 0 ? true : false);
    }
  });
});

module.exports = router;