var path = require('path');
var webpack = require('webpack');
var ip = require('ip').address();

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    // entry: './src/demostep1/index.js',
    entry: './src/module/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // 'src': path.join(__dirname, '..','src'),
            // 'components': path.join(__dirname, '..','src/components'),
            // 'libs': path.join(__dirname, '..','src/libs'),
            // 'module': path.join(__dirname, '..','src/module'),
            // 'store': path.join(__dirname, '..','src/store')
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
    },
    devServer: {
        contentBase: path.join(__dirname, ''), // '' 的时候默认访问到index.html  src的时候就成了文件ftp服务器的样子
        compress: false,
        inline: true,
        hot: true, // 热加载
        port: 8088,
        host: ip
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热加载插件
        // happyPack('css', 'css-loader'),
        // happyPack('sass', 'sass-loader')
    ]
};