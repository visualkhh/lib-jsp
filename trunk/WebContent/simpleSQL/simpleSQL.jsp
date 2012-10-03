<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.kdn.util.db.DBUtil"%>
<%@page import="java.sql.Connection"%>
<%@page import="com.kdn.util.db.ConnectionUtil"%>
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
		Connection conn = ConnectionUtil.getConnection(
				ConnectionUtil.ORACLE, "10.200.34.203",
				ConnectionUtil.ORACLE_DAFAULT_PORT, "XE", "scott", "tiger");

		ArrayList a = new ArrayList();
		a.add("2101");
		//ResultSet rs = DBUtil.executeQuery(conn,	"select * from YTSYST06 where dept_cd=?", a);
	%>
	<%=DBUtil.getTableTag(rs)%>

	<%
		rs.close();
		conn.close();
	%>
</body>
</html>