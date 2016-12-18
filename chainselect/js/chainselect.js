$(document).ready(function(){
	//找到三个下拉框
	var carnameSelect = $(".carname").children("select");
	var cartypeSelect = $(".cartype").children("select");
	var wheeltypeSelect = $(".wheeltype").children("select");
	//找到汽车图片
	var carimg = $(".carimg");
	
	//为下拉框注册事件
	carnameSelect.change(function(){
		//第三个下拉框隐藏,三角符号隐藏
		cartypeSelect.next().hide();
		wheeltypeSelect.parent().hide();
		//汽车图片隐藏
		carimg.hide().attr("src","");

		//获取下拉框的值
		var carnameValue = $(this).val();
		//如果值不为空,将下拉框中的值传送给服务器
		if (carnameValue != ""){
				//只要第一个下拉框的内容改变了，就清空第二个下拉框的内容
				cartypeSelect.html("");
				
				$("<option value=''>请选择汽车类型</option>").appendTo(cartypeSelect);
				
				//接收服务器返回的汽车类型
				//方便起见，这里没有连服务器
				//填充到汽车类型下拉框中
				//这里只是为了实现一次ajax交互，让ajaxStart起作用
				$("#test").load("tabLoad.html");
			
				if (carnameValue == "BMW"){
					$("<option value='6ercupe'>6ercupe</option>").appendTo(cartypeSelect);
					$("<option value='316ti'>316ti</option>").appendTo(cartypeSelect);
					
				}
				else if (carnameValue == "Audi"){
					$("<option value='tt'>tt</option>").appendTo(cartypeSelect);
				}
				else if (carnameValue == "VW"){
					$("<option value='Golf4'>Golf4</option>").appendTo(cartypeSelect);
				}
				//显示指示下一个下拉框的三角符号
				carnameSelect.next().show();
				//显示下一个下拉框
				cartypeSelect.parent().show();
			
		}
		//如果值为空
		else {
			//隐藏指示下一个下拉框的三角符号
			carnameSelect.next().hide();
			//隐藏下一个下拉框
			cartypeSelect.parent().hide();
		}
	});
	
	cartypeSelect.change(function(){
		//汽车图片隐藏
		carimg.hide().attr("src","");
		//获取下拉框的值
		var cartypeValue = $(this).val();
		//如果值不为空,将下拉框中的值传送给服务器
		if (cartypeValue != ""){
			//这里只是为了实现一次ajax交互，让ajaxStart起作用
			$("#test").html("");
			$("#test").load("tabLoad.html");
				//只要第二个下拉框的内容改变了，就清空第三个下拉框的内容
				wheeltypeSelect.html("");
				
				$("<option value=''>请选择车轮类型</option>").appendTo(wheeltypeSelect);
				//接收服务器返回的车轮类型
				//方便起见，这里没有连服务器
				//填充到车轮类型下拉框中
				
				
				
				if (cartypeValue == "6ercupe"){
					$("<option value='rha'>rha</option>").appendTo(wheeltypeSelect);
					$("<option value='rhb'>rhb</option>").appendTo(wheeltypeSelect);
					$("<option value='rhc'>rhc</option>").appendTo(wheeltypeSelect);
				}
				if (cartypeValue == "316ti"){
					$("<option value='rha'>rha</option>").appendTo(wheeltypeSelect);
					$("<option value='rhb'>rhb</option>").appendTo(wheeltypeSelect);
				}
				if (cartypeValue == "tt"){
					$("<option value='rha'>rha</option>").appendTo(wheeltypeSelect);
					$("<option value='rhb'>rhb</option>").appendTo(wheeltypeSelect);
					$("<option value='rhc'>rhc</option>").appendTo(wheeltypeSelect);
				}
				if (cartypeValue == "Golf4"){
					$("<option value='rha'>rha</option>").appendTo(wheeltypeSelect);
					$("<option value='rhb'>rhb</option>").appendTo(wheeltypeSelect);
				}
				//显示指示下一个下拉框的三角符号
				cartypeSelect.next().show();
				//显示下一个下拉框
				wheeltypeSelect.parent().show();
		}
		//如果值为空
		else {
			//隐藏指示下一个下拉框的三角符号
			cartypeSelect.next().hide();
			//隐藏下一个下拉框
			wheeltypeSelect.parent().hide();
		}
	});
	
	wheeltypeSelect.change(function(){
		//获取车轮类型的值
		var wheeltypeValue = $(this).val();
		//根据汽车厂商，汽车类型，车轮类型找到相应的汽车图片
		var carimgname = carnameSelect.val() + "_" + cartypeSelect.val() +"_" + wheeltypeSelect.val() + ".jpg";
		
		var carimg = $(".carimg");
		//先隐藏汽车图片
		carimg.hide();
		//显示carloading图片
		$(".carloading").show();
		//通过javascript中的Image对象预装载图片,可以知道图片什么时候装载完
		var cacheimg = new Image();
		$(cacheimg).attr("src","images/" + carimgname).load(function(){
			//隐藏carloading图片
			$(".carloading").hide();
			//显示汽车图片
			carimg.attr("src","images/" + carimgname).slideDown();
		});
		
		
	});
	
	//数据装载中的图片显示
	$(".loading").ajaxStart(function(){
		$(this).css("visibility","visible");
		$(this).animate({
			opacity:1
		},0);
	}).ajaxStop(function(){
		//淡出，使用的是css的display属性
		//$(this).fadeOut(500);
		$(this).animate({
			opacity:0
		},300);
	});
	
});