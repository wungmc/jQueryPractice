$(document).ready(function(){
	//�ҵ�button��ť��ע���¼�
	$("#Button").click(function(){
		var userName = $("#userName").val();
		if (userName == "") {
			alert("userName is null!");
		}else {
			//�����ݷ��͵�������
			$("#result").html(userName + " success");
		}
	})
	
	//�ҵ��ı���ע���¼�
	$("#userName").keyup(function(){
		var userName = $(this).val();
		if (userName == "") {
			$(this).addClass("userText");
		}else{
			$(this).removeClass("userText");
		}
	})
	
})