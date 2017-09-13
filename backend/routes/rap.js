var express = require('express');
var url = require('url');

var router = express.Router();

var interfaceController = require('../controller/interface.js');
var recordsController = require('../controller/records.js');
var jsonRecordsController = require('../controller/jsonrecord.js');
var userController = require('../controller/user.js');
var projectController = require('../controller/project.js');

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

/* Project */
router.post('/add', projectController.addPorject);
router.post('/getAll', projectController.getAllProjects);


router.get('/mock/:projectId/*', jsonRecordsController.responseData);
router.post('/mock/:projectId/*', jsonRecordsController.responseData);
// router.get('/mock/:projectId/*', function(req, res, next) {
//     var querys = url.parse(req.url, true).query;
//     console.log(req.url, querys, req.params.projectId);
//     var path = '/' + req.url.substring(0, req.url.indexOf('?')).split('/').splice(3).join('/')
//     jsonRecordsController.responseData(req.params.projectId, path);
//     // req.url.substring(0, req.url.indexOf('?'))
// });

router.post('/mock/projectId/11', function(req, res, next) {
    console.log(req);
});

module.exports = router;