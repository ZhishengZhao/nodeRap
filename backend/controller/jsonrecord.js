var rapJsonRecord = require('../models/rapJsonRecord');
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

            res.send(data);
        }).catch(next);
    },
    updateRecord: function(req, res, next) {
        var params = {
            content: req.fields.content,
            _id: req.fields._id
        };
        rapJsonRecord.update(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    }
};