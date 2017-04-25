var express = require('express');
var app = express();

module.exports.admin = function(app){
	// 管理界面
	app.use("/admin",function(req,res,next){
		req.models.articles.find({},function(err,articles){
		    if (err) throw err;
		    var result = articles;
		    res.render('admin.ejs',{
		        result
		    });
		});
	});

	// 增
	app.use('/insert',function(req,res,next){
		req.models.articles.create([{
			atitle: req.query.title,
			aimg: req.query.img,
			acat:req.query.cat,
			acontent:req.query.content
		}],function(err,item){
			if(err) throw err;
			console.log("inserted!");
		});
		res.send('send back');
	});

	// 改
	app.use('/modify',function(req,res,next){
		req.models.articles.get(req.query.id, function (err, current) {
		    current.atitle = req.query.title;
		    current.aimg = req.query.img;
		    current.acat = req.query.cat;
		    current.acontent = req.query.content;
		    current.save(function (err) {
		        console.log("saved!");
		    });
		});
		res.send('send back');
		
	})

	// 删
	app.use('/delete',function(req,res,next){
		req.models.articles.get(req.query.id, function (err, current) {
		    current.remove(function (err) {
		        console.log("removed!");
		    });
		});
		res.send('send back');
		
	})

}