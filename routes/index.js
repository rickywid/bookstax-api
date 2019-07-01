var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

let data;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('')
});

module.exports = router;
