<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@taglib prefix="fluid"  uri="http://visualkhh.com/fluid"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css.html" />
<script type="text/javascript" src="<%=request.getContextPath()%>/script.html"></script>
<title><fluid:insertString id="title"></fluid:insertString></title>
</head>
<body>
환영합니다.
<fluid:insertString id="title"></fluid:insertString> 에오신걸.
visualkhh@gmail.com
<form action="<%=request.getContextPath() %>/board.html" method="POST">
	<input type="text" name="id"/>
	<input type="submit" value="들어가기"/>
</form>
</body>
</html>