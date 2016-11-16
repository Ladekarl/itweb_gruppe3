module.exports = function (req, res, next) {
  var token = req.cookies.token;
  console.log(token);
  if(token) {
    req.headers['x-access-token'] = token
  }
  next(); // <-- important!
};