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
            partyArr = JSON.parse(req.body.partyArr);

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
        };
        rapProject.update(params).then(function(result) {
            if (req.body.isPartyChanged) {
                partyArr.forEach(function(item, index) {
                    rapUser.getUserByName(item).then(function(result) {
                        rapUserProject.addRelation((result[0]._id + ''), params._id);
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
    }
};