//security control for server 
//functions that auth and secure routes and encrypt data
const bcrypt = require('bcrypt');
const config = require('../../config/config.js');


//encrypt and hash passwords
module.exports.encryptData = (textData, jsData) => {

//if data is txt  just encrypt and return encrypted data
//if json run function to ecnrypt
if(textData = null && jsData != null){
    //ecnrypt json data

    var jsTest = {
        data:,
        encrpt:,
        hash:,
        key:,
        Decrypt:
    };
};
 

bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
};