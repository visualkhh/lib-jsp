<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<% 
response.reset();
response.setContentType("application/vnd.ms-excel;charset=UTF-8");
response.setHeader("Content-Disposition", "attachment; filename=exceldownloaderl.xls");
response.setHeader("Content-Disposition","Data");
//System.out.println(request.getParameter("table") );
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%=request.getParameter("table") %>
</body>
</html>