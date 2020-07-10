var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var main = require('../../app.js');
var connection = main.db;
var multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
// Create a storage object with a given configuration
const url = 'mongodb://127.0.0.1:27017/nsPlatform';
const stor = new GridFsStorage({ url });
const fileModel = require('../models/file/file-model.js');
const createReadStream = require('fs');
   
// or create custom bucket with custom options


const storage = multer.diskStorage({
  destination: '../../files',
   filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
        cb(null, path.extname(file.originalname))

    });
  }
});
const upload = multer({stor});
router.get('/files', function(req, res){
    fileModel.find({}, function(err, f){
        if(err){ res.json(err)}
        else {
            res.json(f);
        }
    });
});

router.post('/files', upload.single('upl'), (req, res, next) => { 
    console.log(req);
  
    const readStream = createReadStream(req.file.path);
    const options = ({ filename: req.file.originalname, contentType: req.file.mimetype });
  
  
    const newFile = new fileModel({});
        newFile.fileType = req.file.mimetype;
        newFile.fileInfo.fileName = req.file.originalname; 
    
  
        newFile.save(function(err){
  
          if(err) res,json(err);
          res.json({data: 'file has been upload'});
        });
  });

  module.exports = router;