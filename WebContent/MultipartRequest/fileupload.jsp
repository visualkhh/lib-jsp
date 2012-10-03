<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="java.util.Enumeration"%>
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
<%



System.out.println( request.getContentType());
System.out.println( request.getMethod());


HttpServletRequest ga = request;

String path="F:\\cd\\web\\webJSPUtil\\WebContent\\MultipartRequest\\download";
MultipartRequest multipartrequest = new MultipartRequest(request,path,1024*1000,"UTF-8",new DefaultFileRenamePolicy());


String a  = (String)multipartrequest.getParameter("command");

Enumeration params = multipartrequest.getParameterNames(); 
while(params.hasMoreElements()){ 
	String key = (String)params.nextElement(); 
	String value = multipartrequest.getParameter(key); 
	System.out.println("M  :  "+key+ "    " + value);
}


%>

<%=a %> <p>
<%=request.getParameter("file") %><p>
<%=request.getParameter("command") %>

</body>
</html>