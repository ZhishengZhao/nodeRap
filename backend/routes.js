var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

var interfaceController = require('./controller/interface.js');
var recordsController = require('./controller/records.js');
var jsonRecordsController = require('./controller/jsonrecord.js');
var userController = require('./controller/user.js');
var projectController = require('./controller/project.js');

/* Interface */
router.post('/getInterfaceList', interfaceController.getAll);
router.post('/getInterfaceListByProjectID', interfaceController.getRecordsByPID);
router.post('/addInterface', interfaceController.addInterface);
router.post('/updateInterface', interfaceController.updateInterface);
router.get('/deleteInterface', interfaceController.deleteInterface);

/* jsonRecords */
router.post('/addJsonRecord', jsonRecordsController.addRecord);
router.post('/updateJsonRecord', jsonRecordsController.updateRecord);
router.post('/getJsonRecordByPid', jsonRecordsController.getByPid);
router.post('/getFinalJRByPid', jsonRecordsController.getFinalByPid);

/* old records */
router.post('/paramsSave', recordsController.addRecords);
router.post('/getIterParamsByIterId', recordsController.getRecordsByInterID);

/* User */
router.get('/isLogin', userController.isLogin);
router.post('/login', userController.login);
router.post('/registe', userController.registe);

/* Project */
router.post('/add', projectController.addPorject);
router.get('/getAll', projectController.getAllProjects);  
// router.post('/getAll', function(req, res, next) {
//     console.log(req.fields);
//     console.log('req.body', req.body);
// }); 
router.post('/updateProjectById', projectController.updateProjectById);
router.get('/deleteProjectById', projectController.deleteById); 

/* Mock */
router.get('/mock/:projectId/*', jsonRecordsController.responseData);
router.post('/mock/:projectId/*', jsonRecordsController.responseData);

/* Example */
router.post('/mock/projectId/11', function(req, res, next) {
    console.log(req);
});

module.exports = router;