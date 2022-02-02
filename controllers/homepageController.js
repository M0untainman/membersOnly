exports.homepage = (req, res) => {
  res.render('./views/homepage.ejs', { member: req.user });
};
