<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%=request.getParameter("title") %>
<%

System.out.println(((String)request.getParameter("st02")).equals("on"));
System.out.println((String)request.getParameter("st03"));
System.out.println((String)request.getParameter("st04"));
System.out.println((String)request.getParameter("select"));
%>
</body>
</html>