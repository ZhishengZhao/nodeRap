var express = require('express');
var router = express.Router();

var checkLogin = require('./middlewares/check.js').checkLogin;

var interfaceController = require('./controller/interface.js');
var recordsController = require('./controller/records.js');
var jsonRecordsController = require('./controller/jsonrecord.js');
var userController = require('./controller/user.js');
var projectController = require('./controller/project.js');
var userProjectController = require('./controller/userproject.js');
var commonController = require('./controller/common.js');

// router.post('/getInterfaceListByProjectID', function(req, res, next) {
//     console.log('params', req);
//     console.log('req.body', req.body);
// }); 

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
router.post('/ajaxImport', jsonRecordsController.ajaxImport);

/* old records */
router.post('/paramsSave', recordsController.addRecords);
router.post('/getIterParamsByIterId', recordsController.getRecordsByInterID);

/* User */
router.get('/isLogin', userController.isLogin);
router.post('/login', userController.login);
router.post('/registe', userController.registe);

/* Project */
router.post('/add', checkLogin, projectController.addPorject);
router.get('/getAll', projectController.getAllProjects);  
router.post('/updateProjectById', projectController.updateProjectById);
router.get('/deleteProjectById', projectController.deleteById); 
router.get('/getAllMine', checkLogin, projectController.getMine);

/* User Project Relation */
// router.get('/getAllOthers', commonController.getMyJoin);
router.get('/getMyJoins', checkLogin, userProjectController.getMyJoin);

/* Mock */
router.get('/mock/:projectId/*', jsonRecordsController.responseData);
router.post('/mock/:projectId/*', jsonRecordsController.responseData);

/* Common */
router.post('/sendEmail', commonController.sendEmail);

/* Example */
// router.post('/mock/projectId/11', function(req, res, next) {
//     console.log(req);
// });

module.exports = router;