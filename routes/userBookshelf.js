var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users books from bookshelf. */
router.get('/:bookshelf_id', function(req, res, next) {
  const bookshelfId = req.params.bookshelf_id;
  db.query(`
    SELECT 
      Bookshelf.backlog,
      Bookshelf.currently,
      Bookshelf.completed
    FROM
      Bookshelf
    WHERE id = $1;    
    `, [bookshelfId], (err, result)=>{
    if(err) {
      console.log(err)
      return next(err);
    } else {
      data = result;
      // console.log(data.rows[0].completed)
      res.json(data.rows);
    }
  });
});

module.exports = router;
