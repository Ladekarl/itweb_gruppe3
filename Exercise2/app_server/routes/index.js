var express = require('express');
var api = require("../../app_api/models/db.js");
var router = express.Router();
var request = require('request');

var requestOptions = {
  url : "http://localhost:3000/api/trainingPrograms",
  method : "GET",
  json : {}
};

/* GET home page. */
router.get('/', function (req, res) {
  request(requestOptions, function(err, response, body) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.render('index', {trainingPrograms: body});
    } else {
      console.log(response.statusCode);
    }
  })
});

module.exports = router;
