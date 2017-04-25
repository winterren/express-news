$(document).ready(function(){

	// 展开合上
	$("#insertBtn").on('click',function(){
		$('#insert').slideToggle();
	})
	$("#updateBtn").on('click',function(){
		$('#update').slideToggle();
	})


	// 删改记录
	$("#utable").load("php/showadmin.php");


	$('#submitBtn').on('click',function(){
		var myarray;
		
		$.when
		(myarray=getArray()).done(
			jsonarray = JSON.stringify(myarray),
			$.ajax({
				url:'php/update.php'//改为你的动态页
				,type:'POST'
				,data:{arr:myarray}//调用json.js类库将json对象转换为对应的JSON结构字符串
				,success:function(rst){console.log('PHP接收JSON数据成功！'+rst);$("#utable").load("php/showadmin.php");}
				,error:function(xhr, status, error){alert('PHP页面有错误！'+xhr.responseText);}
			})
		)
		
		
	});

	function getArray(){
			var array=[];
			var utr = $('.utr');
			var utrlength = utr.length;
			for(var i=0;i<utrlength;i++){
				var singleid = $('.utr').eq(i).find('.uid').val();
				var singletitle =  $('.utr').eq(i).find('.utitle').val();
				var singlecat =  $('.utr').eq(i).find('.ucat').val();
				var singleimg =  $('.utr').eq(i).find('.uimg').val();
				var singlecontent =  $('.utr').eq(i).find('.ucontent').val();
				var singlechecked = $('.utr').eq(i).find('.ucheck').prop('checked');
				var single ={
					'id':singleid,
					'title':singletitle,
					'cat':singlecat,
					'img':singleimg,
					'content':singlecontent,
					'checked':singlechecked
				}
				array.push(single);
			}
			// console.log(array);
			return array;
	}
	
})