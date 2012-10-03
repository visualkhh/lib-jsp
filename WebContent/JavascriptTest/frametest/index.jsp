<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
index<p>

<frameset cols=20%,30%>
<frame src="./left.jsp"name="L">
<frame src="./right.jsp"name="C">
</freamset>
<form name="fff">
<input type="text" name="aaa" value="aaaavaaaaa"></input>
<select name="s">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
</select>
</form>
<script type="text/javascript">
<!--
alert(window.top.document.all.s.value);
window.top.document.all.s.value="3";
alert(window.top.document.all.s.value);
//-->
</script>
</body>
</html>