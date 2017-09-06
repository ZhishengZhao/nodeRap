module.exports = function(app) {
    app.use('/rap', require('./rap'));
    app.use('/project', require('./project'));
    app.use('/jsonrecords', require('./jsonrecords'));
    //添加404页面 这里匹配所有请求链接
    // app.use(function(req, res) {
    //     if (!res.headersSent) {
    //         res.status(404).render('404');
    //     }
    // });
};