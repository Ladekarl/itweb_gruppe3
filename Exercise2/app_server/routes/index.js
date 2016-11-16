var express = require('express');
var indexController = require("../controllers/index.js");
var exercisesController = require("../controllers/exercises");
var programsController = require("../controllers/programs");
var accountController = require("../controllers/account");
var router = express.Router();

// index
router.get('/', indexController.getIndex);

// account
router.get('/login', accountController.getLoginPage);
router.post('/login', accountController.postLogin);
router.get('/register', accountController.getRegisterPage);
router.post('/register', accountController.postRegister);
router.get('/logout', accountController.logout);

// exercises
router.get('/:id/exercises', exercisesController.getExercisesView);
router.get('/:id/exercises/new', exercisesController.getNewExerciseView);
router.post('/:id/exercises/new', exercisesController.postExerciseByName);

// training programs
router.get('/trainingPrograms/new', programsController.getNewTrainingProgramView);
router.post('/trainingPrograms/new', programsController.postNewTrainingProgram);
router.get('/trainingPrograms/:id/:completed', programsController.updateTrainingProgramCompleted);

module.exports = router;
