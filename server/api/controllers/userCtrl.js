const User = require('../models/user-model.js');

const bcrypt = require('bcrypt');
//create new user based on auth params
module.exports.createUsrAuth = async (auth, req, res) => {

    //creates user based on auth data

    let googleUser = await auth;
    User.findOne({email: googleUser.me.email}, function(err, usr){
        if(usr){
            var token;
            token = usr.generateJWT();
            var reUrl = encodeURIComponent('http://192.168.0.169:3000/#/auth/google/callback?token=' + token);
            res.redirect('http://192.168.0.169:3000/#!/auth/google/callback?token=' + token);
        } else if(!usr) {
            const newUser = new User({
                username: googleUser.me.email.split("@")[0],
                email: googleUser.me.email,
                fullName: googleUser.me.name,
                googleInfo: {
                    profile_sub: googleUser.me.sub,
                    refreshToken: {},
                    accessToken: {}
                },
                role: 'Admin'
            });
        
        
            newUser.save(function(err){
                if(err){
                    res.json(err);
                } else {
                    var token;
                    token = newUser.generateJWT();
                    console.log('user has been created');
                    var reUrl = encodeURIComponent('http://localhost:3000/#/auth/google/callback?token=' + token);
                    res.redirect('/#!/auth/google/callback?token=' + token);
                }
            });
        }
    })
    

};
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