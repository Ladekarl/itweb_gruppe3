var express = require('express');
var db = require('../models/db');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  db.program.find({}, function (err, programs) {
    res.render('index', {trainingPrograms: programs});
  });
});

module.exports = router;
