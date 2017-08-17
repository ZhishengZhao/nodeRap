var rapProject = require('../models/rapProject');

module.exports = {
    addPorject: function(req, res, next) {
        var params = req.fields;
        rapProject.create(params).then(function(result) {
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
        }).catch(next);
    }
};
