var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'], // 入口名称
            filename: 'main.html', // 生成文件名称
            template: 'index.html', // 根目录index模板
            inject: true, // 插入js
            title: 'main.html' // title
        })
    ]
});
