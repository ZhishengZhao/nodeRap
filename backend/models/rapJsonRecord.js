var JsonRecord = require('../lib/mongo').JsonRecord;

module.exports = {
    create: function create(records) {
        return JsonRecord.create(records).exec();
    },
    getAll: function getAll(records) {
        return JsonRecord.find().exec();
    },
    getByPid: function getByPid(pid) {
        return JsonRecord.find({
            pid: '' + pid + ''
        }).exec();
    },
    update: function update(params) {
        return JsonRecord.update({
            _id: params._id
        }, { $set: { content: params.content } }).exec();
    }
};