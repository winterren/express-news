var express = require('express');
var app = express();
var orm = require("orm");
var path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// 数据库config
var username = 'root';
var password = 'root';
var host = 'localhost';
var port = '8889';
var dbname = 'mynews';


// 数据库连接
var db = require("./api/connect");
db.connectdb(app,username,password,host,port,dbname);
// 后台增删改查
var ad = require("./api/admin.js");
ad.admin(app);
// 分类显示路由连接
var cat = require("./api/cat");
cat.category(app);



var server = app.listen(3050, function(){
	var port = server.address().port;
	console.log("请在下述地址运行程序：http://localhost:"+port);
});