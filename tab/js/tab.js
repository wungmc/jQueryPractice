$(document).ready(function(){
	//找到所有的li
	//each表示$("li")所返回的jquery对象都会执行function里的代码
	//index为$("li")所返回的jquery对象数组的下标
	var timeoutId;
	$("#tabfirst li").each(function(index){						  
		//当鼠标移入tab标签内时，注册鼠标事件
		//解决当鼠标快速在tab上滑动时标签也变化的问题，使用延时处理
		
			$(this).mouseover(function(){
				var liNode = $(this);
				timeoutId = setTimeout(function(){
					//隐藏原来显示的div
					$("div.contentin").removeClass("contentin");
					//隐藏tab的效果
					$("#tabfirst li.tabin").removeClass("tabin");
					
					//显示当前tab的效果
					liNode.addClass("tabin");
					//显示当前li对应的div
					$("div.contentfirst").eq(index).addClass("contentin");
				},300);
			}).mouseout(function(){
				//当鼠标移出时，清除延时器
				clearTimeout(timeoutId);
			});		
	});
	
	
	//第二个标签效果
	$("#realcontent").load("tabLoad.html");
	$("#tabsecond li").each(function(index){
		$(this).click(function(){
			$("#tabsecond li.tabin").removeClass("tabin");
			$(this).addClass("tabin");
			if (index == 0) {
				$("#realcontent").load("tabLoad.html");
			}
			else if (index == 1){
				//装入tabLoad.jsp中的h2里的内容
				$("#realcontent").load("tabLoad.jsp h2");
			}
			else if (index == 2){
				$("#realcontent").load("tabData.jsp");
			}
		});								  
	});
	//对loading图片绑定ajax交互开始和结束的事件
	$("#contentsecond img").bind("ajaxStart",function(){
		//清除realcontent里的内容
		$("#realcontent").html("");
		//整个页面中任意ajax交互前，function里的内容会被执行
		$(this).show();
	}).bind("ajaxStop",function(){
		//整个页面中任意ajax交互结束后，function里的内容会被执行
		$(this).slideUp('fast');
	});
});