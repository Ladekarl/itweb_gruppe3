var mongoose = require('mongoose');
var db = require('../models/db');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.trainingProgramsByUser = function (req, res) {
  db.program.find({})
    .exec(function (err, trainingPrograms) {
      if (err) {
        sendJsonResponse(res, 500, err);
      } else {
        sendJsonResponse(res, 200, trainingPrograms);
      }
    });
};

module.exports.postTrainingProgramsByUser = function (req, res) {
  var program = new db.program;
  program.name = req.params.name;
  program.save(function (err) {
    if (err) {
      sendJsonResponse(res, 500, err);
    } else {
      sendJsonResponse(res, 201);
    }
  });
};

module.exports.deleteTrainingProgramsByUser = function (req, res) {
    db.program.findByIdAndRemove(req.params._id, function (err) {
        if (err) {
            sendJsonResponse(res, 500, err);
        } else {
            sendJsonResponse(res, 201);
        }
    });
};

module.exports.updateTrainingProgramsByUser = function (req, res) {
    db.program.findById(req.params._id, function (err, trainingProgram) {
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

module.exports.patchTrainingProgramsByUser = function (req, res) {
  var reqParams = req.body;
  var id = req.params.id;

  db.program.findById(id).exec(function(error, program) {
    for (var paramName in reqParams) {
      if (reqParams.hasOwnProperty(paramName)) {
        if (reqParams[paramName] !== undefined) {
          program[paramName] = reqParams[paramName];
        }
      }
    }
    program.save(function (err) {
      if (err) {
        sendJsonResponse(res, 500, err);
      } else {
        sendJsonResponse(res, 200);
      }
    });
  });
};