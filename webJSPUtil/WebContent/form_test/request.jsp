<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<form action="./receiver.jsp">
<input name="title"  type="text"/>
	<table border=0  width="100%"> 
				<tr>
				<td><input checked="checked"  id="st02" name="st02" type="checkbox"/> 현장적용성평가 </td>
				<td><input checked="checked"  id="st03" name="st03" type="checkbox"/> 신기술 운영심의(시범운영) </td>
				<td><input checked="checked"  id="st04" name="st04" type="checkbox"/> 품셈실사 </td>
				</tr>
				<tr>
				<td><input checked="checked"  id="st05" name="st05" type="checkbox"/> 시범운영 </td>
				<td><input checked="checked"  id="st06" name="st06" type="checkbox"/> 신기술 운영심의(본격운영)</td>
				<td><input checked="checked"  id="st07" name="st07" type="checkbox"/> 협약체결 본격운영 </td>
				</tr>
			</table>
			<select name="select">
			<option value="A">A</option>
			<option value="B">B</option>
			<option value="C">C</option>
			<option value="D">D</option>
			</select>
<input type="submit"/> 
</form>
</body>
</html>
<%


%>