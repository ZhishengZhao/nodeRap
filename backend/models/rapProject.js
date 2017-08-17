var Project = require('../lib/mongo').Project;

module.exports = {
    create: function create(records) {
        return Project.create(records).exec();
    },
    getAll: function getAll(records) {
        return Project.find().exec();
    }
};
