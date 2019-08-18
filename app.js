var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
require('dotenv').config();

var indexRouter = require('./routes/index');

var allUsersRouter = require('./routes/allUsers');
var authSignupRouter = require('./routes/authSignup');
var authSignInRouter = require('./routes/authSignIn');
var authSignInRedirectRouter = require('./routes/authSignInRedirect');
var userAuthProfileRouter = require('./routes/userAuthProfile');
var userProfileRouter = require('./routes/userProfile');
var userProfileDeleteRouter = require('./routes/userProfileDelete');
var userBookshelfRouter = require('./routes/userBookshelf');
var userUpdateRouter = require('./routes/userUpdate');
var userAddBookRouter = require('./routes/userAddBook');
var userGetListLikes = require('./routes/userGetListLikes');
var userGetGenreRouter = require('./routes/userGetGenre');
var userProfileUpdateRouter = require('./routes/userProfileUpdate');
var newBookshelfCommentRouter = require('./routes/newBookshelfComment');
var bookshelfCommentsRouter = require('./routes/bookshelfComments');
var ListRemoveLike = require('./routes/listRemoveLike');
var ListAddLike = require('./routes/listAddLike');
var addFavouriteBookRouter = require('./routes/addFavouriteBook');
var getUserFavouriteBooksRouter = require('./routes/getUserFavouriteBook');
var userProfileImgUploadRouter = require('./routes/userProfileImgUpload')
var bodyParser = require('body-parser');
var formData = require('express-form-data');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server)
console.log(process.env.HOSTNAME)
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
  origin: ['http://localhost:3000', 'https://bookstax-staging.herokuapp.com', 'https://bookstax-api.herokuapp.com'],
  credentials: true, // allow cookies to pass through
}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// allow file upload
app.use(formData.parse());

// initialize passport and create passport session. (must be in this specific order!)
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use('/', indexRouter);

app.use('/signin', authSignInRouter);
app.use('/signin/redirect', authSignInRedirectRouter);
app.use('/', authSignupRouter);

// User Routes
app.use('/user/auth', userAuthProfileRouter); // Get Logged in User's profile
app.use('/user', userProfileRouter); // Get User's profile
app.use('/user/delete', userProfileDeleteRouter); // Delete User's profile
app.use('/user', userProfileUpdateRouter) // Update Users's profile
app.use('/users', allUsersRouter); // Get all users
app.use('/user/bookshelf', userBookshelfRouter); // Get User's bookshelf
app.use('/user/update/books', userUpdateRouter); // update users book lists during drag n drop
app.use('/user/addbook/:user_id', userAddBookRouter); // update backlog list when user adds new book to backlog
app.use('/user', userGetGenreRouter); // Get Users's genres 
app.use('/upload/avatar', userProfileImgUploadRouter); // upload user's profile image

// Likes/Thumbsup
app.use('/user/list/likes', userGetListLikes) // check to see if user has liked a specific list
app.use('/user/update/list/likes', ListAddLike) // add new like id to likes table when user likes a list
app.use('/user/update/list/likes', ListRemoveLike) // remove like id from likes table when user removes a like

// Bookshelf comment
app.use('/bookshelf/comments/', bookshelfCommentsRouter); // get bookshelf comments
app.use('/bookshelf/comment/new', newBookshelfCommentRouter); // add new bookshelf comment

// Add book to favourites
app.use('/favourites/', getUserFavouriteBooksRouter); // add book to favourites list
app.use('/favourites/add', addFavouriteBookRouter); // add book to favourites list

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

module.exports = { app: app, server: server };
