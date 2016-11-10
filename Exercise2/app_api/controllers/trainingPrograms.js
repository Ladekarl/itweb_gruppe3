var mongoose = require('mongoose');
var db = require('../models/db');

var sendJsonResponse = function(res, status, content) {
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
    program.save(function(err) {
        if (err) {
            sendJsonResponse(res, 500, err);
        } else {
            sendJsonResponse(res, 201);
        }
    });
};

module.exports.putTrainingProgramsByUser = function (req, res) {
    var program = req.body;
    db.program
        .findById(program._id)
        .exec(function(err, trainingProgram) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                trainingProgram = program;
                trainingProgram.save(function(err) {
                    if (err) {
                        sendJsonResponse(res, 500, err);
                    } else {
                        sendJsonResponse(res, 200);
                    }
                });
            }
        });
};