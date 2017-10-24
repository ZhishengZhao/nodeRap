var rapInterface = require('../models/rapInterface');
var rapJsonRecord = require('../models/rapJsonRecord');

module.exports = {
    addInterface: function(req, res, next) {
        var params = {
            name: req.fields.name,
            desc: req.fields.desc,
            reqType: req.fields.reqType || 'post',
            reqUrl: req.fields.reqUrl || '',
            projectId: req.fields.projectId,
            pid: req.fields.pid
        };
        rapInterface.create(params).then(function(result) {
            var pid = result.ops[0]._id + '';

            var params = {
                content: '{}',
                pid: pid
            };
            rapJsonRecord.create(params).then(function(result) {
                res.send({
                    result: result,
                    success: true
                });
            }).catch(next);
        }).catch(next);
    }, 
    updateInterface: function(req, res, next) {
        var params = {
            _id: req.fields.id,
            name: req.fields.name,
            desc: req.fields.desc,
            reqType: req.fields.reqType || 'post',
            reqUrl: req.fields.reqUrl || '',
            projectId: req.fields.projectId,
            pid: req.fields.pid
        };
        rapInterface.update(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    deleteInterface: function(req, res, next) {
        var iterId = req.query.iterId;
        rapInterface.deleteByID(iterId).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getAll: function(req, res, next) {
        rapInterface.getAll().then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getRecordsByPID: function(req, res, next) {
        var projectId = req.fields.pid;
        rapInterface.getrByPID(projectId).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getInterId: function(req, res, next) {
        var projectId = req.params.projectId;
        rapInterface.getrByPID(projectId).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    }
};