var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var convCtrl = require('../controllers/msgCtrl.js');




// View messages to and from authenticated user
router.get('/', function(req, res, next){
 convCtrl.getConversations(req, res, next);
});



// Send reply in conversation
router.post('/:conversationId', function(req, res, next){
     convCtrl.sendReply(req, res, next);
});
// Start new conversation
router.post('/new', function(req, res, next){
     convCtrl.newConversation(req, res, next);
});
module.exports = router;