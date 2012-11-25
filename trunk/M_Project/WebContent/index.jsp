<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="com.web.jsp.util.db.connection.ConnectionWebUtil"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.ResultSet"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
hello M_project
<%--
Connection con= ConnectionWebUtil.getConnectionByJNDI("jdbc/mproject");
Statement st = con.createStatement();
ResultSet rs = st.executeQuery("select * from line_t");
while(rs.next()){
	System.out.println( rs.getString("LINE_NAME"));
}

--%>


<%--
Connection mysqlCon = null;
try {
    Class.forName("com.mysql.jdbc.Driver");
    mysqlCon = DriverManager.getConnection("jdbc:mysql://localhost:3306/mproject", "root", "skfkdsk");
    Statement st = mysqlCon.createStatement();
    ResultSet rs = st.executeQuery("select * from line_t");
    while(rs.next()){
    	System.out.println( rs.getString("LINE_CODE"));
    }
} catch (Exception e) {
    System.out.println(e);
}

--%>
ss
</body>

</html>