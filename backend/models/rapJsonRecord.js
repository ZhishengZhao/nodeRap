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
            pid: pid
        }).exec();
    }
};