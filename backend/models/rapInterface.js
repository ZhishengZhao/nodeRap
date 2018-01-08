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
    },
    update: function update(interface) {
        return Interface.update({
            _id: interface._id
        }, { $set: {
            name: interface.name,
            desc: interface.desc,
            reqType: interface.reqType,
            reqUrl: interface.reqUrl,
            pid: interface.pid
        } });
    }
};