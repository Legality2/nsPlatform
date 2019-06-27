var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../user-model.js');

var todoSchema = new Schema({
    title: {type: String},
    description: {type: String},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    dates: {
        beginDate: {type: String},
        endDate: {type: String},
        renewDate: {
            beginDate: {type: String},
            endDate: {type: String}
        }
    }
});
module.exports = mongoose.model('todoSchema', todoSchema);
