var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//routes
var authRouter = require('./api/routes/auth.js');

var app = express();
//connection to database
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/nsdatabase';
mongoose.connect(mongoDB,  { useNewUrlParser: true }, function(){
  console.log('connecting to NS Datbase');
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// view engine setup

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../client/app/public')));
app.use('/assets', express.static(path.join(__dirname, '../client/app/assets')));
app.use('/views', express.static(path.join(__dirname, '../client/app/public/views')));
app.use('/imgs', express.static(path.join(__dirname, '../client/app/public/imgs')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));



app.use('/api/auth', authRoute);

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../client/app/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
