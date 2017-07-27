var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// 使用es6原生Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/shihu');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('连接成功');
});

var index = require('./Admin/Routes/index');
var users = require('./Admin/Routes/users');
var AdminShop = require('./Admin/Controller/Shop');
var AdminShopCategory = require('./Admin/Controller/ShopCategory');
var AdminProduct = require('./Admin/Controller/Product');
var AdminProductCategory = require('./Admin/Controller/ProductCategory');
var AdminMenu = require('./Admin/Controller/Menu');
var Login = require('./Admin/Controller/Login');
var Upload = require('./Admin/Controller/Upload');
var Test = require('./Admin/Controller/Test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new FileStore,
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
}));
// 文件上传目录
app.use(express.static(path.join(__dirname, 'Upload')));

app.use('/', index);
app.use('/users', users);

app.use('/admin/shop', AdminShop);
app.use('/admin/shop_category', AdminShopCategory);
app.use('/admin/product', AdminProduct);
app.use('/admin/product_category', AdminProductCategory);
app.use('/admin/menu', AdminMenu);
app.use('/upload', Upload);
app.use('/admin/login', Login);
app.use('/admin/test', Test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log('xxxxxxxxxxxxxxxxxxxx');
  console.log(err);
  console.log('xxxxxxxxxxxxxxxxxxxx');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
