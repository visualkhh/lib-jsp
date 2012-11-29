<%@page import="khh.web.jsp.cookie.CookieUtil"%>
<%@page import="khh.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="<%=request.getContextPath()%>/JavascriptUtil/util.js"></script>
<script type="text/javascript">
function setCook(){
	CookieUtil.setCookie("visualhhk", "good", 60*60*24);
}
function getCook(){
	//CookieUtil.getCookie("visualhhk")
	Debug.debug( "------------"+CookieUtil.getCookie("visualhhk"));
}
function removeCook(){
	CookieUtil.delCookie("visualhhk");
}

</script>
<body>
<input type="button" value="setCook" onclick="setCook()"/>
<input type="button" value="getCook" onclick="getCook()"/>
<input type="button" value="removeCook" onclick="removeCook()"/>
</body>
<%
//CookieUtil.setCookie(response, "visualhhk", "jspgood");
CookieUtil.delCookie(response, "visualhhk");
%>
<%
//CookieUtil.setCookie(response, "visualhhk", "jspgood", 60*60*24);

%>

<%=
CookieUtil.getCookie(request, "visualhhk")
%>
</html>