module.exports = function (req, res, next) {
  const jwt = require('jsonwebtoken');

  // check header or url parameters or post parameters for token
  var token = req.header('x-access-token');
  console.log('API ' + token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }

};