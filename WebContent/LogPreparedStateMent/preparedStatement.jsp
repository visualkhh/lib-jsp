<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@page import="khh.web.jsp.db.util.ConnectionWebUtil"%>
<%@page import="com.kdn.util.db.statement.LogPreparedStatement"%>
<%@page import="java.sql.PreparedStatement"%>
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
	String ip="10.200.34.206";
	String port="1521";
	String sid="DEVORA";
	String id="distadmin";
	String passwd="distadmin";
	//Connection connection = ConnectionUtil.getConnection(ConnectionUtil.ORACLE,ip ,port, sid, id, passwd);
	Connection connection = ConnectionWebUtil.getConnectionByJNDI("jdbc/webJSPUtil");

	
	String sql = "select * from tabs where TABLE_NAME like ?";
	System.out.println("---***-->  "+sql);
	
	PreparedStatement preparedStatement =  new LogPreparedStatement(connection,sql);
	preparedStatement.setString(1, "' or 1=1");
	System.out.println( ((LogPreparedStatement)preparedStatement).getQueryString());
	
	ResultSet rs = preparedStatement.executeQuery();
	
	  while(rs.next()) {
%>

      
    <%= rs.getString("TABLE_NAME") %></p>
<%
        } %>


</body>
</html>