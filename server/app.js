const express = require('express');
const config = require('./config/config.js');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const { createModel } = require('mongoose-gridfs');

//models
const User = require('./api/models/user-model.js');
const fileModel = require('./api/models/file/file-model.js');
//controllers
const conversation = require('./api/models/messages/convoSchema.js');
const message = require('./api/models/messages/msgModel.js');
const convCtrl = require('./api/controllers/msgCtrl.js');
//routes
const authRoute = require('./api/routes/auth.js');
const crmRoute = require('./api/routes/crm.js');
const userRoute = require('./api/routes/userRoute.js');
const todoRoute = require('./api/routes/todoRoute.js');
const convoRoute = require('./api/routes/message.js');
const fileRoute = require('./api/routes/files.js');
const app = express();
const router = express.Router();
const options = {
  user: "admin",
  pass: "password"
  };
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
  const upload = multer({ storage: storage });
  
  
//connection to database
//Set up default mongoose connection
const mongoDB = config.db;
mongoose.connect(mongoDB,  { useNewUrlParser: true }, function(){
  console.log('connecting to NS Datbase');
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// view engine setup


app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../client/app/public')));
app.use('/assets', express.static(path.join(__dirname, '../client/app/assets')));
app.use('/views', express.static(path.join(__dirname, '../client/app/public/views')));
app.use('/admin', express.static(path.join(__dirname, '../client/app/public/views/admin')));

app.use('/imgs', express.static(path.join(__dirname, '../client/app/public/imgs')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));
app.use(router);

app.use('/api/convo', convoRoute);
app.use('/api/crm', crmRoute);
app.use('/api', todoRoute);
app.use('/api', fileRoute);
app.use('/api', userRoute);
app.use(authRoute);


app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../client/app/index.html'));
});

app.post('/file/new', upload.single('upl'), (req, res, next) => { 
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app, db};
