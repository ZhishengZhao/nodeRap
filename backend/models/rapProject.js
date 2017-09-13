var Project = require('../lib/mongo').Project;

module.exports = {
    create: function create(records) {
        return Project.create(records).exec();
    },
    getAll: function getAll(userId) {
        // return Project.find({
        //     author: userId
        // }).exec();
        return Project.find().exec();
    }
};