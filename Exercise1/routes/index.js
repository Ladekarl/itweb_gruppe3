var express = require('express');
var db = require('../models/db');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  db.program.find({}, function (err, programs) {
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
