var rapUser = require('../models/rapUser');
var sha1 = require('sha1');

module.exports = {
    addUser: function(req, res, next) {
        var params = {
            name: req.fields.content,
            password: req.fields.pid,
            email: req.fields.pid,
            avatar: req.fields.pid,
            gender: req.fields.pid,
            bio: req.fields.pid
        };
        rapUser.create(params).then(function(result) {
            res.send({
                result: result,
                success: true
            });
        }).catch(next);
    },
    isLogin: function(req, res, next) {
        var isLogin = false;

        if (req.session && req.session.user) {
            isLogin = true;
        }

        res.send({
            result: isLogin,
            success: true
        });
    },
    login: function(req, res, next) {
        var name = req.fields.user.name;
        var password = sha1(req.fields.user.pwd);
        var errInfo = '';

        rapUser.getUserByName(name).then(function(user) {
            if (!user) {
                errInfo = '用户不存在';
            } else if (password !== user.password) {
                errInfo = '密码错误';
            }

            delete user.password;
            req.session.user = user;
            res.send({
                result: '',
                desc: '',
                success: true
            });
        }).catch(next);
    },
    registe: function(req, res, next) {
        console.log(req.fields);
        var user = {
            name: req.fields.name,
            gender: req.fields.gender,
            bio: req.fields.desc,
            avatar: req.fields.avatar,
            // avatar: req.files.avatar.path.split(path.sep).pop(),
            password: req.fields.pwd,
            repassword: req.fields.pwdConfirm
        };

        var errInfo = '';

        try {
            if (user.name.length > 10 || user.name.length < 1) {
                throw new Error('name\'s length should be between 1 and 10');
            }
            if (['m', 'f', 'x'].indexOf(user.gender) === -1) {
                throw new Error('hey man, your gender is really wird');
            }
            // if (!req.files.avatar.name) {
            //     throw new Error('缺少头像');
            // }
            if (user.password.length < 6 || user.password.length > 10) {
                throw new Error('password\'s length should be between 6 and 10');
            }
            if (user.repassword !== user.password) {
                throw new Error('two password are not the same');
            }
            if (user.bio.length > 30 || user.bio.length < 1) {
                throw new Error('bio\'s length should be between 1 and 30');
            }
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
        var name = req.fields.name;
        var password = sha1(req.fields.pwd);

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
};