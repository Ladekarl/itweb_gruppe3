var jwt = require('jsonwebtoken');

module.exports.getLoginPage = function(req, res) {
  res.render('login');
};

module.exports.postLogin = function (req, res) {
  var username = req.username;
  var password = req.password;

  var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds
  var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
  res.redirect('/');
};