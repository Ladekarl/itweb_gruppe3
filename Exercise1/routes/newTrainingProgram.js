var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('newTrainingProgram', {});
});

router.post('/', function(req, res) {
  var program = new db.program;
  program.name = req.body.name;
  program.save();
  res.render('exercises');
});

module.exports = router;