$(document).ready(function(){
	//找到button按钮，注册事件
	$("#Button").click(function(){
		var userName = $("#userName").val();
		if (userName == "") {
			alert("userName is null!");
		}else {
			//把数据发送到服务器
			$("#result").html(userName + " success");
		}
	})
	
	//找到文本框，注册事件
	$("#userName").keyup(function(){
		var userName = $(this).val();
		if (userName == "") {
			$(this).addClass("userText");
		}else{
			$(this).removeClass("userText");
		}
	})
	
})