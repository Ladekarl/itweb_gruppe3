var request = require('request');

module.exports.getLoginPage = function (req, res) {
  res.render('login');
};

module.exports.postLogin = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    console.log('Invalid email or password');
    res.render('login');
  }

  var requestOptions = {
    url: "http://localhost:3000/api/accounts/login",
    method: "POST",
    json: {
      email: email,
      password: password
    }
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
      res.render('login');
    } else if (response.statusCode === 200) {
      setCookie(res, response.body.token);
      res.redirect('/');
    } else {
      console.log(response.statusCode);
      res.render('login');
    }
  });
};

module.exports.getRegisterPage = function (req, res) {
  res.render('register');
};

module.exports.postRegister = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    console.log('Invalid email or password');
    res.render('register');
  }

  var requestOptions = {
    url: "http://localhost:3000/api/accounts/",
    method: "POST",
    json: {
      email: email,
      password: password
    }
  };
  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
      res.render('register');
    } else if (response.statusCode === 200) {
      setCookie(res, response.body.token);
      res.redirect('/');
    } else {
      console.log(response.statusCode);
      res.render('register');
    }
  });
};

module.exports.logout = function (req, res) {
  res.clearCookie('token');
  res.redirect('/');
};

var setCookie = function (res, token) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  res.cookie('token', token, {maxAge: parseInt(expiry.getTime() / 1000), httpOnly: true});
};