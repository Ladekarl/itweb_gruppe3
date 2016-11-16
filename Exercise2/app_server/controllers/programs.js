var request = require('request');

module.exports.getNewTrainingProgramView = function (req, res) {
  res.render('newTrainingProgram', {});
};

module.exports.postNewTrainingProgram = function (req, res) {
  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + req.body.name,
    method: "POST",
    json: {},
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };

  request(requestOptions, function (err, response) {
    if (err) {
      res.render('newTrainingProgram');
      console.log(err);
    } else if (response.statusCode === 201) {
      res.redirect("/");
    } else {
      res.render('newTrainingProgram');
      console.log(response.statusCode);
    }
  });
};

module.exports.updateTrainingProgramCompleted = function (req, res) {
  var programId = req.params.id;
  var programCompleted = req.params.completed;

  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + programId,
    method: "PATCH",
    json: {completed: programCompleted},
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };

  request(requestOptions, function (err, response) {
    if (err) {
      res.render('exercises');
      console.log(err);
    } else if (response.statusCode === 200) {
      res.redirect("/");
    } else {
      res.render('exercises');
      console.log(response.statusCode);
    }
  });
};