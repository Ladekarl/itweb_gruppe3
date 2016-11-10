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