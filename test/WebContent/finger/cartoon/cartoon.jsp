<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js_css/jquery.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<style>
* {
	margin: 0;
	padding: 0;
}

img {
	border: 0;
}

ol,ul {
	list-style-type: none;
}

.warp {
	width: 157px;
	margin: 10px
}

.tiplist ul {
	margin: 0px
}

.tiplist li {
	display: block;
	margin-bottom: 4px
}

.mb5 {
	margin-bottom: 5px
}

.mb15 {
	margin-bottom: 15px
}
</style>
<script type="text/javascript">
	$(function() {
		var navi = $('#cartoon_navi li');
		if(navi.length<13){
			var padding_px = ((13-navi.length)*12);
			$('#cartoon_navi').css("padding-left",padding_px+'px');
		}
		
		navi.each(function(index) {
			$(this).css("background-color", "#C7C7C7");
			$(this).css("color", "#FFFFFF");
			$(this).css("font-size", "10px"); 
			$(this).css("margin", "1px");
			$(this).css("float", "left");
			$(this).css("width", "10px");
			$(this).css("height", "10px");
			$(this).css("text-align", "center");
			$(this).hover(function() {
				clearNavi();
				$(this).css("background-color", "#244FC0");
				$(this).css("cursor", "pointer");
				$("#cartoon").attr("src",$(this).attr("src"));
				$("#cartoon").attr("index",index);
			}, function() {
				$(this).css("cursor", "auto");
			});
		});
		
		
	nextCartoon();
	  var   timer = setInterval(function () {
		  nextCartoon();
		}, 1000*5);//5초
		    
	});
	
	
	function clearNavi(){
		$('#cartoon_navi li').each(function(index){
			$(this).css("background-color", "#C7C7C7");
			$(this).css("cursor", "auto");
		});
	}
	
	function nextCartoon(){
		  var navi = $('#cartoon_navi li');
		  var index = $("#cartoon").attr("index");
		  if(index+1>=navi.length){
			  index = 0;
		  }else{
			  index=Number(index)+1;;
		  }
		  var atE= $(navi[index]);
			clearNavi();
			atE.css("background-color", "#244FC0");
			atE.css("cursor", "pointer");
			$("#cartoon").attr("src",atE.attr("src"));
			$("#cartoon").attr("src",atE.attr("src"));
			$("#cartoon").attr("index",index);
	}
</script>
<body>
	<div class="warp">
		<div class="mb15">
			<h1 class="mb5">
				<img src="images/left_title_video.gif" width="65" height="15"
					alt="동영상" />
			</h1>
			<img src="images/img_box_video.gif" width="157" height="87"
				alt="동영상박스" />
			<!--<embed src="0000.avi" pluginspage="http://www.adobe.com/shockwave/download/" width="157" height="87"></embed>-->
		</div>
		<div class="tiplist mb15">
			<h2 class="mb5">
				<img src="images/left_title_tip.gif" width="63" height="15"
					alt="활용팁보기" />
			</h2>
			<ul>
				<li><a target="_blank" href="http://211.233.68.10/InsideBank/guide/tip/InsideBank_Lite06.pdf"><img src="images/tip_list_01.gif"
						width="157" height="45" /></a></li>
				<li><a href="#"><img src="images/tip_list_02.gif"
						width="157" height="53" /></a></li>
				<li><a href="#"><img src="images/tip_list_03.gif"
						width="157" height="45" /></a></li>
				<li><a href="#"><img src="images/tip_list_04.gif"
						width="157" height="45" /></a></li>
				<li><a href="#"><img src="images/tip_list_05.gif"
						width="157" height="45" /></a></li>
			</ul>
		</div>
		<div class="tiplist mb15" >
			<h3 class="mb5">
				<img src="images/left_title_cartoon.gif" width="51" height="15"	alt="카툰보기" />
				<!-- cartoon_img01~ cartoon_img05 -->
				</h2>
				<ul id="cartoon_navi" >
					<li src="images/cartoon_img01.jpg" title="1">1</li>
					<li src="images/cartoon_img02.jpg" title="2">2</li>
					<li src="images/cartoon_img03.jpg" title="3">3</li>
					<li src="images/cartoon_img04.jpg" title="4">4</li>
					<li src="images/cartoon_img05.jpg" title="5">5</li>
				</ul>
				<img id="cartoon" index='-1'/>
		</div>
	</div>
</body>
</html>