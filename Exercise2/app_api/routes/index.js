var express = require('express');
var router = express.Router();
var ctrlTrainingPrograms = require('../controllers/trainingPrograms');
var ctrlAccount = require('../controllers/account');

var ctrlExercises = require('../controllers/exercises');
router.get('/trainingPrograms', ctrlTrainingPrograms.trainingProgramsByUser);
router.get('/exercises/:name',ctrlExercises.exerciseReadAll);
router.post('/trainingPrograms/:name', ctrlTrainingPrograms.postTrainingProgramsByUser);
router.put('/trainingPrograms/:id', ctrlTrainingPrograms.updateTrainingProgramsByUser);

router.delete('/trainingPrograms/:id', ctrlTrainingPrograms.deleteTrainingProgramsByUser);
router.patch('/trainingPrograms/:id', ctrlTrainingPrograms.patchTrainingProgramsByUser);
router.post('/login', ctrlAccount.postLogin);

module.exports = router;
