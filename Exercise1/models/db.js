var mongoose = require('mongoose');

var dbURI = 'mongodb://user:Password1@ds021036.mlab.com:21036/heroku_fxpd37fr';
mongoose.connect(dbURI);