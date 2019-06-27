var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/config.js');

var fileSchema = new Schema({
    fileType: {type: String},
    fileInfo: {
        storageId: {

        },
        fileName: {type: String},
        fileId: {type: Schema.Types.ObjectId}
    }
});

module.exports = mongoose.model(fileSchema, 'fileSchema');