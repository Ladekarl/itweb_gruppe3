var express = require('express');
var router = express.Router();
var ctrlTrainingPrograms = require('../controllers/trainingPrograms');

router.get('/trainingPrograms', ctrlTrainingPrograms.trainingProgramsByUser);
router.post('/trainingPrograms/:name', ctrlTrainingPrograms.postTrainingProgramsByUser);
router.put('/trainingPrograms/:id', ctrlTrainingPrograms.updateTrainingProgramsByUser);
router.delete('/trainingPrograms/:id', ctrlTrainingPrograms.deleteTrainingProgramsByUser);
router.patch('/trainingPrograms/:id', ctrlTrainingPrograms.patchTrainingProgramsByUser);

module.exports = router;
