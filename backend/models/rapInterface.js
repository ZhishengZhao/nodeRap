var Interface = require('../lib/mongo').Interface;

module.exports = {
    addInterface: function addInterface(interface) {
        return Interface.create(interface).exec();
    },
    deleteInterface: function deleteInterface(iterID) {
        return Interface.remove({
            _id: iterID
        }).exec();
    },
    getList: function getList(postId) {
        return Interface.find({}).exec();
    }
};