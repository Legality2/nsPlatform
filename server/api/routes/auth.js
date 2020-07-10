var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');
var passport = require('passport');
var userCtrl = require('../controllers/userCtrl.js');
const { google } = require('googleapis');
const OAuth2Data = require('../../config/private/google_key.json');

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'
];

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;


var authed = false;
const createConnection = function() {
  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
};

const getConnectionUrl = function(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope:  defaultScope
  });
};

const getGooglePlusApi = function(auth) {
  return google.people({ version: 'v1', auth });
};

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
const urlGoogle = function() {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  
  return url;
};

async function getGoogleAccountFromCode(code) {
  const auth = createConnection();
 const data = await auth.getToken(code);
 const tokens = data.tokens;
 auth.setCredentials(tokens);
 const plus = getGooglePlusApi(auth);
 const me = await plus.people.get({resourceName: "people/me", personFields: "names,emailAddresses"});
 var info = await verify(tokens);
 
 return {
   me: info,
   tokens: tokens,
 };
};

async function verify(tk) {
  const auth = createConnection();
  const ticket = await auth.verifyIdToken({
      idToken: tk.id_token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  
  const payload = ticket.getPayload();
  
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
  return payload;
};

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
router.get('/api/auth/me', verifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      console.log(user);
      res.status(200).send(user);
    });
});
//create user 
router.post('/api/auth/signup', function(req, res, next){
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
router.post('/api/auth/login', function(req, res){
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
//client google login


//google auth callback obtain info create user or log user in
//router.get('/auth/google/callback', function (req, res) {
 // const code = req.query.code;
 // if (code) {
 //     // Get an access token based on our OAuth code
 //     oAuth2Client.getToken(code, function (err, tokens) {
   //       if (err) {
     //         console.log('Error authenticating')
       //       console.log(err);
       //   } else {
        //      console.log('Successfully authenticated');
         //     oAuth2Client.setCredentials(tokens);
          //    authed = true;
              
       //   }
  //    });
 // }
//});





router.get('/api/auth/google', function(req, res){
//google url send to client
const urlInfo = urlGoogle();
res.json(urlInfo);

});
router.get('/auth/google/callback', function(req, res){
const cod = req.query.code;
const ob = {};
var userInfo = getGoogleAccountFromCode(cod);
 userInfo.then(function(result) {
  console.log("Success!", result);
    userCtrl.createUsrAuth(result, req, res);
}).catch(function(error) {
  console.log("Failed!", error);
});
});

module.exports = router;
