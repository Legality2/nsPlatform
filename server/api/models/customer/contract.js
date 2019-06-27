var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var property = require('./property.js');
var customer = require('./customer.js');

var contractSchema = new Schema({
  status: {
      type: String,
      enum: ['pending', 'contract signed', 'contract completed', 'contract terminated'],
      default: 'pending'
  },
  details: {
      contractSummary: {type: String},
      customer: {type: Schema.Types.ObjectId, ref: 'customer'},
      lengthOfContract: {type: String},
      potentialProperty: [{type: Schema.Types.ObjectId, ref: 'property'}],
      complete: {type: Boolean}
  }
});

module.exports = mongoose.model('contract', contractSchema);