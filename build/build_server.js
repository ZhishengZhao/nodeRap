var express = require('express');
var path = require('path');
var config = require('../config/index.js');
var routes = require('../backend/routes.js');
var bodyParser = require('body-parser');
var cors = require('cors');
var ip = require('ip').address();

var app = express();

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

// 路由
app.use('/rap', routes);

// 禁用response header里面的x-powered-by
app.disable('x-powered-by');

// 监听端口，启动程序 
app.listen(config.port, function() {
    console.log('> listening on http://' + ip + ':' + config.port);
});