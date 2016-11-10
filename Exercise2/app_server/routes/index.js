var express = require('express');
var indexController = require("../controllers/index.js");
var exercisesController = require("../controllers/exercises");
var programsController = require("../controllers/programs");
var router = express.Router();

// index
router.get('/', indexController.getIndex);

// exercises
router.get('/:id/exercises', exercisesController.getExercisesView);
router.get('/:id/exercises/new', exercisesController.getNewExerciseView);
router.post('/:id/exercises/new', exercisesController.postExerciseByName);

// training programs
router.get('/trainingPrograms/new', programsController.getNewTrainingProgramView);
router.post('/trainingPrograms/new', programsController.postNewTrainingProgram);
router.get('/trainingPrograms/:id/:completed', programsController.updateTrainingProgramCompleted);


module.exports = router;
