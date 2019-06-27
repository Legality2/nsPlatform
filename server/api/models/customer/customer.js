var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contracts = require('./contract.js');
var user = require('../user-model.js');

var customerSchema = new Schema({
    fullName: {type: String},
    phone: {type: String},
    description: {type: String},
    company: {
        name: {type: String},
        industry: {type: String}
    },
    email: {type: String},
    contracts: [{type: Schema.Types.ObjectId, ref: 'contract'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('customer', customerSchema);