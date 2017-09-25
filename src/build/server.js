
var config = require('../config')
var ip = require('ip').address()
var fs = require('fs')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.config')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

var app = express()
var compiler = webpack(webpackConfig)
var uri = 'http://' + ip + ':' + port

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')({
//     // prefix: '/pages',
//     index: '/main.html',
//     // rewrites: config.historyArr,
//     verbose: false
// }))

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
})
