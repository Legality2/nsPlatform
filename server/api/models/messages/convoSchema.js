const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var user = require('../user-model.js');

// Schema defines how chat messages will be stored in MongoDB
const convoSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  messages: [{type: Schema.Types.ObjectId, ref: 'message'}]
});

module.exports = mongoose.model('convo', convoSchema); 
