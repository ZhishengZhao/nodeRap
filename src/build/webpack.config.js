var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: 4
});
var entries = {}
entries.main = './src/main.js'
// if (process.env.npm_config_entry) {
//     entries.main = process.env.npm_config_entry
// } else {
//     entries = utils.getEntry(config.entries) // 获得入口js文件
//     entries.main = './src/main.js'
// }

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function happyPack(type, loader) {
    return new HappyPack({
        id: type,
        cache: false,
        //threads: 4,
        debug: false,
        threadPool: happyThreadPool,
        loaders: [loader]
    })
}

module.exports = {
    entry: entries,
    output: {
        path: process.env.NODE_ENV === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components'),
            'module': resolve('src/module'),
            'libs': resolve('src/libs'),
            'store': resolve('src/store')
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [resolve('src')],
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'happypack/loader?id=js',
            include: [resolve('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    plugins: [
        happyPack('js', 'babel-loader'),
        happyPack('eslint', 'eslint-loader'),
        happyPack('css', 'css-loader'),
        happyPack('sass', 'sass-loader')
    ]
}
