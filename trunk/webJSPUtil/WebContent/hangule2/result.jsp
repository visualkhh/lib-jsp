
<%@page import="java.net.URLDecoder"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
::result::<p>
<%
String result="";

result = request.getParameter("intext");
System.out.println("firest    "+result);


result = URLDecoder.decode(result,"UTF-8");


System.out.println("hangule    "+result);
%>

<%=result %>
</body>
</html>