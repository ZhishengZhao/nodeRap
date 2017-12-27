var rapCommon = require('../models/rapCommon');
var rapUser = require('../models/rapUser');
var nodemailer = require('nodemailer');
var emailConfig = require('../../config/emailconfig.js');

module.exports = {
    sendEmailActive: function (req, res, next) {
        var to = req.body.email,
            subject = req.body.subject,
            mailTransport = nodemailer.createTransport(emailConfig);

        var options = {
            to: req.body.email,
            subject: '激活邮件',
            text: 'text',
            html: '<a href="' + resetUrl + '?type=active#/user_common">点击进入激活页面，10分钟内有效哦~~</a>'
        };
        
        mailTransport.sendMail(options, function(err, msg){
            if (err) {
                res.send({
                    desc: '邮件附送失败',
                    errInfo: err,
                    result: null,
                    success: false
                });
            } else {
                res.send({
                    success: true,
                    result:null
                });
            }
        });
    },
    sendEmailPwd: function (req, res, next) {
        var to = req.body.to,
            resetUrl = req.body.resetUrl;

        rapUser.getUserPwdByEmail(to).then(function(result) {
            if (result.length) {
                console.log('用户查询成功，即将发送邮件');
                var options = {
                    from: '1149412108@qq.com',
                    to: req.body.to,
                    subject: '密码找回',
                    text: 'node rap',
                    html: '<a href="' + resetUrl + '?type=reset&token=' + result[0].password + new Date().getTime() + '&alias=' + result[0].name.substr(1) + '&token2=' + result[0]._id + '#/user_common">点击进入密码重置页面，10分钟内有效哦~~</a>'
                };

                var mailTransport = nodemailer.createTransport(emailConfig);
                console.log('options', options);
                mailTransport.sendMail(options, function(err, msg){
                    if (err) {
                        console.log('err', err);
                        res.send({
                            desc: '邮件附送失败',
                            errInfo: err,
                            success: false
                        });
                    } else {
                        console.log('msg', msg);
                        res.send({
                            success: true,
                            desc: '邮件发送成功'
                        });
                    }
                });
            } else {
                console.log('用户查询失败，未查到相应用户');
                res.send({
                    desc: '注册邮箱错误，未查到相应用户',
                    success: false
                });
            }
        }).catch(next);
    }
};