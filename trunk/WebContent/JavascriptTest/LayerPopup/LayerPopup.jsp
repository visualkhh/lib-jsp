<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/JavascriptUtil/util.js"></script> 
<script type="text/javascript">
var $S=Selector;
var $E=EventUtil;
var $D=Debug;
var $DC=DocumentUtil;


function start(){
	var show_btn = $S.ei("show_btn");
	var close_btn = $S.ei("close_btn");
	var show_detail = $S.ei("show_detail");
	
	$E.addEventListener(show_btn,$E.TYPE_CLICK,show);
	$E.addEventListener(close_btn,$E.TYPE_CLICK,close);
	$E.addEventListener(show_detail,$E.TYPE_CLICK,showDetail);
	$E.addEventListener(window,$E.TYPE_RESIZE,windowResize);
};
	
	var a=1;
function windowResize(){
	document.title=a++;
	var popup = $S.ei("popup");
	$DC.newPopup(popup,400,200);
};

function show(){
	$D.debug("show");
	var popup = $S.ei("popup");
	DocumentUtil.show(popup);
}
function close(){
	$D.debug("close");
	var popup = $S.ei("popup");
	DocumentUtil.close(popup);
}

function showDetail(){
	var show_detail = $S.ei("popup");
	alert(StyleUtil.getCSS(show_detail)); 
}

$E.addOnloadEventListener(start);

</script>
</head>
<body>
가<br> 
나<br>
<div id="popup" style="background-color: blue; width: 100px;height: 100px; ">wowowo</div>
LayerPopup.jsp
<input type="button" id="show_btn" value="show_btn"/>
<input type="button" id="close_btn" value="close_btn"/>
<input type="button" id="show_detail" value="show_detail"/>
</body>
</html>