<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

<div style="border-style: solid ;  padding: 5px; margin: 5px;" >
::AcctHistory::
<form action="./receiver.jsp" method="GET" name="goForm" >
date:<input type="text" name="date_s" /> yyyymmdd</p>
<select name="option_s">
<option value="a"> a name</option>
<option value="b"> b name</option>
</select>
</p>
<input type="submit" value="AcctHistory Submit"/> 
</form>
</div>

<form action="./receiver.jsp" method="GET" name="goForm" >
date:<input type="text" name="date_b" /> yyyymmdd</p>
<select name="option_b">
<option value="a"> a name</option>
<option value="b"> b name</option>
</select>
</p>
<input type="submit" value="AcctHistory Submit"/> 
</form>



</body>
</html>