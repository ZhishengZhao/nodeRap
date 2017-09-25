var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var entries = Object.assign({}, baseWebpackConfig.entry)

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name])
})

var conf = merge(baseWebpackConfig, {
    output: {
        publicPath: config.dev.assetsPublicPath
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new FriendlyErrorsPlugin()
    ]
})

// set multipleEntries using HtmlWebpackPlugin
utils.multipleEntries(conf, HtmlWebpackPlugin, entries)

module.exports = conf
