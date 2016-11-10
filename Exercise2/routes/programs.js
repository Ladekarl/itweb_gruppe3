var express = require('express');
var router = express.Router();
var db = require('../models/db');

router.get('/', function(req, res) {
  res.render('newTrainingProgram', {});
});

router.post('/', function(req, res) {
  var program = new db.program;
  program.name = req.body.name;
  program.save();
  db.program.find({}, function(err, programs) {
    programs.push(program);
    res.render('index', {trainingPrograms: programs});
  });
});

router.post('/:name/:completed', function (req, res) {
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