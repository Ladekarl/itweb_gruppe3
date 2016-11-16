var db = require('../models/db');

module.exports.getExercisesByProgram = function (req, res) {
  db.program
    .findById((req.params.id))
    .exec(function (err, program) {
      if (!program) {
        sendJsonResponse(res, 404, {"message": "message not found"});
        return;
      } else if (err) {
        sendJsonResponse(res, 500, err);
        return;
      }
      sendJsonResponse(res, 200, program);
    });
};

module.exports.postExercise = function (req, res) {
  db.program.findById(req.params.id, function (err, program) {
    if (err) {
      sendJsonResponse(res, 500, err);
    } else {
      var exercise = new db.exercise;
      exercise.name = req.body.name;
      exercise.description = req.body.description;
      exercise.setCount = req.body.setCount;
      exercise.time = req.body.time;
      program.exerciseList.push(exercise);
      program.save(function (err) {
        if (err) {
          sendJsonResponse(res, 500, err);
        } else {
          sendJsonResponse(res, 201);
        }
      });
    }
  });
};

module.exports.updateExerciseById = function (req, res) {
  db.program.find(exerciseList, function (err, trainingProgram) {
    if (err) {
      sendJsonResponse(res, 500, err);
    } else {
      trainingProgram.name = req.body.name;
      trainingProgram.completed = req.body.completed;

      trainingProgram.save(function (err) {
        if (err) {
          sendJsonResponse(res, 500, err);
        } else {
          sendJsonResponse(res, 200);
        }
      });
    }
  });
};

module.exports.deleteExerciseById = function (req, res) {
  db.exercise
    .findById(req.params.exerciseId)
    .remove()
    .exec(function (err) {
      if (err) {
        sendJsonResponse(res, 500, err);
      } else {
        sendJsonResponse(res, 204, {});
      }
    });
};

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};