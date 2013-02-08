<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="<%=request.getContextPath()%>/JavascriptUtil/util.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js_css/jquery.js"></script>
<script type="text/javascript">
var namegaga="aaa";
var newWindow;
function oo(){
	//WindowUtil.newPopup("./newWindow.jsp",100,100);	
	//WindowUtil.close(window);
	var url="./newWindow.jsp";
	var name_v="hhk";
	var winprops = "scrollbars=NO,resizable = YES, status=YES, width=100, height=100";
	 newWindow= window.open(url,name_v,winprops);
	setTimeout("newWindow.haha('vvvvvvvvv')",1000*3);
}
function ga(){
	$("#pp").popupWindow({ 
		height:500, 
		width:800, 
		top:50, 
		left:50 
		}); 


};
</script>
<body>
<input type="button" value="aaaaaaaaaa"  onclick="oo()"/>
<input type="button" value="aaaaaaa5444aaaa"  onclick="newWindow.haha('1');"/>
<input type="button" value="ga"  onclick="ga()"/>
<div style="background-color: black; width: 100px;height: 100px" id="pp"></div>
</body>
</html>