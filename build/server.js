var deployEnv = process.argv.splice(2)[0] || 'env_pro';

var express = require('express');
var basicConfig = require('../config/index.js');
var bodyParser = require('body-parser');
var ip = require('ip').address();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var sessionConfig = require('../config/index.js');

var app = express();

/*
 * 根据部署环境区分服务及静态设置
 * 开发环境：webpackDevMiddleware，集成webpackDevServer的服务包
 * 生产环境：ejs引擎，main.html
 */
if (deployEnv === 'env_dev') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var config = require('./webpack.dev.config.js');
    var history = require('connect-history-api-fallback');
    var webpack = require('webpack');
    var compiler = webpack(config);

    // vue开发history模式需要
    app.use(history({
        index: '/main.html', // 覆盖默认页面
        verbose: false // 是否记录日志，和logger相关。开启的时候会使用console.log.bind(console)。控制台直接输出
    }));

    // 启动dev服务器
    app.use(webpackDevMiddleware(compiler, {
        public: config.output.publicPath
    }));
} else {
    /* 
     * 设置模板引擎
     * 从根目录定义模板目录
     */
    app.set('views', './build/views');
    // app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'ejs');

    app.get('/main.html', function(req, res) {
        res.render('index');
    });

    /* 
     * 静态服务目录设置
     * 以下两种设置目录均可
     * node默认从项目根目录开始
     * __dirname默认从执行文件所在目录开始
     */
    // app.use(express.static(path.join(__dirname, '../dist')));
    app.use(express.static('./dist'));
}

app.use(session({
    name: sessionConfig.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: sessionConfig.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: sessionConfig.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    }
    // ,
    // store: new MongoStore({ // 将 session 存储到 mongodb
    //     url: sessionConfig.mongodb // mongodb 地址
    // })
}));

// 添加模板必需的三个变量
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

// 解析 application/json, 用来格式化XHR请求数据，如req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

/*
 * 设置允许跨域
 * 前期前后端服务分离，端口不一致添加的。
 * 现在前后端统一了，没什么用了
 */
// app.use(cors()); 
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

// 接口路由
app.use('/rap', require('../backend/routes.js'));


app.listen(basicConfig.port, function() {
    console.log('listening at http://' +  ip + ':' + basicConfig.port + (deployEnv === 'env_dev' ? '' : '/main.html'));
});
