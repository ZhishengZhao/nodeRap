var express = require('express');
var router = express.Router();

var projectController = require('../controller/project.js');
var rapProject = require('../models/rapProject');

router.post('/add', projectController.addPorject);
// router.post('/getAll', projectController.getAllProjects);
router.post('/getAll', function(req, res, next) {
    // res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    // res.setHeader('Access-Control-Allow-Credentials', true);
    rapProject.getAll().then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});

module.exports = router;
