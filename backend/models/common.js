var emailConfig = require('../../config/emailconfig.js');

module.exports = {
    sendEmail: function(options) {
        var mailTransport = nodemailer.createTransport(emailConfig),
            options = {
                from: emailConfig.auth.user,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                attachments: options.attachments
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