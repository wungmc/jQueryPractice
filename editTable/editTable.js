// JavaScript Document
$(document).ready(function(){
	//找到tbody里的奇数行
	//even是过滤器，表示偶数，使用even的目的是把tbody tr返回的tr元素中，在数组里的下标为偶数的tr返回
	$("tbody tr:even").css("background-color", "#ece9d8" );	
	
	//找到奇数的td
	var numTd = $("tbody td:even");
	
	//注册单击事件
	numTd.click(function(){
		//保存被单击的单元格、
		var tdObj = $(this);
		var inputObj = $("<input type='text'>");
		if (tdObj.children("input").length > 0) {
			//td中有input，不执行click事件
			return false;
		}
		//保存单元格内容
		var tdValue = tdObj.html();
		//将单元格中的内容清空
		tdObj.html("");
		
		
		//将单元格中的内容添加到input中
		//将input的宽度设为原单元格的宽度
		//去掉input的边框
		//设置input的字体大小
		//设置input的背景颜色为原单元格的颜色
		//将input加入单元格中
		inputObj.val(tdValue)
				.width(tdObj.width())
				.css("border-width","0px")
				.css("font-size","16px")
				.css("background-color",tdObj.css("background-color"))
				.appendTo(tdObj);
				
		//单击后input处在选中状态
		inputObj.trigger('focus').trigger('select');
		
		inputObj.click(function(){
			return false;
		});
		
		//响应回车和esc按键
		inputObj.keyup(function(event){
			//保存按键的键值
			var keyCode = event.which;
			//响应回车
			if (keyCode == 13) {
				var inputvalue = $(this).val();
				tdObj.html(inputvalue);
			}
			
			//响应esc
			if (keyCode == 27){
				tdObj.html(tdValue);
			}
		});
	});
	
});
