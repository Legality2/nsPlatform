const Conversation = require('../models/messages/convoSchema.js'),
      Message = require('../models/messages/msgModel.js'),
      userCtrl = require('./userCtrl.js');
      User = require('../models/user-model.js');


      const addToInbox = function(users, convo){
        var usrArray = users;
        User.findOne({_id: usrArray[0]}, function(err, usr){
          usr.inbox.push(convo._id);
          usr.save(function(err){
            if(err){
              res.json(err);
            } else {
              res.json({msg: 'user' + usr.username + 'inbox added message'});
            };
          });
        });
        User.findOne({_id: usrArray[1]}, function(err, usr){
          usr.inbox.push(convo._id);
          usr.save(function(err){
            if(err){
              res.json(err);
            } else {
              res.json({msg: 'user' + usr.username + 'inbox added message'});
            };
          });
        });
      };

exports.getConversations = function(req, res, next) {

  //user id
  var id = req.params.user_id;
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.params.user_id })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(function(conversation) {
        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "username"
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            if(fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
  });
};
// 5cd79844c8f19a039019c76f newmanp 
// 5cd79aaf854f472734f61e8f legality
exports.newConversation = function(req, res, next) {
  
  //create new convo add message and particpents to convo
  const newConvo = new Conversation({
    participants: [req.body.user._id, req.body.recipient]
  });
  const newMessage = new Message({
    conversationId: newConvo,
    body: req.body.composedMessage,
    author: req.body.user_id
  });
  newConvo.messages.push(newMessage);
  console.log(newConvo);
  console.log(newMessage);
  newConvo.save(function(err){
    if(err) res.json(err);
    newMessage.save(function(err){
      if(err){
        console.log(err);
        res.json(err);
        next();
      }
      console.log('new convo and message added successfully');
      res.json({msg: 'convo was created'});
    });
  });


};

exports.sendReply = function(req, res, next) {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id
  });
  conversation.findOne({_id: req.params.conversationId}, function(err, con){
    reply.save(function(err, sentReply) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }
    
        con.messages.push(sentReply._id);
        con.save(function(err){
            if(err){
                res.json(err);
            } else {
                res.json({msg: "message has been added to conversation"});
            }
        })

        res.status(200).json({ message: 'Reply successfully sent!' });
        return(next);
      });
  });

  reply.save(function(err, sentReply) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    res.status(200).json({ message: 'Reply successfully sent!' });
    return(next);
  });
}



// DELETE Route to Delete Conversation
exports.deleteConversation = function(req, res, next) {
  Conversation.findOneAndRemove({
    $and : [
            { '_id': req.params.conversationId }, { 'participants': req.user._id }
           ]}, function(err) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: 'Conversation removed!' });
        return next();
  });
}

// PUT Route to Update Message
exports.updateMessage = function(req, res, next) {
  Conversation.find({
    $and : [
            { '_id': req.params.messageId }, { 'author': req.user._id }
          ]}, function(err, message) {
        if (err) {
          res.send({ error: err});
          return next(err);
        }

        message.body = req.body.composedMessage;

        message.save(function (err, updatedMessage) {
          if (err) {
            res.send({ error: err });
            return next(err);
          }

          res.status(200).json({ message: 'Message updated!' });
          return next();
        });
  });
}
