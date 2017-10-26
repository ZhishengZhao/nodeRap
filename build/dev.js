const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');
const basicConfig = require('../config/index.js');
const bodyParser = require('body-parser');
const ip = require('ip').address();

const app = express();
const compiler = webpack(config);

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
