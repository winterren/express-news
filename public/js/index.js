$(document).ready(function(){
	// 分类标识位
	var catflag = '%';

	// 默认显示全部
	$("#mainContent").load("php/show.php",{cat:catflag,page:4});

	// 每个顶部按钮绑定对应的sql查询语句
	$(".btn").on('click',function(){
		catflag = $(this).text();
		$("#mainContent").load("php/show.php",{cat:catflag,page:4});
		showMore();
	})

	// 返回全部显示
	$(".logo").on('click',function(){
		catflag = '%';
		$("#mainContent").load("php/show.php",{cat:catflag,page:4});
		showMore();
	})

	// 进入后台
	$(".icon-me").on('click',function(){
		window.location.href="admin.html";
	})

	$("#more").on('click',function(){
		$(this).hide();
		$("#mainContent").load("php/show.php",{cat:catflag,page:100000});
	})


	function showMore(){
		$("#more").show();
	}
})