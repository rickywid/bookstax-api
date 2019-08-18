const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');
const db = require('../db');

router.delete('/:user_id', async function(req, res, next) {
  const query1 = {
    text: 'DELETE FROM Users WHERE id = $1',
    values: [req.params.user_id]
  }

  const q1 = await db.query(query1);
  return res.status(200);
});

module.exports = router;
