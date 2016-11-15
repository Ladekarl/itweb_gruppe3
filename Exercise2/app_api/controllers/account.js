var db = require('../models/db');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

var generateJwtToken = function (account) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: account._id,
    email: account.email,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

var createSalt = function () {
  return crypto.randomBytes(16).toString('hex');
};

var calcHash = function (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
};

var validatePassword = function (account, password) {
  var hash = calcHash(password, account.salt);
  return account.hash === hash;
};

module.exports.postLogin = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  db.account.find({email: email})
    .exec(function (err, accounts) {
      var account;
      if (err) {
        sendJsonResponse(res, 500);
      } else if (!accounts || accounts.length == 0) {
        sendJsonResponse(res, 404);
      } else if (accounts.length === 1) {
        if (validatePassword(accounts[0], password)) {
          account = accounts[0];
        } else {
          sendJsonResponse(res, 400);
        }
      } else {
        account = accounts.find(function (elem) {
          return validatePassword(elem, password);
        });
      }
      if (account) {
        sendJsonResponse(res, 200, {
          "token": generateJwtToken(account)
        });
      }
    });
};

module.exports.postRegister = function (req, res) {
  var account = new db.account;
  var password = req.body.password;

  account.email = req.body.email;
  account.salt = createSalt();
  account.hash = calcHash(password, account.salt);

  account.save(function (err) {
    if (err) {
      sendJsonResponse(res, 500, err);
    } else {
      sendJsonResponse(res, 200, {
        "token": generateJwtToken(account)
      });
    }
  });
};