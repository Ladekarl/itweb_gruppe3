var express = require('express');
var router = express.Router();
var ctrlTrainingPrograms = require('../controllers/trainingPrograms');
var ctrlExercises = require('../controllers/exercises');
router.get('/trainingPrograms', ctrlTrainingPrograms.trainingProgramsByUser);
router.get('/exercises/:name',ctrlExercises.exerciseReadAll);
router.post('/trainingPrograms/:name', ctrlTrainingPrograms.postTrainingProgramsByUser);

router.patch('/trainingPrograms/:id', ctrlTrainingPrograms.patchTrainingProgramsByUser);

module.exports = router;
