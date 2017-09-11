var express = require('express');
var router = express.Router();

var interfaceController = require('../controller/interface.js');
var recordsController = require('../controller/records.js');
var jsonRecordsController = require('../controller/jsonrecord.js');
var userController = require('../controller/user.js');

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

/* User */
router.get('/isLogin', userController.isLogin);
router.post('/login', userController.login);
router.post('/registe', userController.registe);

router.get('/mock/projectId/11', function(req, res, next) {
    console.log(req);
});

router.post('/mock/projectId/11', function(req, res, next) {
    console.log(req);
});


module.exports = router;