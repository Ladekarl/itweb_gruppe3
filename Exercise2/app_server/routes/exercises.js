var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../../app_api/models/db.js");

var requestOptionsGet = {
  url : "http://localhost:3000/api/exercises",
  method : "GET",
  json : {}
};

router.get('/:name', function (req, res) {
  var options = requestOptionsGet;
  options.url += '/' + req.params.name;
  request(options, function (err, response, body) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.render('exercises', {exerciseList: body});
    } else {
      console.log(response.statusCode);
    }
  });
});

router.get('/new/:name', function (req, res) {
  var programName = req.params.name;
  console.log("Exercises.get programName: " + programName);
  db.program.find({name: programName}, function (err, programs) {
    res.render('newExercise', programs[0]);
  });
});

router.post('/new/:name', function (req, res) {
  var programName = req.params.name;
  db.program.find({name: programName}, function (err, programs) {
    exercise = req.body;
    programs[0].exerciseList.push(exercise);
    programs[0].save();
    res.render('exercises', programs[0]);
  });
});

module.exports = router;