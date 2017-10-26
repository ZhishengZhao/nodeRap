var rapJsonRecord = require('../models/rapJsonRecord');
var rapInterface = require('../models/rapInterface');
var JsonRecord = require('../lib/mongo').JsonRecord;
var ObjectID = require('mongodb').ObjectID;
var url = require('url');
var Mock = require('mockjs');

module.exports = {
    addRecord: function(req, res, next) {
        var params = {
            content: req.body.content,
            pid: req.body.pid
        };
        rapJsonRecord.create(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getByPid: function(req, res, next) {
        var pid = req.body.pid;

        rapJsonRecord.getByPid(pid).then(function(result) {
            res.send(result);
        }).catch(next);
    },
    getFinalByPid: function(req, res, next) {
        var pid = req.body.pid;

        rapJsonRecord.getByPid(pid).then(function(result) {
            var data = {};

            if (result.length) {
                result = JSON.parse(result[0].content)

                // 利用mockjs语法生成随机结果
                data = Mock.mock(result);
            }

            res.send(result);
        }).catch(next);
    },
    updateRecord: function(req, res, next) {
        var params = {
            content: req.body.content,
            _id: new ObjectID(req.body._id),
            pid: req.body.pid
        };
        JsonRecord.remove({ pid: req.body.pid }).then(function(result) {
            var params = {
                content: req.body.content,
                pid: req.body.pid
            };
            rapJsonRecord.create(params).then(function(result) {
                res.send({
                    result: result,
                    success: true
                });
            }).catch(next);
        }).catch(next);
    },
    responseData: function(req, res, next) {
        var tempIndex = req.url.indexOf('?') == -1 ? req.url.length : req.url.indexOf('?');
        var reqPath = '/' + req.url.substring(0, tempIndex).split('/').splice(3).join('/');

        rapInterface.getByPidAndPath(req.params.projectId, reqPath).then(function(result) {
            if (result.length) {
                rapJsonRecord.getByPid(result[0]._id).then(function(result) {
                    var data = {};

                    if (result.length) {
                        result = JSON.parse(result[0].content);

                        // 利用mockjs语法生成随机结果
                        data = Mock.mock(result);
                    }

                    res.send(data);
                }).catch(next);
            } else {
                res.send({});
            }
        }).catch(next);
    }
};