var express = require('express');
var router = express.Router();

var interfaceController = require('../controller/interface.js');
var recordsController = require('../controller/records.js');

router.post('/paramsSave', recordsController.addRecords);
router.post('/getIterParamsByIterId', recordsController.getRecordsByInterID);
router.post('/getInterfaceList', interfaceController.getAll);
router.post('/addInterface', interfaceController.addInterface);
router.post('/deleteInterface', interfaceController.deleteInterface);

module.exports = router;
