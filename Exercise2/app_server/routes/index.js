var express = require('express');
var indexController = require("../controllers/index.js");
var exercisesController = require("../controllers/exercises");
var programsController = require("../controllers/programs");
var accountController = require("../controllers/account");
var router = express.Router();

// index
router.get('/', indexController.getIndex);

// exercises
router.get('/:id/exercises', exercisesController.getExercisesView);
router.get('/:id/exercises/new', exercisesController.getNewExerciseView);
router.post('/:id/exercises/new', exercisesController.postExerciseByName);
router.post('/:id/exercises/update/:exerciseId',exercisesController.updateExerciseById);
router.get('/:id/exercises/:exerciseId', exercisesController.getExerciseView);
router.get('/:id/exercises/:exerciseId/remove',exercisesController.removeExerciseById);

// training programs
router.get('/trainingPrograms/new', programsController.getNewTrainingProgramView);
router.post('/trainingPrograms/new', programsController.postNewTrainingProgram);
router.get('/trainingPrograms/:id/:completed', programsController.updateTrainingProgramCompleted);

// account
router.post('/login', accountController.postLogin);
router.get('/login', accountController.getLoginPage);

module.exports = router;
