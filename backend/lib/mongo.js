var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.RapRecords = mongolass.model('RapRecords', {
    parasType: {type: 'string', enum: ['req', 'res']},
    recordId: {type: 'string'},
    key: {type: 'string'},
    value: {type: 'string'},
    valueType: {type: 'string', enum: ['int', 'string', 'object', 'boolean']},
    parentId: {type: 'string'},
    comments: {type: 'string'}
});

// exports.RapRecords.index({ _id: -1 }).exec(); 
// exports.RapRecords.index({unique: true}).exec();

exports.Interface = mongolass.model('Interface', {
    name: {type: 'string'},
    desc: {type: 'string'},
    reqType: {type: 'string'},
    reqUrl: {type: 'string'},
    resParamsId: {type: 'string'},
    reqParamsId: {type: 'string'}
});

// exports.Interface.index({ _id: -1 }).exec(); 