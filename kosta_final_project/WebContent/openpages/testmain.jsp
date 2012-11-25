<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
        <%@ taglib prefix="c"uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="sql"uri="http://java.sun.com/jsp/jstl/sql"%>
    <%@page import="java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
zzz굳<br>
<sql:setDataSource scope="session" var="con" driver="oracle.jdbc.driver.OracleDriver" url="jdbc:oracle:thin:@192.168.10.95:1521:ORCL" user="scott" password="kosta" />
<%--  범위 , 커넥션 출력된 이름 , 드라이버, 주소, 아이디,패스워드--%>
	


<a href="<%=request.getContextPath()%>/openpage/openpage_administration/openpage_create.do"> 오픈페이지 생성하로가기</a><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_administration/openpage_list.do"> 오픈페이지 리스트</a>
</body>
</html>