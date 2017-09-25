var path = require('path')
var config = require('../config')
var glob = require('glob')
var crypto = require('crypto')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}

    var cssLoader = {
        loader: 'happypack/loader?id=css'
    }
    if (options.sourceMap) {
        cssLoader.options = {
            sourceMap: options.sourceMap
        }
    }
    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            var _loader = {
                loader: 'happypack/loader?id=' + loader
            }
            if (options.sourceMap) {
                _loader.options = {
                    sourceMap: Object.assign({}, loaderOptions, {
                        sourceMap: options.sourceMap
                    })
                }
            }
            loaders.push(_loader)
        }
        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}
exports.getEntry = function(globPath) {
    var entries = {},
        basename, tmp, pathname

    glob.sync(globPath).forEach(function(entry) {

        basename = path.basename(entry, path.extname(entry))

        tmp = entry.split('/').splice(3)
        tmp = tmp.slice(0, -1)
        pathname = tmp.join('/') + '/' + basename // 正确输出js和html的路径
        entries[pathname] = entry
    })
    return entries
}

exports.multipleEntries = function(webpackConfig, HtmlWebpackPlugin, entries) {
    // var entries = webpackConfig.entry
    Object.keys(entries).map(function(id) {
        var _conf = {
                chunks: [id],
                filename: id + ".html",
                // template: "!!html-webpack-plugin/lib/loader.js!./templates/" + id + ".html",
                template: 'index.html', // use common index.html template
                inject: true, // js插入位置
                title: entries[id]
            }
            // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        webpackConfig.plugins.push(new HtmlWebpackPlugin(_conf))
    })
}

exports.decrypt = function(data) {
    const decipher = crypto.createDecipher('aes192', 'aiyoumi')
    let decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}
