var emailConfig = require('../../config/emailconfig.js');
var nodemailer = require('nodemailer');

module.exports = {
    sendEmail: function(options) {
        var mailTransport = nodemailer.createTransport(emailConfig);
        var options = {
            from: emailConfig.auth.user,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
            attachments: options.attachments
        };
        
        mailTransport.sendMail(options, function(err, msg){
            if (err) {
                console.log('errInfo', err);
                return {
                    success: false,
                    errInfo: err
                };
            } else {
                console.log('errInfo', err);
                return {
                    success: true
                };
            }
        });
    }
};