var rapUserProject = require('../models/rapUserProject');
var rapProject = require('../models/rapProject');

module.exports = {
    joinProject: function(req, res, next) {
        var userID = req.session.user._id,
            projectID = req.body.projectId;

        rapUserProject.addRelation(userID, projectID).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    getMyJoin: function(req, res, next) {
        var userID = req.session.user._id,
            projectArr = [];

        console.log('userID', userID);

        rapUserProject.getJoin(userID).then(function(result) {
            console.log('projectArr', projectArr)
            result.forEach(function(item, index) {
                console.log('arr', item.result instanceof Array, item)
                // projectArr.concat(item.result);
                projectArr.push(item.result[0]);
                console.log('projectArr.conc', projectArr)
                // rapProject.getById(proID).then(function(result) {
                //     projectArr.push(result);
                // });
            });
            console.log('send', projectArr)
            res.send({
                result: projectArr,
                success: true
            });
        }).catch(next);
    }
};