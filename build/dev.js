const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var ip = require('ip').address();

const app = express();
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    public: config.output.publicPath
}));

app.listen(8088, function() {
    console.log('listening at http://' +  ip + ':8088', ip);
});
