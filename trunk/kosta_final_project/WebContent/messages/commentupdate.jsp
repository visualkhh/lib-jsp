<?xml version="1.0" encoding="euc-kr" ?>
<%@ page contentType="text/xml; charset=euc-kr" %>
<%@ page import = "java.sql.Connection" %>
<%@ page import = "java.sql.Statement" %>
<%@ page import = "java.sql.PreparedStatement" %>
<%@ page import = "java.sql.SQLException" %>
<%@ page import = "util.Util" %>
<%@ page import = "util.DB" %>
<%
	request.setCharacterEncoding("utf-8");
	int id = Integer.parseInt(request.getParameter("id"));
	String name = request.getParameter("name");
	String content = request.getParameter("content");
	
	DB db = DB.getInstance();
	Connection conn = null;
	PreparedStatement pstmt = null;
	try {
		conn = db.getConnection();
		conn.setAutoCommit(false);
		
		pstmt = conn.prepareStatement(
			"update COMMENTS set NAME=?, CONTENT=? where ID=?");
		pstmt.setString(1, name);
		pstmt.setString(2, content);
		pstmt.setInt(3, id);
		pstmt.executeUpdate();
		
		conn.commit();
%>
<result>
	<code>success</code>
	<data><![CDATA[
	{
		id: <%= id %>,
		name: '<%= Util.toJS(name) %>',
		content: '<%= Util.toJS(content) %>'
	}
	]]></data>
</result>
<%
	} catch(Throwable e) {
		try { conn.rollback(); } catch(SQLException ex) {}
%>
<result>
	<code>error</code>
	<message><![CDATA[<%= e.getMessage() %>]]></message>
</result>
<%
	} finally {
		if (pstmt != null) 
			try { pstmt.close(); } catch(SQLException ex) {}
		if (conn != null) try {
			conn.setAutoCommit(true);
			conn.close();
		} catch(SQLException ex) {}
	}
%>