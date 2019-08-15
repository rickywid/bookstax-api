var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.put('/:user_id', function(req, res, next) {
  db.query(`
    UPDATE 
      bookshelf
    SET 
      backlog = $1,    
      completed = $2,
      currently = $3
    WHERE bookshelf.id = $4
    RETURNING 
      backlog, currently, completed;
    `, [JSON.stringify(req.body.data[0]), JSON.stringify(req.body.data[1]), JSON.stringify(req.body.data[2]), req.params.user_id], (err, result)=>{
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


/*
 UPDATE 
      bookshelf
    SET 
      backlog = '[{
              "title": "1984", 
              "cover": "https://books.google.com/books/content?id=0HZrq-4zA5QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "author": "Fyodor Dostoyevsky",
              "isbn": "9781605205106",
              "created_at": "2019-06-29",
              "status": "backlog"
            }]',    
      currently = '[{
              "title": "Animal Farm", 
              "cover": "http://books.google.com/books/content?id=o6eSDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "author": "George Orwell",
              "isbn": "9781605205106",
              "created_at": "2019-06-29",
              "status": "current"
            }]',
      completed = '[{
              "title": "Blink", 
              "cover": "http://books.google.com/books/content?id=VKGbb1hg8JAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "author": "Malcolm Gladwell",
              "isbn": "9781605205106",
              "created_at": "2019-06-29",
              "status": "completed"
            }]'
    WHERE bookshelf.id = 1;
*/