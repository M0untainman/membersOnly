const message = require('../models/message');

Message = require('../models/message');

exports.createMsg_get = (req, res) => {
  res.render('./views/createMsg.ejs', { member: req.user });
};

exports.createMsg_post = (req, res) => {
  const message = new message({});

  res.redirect('/');
};
