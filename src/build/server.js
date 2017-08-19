var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require('./webpack.config.js');

var compiler = webpack({
    // configuration
    output: { path: '/' }
});

app.use(webpackDevMiddleware(compiler, {
    // options
    noInfo: true,
    quiet: true,
    publicPath: webpackConfig.output
}));