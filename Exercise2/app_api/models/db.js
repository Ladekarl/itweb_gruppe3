var mongoose = require('mongoose');
var readLine = require("readline");

if (process.platform === "win32") {
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

var dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var exerciseSchema = mongoose.Schema({
  name: String,
  description: String,
  setCount: Number,
  time: String
});

var Exercise = mongoose.model("Exercise", exerciseSchema);

var programSchema = mongoose.Schema({
  name: String,
  completed: {type: Boolean, default: false},
  exerciseList: {
    type: [exerciseSchema]
  }
});

var Program = mongoose.model("Program", programSchema);

var accountSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

var Account = mongoose.model("Account", accountSchema);

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

module.exports = {
  exercise: Exercise,
  program: Program,
  account: Account
};