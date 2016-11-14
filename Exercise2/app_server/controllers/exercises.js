var db = require("../../app_api/models/db.js");
var request = require('request');

module.exports.getExercisesView = function (req, res) {
  var requestOptions = {
    url: "http://localhost:3000/api/trainingPrograms/" + req.params.id + "/exercises",
    method: "GET",
    json: {}
  };

  request(requestOptions, function (err, response, body) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      var program = body;
      if (!program.exerciseList) {
        program.exerciseList = [];
      }
      res.render('exercises', program);
    } else {
      console.log(response.statusCode);
    }
  });
};

module.exports.getNewExerciseView = function (req, res) {
  db.program.findById(req.params.id, function (err, program) {
    res.render('newExercise', program);
  });
};

module.exports.postExerciseByName = function (req, res) {
  var requestOptions = {
    url: "http://localhost:3000/api/trainingPrograms/" + req.params.id + "/exercises",
    json: {name: req.body.name, description: req.body.description, setCount: req.body.setCount, time: req.body.time},
    method: "POST"
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 201) {
      res.redirect('/' + req.params.id + '/exercises');
    } else {
      console.log(response.statusCode);
    }
  });
};