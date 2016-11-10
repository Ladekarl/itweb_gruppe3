var express = require('express');
var db = require("../../app_api/models/db.js");
var router = express.Router();

router.get('/:name', function (req, res) {
  var programName = req.params.name;
  db.program.find({name: programName}, function (err, programs) {
    res.render('exercises', programs[0]);
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