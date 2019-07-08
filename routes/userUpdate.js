var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');

/* GET users listing. */
router.put('/', function(req, res, next) {
  console.log('====== REQUEST ========')
  console.log(req.body.data)
  db.query(`
    UPDATE 
      bookshelf
    SET 
      backlog = $1,    
      currently = $2,
      completed = $3
    WHERE bookshelf.id = 1
    RETURNING 
      backlog, currently, completed;
    `, [JSON.stringify(req.body.data[0]), JSON.stringify(req.body.data[1]), JSON.stringify(req.body.data[2])], (err, result)=>{
    if(err) {
      console.log(err);
      return next(err);
    } else {
      data = result;

      console.log(data)
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