var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/config.js');

var ticketSchema = new Schema({
    ticketType:  {type: String,
    enum : ['workTime', 'issues', 'job', 'contact'],
    default: 'ticket'
    },
    
});