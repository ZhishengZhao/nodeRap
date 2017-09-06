var express = require('express');
var router = express.Router();

var interfaceController = require('../controller/interface.js');
var recordsController = require('../controller/records.js');
var jsonRecordsController = require('../controller/jsonrecord.js');

router.post('/paramsSave', recordsController.addRecords);
router.post('/getIterParamsByIterId', recordsController.getRecordsByInterID);

router.post('/getInterfaceList', interfaceController.getAll);
router.post('/getInterfaceListByProjectID', interfaceController.getRecordsByPID);
router.post('/addInterface', interfaceController.addInterface);
router.get('/deleteInterface', interfaceController.deleteInterface);

router.post('/addJsonRecord', jsonRecordsController.addRecord);
router.post('/updateJsonRecord', jsonRecordsController.updateRecord);
router.post('/getJsonRecordByPid', jsonRecordsController.getByPid);
router.post('/getFinalJRByPid', jsonRecordsController.getFinalByPid);

router.get('/mock/projectId/11', function(req, res, next) {
    console.log(req)
});

router.post('/mock/projectId/11', function(req, res, next) {
    console.log(req)
});

module.exports = router;