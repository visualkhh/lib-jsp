<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/jquery.js"></script>
</head>
<script type="text/javascript">

<%
String bilTxt ="a";
%>
<%=(bilTxt.length>0?"true":"false") %>
function onStart() {
	var a = ElementUtil.createE("<b>aaa</b><a href='aa'>aa</a>");
	var b = $("<b>aaa</b><a href='aa'>aa</a>");
	Selector.ei("a").appendChild(a);
	$("#b").append(b);
}
	EventUtil.addOnloadEventListener(onStart);
</script>

<body>

<div id="a">
</div>
<div id="b">
</div>

</body>
</html>