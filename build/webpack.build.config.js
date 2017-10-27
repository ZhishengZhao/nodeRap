var path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist')
    }
});