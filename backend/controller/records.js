var rapRecord = require('../models/rapRecords');

module.exports = {
    addRecords: function(req, res, next) {
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
    },
    getAllRecords: function(req, res, next) {
        rapRecord.getAll().then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getRecordsByInterID: function(req, res, next) {
        var iterId = req.fields.iterId,
            type = req.fields.type || 'normal';

        if (type !== 'normal') {
            rapRecord.getRecordsByIterId(iterId).then(function(result) {
                res.send({
                    result: result,
                    success: true
                });
            }).catch(next);
        } else {
            rapRecord.getRecordsByIterId(iterId).then(function(result) {
                res.send({
                    result: list2Json(result),
                    success: true
                });
            }).catch(next);
        }
    }
};

function list2Json(list) {
    var jsonObj = {};
    for (var i = list.length - 1; i >= 0; i--) {
        jsonObj[list[i].key] = handleValue(list[i]);
    }
    return jsonObj;
}

function handleValue(obj) {
    if (obj.valueType == 'string') {
        return obj.value;
    } else if (obj.valueType == 'number'){
        return parseInt(obj.value);
    } else if (obj.valueType == 'boolean'){
        return obj.value.indexOf('false') == -1;
    } else {
        return obj.value;
    }
}