var db = require('../models/db');
var mongoose = require('mongoose');

module.exports.exerciseReadById = function (req,res) {
  db.exercise
    .findById((req.params._id))
    .exec(function (err, exercise) {
      if (!exercise) {
        sendJsonResponse(res, 404, {"message": "exercise not found"});
        return;
      }else if(err){
        sendJsonResponse(res,500,err);
        return;
      }
      sendJsonResponse(res,200,exercise);
    });
};

module.exports.exerciseReadByProgram = function (req,res) {
  db.exercise
    .findById((req.params.program))
    .exec(function (err, exercise) {
      if (!exercise) {
        sendJsonResponse(res, 404, {"message": "exercise not found"});
        return;
      }else if(err){
        sendJsonResponse(res,500,err);
        return;
      }
      sendJsonResponse(res,200,exercise);
    });
};

module.exports.exerciseReadAll = function (req,res) {
  db.exercise
    .find({})
    .exec(function (err,exercise){
      if (!exercise) {
        sendJsonResponse(res, 404, {"message": "exercises not found"});
        return;
      }else if(err){
        sendJsonResponse(res,500,err);
        return;
      }else
      sendJsonResponse(res,200,exercise);
  });

};
module.exports.removeByName= function (req,res) {
  db.exercise
    .remove({name:req.params.name})
    .exec(function (err) {
      if (err){
        sendJsonResponse(res,500,err);
        return;
      }
      sendJsonResponse(res,204,{});
    })
}



var sendJsonResponse = function(res,status,content){
  res.status(status);
  res.json(content);
};