var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var propSchema = new Schema({
    address: {type: String},
    developers:{},
    houseSpecs: {
        houseType: {
            type: String,
            enum: ['1Fl', '2Fl', '1Fl-Pool', '2Fl-Pool']
        },
        bathrooms: {
            type: String,
            enum: ['1b', '2b', '3b', '4b', '5b']
        },
        propertySeller: {type: String}
    }
});

module.exports = mongoose.model('property', propSchema);