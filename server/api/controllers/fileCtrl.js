const monGrid = require('mongoose-gridfs');
var connection = require('../../app.js');
// or create custom bucket with custom options
const fileST = createModel({
    modelName: 'FileStorage',
    connection: connection
});

//upload file 
module.exports.uploadFile = async (f) => {
    var readStream = createReadStream(f.location);
    var options = ({ filename: f.name, contentType: file.type });
    fileST.write(options, readStream, (error, file) => {
      //=> {_id: ..., filename: ..., ...}
    });
};


//retrieve small size file less than 25mb


//retrieve larger size file abouve 25mb
