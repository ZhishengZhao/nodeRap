var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '../', dir);
}

module.exports = {
    entry: {
        main: './src/module/main.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'src': resolve('src'),
            'components': resolve('src/components'),
            'libs': resolve('src/libs'),
            'module': resolve('src/module'),
            'store': resolve('src/store')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: "url-loader?limit=8192"
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings 
            }, {
                loader: "css-loader" // translates CSS into CommonJS 
            }, {
                loader: "sass-loader" // compiles Sass to CSS 
            }]
        }]
    }
};