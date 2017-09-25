var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

var loaders = utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction ? config.build.extractCss : config.dev.extractCss
});
loaders.js = 'happypack/loader?id=js'
module.exports = {
    loaders: loaders
}
