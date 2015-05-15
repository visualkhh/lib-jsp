<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@taglib prefix="fluid"  uri="http://visualkhh.com/fluid"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
title:[<fluid:insertString id="title"></fluid:insertString>]<p>
<table border="1">
<tr>
<td><fluid:insertView id="left"></fluid:insertView></td>
<td><fluid:insertView id="main"></fluid:insertView></td>
<td><fluid:insertView id="right"></fluid:insertView></td>
</tr>
</table>
 </p>
 기본 템플릿
</body>
</html>