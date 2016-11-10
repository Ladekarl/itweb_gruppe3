var request = require('request');

module.exports.getNewTrainingProgramView = function (req, res) {
  res.render('newTrainingProgram', {});
};

module.exports.postNewTrainingProgram = function (req, res) {
  var requestOptions = {
    url: "http://localhost:3000/api/trainingPrograms/" + req.body.name,
    method: "POST",
    json: {}
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 201) {
      res.redirect("/");
    } else {
      console.log(response.statusCode);
    }
  });
};

module.exports.updateTrainingProgramCompleted = function (req, res) {
  var programId = req.params.id;
  var programCompleted = req.params.completed;

  var requestOptions = {
    url: "http://localhost:3000/api/trainingPrograms/" + programId,
    method: "PATCH",
    json: {completed: programCompleted}
  };

  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.redirect("/");
    } else {
      console.log(response.statusCode);
    }
  });
};