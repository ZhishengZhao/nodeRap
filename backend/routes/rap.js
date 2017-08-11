var express = require('express');
var router = express.Router();

var rapRecord = require('../models/rapRecords');
var rapInterface = require('../models/rapInterface');


router.get('/', function(req, res, next) {

});

router.post('/paramsSave', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.fields);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    var paramList = JSON.parse(req.fields.responseParams);

    rapRecord.deleteRecordsByIterId(req.fields.recordId).then();

    for (var i = paramList.length - 1; i >= 0; i--) {
        rapRecord.create({
            parasType: 'res',
            recordId: req.fields.recordId,
            key: paramList[i].key,
            value: paramList[i].value,
            valueType: paramList[i].type,
            parentId: '',
            comments: paramList[i].comments
        }).then(function(result) {
            if (i == 1) {
                res.send({
                    result: result,
                    success: true
                });
            }
        }).catch(next);
    }


    // rapRecord.create({
    //     parasType: req.fields.parasType,
    //     recordId: req.fields.recordId,
    //     key: req.fields.key,
    //     value: req.fields.value,
    //     valueType: req.fields.valueType,
    //     parentId: '',
    //     comments: req.fields.comments
    // }).then(function(result) {
    //     res.send({
    //         result: result,
    //         success: true
    //     });
    // }).catch(next);    
});

router.post('/edit', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.fields);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    // res.send({
    //     name: 'heioray'
    // });  

    rapRecord.getRecords().then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});
router.post('/getIterParamsByIterId', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    let iterId = req.fields.iterId

    rapRecord.getRecordsByIterId(iterId).then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});
router.get('/getIterParamsByIterId', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.query);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    let iterId = req.fields.iterId

    rapRecord.getRecordsByIterId(iterId).then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});
router.get('/getInterfaceList', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.fields);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    rapInterface.getList().then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});
router.post('/getInterfaceList', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.fields);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    rapInterface.getList().then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});

router.post('/addInterface', function(req, res, next) {
    // console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.fields);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    let inter = {
        name: req.fields['inter[name]'],
        desc: req.fields['inter[desc]'],
        reqType: req.fields['inter[reqType]'],
        reqUrl: req.fields['inter[reqUrl]'],
        resParamsId: req.fields['inter[resParamsId]'],
        reqParamsId: req.fields['inter[reqParamsId]']
    }

    rapInterface.addInterface(inter).then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});

router.post('/deleteInterface', function(req, res, next) {
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.fields.iterId);
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);

    rapInterface.deleteInterface(req.fields.iterId).then(function(result) {
        res.send({
            result: result,
            success: true
        });
    }).catch(next);
});

module.exports = router;