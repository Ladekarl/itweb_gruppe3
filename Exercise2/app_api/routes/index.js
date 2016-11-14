var express = require('express');
var router = express.Router();
var ctrlTrainingPrograms = require('../controllers/trainingPrograms');
var ctrlAccount = require('../controllers/account');

router.get('/trainingPrograms', ctrlTrainingPrograms.trainingProgramsByUser);
router.post('/trainingPrograms/:name', ctrlTrainingPrograms.postTrainingProgramsByUser);
router.patch('/trainingPrograms/:id', ctrlTrainingPrograms.patchTrainingProgramsByUser);
router.post('/login', ctrlAccount.postLogin);

module.exports = router;
