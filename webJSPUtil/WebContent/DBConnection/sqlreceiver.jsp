<%@page import="khh.db.util.DBUtil"%>
<%@page import="khh.db.util.ConnectionUtil"%>
<%@page import="khh.web.UtilWeb"%>
<%@page import="java.sql.ResultSetMetaData"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>

<%
	String ip = request.getParameter("ip");
	String port = request.getParameter("port");
	String id = request.getParameter("id");
	String pwd = request.getParameter("pwd");
	String sid = request.getParameter("sid");
	String db = request.getParameter("db");
	String sql = request.getParameter("sql");

	int dbtype = ConnectionUtil.ORACLE;

	if (db.equals("oracle")) {
		dbtype = ConnectionUtil.ORACLE;
	} else if (db.equals("mysql")) {
		dbtype = ConnectionUtil.MYSQL;
	}
	Connection conn = ConnectionUtil.getConnection(dbtype, ip, port, sid, id, pwd);
	PreparedStatement pstmt = conn.prepareStatement(sql);
	ResultSet rs = pstmt.executeQuery();

	String tabletag = DBUtil.getTableTag(rs);
	rs.close();
	pstmt.close();
	conn.close();
%>
<%=tabletag %>
<%-- <table border="1">
	<tr>
		<%
			int columncnt = rsm.getColumnCount();
			for (int i = 1; i <= columncnt; i++) {
		%>
		<td><%= rsm.getColumnName(i) %></td>
		<%
			}
		%>
		
		
		
		<%
		while (rs.next())
		{
		%>
		<tr>
				<%for(int i=1; i<=columncnt; i++){%>
				<td> <%=rs.getString(i) %> </td>
				<%}%>
		</tr>
		<%}%>
	</tr>
</table>

<%
rs.close();
pstmt.close();
conn.close();

%>
--%>