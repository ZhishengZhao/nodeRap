var express = require('express');
var router = express.Router();

var jsonRecordsController = require('../controller/jsonrecord.js');
var interfaceController = require('../controller/interface.js');

router.post('/addJsonRecord', jsonRecordsController.addRecord);
router.post('/getJsonRecordByPid', jsonRecordsController.getByPid);


// router.post('/mock/:projectId/*', interfaceController.getInterId);

router.get('/mock/projectId/11', function(req, res, next) {
    console.log(req)
});

router.post('/mock/projectId/11', function(req, res, next) {
    console.log(req)
});


module.exports = router;