var express = require('express');
var router = express.Router();

var userController = require('../controller/user.js');

// var checkLogin = require('../middlewares/check').checkLogin;

// POST /signin 用户登录
// router.post('/login', checkNotLogin, function(req, res, next) {
//     // res.send(req.flash());
//     var name = req.fields.name;
//     var password = req.fields.password;
//     password = sha1(password);

//     userModel.getUserByName(name).then(function(user) {
//         if (!user) {
//             req.flash('error', '用户不存在');
//             return res.redirect('back');
//         }

//         if (password !== user.password) {
//             req.flash('error', '密码错误');
//             return res.redirect('back');
//         }

//         req.flash('success', '登陆成功');

//         delete user.password;
//         req.session.user = user;
//         return res.redirect('/posts');
//     });


//     try {
//         if (name === '' || password === '') {
//             throw new Error('username & password can not be null');
//         }
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('/signin');
//     }
// });

router.post('/isLogin', userController.isLogin)

// router.post('/isLogin', function(req, res, next) {
//     console.log('isLogin====================================')

//     var isLogin = false

//     // if (req.session.user) {
//     //     isLogin = true
//     // }

//     res.send({
//         result: isLogin,
//         success: true
//     });
// });

// POST /signup 用户注册
// router.post('/signup', checkNotLogin, function(req, res, next) {
//     // res.send(req.flash());
//     // res.render('signup', {
//     //     name: 'req.params.name'
//     // });
//     console.log(req.fields)
//     var name = req.fields.name;
//     var gender = req.fields.gender;
//     var bio = req.fields.bio;
//     // var avatar = req.fields.avatar;
//     var avatar = req.files.avatar.path.split(path.sep).pop();
//     var password = req.fields.password;
//     var repassword = req.fields.repassword;

//     try {
//         if (name.length > 10 || name.length < 1) {
//             throw new Error('name\'s length should be between 1 and 10');
//         }
//         if (['m', 'f', 'x'].indexOf(gender) === -1) {
//             throw new Error('hey man, your gender is really wird');
//         }
//         if (!req.files.avatar.name) {
//             throw new Error('缺少头像');
//         }
//         if (password.length < 6 || password.length > 10) {
//             throw new Error('password\'s length should be between 6 and 10');
//         }
//         if (repassword !== password) {
//             throw new Error('two password are not the same')
//         }
//         if (bio.length > 30 || bio.length < 1) {
//             throw new Error('bio\'s length should be between 1 and 30');
//         }
//         console.log(avatar, null)
//     } catch (e) {
//         console.log(e);
//         fs.unlink(req.files.avatar.path);
//         req.flash('error', e.message);
//         return res.redirect('/signup');
//     }

//     // encode the password
//     password = sha1(password);

//     var user = {
//         name: name,
//         password: password,
//         gender: gender,
//         avatar: avatar,
//         bio: bio
//     };

//     UserModel.create(user).then(function(result) {
//         // the result contains the userinfo
//         user = result.ops[0];
//         // save userinfo in session
//         delete user.password;
//         req.session.user = user;
//         // show a tip of success
//         req.flash('success', 'congradulations! signup success');
//         // redirect to index.html
//         res.redirect('/posts');
//     }).catch(function(e) {
//         // signup failed, then delete the avatar pic asnyc
//         fs.unlink(req.files.avatar.path);
//         // if user has existed, redirect to signup page and show tip
//         if (e.message.match('E11000 dubplicate key')) {
//             req.flash('error', 'sorry, the user has existed');

//         }
//         next(e);
//     });
// });

// GET /signout 登出
// router.post('/signout', checkLogin, function(req, res, next) {
//     // res.send(req.flash());
//     req.session.user = null;
//     req.flash('success', 'signout success');

//     res.redirect('/posts');
// });

module.exports = router;