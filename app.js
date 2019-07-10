var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');

// routes
var indexRouter = require('./routes/index');
var authSignInRouter = require('./routes/authSignIn');
var authSignInRedirectRouter = require('./routes/authSignInRedirect');
var userAuthProfileRouter = require('./routes/userAuthProfile');
var userProfileRouter = require('./routes/userProfile');
var userBookshelfRouter = require('./routes/userBookshelf');
var userUpdateRouter = require('./routes/userUpdate');
var userAddBookRouter = require('./routes/userAddBook');
var userGetListLikes = require('./routes/userGetListLikes')
var ListRemoveLike = require('./routes/listRemoveLike');
var ListAddLike = require('./routes/listAddLike');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // allow cookies to pass through
}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// initialize passport and create passport session. (must be in this specific order!)
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/signin', authSignInRouter);
app.use('/signin/redirect', authSignInRedirectRouter);

// User Routes
app.use('/user/auth', userAuthProfileRouter); // Get Logged in User's profile
app.use('/user', userProfileRouter); // Get User's profile
app.use('/user/bookshelf', userBookshelfRouter); // Get User's bookshelf
app.use('/user/update/books/:user_id', userUpdateRouter); // update users book lists during drag n drop
app.use('/user/addbook/:user_id', userAddBookRouter); // update backlog list when user adds new book to backlog


// Likes/Thumbsup
app.use('/user/list/likes', userGetListLikes) // check to see if user has liked a specific list
app.use('/user/update/list/likes', ListAddLike) // add new like id to likes table when user likes a list
app.use('/user/update/list/likes', ListRemoveLike) // remove like id from likes table when user removes a like

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
