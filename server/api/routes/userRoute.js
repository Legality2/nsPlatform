var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var usrCtrl = require('../controllers/userCtrl.js');
var crmCtrl = require('../controllers/customerCtrl.js');
var config = require('../../config/config.js');

router.param('id', function(req, res, next, id){
    req.id = req.params.id;
    console.log(req.id);
    next();
  });

//get all users

router.get('/user', function(req, res){
    usrCtrl.getAllUsers(res);
});

router.get('/user/:id', function(req, res){
    usrCtrl.getSingleUser(req, res);
});
//update user
router.put('/user/:id', function(req, res){
    usrCtrl.updateUser(req, res);
});

//get channels for users membership
router.get('/user/:id/channel', function(req, res){
    usrCtrl.userChannels(req, res);
});

//get groups belonging to user
router.put('/user/:userId/group', function(req, res){
    
});
//new user
//new user
router.post('/user', function(req, res){

    console.log(req.body);
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        userType: req.body.userType,
        role: req.body.role 
    });

    newUser.save(function(err, usr){
        if(err) {
            res.json({msg: err});
           
        }
        else {

        

        console.log("new user created");
        console.log(usr);
       
        res.status(200);
        res.json({
          "success" : "data was created and saved in db"
        });
    };
    });

});



//remove user
router.delete('/user/:id', function(req, res){
    usrCtrl.removeUser(req, res);
});

//get user channel by puchasedMembership


//user contracts
router.get('/user/:user/contract', crmCtrl.listContracts); 

router.get('/user/contract/:id', crmCtrl.singleContract);
//user customers
router.get('/user/:user/customer', crmCtrl.listCustomers);
router.get('/user/:user/customer/:id', crmCtrl.singleCustomer);
//user add new customer
router.post('/user/customer', crmCtrl.newCustomer);




module.exports = router;