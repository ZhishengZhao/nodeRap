var Interface = require('../lib/mongo').Interface;

module.exports = {
    addInterface: function addInterface(interface) {
        return Interface.create(interface).exec();
    },
    getList: function getList(postId) {
        return Interface.find({}).exec();
    }
};