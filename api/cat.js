var express = require('express');
var app = express();

module.exports.category = function(cat){
    // ejs连接
    var ejs = require("ejs");
    cat.set("view engine",'ejs');
    cat.set('views', __dirname + '/../views');
    cat.use('/public',express.static(__dirname + '/../public/'));




    // 返回某分类下所有文章的JSON
    cat.use("/cat/:category", function (req, res,next) {
        var category = req.params.category;
        switch(category){
            case "nvren":
                category = "女人";
                break;
            case "keji":
                category = "科技";
                break;
            case "gaoxiao":
                category = "搞笑";
                break;
            case "tiyu":
                category = "体育";
                break;
        }
        req.models.articles.find({},function(err,articles){
            if (err) throw err;
            var result = articles.filter(function(a){
                return a && a.acat === category;
            });
            // res.send(result);
            res.render('category.ejs',{
                result
            });
        });
    });



//  ********************************************************************
// 
//   疑问：↑ ↓ 两个路由如果交换的话，
//   例如     http://localhost:3050/cat/gaoxiao 这样的地址就无法正确显示，
//   会直接走 http://localhost:3050/            的界面，是为什么？？？
// 
//  ********************************************************************

    // 返回所有JSON
    cat.use("/", function (req, res,next) {
        req.models.articles.find({},function(err,articles){
            if (err) throw err;
            var result = articles;
            res.render('category.ejs',{
                result
            });
        });
    });
    
   
}


