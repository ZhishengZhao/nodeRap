var rapUser = require('../models/rapUser');
var sha1 = require('sha1');

function emailCheck(emailStr) {
    var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return emailReg.test(emailStr);
}

module.exports = {
    addUser: function(req, res, next) {
        var params = {
            name: req.body.content,
            password: req.body.pid,
            email: req.body.pid,
            avatar: req.body.pid,
            gender: req.body.pid,
            bio: req.body.pid
        };
        rapUser.create(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    isLogin: function(req, res, next) {
        // console.log('00000--------req.session', req.session);
        var isLogin = false;
        var userinfo = {};

        if (req.session && req.session.user) {
            isLogin = true;
            userinfo = {
                name: req.session.user.name,
                avatar: req.session.user.avatar
            };
        }

        res.send({
            result: userinfo,
            success: isLogin
        });
    },
    login: function(req, res, next) {
        var name = req.body.name;
        var password = sha1(req.body.pwd);
        var errInfo = '';
        // console.log('--------name', name);
        rapUser.getUserByName(name).then(function(user) {
            // console.log('--------user', user);
            var success = true,
                errInfo = '';
            if (!user.length) {
                errInfo = '用户不存在';
                success = false;
            } else if (password !== user[0].password) {
                errInfo = '密码错误';
                success = false;
            } else {
                delete user[0].password;
                // res.setHeader("Set-Cookie", ['a=000', 't=1111', 'w=2222']);
                // console.log(user);
                req.session.user = user[0];
                // console.log('--------req.session', req.session);
            }

            res.send({
                result: '',
                desc: errInfo,
                success: success
            });
        }).catch(next);
    },
    registe: function(req, res, next) {
        console.log(req.body);
        var user = {
            name: req.body.name,
            email: req.body.email,
            // gender: req.body.gender,
            // bio: req.body.desc,
            // avatar: req.body.avatar,
            // avatar: req.files.avatar.path.split(path.sep).pop(),
            password: req.body.pwd,
            repassword: req.body.pwdconfirm
        };

        var errInfo = '';

        try {
            if (user.name.length > 10 || user.name.length < 1) {
                throw new Error('name\'s length should be between 1 and 10');
            }
            if (!emailCheck(user.email)) {
                throw new Error('email格式不对');
            }
            // if (['m', 'f', 'x'].indexOf(user.gender) === -1) {
            //     throw new Error('hey man, your gender is really wird');
            // }
            // if (!req.files.avatar.name) {
            //     throw new Error('缺少头像');
            // }
            if (user.password.length < 6 || user.password.length > 10) {
                throw new Error('password\'s length should be between 6 and 10');
            }
            if (user.repassword !== user.password) {
                throw new Error('two password are not the same');
            }
            // if (user.bio.length > 30 || user.bio.length < 1) {
            //     throw new Error('bio\'s length should be between 1 and 30');
            // }
        } catch (e) {
            console.log(e);
            // fs.unlink(req.files.avatar.path);
            res.send({
                result: '',
                desc: e.message,
                success: false
            });

            return;
        }

        // encode the password
        user.password = sha1(user.password);

        rapUser.create(user).then(function(result) {
            // the result contains the userinfo
            user = result.ops[0];
            // save userinfo in session
            delete user.password;
            req.session.user = user;
            // res.redirect('/pages/mainpage');
            res.send({
                result: '',
                desc: '',
                success: true
            });
        }).catch(function(e) {
            // signup failed, then delete the avatar pic asnyc
            // fs.unlink(req.files.avatar.path);
            // if user has existed, redirect to signup page and show tip
            // if (e.message.match('E11000 dubplicate key')) {
            //     req.flash('error', 'sorry, the user has existed');
            // }

            res.send({
                result: '',
                desc: e.message,
                success: false
            });
            next(e);
        });
    },
    logout: function(req, res, next) {
        var name = req.body.name;
        var password = sha1(req.body.pwd);

        rapUser.getUserByName(name).then(function(user) {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }

            if (password !== user.password) {
                req.flash('error', '密码错误');
                return res.redirect('back');
            }

            delete user.password;
            req.session.user = user;
            return res.redirect('/pages/mainpage');
        });
    },
    resetPwd: function (req, res, next) {
        var id = req.body.token,
            pwd = sha1(req.body.pwd);

        rapUser.resetPwd(id, pwd).then(function(result) {
            res.send({
                result: '',
                success: true
            });
        }).catch(next);
    }
};