<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<form action="page.jsp" method="post">
<table>
	<tr>
		<td> <img src="../image/img1.JPG" width="150" height="150"> &nbsp;&nbsp;&nbsp; </td>
		<td> <img src="../image/img2.JPG" width="150" height="150"> &nbsp;&nbsp;&nbsp; </td>
		<td> <img src="../image/img3.JPG" width="150" height="150"> &nbsp;&nbsp;&nbsp; </td>
	</tr>
	<tr>
		<td> <input type="radio" name="radio" value="layout1"> </td>
		<td> <input type="radio" name="radio" value="layout2"> </td>
		<td> <input type="radio" name="radio" value="layout3"> </td>
	</tr>
	<tr>
		<td colspan="3" align="right">
			<input type="submit" value="적용">
		</td>
	</tr>
</table>
</form>
</body>
</html>