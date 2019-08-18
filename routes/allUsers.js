const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');
const db = require('../db');

router.get('/', async function(req, res, next) {
  const query1 = {
    text: 'SELECT * from Users;',
    values: []
  }

  const q1 = await db.query(query1);


  return res.json(q1.rows)
});

module.exports = router;
