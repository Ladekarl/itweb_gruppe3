var express = require('express');
var router = express.Router();
var ctrlTrainingPrograms = require('../controllers/trainingPrograms');

router.get('/trainingPrograms', ctrlTrainingPrograms.trainingProgramsByUser);

module.exports = router;
