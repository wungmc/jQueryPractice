// JavaScript Document
$(document).ready(function(){
	//>��ʾmain�µ�a��Ԫ�أ����������е�a
	$(".main > a").click(function(){
		var ulNode = $(this).next("ul");
		
		/*��һ�ַ���
		if (ulNode.css("display") == "none"){
			ulNode.css("display","block");
		}
		else {
			ulNode.css("display","none");
		}
		*/
		
		/*�ڶ��ַ�����ʹ��jquery�ṩ�ķ���*/
		//show()�Ĳ������Բ�д��Ҳ����Ϊһ�����ִ������
		//Ҳ����Ϊslow,normal, fast
		/*
		if (ulNode.css("display") == "none"){
			ulNode.show("fast");
		}
		else {
			ulNode.hide();
		}
		*/
		
		/*�����з���*/
		//ʹ��toggle�������������show��ͬ��
		//��ulNodeΪ���ص�ʱ������ʾ���������أ�ʡȥ��if else���ж����
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
		
		/*�����ַ���*/
		//ʹ��slideToggle()������ʵ�־�����Ч��
		changeIcon($(this));
		ulNode.slideToggle();
		
	});
	
	//����˵�������Ƴ�������Ĵ���
	$(".hmain").hover(function(){
		//����
		changeIcon($(this).children("a"));
		$(this).children("ul").slideDown();
	},function(){
		changeIcon($(this).children("a"));
		$(this).children("ul").slideUp();
	});
});

/**
*����һ���˵����ļ�ͷͼ��
*/
function changeIcon(mainNode){
	if (mainNode.css("background-image").indexOf("collapsed.gif") >= 0){
		mainNode.css("background-image","url('images/expanded.gif')");
	}else {
		mainNode.css("background-image","url('images/collapsed.gif')");
	}
}