var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../../config/config.js');

var fileModel = new Schema({
    fileType: {type: String},
    fileInfo: {
        storageId: {
            type: String
        },
        fileName: {type: String},
        fileId: {type: Schema.Types.ObjectId}
    }
});

module.exports = mongoose.model('fileModel', fileModel);