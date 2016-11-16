var express = require('express');
var router = express.Router();
var ctrlTrainingPrograms = require('../controllers/trainingPrograms');
var ctrlAccount = require('../controllers/account');

var ctrlExercises = require('../controllers/exercises');

// Training program routes
router.get('/trainingPrograms', ctrlTrainingPrograms.trainingProgramsByUser);
router.post('/trainingPrograms/:name', ctrlTrainingPrograms.postTrainingProgramsByUser);
router.put('/trainingPrograms/:id', ctrlTrainingPrograms.updateTrainingProgramsByUser);
router.delete('/trainingPrograms/:id', ctrlTrainingPrograms.deleteTrainingProgramsByUser);
router.patch('/trainingPrograms/:id', ctrlTrainingPrograms.patchTrainingProgramsByUser);

// Exercise routes
router.get('/trainingPrograms/:id/exercises', ctrlExercises.getExercisesByProgram);
router.post('/trainingPrograms/:id/exercises', ctrlExercises.postExercise);
router.delete('/trainingPrograms/:id/exercises/:exerciseId', ctrlExercises.deleteExerciseById);
router.patch('/trainingPrograms/:id/exercises/:exerciseId', ctrlExercises.updateExerciseById);


// Login routes
router.post('/login', ctrlAccount.postLogin);


module.exports = router;
