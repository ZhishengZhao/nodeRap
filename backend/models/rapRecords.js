var RapRecords = require('../lib/mongo').RapRecords;

module.exports = {
    create: function create(records) {
        return RapRecords.create(records).exec();
    },
    getRecords: function getRecords(postId) {
        return RapRecords.find({}).exec();
    },
    getRecordsByIterId: function getRecordsByIterId(iterId) {
        return RapRecords.find({
            recordId: iterId
        }).exec();
    },
    deleteRecordsByIterId: function deleteRecordsByIterId(recordId) {
        return RapRecords.remove({
            recordId: recordId
        }).exec();
    }
};