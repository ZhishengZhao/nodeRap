var emailConfig = {
    service: 'qq',  
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: '1149412108@qq.com',
        pass: 'vdrgfhqgqhgybadi'
    }
};

var activeEmailConfig = {
    subject: '激活邮件',
    text: '~~~',
    html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1>',
    attachments: null
}

module.exports = emailConfig;