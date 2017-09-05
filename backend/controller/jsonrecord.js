var rapJsonRecord = require('../models/rapJsonRecord');

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
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    }
};