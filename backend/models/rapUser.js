var User = require('../lib/mongo').User;

module.exports = {
    create: function create(user) {
        return User.create(user).exec();
    },
    getUserByName: function getUserByName(name) {
        return User.find({
            name: name
        }).exec();
    },
    getUserById: function getUserById(uid) {
        return User.find({
            _id: uid
        }).exec();
    },
    getUserPwdByEmail: function getUserPwdByEmail(emailAddress) {
        return User.find({
            email: emailAddress
        }).exec();
    },
    resetPwd: function resetPwd(token, pwd) {
        return User.update({
            _id: token
        }, {$set: {
            password: pwd
        }}).exec();
    }
};