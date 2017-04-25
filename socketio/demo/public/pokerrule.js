// HTML绑定事件部分
// var input1 = document.getElementById('input1');
// var input2 = document.getElementById('input2');
var input1 = "0,1,2,3,5";
var input2 = "0,13,12,11,10,9,14";
var btn = document.getElementById('btn');
// var resultText = document.getElementById('result-text');
var resultText = compare(input1,input2);
function generateCard(array){
	var arrayCard = new Array();
	for(var i=0;i<array.length;i++){
		var singleCard = new Card(array[i]);
		arrayCard.push(singleCard);
	}
	return arrayCard;
}
function compare(input1,input2){
	var arr1 = input1.value.split(',');
	var arr2 = input2.value.split(',');
	var arrCard1 = generateCard(arr1);
	var arrCard2 = generateCard(arr2);
	var result1 = valueOf(arrCard1);
	var result2 = valueOf(arrCard2);
	var result1Text = "Tom's Card Type: "+  result1[1]+"<br/>";
	var result2Text = "Jerry's Card Type: "+  result2[1]+"<br/>";
	var whoWins = "";
	if(result1[0]>result2[0]){
		whoWins = "Tom Wins";
		// 
	}else if(result1[0]===result2[0]){
		whoWins = "Tie";
	}else{
		whoWins="Jerry Wins";
	}
	whoWins=result1Text + result2Text + whoWins;
	=whoWins;
	return whoWins;
}
// btn.addEventListener('click',function(){
// 	resultText.innerHTML = compare(input1,input2);
// })

// 逻辑部分


	// 卡片对象
	function Card(num){
		this.color = Math.floor(num / 14);
		this.point = num % 14;
		this.num = num;
	}
	// 给每个牌组生成一个level分数，比大小只要对比分数就可以了
	function valueOf(array){
		var length = array.length;
		// var posArray = new Array();
		var tempArray = new Array();
		

		// 检验是否5-7个卡片
		if(length<5||length>7){
			return false;
		}
		// 按点数排序
		array = array.sort(function(c1,c2){
			return c1.point - c2.point;
		})

		tempArray = array.slice();

		// 备用做差数组
		// eg
		// array =  [3,5,7,7,11]
		// difArray=[2,2,0,4]
		var difArray = new Array();
		for(var i=0;i<length-1;i++){
			difArray.push(array[i+1].point-array[i].point);
		} 

		// 备用判断同点数数组，并记录有几次同点数
		// eg
		// array =    [2,4,4,4,5,5]
		// difArray=  [2,0,0,1,0]
		// equalArray=[0,2,1,0,1]
		var equalArray = new Array();
		for(var i = 0; i <length-1; i++){
			equalArray[i]=0;
			var j = i;
			while(difArray[j]==0){
				equalArray[i]++;
				j++;	
			}
		}

		// 牌型等级
		var level = 0;
		var levelText="";

		// *************
		//   计算牌型
		// *************
		// 同点数系列
		var four = equalArray.indexOf(3);
		var three = equalArray.lastIndexOf(2);
		var two = equalArray.lastIndexOf(1);
		// *************
		// 有四张相同直接四条
		// *************
		if(four!=-1){
			// Four of a kind
			level = 700000000;
			levelText="Four of a kind";
			tempArray.splice(four,4);
			level += 1000000*4*array[four].point+tempArray[tempArray.length-1].point;	
		}
		// *************
		// 有3张相同，判断是否有对子，输出葫芦或三条
		// *************
		// Fullhouse & Three of a kind
		else if(three!=-1){
			
			var havePair = ((equalArray.indexOf(1,three+3)+1))||(equalArray.lastIndexOf(1,three-1)+1)||0;
			havePair -= 1;
			if(three==0){havePair=-1}
			if(havePair!=-1){
				// Fullhouse
				level = 600000000;
				levelText="Fullhouse";
				level += 10000*3*array[three].point + 100*2*array[havePair].point;
			}
			
			// 判断
			else{
				// Three of a kind
				level = 300000000;
				levelText="Three of a kind";
				tempArray.splice(three,3);
				level += 10000*3*array[three].point + tempArray[tempArray.length-1].point + tempArray[tempArray.length-2].point;
			}
		}
		// *************
		// 有两张相同，判断是否有多次两张相同，输出两对或一对
		// *************
		// Two pairs & One Pair
		else if(two!=-1){
			var hasTwoPairs = equalArray.lastIndexOf(1,two-1);
			if(two==0){hasTwoPairs=-1}
			if(hasTwoPairs!=-1){
				// Two pairs
				level = 200000000;
				levelText="Two pairs";
				tempArray.splice(two,2);
				tempArray.splice(hasTwoPairs,2);
				level += 100*2*array[two].point + 2*array[hasTwoPairs].point + tempArray[tempArray.length-1].point;

			}else{
				// One pair
				level = 100000000;
				levelText="One pair";
				tempArray.splice(two,2);
				level += 100*2*array[two].point + tempArray[tempArray.length-1].point+tempArray[tempArray.length-2].point+tempArray[tempArray.length-3].point;
			}
		}

		// *************
		// 同花系列
		// *************

		var arr0 =[];
		var arr1 =[];
		var arr2 =[];
		var arr3 =[];
		for(var i=0; i<length; i++){
			switch(array[i].color){
				case 0:
					arr0.push(i);
					break;
				case 1:
					arr1.push(i);
					break;
				case 2:
					arr2.push(i);
					break;
				case 3:
					arr3.push(i);
					break;
			}
		}
		var colorArray=[arr0,arr1,arr2,arr3];
		colorArray = colorArray.sort(function(c1,c2){
			return c1.length - c2.length;
		})
		
		if (Math.floor(colorArray[3].length/5)){
			if (level<500000000){
				// Flush
				level = 500000000;
				levelText="Flush";
				level += array[colorArray[3][colorArray[3].length-1]].point +
					 array[colorArray[3][colorArray[3].length-2]].point +
					 array[colorArray[3][colorArray[3].length-3]].point +
					 array[colorArray[3][colorArray[3].length-4]].point +
					 array[colorArray[3][colorArray[3].length-5]].point;
			}
		}
		// 
		// *************
		// 顺子系列，先将排序后的数组去重，然后每五个相减
		// *************
		// 
		var stArray = array.slice();

		// 第一步去重
		for(var i=array.length-2;i>=0 ;i--){
			if(array[i].point==array[i+1].point){
				stArray.splice(i,1);
			}
		}
		// 第二步如果有A(point=13)队头添一个A(point=-1)
		if(stArray[stArray.length-1].point==13){
			var newCard = new Card(stArray[stArray.length-1].num);
			newCard.point=-1;
			stArray.unshift(newCard);
		}
		// 第三步每5个数相减，得到4说明是顺子
		for(var i=stArray.length-1;i>=4;i--){
			var whetherFour = stArray[i].point - stArray[i-4].point;
			if(whetherFour===4){
				// 有顺子
				if(level<400000000){
					// Straight
					level = 400000000;
					levelText="Straight";
					level += stArray[i].point ;
				}
				// 是否是同花顺
				if((stArray[i].color==stArray[i-1].color)&&(stArray[i].color==stArray[i-2].color)&&(stArray[i].color==stArray[i-3].color)&&(stArray[i].color==stArray[i-4].color)){
						// Straight Flush
						level = 800000000;
						levelText="Straight Flush";
						level += stArray[i].point ;
						if(level===800000013){
							// Royal Flush
							level = 900000000;
							levelText="Royao Flush";
						}
				}
				break;
			}
		}

		// 最后啥都不是的就是高牌了
		if(level<100000000){
			level= array[array.length-1].point + array[array.length-2].point + array[array.length-3].point + array[array.length-4].point + array[array.length-5].point;
			levelText="High card";
		}


		console.log(levelText);
		console.log(level);
		return [level,levelText];
	}
