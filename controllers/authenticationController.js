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
  failureMessage: true
  // failureFlash: true
});

// exports.login_post = function (req, res, next) {
//   // call passport authentication passing the "local" strategy name and a callback function
//   console.log(req.body);
//   passport.authenticate('local', function (error, user, info) {
//     // this will execute in any case, even if a passport strategy will find an error
//     // log everything to console
//     console.log(error);
//     console.log(user);
//     console.log(info);
//
//     if (error) {
//       res.status(401).send(error);
//     } else if (!user) {
//       res.status(401).send(info);
//     } else {
//       next();
//     }
//
//     res.status(401).send(info);
//   })(req, res);
// };

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
