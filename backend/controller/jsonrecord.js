var rapJsonRecord = require('../models/rapJsonRecord');
var rapInterface = require('../models/rapInterface');
var JsonRecord = require('../lib/mongo').JsonRecord;
var ObjectID = require('mongodb').ObjectID;
var url = require('url');
var Mock = require('mockjs')

module.exports = {
    addRecord: function(req, res, next) {
        var params = {
            content: req.fields.content,
            pid: req.fields.pid
        };
        rapJsonRecord.create(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getByPid: function(req, res, next) {
        var pid = req.fields.pid

        rapJsonRecord.getByPid(pid).then(function(result) {
            // res.send(JSON.parse(result));
            res.send(result);
        }).catch(next);
    },
    getFinalByPid: function(req, res, next) {
        var pid = req.fields.pid

        rapJsonRecord.getByPid(pid).then(function(result) {
            var data = {}

            if (result.length) {
                result = JSON.parse(result[0].content)

                // 利用mockjs语法生成随机结果
                data = Mock.mock(result)
            }

            res.send(result);
        }).catch(next);
    },
    updateRecord: function(req, res, next) {
        var params = {
            content: req.fields.content,
            _id: new ObjectID(req.fields._id),
            pid: req.fields.pid
        };
        console.log('==========', params);
        JsonRecord.remove({ pid: req.fields.pid }).then(function(result) {
            var params = {
                content: req.fields.content,
                pid: req.fields.pid
            };
            rapJsonRecord.create(params).then(function(result) {
                res.send({
                    result: result,
                    success: true
                });
            }).catch(next);
        }).catch(next);
        // rapJsonRecord.update(params).then(function(result) {
        //     // console.log('11111111111==========', result);
        //     res.send({
        //         result: result,
        //         success: true
        //     });
        // }).catch(next);
    },
    // responseData: function(projectId, reqPath) {
    responseData: function(req, res, next) {
        // var querys = url.parse(req.url, true).query;
        // console.log(req.url, querys, req.params.projectId);
        var tempIndex = req.url.indexOf('?') == -1 ? req.url.length : req.url.indexOf('?')
        var reqPath = '/' + req.url.substring(0, tempIndex).split('/').splice(3).join('/')

        rapInterface.getByPidAndPath(req.params.projectId, reqPath).then(function(result) {
            if (result.length) {
                rapJsonRecord.getByPid(result[0]._id).then(function(result) {
                    var data = {}

                    if (result.length) {
                        result = JSON.parse(result[0].content)

                        // 利用mockjs语法生成随机结果
                        data = Mock.mock(result)
                    }

                    // console.log('result[0]._id', result);
                    // res.send(JSON.parse(result[0].content));
                    res.send(data);
                }).catch(next);
            } else {
                res.send({});
            }
        }).catch(next);
    }
};