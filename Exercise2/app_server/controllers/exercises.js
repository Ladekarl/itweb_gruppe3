var db = require("../../app_api/models/db.js");

module.exports.getExercisesView = function (req, res) {
  var id = req.params.id;
  db.program.findById(id, function (err, program) {
    res.render('exercises', program);
  });
};

module.exports.getNewExerciseView = function (req, res) {
  var id = req.params.id;
  db.program.findById(id, function (err, program) {
    res.render('newExercise', program);
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