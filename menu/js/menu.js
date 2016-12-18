// JavaScript Document
$(document).ready(function(){
	//>表示main下的a子元素，而不是所有的a
	$(".main > a").click(function(){
		var ulNode = $(this).next("ul");
		
		/*第一种方法
		if (ulNode.css("display") == "none"){
			ulNode.css("display","block");
		}
		else {
			ulNode.css("display","none");
		}
		*/
		
		/*第二种方法，使用jquery提供的方法*/
		//show()的参数可以不写，也可以为一个数字代表毫秒
		//也可以为slow,normal, fast
		/*
		if (ulNode.css("display") == "none"){
			ulNode.show("fast");
		}
		else {
			ulNode.hide();
		}
		*/
		
		/*第三中方法*/
		//使用toggle方法，其参数与show相同，
		//当ulNode为隐藏的时候，则显示，否则隐藏，省去了if else的判断语句
		//ulNode.toggle();
		/*var parent = $(this);
		$(".main").each(function(){
				var ch = $(this).children("a");
				if (ch == parent) {
					if (ch.css("background-image").indexOf("collapsed.gif") >= 0){
					//$(this).children("a").css("background-image","url('images/expanded.gif')");
						changeIcon(ch);
						$(this).children("ul").slideToggle();
					}
				}
				else {
					if (ch.css("background-image").indexOf("expanded.gif") >= 0){
					//$(this).children("a").css("background-image","url('images/expanded.gif')");
						changeIcon(ch);
						$(this).children("ul").slideToggle();
					}
				}
				
		});*/
		
		/*第四种方法*/
		//使用slideToggle()方法，实现卷帘的效果
		changeIcon($(this));
		ulNode.slideToggle();
		
	});
	
	//横向菜单的鼠标移出和移入的处理
	$(".hmain").hover(function(){
		//移入
		changeIcon($(this).children("a"));
		$(this).children("ul").slideDown();
	},function(){
		changeIcon($(this).children("a"));
		$(this).children("ul").slideUp();
	});
});

/**
*更换一级菜单左侧的箭头图标
*/
function changeIcon(mainNode){
	if (mainNode.css("background-image").indexOf("collapsed.gif") >= 0){
		mainNode.css("background-image","url('images/expanded.gif')");
	}else {
		mainNode.css("background-image","url('images/collapsed.gif')");
	}
}