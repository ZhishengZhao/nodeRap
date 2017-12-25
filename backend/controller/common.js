var rapInterface = require('../models/rapInterface');
var rapJsonRecord = require('../models/rapJsonRecord');
var nodemailer = require('nodemailer');

module.exports = {
    sendEmail: function (req, res, next) {
        var to = req.body.email,
            subject = req.body.,
            mailTransport = nodemailer.createTransport({
            service: 'qq',  
            secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
            auth : {
                user : '1149412108@qq.com',
                pass : 'apwigfddckschbjf'
            }
        });

        var options = {
            from: '1149412108@qq.com',
            to: to,
            subject: subject,
            text: text,
            html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
            attachments: [
                {
                    filename: 'img1.png',            // 附件名
                    path: 'public/images/img1.png',  // 附件路径
                    cid : '00000001'                 // cid可被邮件使用
                }
            ]
        };
        
        mailTransport.sendMail(options, function(err, msg){
            if (err) {
                // console.log(err);
            } else {
                // console.log(msg);
            }
        });
    }
};