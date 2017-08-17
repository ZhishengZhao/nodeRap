var path = require('path');
var express = require('express');
var MongoStore = require('connect-mongo');
// var config = require('config-lite');
var routes = require('./routes');
var bodyParser = require('body-parser'); 
var cors =  require('cors');

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

// app.use(require('body-parser')());

// var router = express.Router(); 
// router.use(bodyParser.urlencoded({extended: false}));  
// router.use(bodyParser.json());  
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),
    keepExtensions: true // 保留文件后缀
}));

app.use(cors());

// 路由
routes(app);

// 禁用response header里面的x-powered-by
app.disable('x-powered-by');

// 监听端口，启动程序 
app.listen('3000', function() {
    console.log('> listening on port 3000');
});


