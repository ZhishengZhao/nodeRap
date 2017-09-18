var rapProject = require('../models/rapProject');

module.exports = {
    addPorject: function(req, res, next) {
        // if (!req.session.user._id) {
        //     res.send({
        //         result: result,
        //         desc: '用户未登录',
        //         success: false
        //     });
        // } else {
        var params = {
            name: req.fields.name,
            desc: req.fields.desc,
            author: 'req.session.user._id'
        };

        rapProject.create(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
        // }
    },
    getAllProjects: function(req, res, next) {
        // console.log(req.session)
        // if (!req.session.user._id) {
        //     res.send({
        //         result: result,
        //         desc: '用户未登录',
        //         success: false
        //     });
        // } else {
        // var userID = req.session.user._id;
        rapProject.getAll('userID').then(function(result) {
            res.send({
                result: result,
                success: true
            });
            return next();
        }).catch(next);
        // }
    },
    updateProjectById: function(req, res, next) {
        var params = {
            name: req.fields.name,
            desc: req.fields.desc,
            _id: req.fields._id
        };
        rapProject.update(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    deleteById: function(req, res, next) {
        console.log(req.query);
        var projectId = req.query._id;

        rapProject.deleteByID(projectId).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
};