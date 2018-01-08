var rapInterface = require('../models/rapInterface');
var rapJsonRecord = require('../models/rapJsonRecord');
var request = require('request');

module.exports = {
    addInterface: function(req, res, next) {
        var params = {
            name: req.body.name,
            desc: req.body.desc,
            reqType: req.body.reqType || 'post',
            reqUrl: req.body.reqUrl || '',
            projectId: req.body.projectId,
            pid: req.body.pid
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
            _id: req.body.id,
            name: req.body.name,
            desc: req.body.desc,
            reqType: req.body.reqType || 'post',
            reqUrl: req.body.reqUrl || '',
            projectId: req.body.projectId,
            pid: req.body.pid
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
        var projectId = req.body.pid;
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
    },
    directImport: function(req, res, next) {
        var params = {
            name: req.body.name,
            desc: req.body.desc,
            reqType: req.body.reqType || 'post',
            reqUrl: req.body.reqUrl || '',
            projectId: req.body.projectId,
            pid: req.body.pid
        };
        var requestUrl = params.reqUrl; // 前台默认加了个/，这里去掉
        params.reqUrl = params.reqUrl.split('//')[1].split('/').slice(1).join('/');

        rapInterface.create(params).then(function(result) {
            var pid = result.ops[0]._id + '';

            var params = {
                url: requestUrl,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json"
                }
            };

            try {
                request(params,function(error, response, body) {
                    var params = {
                        content: JSON.stringify(body) || {},
                        pid: pid
                    };

                    rapJsonRecord.create(params).then(function(result) {
                        res.send({
                            result: result,
                            success: true
                        });
                    }).catch(next);
                });
            } catch(e) {
                res.send({
                    result: e,
                    success: false
                });
            }
        }).catch(next);
    }
};