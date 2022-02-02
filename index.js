const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Member = require('./models/member');

// boiler plate for connecting to a database
const mongoose = require('mongoose');
const mongoDb = process.env.mongoconnection;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// routes require
const indexRouter = require('./routes/routes');

const app = express();

// set the template engine that will be used.
app.set('views', __dirname);
app.set('view engine', 'ejs');

// passport things
app.use(
  session({ secret: 'secretword', resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// passport authentication setup fucntion 1,2 and 3
passport.use(
  new LocalStrategy((email, password, done) => {
    Member.findOne({ email: email }, (err, Member) => {
      if (err) return done(err);
      if (!Member) return done(null, false, { message: 'Incorrect email' });
      bcrypt.compare(password, Member.password, (err, res) => {
        if (err) return done(err);
        // Passwords match, log Member in!
        if (res) return done(null, Member);
        // Passwords do not match!
        else return done(null, false, { message: 'Incorrect password' });
      });
    });
  })
);

passport.serializeUser((Member, done) => done(null, Member.id));
passport.deserializeUser((id, done) =>
  Member.findById(id, (err, Member) => done(err, Member))
);

// Access the user object from anywhere in our application
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./views/error');
});

app.listen(3000, () => console.log('app listening on port 3000!'));

module.exports = app;
