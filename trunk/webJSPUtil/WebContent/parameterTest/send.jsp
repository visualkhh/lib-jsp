<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%

String a = request.getParameter("a");
System.out.println(a);
%>
<form action="">
<input disabled="disabled" name='a' type="radio" value="a1" checked="checked"/> 
<input  name='a' type="radio" value="a2"/> 
<input  name='a' type="radio" value="a3"/> 
<input  name='a' type="radio" value="a4"/> 
<input type="submit"/>
</form>
</body>
</html>