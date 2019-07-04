var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.delete('/', function(req, res, next) {
  db.query(`
    DELETE FROM 
      likes
    WHERE list_id = $1
    AND user_id = $2
    `, [req.body.list_id, req.body.user_id], (err, result)=>{
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
