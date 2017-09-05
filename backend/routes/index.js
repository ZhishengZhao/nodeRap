module.exports = function(app) {
    app.use('/rap', require('./rap'));
    app.use('/project', require('./project'));
    //添加404页面
    // app.use(function(req, res) {
    //     if (!res.headersSent) {
    //         res.status(404).render('404');
    //     }
    // });
};