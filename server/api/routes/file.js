var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');


var config = require('../../config/config.js');

const storage = multer.diskStorage({
  destination: '../../files',
   filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))

    });
  }
});
const upload = multer({ storage: storage });


router.param('id', function(req, res, next, id){
    req.id = req.params.id;
    console.log(req.id);
    next();
  });

//get all users

router.get('/file/upload', upload.single('upl'), function(req, res){
    console.log(req);
});

module.exports = router;