var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  /* Enable Headers */

  /* XCO Headers */
  //res.header('X-Frame-Options', "DENY");
  //res.header('X-Frame-Options', "ALLOW-FROM mybank");

//#region CSP
  /* CSP Headers */
  //res.header('Content-Security-Policy', "default-src 'self'");
  /* ^ BAD - Will break our CSS
   * Content Security Policy: The page’s settings blocked the loading of a resource 
   * at https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css (“default-src”). 
   */

  // let CSP = ""
  // CSP += "default-src 'none' ; "
  // CSP += "style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com ; "
  // CSP += "object-src 'none' ; " // <object>
  // CSP += "frame-ancestors 'none' ";
  // res.header('Content-Security-Policy', CSP);
  /* Content-Security-Policy: default-src 'none' ; style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com ; object-src 'none' ; frame-ancestors 'none' */
//#endregion
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
