var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');
var passport = require('passport');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      console.log.decoded;
      next();
    });
  };

//get user logged in info 
router.get('/me', verifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      console.log(user);
      res.status(200).send(user);
    });
});
//create user 
router.post('/signup', function(req, res, next){
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        userType: req.body.userType,
        role: 'Basic'
    });
    console.log(newUser);
    var token = newUser.generateJWT();
    

        newUser.save(function(err){
            if(err){
                console.log(err);
                next();
            } else {
                console.log('new user has signed up');
                res.json({msg: "you successfully created an account!"});
                next();
            }
        });
});
//login user 
router.post('/login', function(req, res){
    console.log(req.body);
User.findOne({username: req.body.Username}, function(err, usr){

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
                  console.log('user role is:' + usr.role);
                  res.status(200);
                  res.json({
                    "token" : token
                  });
    
           });
    }
    })
});



module.exports = router;
