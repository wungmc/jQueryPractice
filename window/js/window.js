$(document).ready(function(){
	//1.���"��ʾ�м䴰��"��ť,����������м���ʾ���м䴰��
	//2.�������ʾ��ߴ��ڡ���ť��������������½���ʾ��һ������
	//3.ҳ�������ɺ�������������½�Ʈ��һ������,֮����������
	
	//ע����ʾ�м䴰�ڵİ�ť�¼�
	var centerwin = $("#center");
	var rightwin = $("#right");
	var leftwin = $("#left");
	
	setTimeout(function(){
		centerwin.mywin({left:"center", top:"center"});
		leftwin.mywin({left:"left", top:"bottom"}, function(){
										leftwin.slideUp('slow');
									});
		
		//���½���������Ĵ���		
		var windowobj = $(window);
		//����margin��ֵ,�������������������������
		var cwinwidth = rightwin.outerWidth(true);
		var cwinheight = rightwin.outerHeight(true);
		var browserwidth = windowobj.width();
		var browserheight = windowobj.height();
		var scrollleft = windowobj.scrollLeft();
		var scrolltop = windowobj.scrollTop();
		//��������������
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
			//dequeue()������Ч���Ӷ������޳����ô��ڼȿ�����������ƶ��ֲ�Ӱ�쵭��
		},{left:rleft,top:(scrolltop + browserheight)}).fadeOut(15000).dequeue();
		
	},500);
	
	$("#centerpop").click(function(){		
		centerwin.show('slow');
	});
	$("#leftpop").click(function(){
		leftwin.slideDown('slow');
	});
	
	
});

//���ڲ��
//hidefunc ��ʾ���ش��ڵķ���
//positon��ʾ����λ�ã�initpos��ʾ��ʼλ��
$.fn.mywin = function(position, hidefunc, initpos){
	if (position && position instanceof Object){
		var positionleft = position.left;
		var positiontop = position.top;
				
		var windowobj = $(window);
		var browserwidth;
		var browserheight;
		var scrollleft;
		var scrolltop;
		//��ȡ��ǰ������Ŀ�Ⱥ͸߶�
		//��ȡ��ʾ���ڵĿ�Ⱥ͸߶�
		//��������ڵ���ʾλ��
		//��Ҫ���ǵ��������������������ֵ��������������ϱ�ֵ
		function getBrowserDim(){
			browserwidth = windowobj.width();
			browserheight = windowobj.height();
			scrollleft = windowobj.scrollLeft();
			scrolltop = windowobj.scrollTop();
		}
		
		var currentwin = this;
		//����margin��ֵ,�������������������������
		var cwinwidth;
		var cwinheight;
		
		var left;
		var top;
		//���㴰�ڵ���ʵ��߾�
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
		
		//���㴰�ڵ���ʵ�ϱ߾�
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
				
		//�ƶ�����
		function moveWin(){
			calLeft(currentwin.data("positionleft"),browserwidth,scrollleft,cwinwidth);
				calTop(currentwin.data("positiontop"),browserheight,scrolltop,cwinheight);
				currentwin.animate({
					left:left,
					top:top
				},300);
		}
		
		
		//����رհ�ťͼƬ���¼�
		currentwin.children(".title").children("img").click(function(){
			if (!hidefunc)
				currentwin.hide('slow');
			else
				hidefunc();
		});
		
		//�����ʼ��λ��
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
		
		//����margin��ֵ,�������������������������
		cwinwidth = currentwin.outerWidth(true);
		cwinheight = currentwin.outerHeight(true);
		
		currentwin.data("positionleft",positionleft);
		currentwin.data("positiontop",positiontop);
				
		//���¼��㴰�ڵ���߾���ϱ߾�
		getBrowserDim();
		moveWin();
		
		//ע��������������¼��������������������ʱ���ô�����Ȼ��ʾ�����������Ӧλ��
		var scrollTimeout;
		$(window).scroll(function(){
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function(){
				//�жϵ�ǰ�����Ƿ�ɼ���������ɼ�����ִ��������룬�����Ч��
				if (!currentwin.is(":visible"))
					return;
					
				getBrowserDim();
				moveWin();
			},300); //�ӳ�300����
			
		});
		
		//ע�ᴰ�ڴ�С�ı��¼������������С�ı�ʱ���ô�����Ȼ��ʾ�����������Ӧλ��
		$(window).resize(function(){
			//�жϵ�ǰ�����Ƿ�ɼ���������ɼ�����ִ��������룬�����Ч��
			if (!currentwin.is(":visible"))
				return;
				
			getBrowserDim();
			moveWin();
		});		
		
		return currentwin;
	}
}