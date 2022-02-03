Members = require('../models/member');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.login = (req, res) => {
  res.render('./views/log-in.ejs');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/fail',
});

exports.register_get = (req, res) => {
  res.render('./views/register');
};

exports.register_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const member = new Members({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      surname: req.body.surname,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};
