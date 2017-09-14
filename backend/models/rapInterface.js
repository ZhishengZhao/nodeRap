var Interface = require('../lib/mongo').Interface;

module.exports = {
    create: function create(interface) {
        return Interface.create(interface).exec();
    },
    deleteByID: function deleteByID(iterID) {
        // console.log('> models-deleteByID-iterID:', iterID)
        return Interface.remove({
            _id: iterID
        }).exec();
    },
    getAll: function getAll(postId) {
        return Interface.find({}).exec();
    },
    getrByPID: function getrByPID(projectId) {
        return Interface.find({
            projectId: projectId
        }).exec();
    },
    getByPidAndPath: function getrByPID(projectId, reqPath) {
        return Interface.find({
            projectId: projectId,
            reqUrl: reqPath
        }).exec();
    }
};