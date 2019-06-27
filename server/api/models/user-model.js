var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');
var conversation = require('./messages/convoSchema.js');
var customer = require('./customer/customer.js');
var todos = require('./events/eventModel.js');
var contracts = require('./customer/contract.js');
var UserSchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
    },
  email: String,
  fullName: {type: String},
  password: {
        type: String,
        required: true
    },
  socketId: String,
  token: String,
  customers: [{type: Schema.Types.ObjectId, ref: 'customer'}],
  contracts: [{type: Schema.Types.ObjectId, ref: 'contract'}],
  todos: [{type: Schema.Types.ObjectId, ref: 'todoSchema'}],
  inbox: [{type: Schema.Types.ObjectId, ref: 'conversation'}],
  userType:  {
        type: String,
        enum : ['Realtor', 'Designer', 'Creative'],
        default: 'Creative'
    },
  role: {
    type: String,
    enum : ['Basic', 'Admin'],
    default: 'Basic'
},
});

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function(next) {
  var self = this;
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

//Password verification
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

UserSchema.methods.generateJWT = function(){

    //set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    this.token = jwt.sign({
      userId: this.userId,
      username: this.username,
      _id: this._id,
      role: this.role,
      exp: parseInt(exp.getTime() / 1000),
    }, config.secret);
    return this.token;
};

module.exports = mongoose.model('User', UserSchema);
