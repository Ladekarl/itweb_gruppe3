var request = require('request');

var requestOptions = {
  url: "http://localhost:3000/api/trainingPrograms",
  method: "GET",
  json: {}
};

module.exports.getIndex = function (req, res) {
  request(requestOptions, function (err, response, body) {
    if (err) {
      console.log(err);
      res.render('index', {trainingPrograms: []});
    } else if (response.statusCode === 200) {
      res.render('index', {trainingPrograms: body});
    } else {
      res.render('index', {trainingPrograms: []});
      console.log(response.statusCode);
    }
    console.log(res.locals.options);
  });
};
