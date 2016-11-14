var db = require("../../app_api/models/db.js");

var requestOptionsGet = {
  url : "http://localhost:3000/api/exercises",
  method : "GET",
  json : {}
};

module.exports.getExercisesView = function (req, res) {
  var options = requestOptionsGet;
  options.url += '/' + req.params.id;
  request(options, function (err, response, body) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.render('exercises', {exerciseList: body});
    } else {
      console.log(response.statusCode);
    }
  });
};

module.exports.getNewExerciseView = function (req, res) {
  var programName = req.params.id;
  console.log("Exercises.get programName: " + programName);
  db.program.find({name: programName}, function (err, programs) {
    res.render('newExercise', programs[0]);
  });
};

module.exports.postExerciseByName = function (req, res) {
  var id = req.params.id;
  db.program.findById(id, function (err, program) {
    exercise = req.body;
    program.exerciseList.push(exercise);
    program.save();
    res.render('exercises', program);
  });
};