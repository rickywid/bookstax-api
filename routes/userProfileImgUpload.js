var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');
var db = require('../db');
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dzeqj2xv1', 
  api_key: '941628444336851', 
  api_secret: 'HVkGg6mMHPHPWhyESCdYch6Gaqo' 
});


router.post('/', function(req, res, next) {

  // console.log('files', req.files)

  cloudinary.v2.uploader.upload(req.files.file.path, function(error, result) {
    if(error){
      console.log(error);
      return next();
    }
    console.log(result);
    res.send({data: result.secure_url})
  });
  // res.status(200).send({data: 'sadf'})
});

module.exports = router;

