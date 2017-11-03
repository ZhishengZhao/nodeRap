var Project = require('../lib/mongo').Project;

module.exports = {
    create: function create(records) {
        return Project.create(records).exec();
    },
    getAll: function getAll(userId) {
        return Project.find().exec();
    },
    update: function update(params) {
        return Project.update({
            _id: params._id
        }, { $set: { name: params.name, desc: params.desc } }).exec();
    },
    deleteByID: function deleteByID(id) {
        return Project.remove({
            _id: id
        }).exec();
    },
    getInclude: function getInclude(uid) {
        return Project.find({
            author: uid
        }).exec();
    },
    getExclude: function getInclude(uid) {
        return Project.find({
            author: {$ne:uid}
        }).exec();
    },
    getById: function getById(proid) {
        return Project.find({
            _id: proid
        }).exec();
    }
};