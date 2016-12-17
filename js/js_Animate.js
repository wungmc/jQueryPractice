$(function() {
	var curIndex = -1; //被放大到原始大小的图片的索引
	var intImgL = "-120px";
	var intImgT = "-120px";
	$(".p_Lst").each(function(index){
		var $this = $(this);
		var $img = $this.find("img");
		var $info = $this.find(".p_Alt");
		//保存初始的长与宽
		var arrPic = {};
		arrPic.imgW = $img.width();
		arrPic.imgH = $img.height();
		arrPic.orgW = $this.width();
		arrPic.orgH = $this.height();
		
		$img.css({
			marginLeft: intImgL,
			marginTop: intImgT
		});
		
		//将图片、点击放大图片、点击关闭图片放入外框div
		var $drag = $("<div class='p_Img'>").append($img).appendTo($this);
		var $big = $("<a href='#' class='p_Big' title='点击放大'></a>").appendTo($this);
		var $cls = $("<a href='#' class='p_Cls' title='点击关闭'></a>").appendTo($info);
		//保存放入图片后的外框div的长和宽
		arrPic.dragW = $drag.width();
		arrPic.dragH = $drag.height();
		
		//点击放大事件
		$big.click(function(){
			$this.animate({
				width: arrPic.imgW,
				height: (arrPic.imgH + 85),
				borderWidth: "5"
			}, 3000);
			//隐藏“点击放大”
			$big.fadeOut();
			$(".p_Alt", $this).fadeIn();
			//图片div框动画
			$drag.animate({
				width: arrPic.imgW,
				height: arrPic.imgH
			}, 3000);
			//图片
			$img.animate({
				marginLeft: "0px",
				marginTop: "0px"
			}, 3000);
			
			if (curIndex != -1) {
				//获取当前被放大成原始图的图片各组成部分
				var $f_this = $(".p_Lst:eq(" + curIndex + ")");
				var $f_drag = $(".p_Img:eq(" + curIndex + ")");
				var $f_big = $(".p_Big:eq(" + curIndex + ")");
				var $f_info = $(".p_Alt:eq(" + curIndex + ")");
				var $f_imgs = $("img:eq(" + curIndex + ")");
				cls_Click($f_this, $f_big, $f_drag, $f_imgs, $f_info);
			}
			
			//重置获取当前被放大图片的索引
			curIndex = index;
		});
		
		//点击关闭事件
		$cls.click(function(){
			cls_Click($this, $big, $drag, $img, 1);
		});
		
		/*
        *@param 参数pF表示图片最外层Div
        *@param 参数pO表示图片点击前的放大按钮
        *@param 参数pW表示紧邻图片层Div
        *@param 参数pI表示紧选中的图片元素
        *@param 参数blnS表示图片中的说明内容
        */
        function cls_Click(pF, pO, pW, pI, blnS) {
			var  $strInit;
			pF.animate({
				width: arrPic.orgW,
				height: arrPic.orgH,
				borderWidth: "1"
			}, 3000);
			pO.fadeIn();
			if (blnS) {
                $strInit = $(".p_Alt", pF);
            } else {
                $strInit = blnS;
            }
            $strInit.fadeOut();
			pW.animate({
				width: arrPic.dragW,
				height: arrPic.dragH
			}, 3000);
			pI.animate({
				marginLeft: intImgL,
				marginTop: intImgT
			}, 3000);
		}
	});
})