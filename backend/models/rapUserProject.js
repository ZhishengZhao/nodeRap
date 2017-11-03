var UserProject = require('../lib/mongo').User_project;
var userModle = require('./rapUser');
var User = require('../lib/mongo').User;
var toObjectId = require('mongodb').ObjectId;

module.exports = {
    addRelation: function addRelation(uid, proid) {
        return UserProject.create({
            userID: uid,
            projectID: proid
        }).exec();
    },
    getMine: function getMine(uid) {
        return UserProject.find({
            userID: uid
        }).exec();
    },
    getJoin: function getJoin(uid) {
        return UserProject.aggregate([{
            $lookup: {
                from: 'projects',
                localField: 'projectID',
                foreignField: '_id',
                as: 'result'
            }
        },
        { $match : { userID : toObjectId(uid) } },
        { $project : { 'result': 1, '_id': 0  } }
        ]);
    }
};