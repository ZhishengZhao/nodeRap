var express = require('express')
// var webpack = require('webpack')

// var webpackDevMiddleware = require("webpack-dev-middleware");
// var webpack = require("webpack");
var config = require('./webpackconfig.js')
// var compiler = webpack({
//     // configuration
//     output: { path: '/' }
// });

// app.use(webpackDevMiddleware(compiler, {
//     config
// }));



console.log(process);

var args = require('minimist')(process.argv.slice(2));

console.log(args.hello);

var app = express();
app.get('/', function(req, res) {
    // var entries = utils.getEntry('./src/module/**/+(main|app|index|cart|demo|list|share).js') // 获得入口js文件
    var html = require('../index.html')

    res.render(html)
})
app.listen('8888', () => {
    console.log('app listening at 8888')
})
