var express = require('express');
var db = require("../../app_api/models/db.js");
var router = express.Router();
var request = require('request');

var requestOptions = {
  url : "http://localhost:3000/api/trainingPrograms",
  method : "POST",
  json : {}
};

router.get('/', function(req, res) {
  res.render('newTrainingProgram', {});
});

router.post('/', function(req, res) {
  var requestOptions = {
    url : "http://localhost:3000/api/trainingPrograms/" + req.body.name,
    method : "POST",
    json : {}
  };

  request(requestOptions, function(err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 201) {
      res.redirect("/");
    } else {
      console.log(response.statusCode);
    }
  });
});

router.post('/:name/:completed', function (req, res) {
  var requestOptions = {
    url : "http://localhost:3000/api/trainingPrograms",
    method : "PUT",
    json : {}
  };

  var programName = req.params.name;
  var programCompleted = req.params.completed;

  db.program.find({name: programName}, function (err, programs) {
    programs[0].completed = programCompleted;
    programs[0].save();
    db.program.find({}, function(err, programs) {
      res.render('index', {trainingPrograms: programs});
    });
  });
});


module.exports = router;