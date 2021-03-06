var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.RapRecords = mongolass.model('RapRecords', {
    parasType: { type: 'string', enum: ['req', 'res'] },
    recordId: { type: 'string' },
    key: { type: 'string' },
    value: { type: 'string' },
    valueType: { type: 'string', enum: ['number', 'string', 'object', 'boolean'] },
    parentId: { type: 'string' },
    comments: { type: 'string' }
});

// exports.RapRecords.index({ _id: -1 }).exec(); 
// exports.RapRecords.index({unique: true}).exec();

exports.Interface = mongolass.model('Interface', {
    name: { type: 'string' },
    desc: { type: 'string' },
    reqType: { type: 'string' },
    reqUrl: { type: 'string' },
    resParamsId: { type: 'string' },
    reqParamsId: { type: 'string' },
    projectId: { type: 'string' },
    pid: { type: 'string' }
});

exports.Project = mongolass.model('Project', {
    name: { type: 'string' },
    desc: { type: 'string' },
    author: { type: 'string' },
    parties: { type: 'string' },
    locked: { type: 'boolean'},
    lockby: { type: 'string' }
});

exports.JsonRecord = mongolass.model('JsonRecord', {
    content: { type: 'string' },
    pid: { type: 'string' }
});

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});

exports.User.index({ name: 1 }, { unique: true }).exec();

exports.User_project = mongolass.model('User_project', {
    userID: { type: Mongolass.Types.ObjectId },
    projectID: { type: Mongolass.Types.ObjectId }
});

// exports.Interface.index({ _id: -1 }).exec();