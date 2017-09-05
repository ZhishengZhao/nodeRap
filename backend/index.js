var path = require('path');
var express = require('express');
var MongoStore = require('connect-mongo');
var routes = require('./routes');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),
    keepExtensions: true // 保留文件后缀
}));

app.use(cors());
// 路由
// routes(app);
app.use('/rap', require('./routes/rap'));
app.use('/project', require('./routes/project'));

// 禁用response header里面的x-powered-by
app.disable('x-powered-by');

// 监听端口，启动程序 
app.listen('3000', function() {
    console.log('> listening on port 3000');
});