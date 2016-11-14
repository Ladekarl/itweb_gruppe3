var db = require('../models/db');
var jwt = require('jsonwebtoken');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.postLogin = function (req, res) {
  var username = req.username;
  var password = req.password;

  db.account.find({username: req.username})
    .exec(function (err, accounts) {
      if (err) {
        sendJsonResponse(500);
      } else if (!accounts || accounts.length == 0) {
        sendJsonResponse(404);
      } else {
        var token = jwt.sign({foo: 'bar'}, 'shhhhh');

        res.redirect('/');
        sendJsonResponse(200);
      }
    });
};