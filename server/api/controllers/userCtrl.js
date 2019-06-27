const User = require('../models/user-model.js');

const bcrypt = require('bcrypt');
//create new user

//get single user
module.exports.getSingleUser = function(req, res){
    var id = req.params.id;
    User.findOne({_id: id}, function(err, usr){
        if(err) {
            res.json(err);
        } else {
        res.json(usr);
        };
    });
};

//get all users
module.exports.getAllUsers = function(res){
    User.find({})

    .populate('contracts')
    .populate('customers')
    .populate('todos')
    .exec(function(err, usr){
        if(err) res.json(err);
        
        res.json(usr)
    });
};
//update user password
module.exports.updatePassword = function(){
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
    
        bcrypt.hash(userObj.password , salt, function(err, hash) {
            if (err) return next(err);
            userObj.password = hash;
            console.log(userObj);
            User.updateOne({_id: req.params.id}, userObj, {new: true}, function(err, usr){
                if(err) res.json(err);
                console.log(usr);
                res.json({msg: 'user has been updated'})
            });
        });
      });
};

//update user info
module.exports.updateUser = function(req, res){
    var userObj = req.body;
    console.log(userObj);
        User.updateOne({_id: req.params.id}, userObj, {new: true}, function(err, usr){
            if(err) res.json(err);
            console.log(usr);
            res.json({msg: 'user has been updated'})
        });
};

//delete user
module.exports.removeUser = function(req, res){
    var id = req.params.id;
User.remove({ _id: id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    console.log('user has beeen deleted');
    res.json({msg: 'user has been deleted succesfully'});
  });
};
//get user membership  channels
module.exports.userChannels = function(req, res) {
    console.log(req.params);
    var memId = req.params.id;
    //obtain channels belonging to membership
    channel.find({ setMembership: memId}).populate('videos')
    
    .exec(function(err, chan){
        if(err) res.json(err);
        console.log('test purpose: ' + chan);
        res.json(chan)
    });

};