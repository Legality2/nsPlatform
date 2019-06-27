var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../config/config.js');
var upload = require('../../app.js')(upload);
router.param('id', function(req, res, next, id){
    req.id = req.params.id;
    console.log(req.id);
    next();
  });

//get all users

router.get('/upload', upload.single('file'), function(req, res){
    console.log(req.body);
});