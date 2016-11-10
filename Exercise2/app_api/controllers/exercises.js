var db = require('../models/db');
var mongoose = require('mongoose');

module.exports.exerciseReadByName = function (req,res) {
  db.exercise
    .find({name: req.params.name})
    .exec(function (err, exercise) {
      if (!exercise) {
        sendJsonResponse(res, 404, {"message": "exercise not found"});
      }else if(err){
        sendJsonResponse(res,500,err);
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