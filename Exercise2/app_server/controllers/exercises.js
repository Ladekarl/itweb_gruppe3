var request = require('request');

module.exports.getExercisesView = function (req, res) {
  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + req.params.id + "/exercises",
    method: "GET",
    json: {},
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };
  request(requestOptions, function (err, response, body) {
    if (err) {
      res.render('exercises');
      console.log(err);
    } else if (response.statusCode === 200) {
      var program = body;
      if (!program.exerciseList) {
        program.exerciseList = [];
      }
      res.render('exercises', program);
    } else {
      res.render('exercises');
      console.log(response.statusCode);
    }
  });
};

module.exports.getNewExerciseView = function (req, res) {
  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + req.params.id + "/exercises",
    method: "GET",
    json: {},
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };
  request(requestOptions, function (err, response, body) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.render('newExercise', body);
    } else {
      console.log(response.statusCode);
    }
  });
  db.program.findById(req.params.id, function (err, program) {

  });
};

module.exports.getExerciseView = function(req,res) {
  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + req.params.id + "/exercises" ,
    method: "GET",
    json: {},
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };
  request(requestOptions, function (err, response, body) {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200) {
        var program = body;
        var exercise = program.exerciseList.filter(function(exercise){
          return (exercise._id == req.params.exerciseId);
        });
        var json = [{oldExercise: exercise[0],programId: program._id}];
        res.render('updateExercise', json[0]);
      } else {
        console.log(response.statusCode);
      }
    });
};

module.exports.updateExerciseById = function(req,res){
  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + req.params.id + "/exercises/" + req.params.exerciseId,
    json: {name: req.body.name, description: req.body.description, setCount: req.body.setCount, time: req.body.time},
    method: "PATCH",
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };
  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.redirect('/' + req.params.id + '/exercises');
    } else {
      console.log(response.statusCode);
    }
  });
};

module.exports.removeExerciseById = function (req,res) {
  var requestOptions = {
    url: process.env.BASE_URL + "/api/trainingPrograms/" + req.params.id + "/exercises/" + req.params.exerciseId,
    json: {},
    method: "DELETE",
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };
  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      res.redirect('/' + req.params.id + '/exercises');
    } else {
      console.log(response.statusCode);
    }
  });
};

module.exports.postExerciseByName = function (req, res) {
  var requestOptions = {
    url:process.env.BASE_URL + "/api/trainingPrograms/" + req.params.id + "/exercises",
    json: {name: req.body.name, description: req.body.description, setCount: req.body.setCount, time: req.body.time},
    method: "POST",
    headers: {
      'x-access-token': req.headers['x-access-token']
    }
  };
  request(requestOptions, function (err, response) {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 201) {
      res.redirect('/' + req.params.id + '/exercises');
    } else {
      res.render('exercises');
      console.log(response.statusCode);
    }
  });
};