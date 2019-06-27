var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var usrCtrl = require('../controllers/userCtrl.js');
var todoCtrl = require('../controllers/events/todoCtrl.js');
var config = require('../../config/config.js');

router.param('id', function(req, res, next, id){
    req.id = req.params.id;
    console.log(req.id);
    next();
  });

//get all users

router.post('/todo', function(req, res, next){
    todoCtrl.newTodo(req, res, next)
});

router.get('/todo', function(req, res, next){
    todoCtrl.getTodos(req, res, next);
});

module.exports = router;