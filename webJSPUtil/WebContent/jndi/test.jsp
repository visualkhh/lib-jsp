<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page import="khh.web.jsp.db.util.ConnectionWebUtil"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
aaaa
<%

Connection c = ConnectionWebUtil.getConnectionByJNDI("jdbc/ndas3");

Statement s = c.createStatement();

ResultSet rs  = s.executeQuery("select * from tab");

while(rs.next()){
	System.out.println(rs.getString(1));
}

%>
</body>
</html>