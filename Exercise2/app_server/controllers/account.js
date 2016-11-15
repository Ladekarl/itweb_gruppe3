var request = require('request');

module.exports.getLoginPage = function (req, res) {
  res.render('login');
};

module.exports.postLogin = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    console.log('Invalid username or password');
    res.render('login');
  }

  var requestOptions = {
    url: "http://localhost:3000/api/accounts/login",
    method: "POST",
    json: {
      username: username,
      password: password
    }
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
      res.render('login');
    } else if (response.statusCode === 200) {
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
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    console.log('Invalid username or password');
    res.render('register');
  }

  var requestOptions = {
    url: "http://localhost:3000/api/accounts/",
    method: "POST",
    json: {
      username: username,
      password: password
    }
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
      res.render('register');
    } else if (response.statusCode === 200) {
      res.redirect('/');
    } else {
      console.log(response.statusCode);
      res.render('register');
    }
  });
};