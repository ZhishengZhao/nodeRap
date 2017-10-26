var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('../config/index.js');
var routes = require('../backend/routes.js');
var bodyParser = require('body-parser');
var cors = require('cors');
const ip = require('ip').address();

var app = express();

app.set('views', './build/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.use(express.static(path.join(__dirname, '../dist')));

// 解析 application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 路由
// app.use(cors()); 
// routes(app);
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use('/rap', routes);

// 禁用response header里面的x-powered-by
app.disable('x-powered-by');

// 监听端口，启动程序 
app.listen(config.port, function() {
    console.log('> listening on http://' + ip + ':' + config.port);
});