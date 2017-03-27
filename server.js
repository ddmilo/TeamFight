var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var hbs = require('hbs');
// var mongodb = require('mongodb');

var indexController = require('./controllers/indexController');
var usersController = require('./controllers/usersController');
var sessionsController = require('./controllers/sessions');

var app = express();

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/TeamFight');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);

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

db.once('open', function() {
  console.log("database has been connected!");
});


app.listen(4000, function(){
  console.log('Mic Check');
});

module.exports = app;
