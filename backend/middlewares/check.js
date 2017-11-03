module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.send({
                code: 'logout',
                result: {},
                success: false
            });
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录');
            return res.redirect('back'); //返回之前的页面
        }
        next();
    }
};