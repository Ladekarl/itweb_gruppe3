var db = require('../models/db');
var mongoose = require('mongoose');

module.exports.exerciseReadById = function (req, res) {
  db.exercise
    .findById((req.params._id))
    .exec(function (err, exercise) {
      if (!exercise) {
        sendJsonResponse(res, 404, {"message": "exercise not found"});
        return;
      } else if (err) {
        sendJsonResponse(res, 500, err);
        return;
      }
      sendJsonResponse(res, 200, exercise);
    });
};

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

module.exports.removeByName = function (req, res) {
  db.exercise
    .remove({name: req.params.name})
    .exec(function (err) {
      if (err) {
        sendJsonResponse(res, 500, err);
        return;
      }
      sendJsonResponse(res, 204, {});
    });
};

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};