$(document).ready(function(){
	//�ҵ����е�li
	//each��ʾ$("li")�����ص�jquery���󶼻�ִ��function��Ĵ���
	//indexΪ$("li")�����ص�jquery����������±�
	var timeoutId;
	$("#tabfirst li").each(function(index){						  
		//���������tab��ǩ��ʱ��ע������¼�
		//�������������tab�ϻ���ʱ��ǩҲ�仯�����⣬ʹ����ʱ����
		
			$(this).mouseover(function(){
				var liNode = $(this);
				timeoutId = setTimeout(function(){
					//����ԭ����ʾ��div
					$("div.contentin").removeClass("contentin");
					//����tab��Ч��
					$("#tabfirst li.tabin").removeClass("tabin");
					
					//��ʾ��ǰtab��Ч��
					liNode.addClass("tabin");
					//��ʾ��ǰli��Ӧ��div
					$("div.contentfirst").eq(index).addClass("contentin");
				},300);
			}).mouseout(function(){
				//������Ƴ�ʱ�������ʱ��
				clearTimeout(timeoutId);
			});		
	});
	
	
	//�ڶ�����ǩЧ��
	$("#realcontent").load("tabLoad.html");
	$("#tabsecond li").each(function(index){
		$(this).click(function(){
			$("#tabsecond li.tabin").removeClass("tabin");
			$(this).addClass("tabin");
			if (index == 0) {
				$("#realcontent").load("tabLoad.html");
			}
			else if (index == 1){
				//װ��tabLoad.jsp�е�h2�������
				$("#realcontent").load("tabLoad.jsp h2");
			}
			else if (index == 2){
				$("#realcontent").load("tabData.jsp");
			}
		});								  
	});
	//��loadingͼƬ��ajax������ʼ�ͽ������¼�
	$("#contentsecond img").bind("ajaxStart",function(){
		//���realcontent�������
		$("#realcontent").html("");
		//����ҳ��������ajax����ǰ��function������ݻᱻִ��
		$(this).show();
	}).bind("ajaxStop",function(){
		//����ҳ��������ajax����������function������ݻᱻִ��
		$(this).slideUp('fast');
	});
});