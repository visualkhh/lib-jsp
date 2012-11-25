<%@page import="java.util.Enumeration"%>
<%@page import="java.io.File"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%=request.getParameter("idinput") %>
<%=request.getParameter("a") %>
<%  
System.out.println(request.getContentType());

MultipartRequest m = new MultipartRequest(request,"c:\\");
Enumeration em = m.getFileNames();
while(em.hasMoreElements()){
	System.out.println((String)em.nextElement());
}
System.out.println();

em = m.getParameterNames();
while(em.hasMoreElements()){
	String key=(String)em.nextElement();
	System.out.println(key+"    "+m.getParameter(key));
}

%>
</body>
</html>