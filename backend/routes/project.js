var express = require('express');
var router = express.Router();

var projectController = require('../logic/project.js');

router.post('/add', projectController.addPorject);
router.post('/getAll', projectController.getAllProjects);

module.exports = router;
