<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<sql:setDataSource var="ds" 
driver="com.mysql.jdbc.Driver" 
user="root"  password="mysql"
scope="session"
url="jdbc:mysql://localhost/root?useUnicode=true&characterEncoding=euckr"/>




<sql:query var="prepardStatmentRS"dataSource="${con}">
select * from test where name=?
<sql:param>혜</sql:param>
</sql:query>


</body>
</html>