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

module.exports = router;