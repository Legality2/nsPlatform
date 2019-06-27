var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');
var passport = require('passport');


//create user 
router.post('/signup', function(req, res){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role 
    });

    newUser.save(function(err){
        if(err) res.json({msg: err});

        console.log("new user created");
        var token;
        token = user.generateJWT();
        user.token = token;
        res.status(200);
        res.json({
          "token" : token
        });
    });

});
//login user 
router.post('/login', function(req, res){
    
User.findOne({username: req.body.username}, function(err, usr){

    if(err) {
      console.log(err)
    }
    if(!usr){
      console.log('No user was found');
    } else if (usr){
    
           usr.comparePassword(req.body.password, function(isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with user:" + usr.username);
                    return res.send(401);
                }
                 var token;
                  token = usr.generateJWT();
                  usr.token = token;
                  console.log('user role is:' + usr.username);
                  res.status(200);
                  res.json({
                    "token" : token
                  });
    
           });
    }
    })
});

