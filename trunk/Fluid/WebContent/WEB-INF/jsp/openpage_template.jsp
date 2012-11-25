<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
     <%@taglib prefix="fluid"  uri="http://visualkhh.com/fluid"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<style type="text/css">
<fluid:insertFile id="css"/>
</style>
<title><fluid:insertString id="title"/></title>
</head>
<body>
<div class="title"><fluid:insertString id="title"/>[openpage_template.jsp]</div>

<div class="content"><fluid:insertView id="left"/></div>
<div class="content"><fluid:insertView id="main"/></div>
<div class="content"><fluid:insertView id="right"/></div>
</body>
</html>