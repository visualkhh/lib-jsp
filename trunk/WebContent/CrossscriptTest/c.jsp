<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
url=%3Cscript%3EPSScanW3B_43460%3D%22test%22%3C%2Fscript%3E&menuid=2000
<%
String[] f = {"<",">"};
String r = request.getParameter("url");
String rr = request.getParameter("rr");
System.out.println(rr);
rr = rr.replaceAll("<", "");
System.out.println(rr);

%>


<%=r %><br>
<%=rr %><br>

</body>
</html>