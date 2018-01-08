var rapProject = require('../models/rapProject');
// var upController = require('../models/rapUserProject');
var upController = require('./userproject');
var rapUserProject = require('../models/rapUserProject');
var rapUser = require('../models/rapUser');

module.exports = {
    addPorject: function(req, res, next) {
        var params = {
            name: req.body.name,
            desc: req.body.desc,
            author: req.session.user._id
            },
            partyArr = JSON.parse(req.body.partyArr || '[]');

        rapProject.create(params).then(function(result) {
            var projectID = result.ops[0]._id + '';
            
            partyArr.forEach(function(item, index) {
                rapUser.getUserByName(item).then(function(result) {
                    rapUserProject.addRelation((result[0]._id + ''), projectID);
                });
            });
            
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getAllProjects: function(req, res, next) {
        rapProject.getAll().then(function(result) {
            res.send({
                result: result,
                success: true
            });
            return next();
        }).catch(next);
    },
    updateProjectById: function(req, res, next) {
        var params = {
            name: req.body.name,
            desc: req.body.desc,
            _id: req.body._id
        },
        isPartyChanged = req.body.isPartyChanged || false,
        partyArr = (req.body.partyArr && JSON.parse(req.body.partyArr)) || [];
        // console.log('partyArr', partyArr);

        rapProject.update(params).then(function(result) {
            if (isPartyChanged && partyArr.length) {
                partyArr.forEach(function(item, index) {
                    rapUser.getUserByName(item).then(function(result) {
                        if (result && result.length) {
                            rapUserProject.findRecord(result[0]._id, params._id).then(function(data) {
                                if (!data.length) {
                                    rapUserProject.addRelation((result[0]._id + ''), params._id);
                                }
                            });
                        }
                    });
                });
            }
            
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    deleteById: function(req, res, next) {
        var projectId = req.query._id;

        rapProject.deleteByID(projectId).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getMine: function(req, res, next) {
        var uid = req.session.user._id;

        rapProject.getInclude(uid).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getOther: function(req, res, next) {
        var uid = req.session.user._id;

        rapProject.getExclude(uid).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    goEdit: function(req, res, next) {
        var pid = req.body.pid,
            uid = req.session.user._id,
            type = req.body.type;

        rapProject.getById(pid).then(function(result) {
            if (result.length) {
                if (result[0].locked) {
                    if (type == 'doComplete' && uid == result[0].lockby) {
                        rapProject.lockById(pid, 'unlock').then(function(result) {
                            res.send({
                                success: true,
                                desc: '项目已解锁',
                                result: result
                            });
                        }).catch(next);
                    }

                    if (type == 'isSelfLocked') {
                        if (uid == result[0].lockby) {
                            res.send({
                                success: true,
                                desc: '该项目目前正被您锁定中，是否进入编辑状态？'
                            });
                        } else {
                            res.send({
                                success: false,
                                desc: '项目状态正常'
                            });
                        }

                        return;
                    }

                    if (type == 'doEdit') {
                        rapUser.getUserById(result[0].lockby).then(function(result) {
                            var name = result[0].name || 'XXX';
                            res.send({
                                success: false,
                                desc: '项目目前正被' + name + '锁定'
                            });
                        });
                    }
                } else {
                    if (type == 'isSelfLocked') {
                        res.send({
                            success: false,
                            desc: '项目状态正常'
                        });
                    } else if (type == 'doEdit') {
                        rapProject.lockById(pid, 'lock', uid).then(function(result) {
                            res.send({
                                success: true,
                                desc: '项目已进入锁定状态',
                                result: result
                            });
                        }).catch(next);
                    }
                }
            } else {
                res.send({
                    result: {},
                    desc: '数据异常，请退出重试',
                    success: false
                });
            }
        }).catch(next);
    }
};