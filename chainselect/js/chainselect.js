$(document).ready(function(){
	//�ҵ�����������
	var carnameSelect = $(".carname").children("select");
	var cartypeSelect = $(".cartype").children("select");
	var wheeltypeSelect = $(".wheeltype").children("select");
	//�ҵ�����ͼƬ
	var carimg = $(".carimg");
	
	//Ϊ������ע���¼�
	carnameSelect.change(function(){
		//����������������,���Ƿ�������
		cartypeSelect.next().hide();
		wheeltypeSelect.parent().hide();
		//����ͼƬ����
		carimg.hide().attr("src","");

		//��ȡ�������ֵ
		var carnameValue = $(this).val();
		//���ֵ��Ϊ��,���������е�ֵ���͸�������
		if (carnameValue != ""){
				//ֻҪ��һ������������ݸı��ˣ�����յڶ��������������
				cartypeSelect.html("");
				
				$("<option value=''>��ѡ����������</option>").appendTo(cartypeSelect);
				
				//���շ��������ص���������
				//�������������û����������
				//��䵽����������������
				//����ֻ��Ϊ��ʵ��һ��ajax��������ajaxStart������
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
				//��ʾָʾ��һ������������Ƿ���
				carnameSelect.next().show();
				//��ʾ��һ��������
				cartypeSelect.parent().show();
			
		}
		//���ֵΪ��
		else {
			//����ָʾ��һ������������Ƿ���
			carnameSelect.next().hide();
			//������һ��������
			cartypeSelect.parent().hide();
		}
	});
	
	cartypeSelect.change(function(){
		//����ͼƬ����
		carimg.hide().attr("src","");
		//��ȡ�������ֵ
		var cartypeValue = $(this).val();
		//���ֵ��Ϊ��,���������е�ֵ���͸�������
		if (cartypeValue != ""){
			//����ֻ��Ϊ��ʵ��һ��ajax��������ajaxStart������
			$("#test").html("");
			$("#test").load("tabLoad.html");
				//ֻҪ�ڶ�������������ݸı��ˣ�����յ����������������
				wheeltypeSelect.html("");
				
				$("<option value=''>��ѡ��������</option>").appendTo(wheeltypeSelect);
				//���շ��������صĳ�������
				//�������������û����������
				//��䵽����������������
				
				
				
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
				//��ʾָʾ��һ������������Ƿ���
				cartypeSelect.next().show();
				//��ʾ��һ��������
				wheeltypeSelect.parent().show();
		}
		//���ֵΪ��
		else {
			//����ָʾ��һ������������Ƿ���
			cartypeSelect.next().hide();
			//������һ��������
			wheeltypeSelect.parent().hide();
		}
	});
	
	wheeltypeSelect.change(function(){
		//��ȡ�������͵�ֵ
		var wheeltypeValue = $(this).val();
		//�����������̣��������ͣ����������ҵ���Ӧ������ͼƬ
		var carimgname = carnameSelect.val() + "_" + cartypeSelect.val() +"_" + wheeltypeSelect.val() + ".jpg";
		
		var carimg = $(".carimg");
		//����������ͼƬ
		carimg.hide();
		//��ʾcarloadingͼƬ
		$(".carloading").show();
		//ͨ��javascript�е�Image����Ԥװ��ͼƬ,����֪��ͼƬʲôʱ��װ����
		var cacheimg = new Image();
		$(cacheimg).attr("src","images/" + carimgname).load(function(){
			//����carloadingͼƬ
			$(".carloading").hide();
			//��ʾ����ͼƬ
			carimg.attr("src","images/" + carimgname).slideDown();
		});
		
		
	});
	
	//����װ���е�ͼƬ��ʾ
	$(".loading").ajaxStart(function(){
		$(this).css("visibility","visible");
		$(this).animate({
			opacity:1
		},0);
	}).ajaxStop(function(){
		//������ʹ�õ���css��display����
		//$(this).fadeOut(500);
		$(this).animate({
			opacity:0
		},300);
	});
	
});