var rapProject = require('../models/rapProject');

module.exports = {
    addPorject: function(req, res, next) {
        crossOrigin(res);
        var params = req.fields;
        console.log('--------------', params)
        rapProject.create(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getAllProjects: function(req, res, next) {
        crossOrigin(res);
        rapProject.getAll().then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    }
};

function crossOrigin(res) {
    res.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Credentials', true);
}


