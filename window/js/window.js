$(document).ready(function(){
	//1.点击"显示中间窗口"按钮,在浏览器的中间显示出中间窗口
	//2.点击”显示左边窗口“按钮，在浏览器的左下角显示出一个窗口
	//3.页面加载完成后，在浏览器的右下角飘出一个窗口,之后慢慢淡出
	
	//注册显示中间窗口的按钮事件
	var centerwin = $("#center");
	var rightwin = $("#right");
	var leftwin = $("#left");
	
	setTimeout(function(){
		centerwin.mywin({left:"center", top:"center"});
		leftwin.mywin({left:"left", top:"bottom"}, function(){
										leftwin.slideUp('slow');
									});
		
		//右下角徐徐升起的窗口		
		var windowobj = $(window);
		//包含margin的值,这样不会让浏览器产生滚动条
		var cwinwidth = rightwin.outerWidth(true);
		var cwinheight = rightwin.outerHeight(true);
		var browserwidth = windowobj.width();
		var browserheight = windowobj.height();
		var scrollleft = windowobj.scrollLeft();
		var scrolltop = windowobj.scrollTop();
		//解决跨浏览器问题
		var rleft = scrollleft + browserwidth - cwinwidth;
		if ($.browser.safari)
			rleft = rleft - 15;
		if ($.browser.opera)
			rleft = rleft + 15;
		if ($.browser.msie && $.browser.version.indexOf("8") >= 0){
			rleft = rleft - 10;
		}
			
		rightwin.mywin({left:"right",top:"bottom"},function(){
			rightwin.hide();
			//dequeue()将动画效果从队列里剔除，让窗口既可以随滚动条移动又不影响淡出
		},{left:rleft,top:(scrolltop + browserheight)}).fadeOut(15000).dequeue();
		
	},500);
	
	$("#centerpop").click(function(){		
		centerwin.show('slow');
	});
	$("#leftpop").click(function(){
		leftwin.slideDown('slow');
	});
	
	
});

//窗口插件
//hidefunc 表示隐藏窗口的方法
//positon表示最终位置，initpos表示初始位置
$.fn.mywin = function(position, hidefunc, initpos){
	if (position && position instanceof Object){
		var positionleft = position.left;
		var positiontop = position.top;
				
		var windowobj = $(window);
		var browserwidth;
		var browserheight;
		var scrollleft;
		var scrolltop;
		//获取当前浏览器的宽度和高度
		//获取显示窗口的宽度和高度
		//计算出窗口的显示位置
		//需要考虑到浏览器横向滚动条的左边值和纵向滚动条的上边值
		function getBrowserDim(){
			browserwidth = windowobj.width();
			browserheight = windowobj.height();
			scrollleft = windowobj.scrollLeft();
			scrolltop = windowobj.scrollTop();
		}
		
		var currentwin = this;
		//包含margin的值,这样不会让浏览器产生滚动条
		var cwinwidth;
		var cwinheight;
		
		var left;
		var top;
		//计算窗口的真实左边距
		function calLeft(positionleft,browserwidth,scrollleft,cwinwidth){
			if (positionleft && typeof positionleft == "string"){
				if (positionleft == "center"){
					left = scrollleft + (browserwidth - cwinwidth) / 2;
				}else if (positionleft == "left"){
					left = scrollleft;
				}else if (positionleft == "right"){
					left = scrollleft + browserwidth - cwinwidth;
					if ($.browser.safari)
						left = left - 15;
					if ($.browser.opera)
						left = left + 15;
					if ($.browser.msie && $.browser.version.indexOf("8") >= 0){
						left = left - 10;
					}
				}else {
					left = scrollleft + (browserwidth - cwinwidth) / 2;
				}
			}else if (positionleft && typeof positionleft == "number"){
				left = positionleft;
			}else {
				left = 0;
			}
						
		}		
		
		//计算窗口的真实上边距
		function calTop(positiontop,browserheight,scrolltop,cwinheight){
			if (positiontop && typeof positiontop == "string"){
				if (positiontop == "center"){
					top = scrolltop + (browserheight - cwinheight) / 2;
				}else if (positiontop == "top"){
					top = scrolltop;
				}else if (positiontop == "bottom"){
					top = scrolltop + browserheight - cwinheight;
					if ($.browser.opera)
						top = top - 25;
				}else {
					top = scrolltop + (browserheight - cwinheight) / 2;
				}
			}else if (positiontop && typeof positiontop == "number"){
				top = positiontop;
			}else {
				top = 0;
			}
			
		}
				
		//移动窗口
		function moveWin(){
			calLeft(currentwin.data("positionleft"),browserwidth,scrollleft,cwinwidth);
				calTop(currentwin.data("positiontop"),browserheight,scrolltop,cwinheight);
				currentwin.animate({
					left:left,
					top:top
				},300);
		}
		
		
		//定义关闭按钮图片的事件
		currentwin.children(".title").children("img").click(function(){
			if (!hidefunc)
				currentwin.hide('slow');
			else
				hidefunc();
		});
		
		//计算初始化位置
		if (initpos && initpos instanceof Object){
			var initleft = initpos.left;
			var inittop = initpos.top;
			
			if (initleft && typeof initleft == "number"){
				currentwin.css("left",initleft);
			}else {
				currentwin.css("left",0);
			}
			if (inittop && typeof inittop == "number"){
				currentwin.css("top",inittop);
			}else {
				currentwin.css("top",0);
			}
			currentwin.show();
		}
		
		//包含margin的值,这样不会让浏览器产生滚动条
		cwinwidth = currentwin.outerWidth(true);
		cwinheight = currentwin.outerHeight(true);
		
		currentwin.data("positionleft",positionleft);
		currentwin.data("positiontop",positiontop);
				
		//重新计算窗口的左边距和上边距
		getBrowserDim();
		moveWin();
		
		//注册浏览器滚动条事件，当浏览器滚动条滚动时，让窗口依然显示在浏览器的相应位置
		var scrollTimeout;
		$(window).scroll(function(){
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function(){
				//判断当前窗口是否可见，如果不可见怎不执行下面代码，以提高效率
				if (!currentwin.is(":visible"))
					return;
					
				getBrowserDim();
				moveWin();
			},300); //延迟300毫秒
			
		});
		
		//注册窗口大小改变事件，当浏览器大小改变时，让窗口依然显示在浏览器的相应位置
		$(window).resize(function(){
			//判断当前窗口是否可见，如果不可见怎不执行下面代码，以提高效率
			if (!currentwin.is(":visible"))
				return;
				
			getBrowserDim();
			moveWin();
		});		
		
		return currentwin;
	}
}