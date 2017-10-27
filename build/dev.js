var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.dev.config.js');
var basicConfig = require('../config/index.js');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var ip = require('ip').address();

var app = express();
var compiler = webpack(config);

app.use(history({
    // prefix: '/pages',
    index: '/main.html', // 覆盖默认页面
    verbose: true // 是否记录日志，和logger相关。开启的时候会使用console.log.bind(console)。控制台直接输出
}));

app.use(webpackDevMiddleware(compiler, {
    public: config.output.publicPath
}));

// 后端部分
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.use('/rap', require('../backend/routes.js'));

app.listen(basicConfig.port, function() {
    console.log('listening at http://' +  ip + ':' + basicConfig.port);
});
