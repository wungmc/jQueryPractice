$(function() {
	var curIndex = -1; //���Ŵ�ԭʼ��С��ͼƬ������
	var intImgL = "-120px";
	var intImgT = "-120px";
	$(".p_Lst").each(function(index){
		var $this = $(this);
		var $img = $this.find("img");
		var $info = $this.find(".p_Alt");
		//�����ʼ�ĳ����
		var arrPic = {};
		arrPic.imgW = $img.width();
		arrPic.imgH = $img.height();
		arrPic.orgW = $this.width();
		arrPic.orgH = $this.height();
		
		$img.css({
			marginLeft: intImgL,
			marginTop: intImgT
		});
		
		//��ͼƬ������Ŵ�ͼƬ������ر�ͼƬ�������div
		var $drag = $("<div class='p_Img'>").append($img).appendTo($this);
		var $big = $("<a href='#' class='p_Big' title='����Ŵ�'></a>").appendTo($this);
		var $cls = $("<a href='#' class='p_Cls' title='����ر�'></a>").appendTo($info);
		//�������ͼƬ������div�ĳ��Ϳ�
		arrPic.dragW = $drag.width();
		arrPic.dragH = $drag.height();
		
		//����Ŵ��¼�
		$big.click(function(){
			$this.animate({
				width: arrPic.imgW,
				height: (arrPic.imgH + 85),
				borderWidth: "5"
			}, 3000);
			//���ء�����Ŵ�
			$big.fadeOut();
			$(".p_Alt", $this).fadeIn();
			//ͼƬdiv�򶯻�
			$drag.animate({
				width: arrPic.imgW,
				height: arrPic.imgH
			}, 3000);
			//ͼƬ
			$img.animate({
				marginLeft: "0px",
				marginTop: "0px"
			}, 3000);
			
			if (curIndex != -1) {
				//��ȡ��ǰ���Ŵ��ԭʼͼ��ͼƬ����ɲ���
				var $f_this = $(".p_Lst:eq(" + curIndex + ")");
				var $f_drag = $(".p_Img:eq(" + curIndex + ")");
				var $f_big = $(".p_Big:eq(" + curIndex + ")");
				var $f_info = $(".p_Alt:eq(" + curIndex + ")");
				var $f_imgs = $("img:eq(" + curIndex + ")");
				cls_Click($f_this, $f_big, $f_drag, $f_imgs, $f_info);
			}
			
			//���û�ȡ��ǰ���Ŵ�ͼƬ������
			curIndex = index;
		});
		
		//����ر��¼�
		$cls.click(function(){
			cls_Click($this, $big, $drag, $img, 1);
		});
		
		/*
        *@param ����pF��ʾͼƬ�����Div
        *@param ����pO��ʾͼƬ���ǰ�ķŴ�ť
        *@param ����pW��ʾ����ͼƬ��Div
        *@param ����pI��ʾ��ѡ�е�ͼƬԪ��
        *@param ����blnS��ʾͼƬ�е�˵������
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