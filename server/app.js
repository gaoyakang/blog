var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const articleRouter = require('./routes/article');
const loginRouter = require('./routes/admin');

var app = express();
const Env = process.env.NODE_ENV
if(Env !== 'production'){
  app.use(logger('dev'));
}else{
	const logFileName = path.join(__dirname,'logs','access.logs')
  	const ws = fs.createWriteStream(logFileName,{
  	  flags:'a'
  	})
  app.use(logger('combined',{
  	stream: ws
  }))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require('./middleware/passport')(passport)
app.use('/article',articleRouter);
app.use('/admin',loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
