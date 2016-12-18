// JavaScript Document
$(document).ready(function(){
	//�ҵ�tbody���������
	//even�ǹ���������ʾż����ʹ��even��Ŀ���ǰ�tbody tr���ص�trԪ���У�����������±�Ϊż����tr����
	$("tbody tr:even").css("background-color", "#ece9d8" );	
	
	//�ҵ�������td
	var numTd = $("tbody td:even");
	
	//ע�ᵥ���¼�
	numTd.click(function(){
		//���汻�����ĵ�Ԫ��
		var tdObj = $(this);
		var inputObj = $("<input type='text'>");
		if (tdObj.children("input").length > 0) {
			//td����input����ִ��click�¼�
			return false;
		}
		//���浥Ԫ������
		var tdValue = tdObj.html();
		//����Ԫ���е��������
		tdObj.html("");
		
		
		//����Ԫ���е�������ӵ�input��
		//��input�Ŀ����Ϊԭ��Ԫ��Ŀ��
		//ȥ��input�ı߿�
		//����input�������С
		//����input�ı�����ɫΪԭ��Ԫ�����ɫ
		//��input���뵥Ԫ����
		inputObj.val(tdValue)
				.width(tdObj.width())
				.css("border-width","0px")
				.css("font-size","16px")
				.css("background-color",tdObj.css("background-color"))
				.appendTo(tdObj);
				
		//������input����ѡ��״̬
		inputObj.trigger('focus').trigger('select');
		
		inputObj.click(function(){
			return false;
		});
		
		//��Ӧ�س���esc����
		inputObj.keyup(function(event){
			//���水���ļ�ֵ
			var keyCode = event.which;
			//��Ӧ�س�
			if (keyCode == 13) {
				var inputvalue = $(this).val();
				tdObj.html(inputvalue);
			}
			
			//��Ӧesc
			if (keyCode == 27){
				tdObj.html(tdValue);
			}
		});
	});
	
});
