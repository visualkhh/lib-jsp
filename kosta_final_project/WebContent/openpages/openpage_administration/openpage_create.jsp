<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="form"uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring"uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="java.util.*" %>
<%@page import="openpage.model.OpenPageListDTO;"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% HashMap map= (HashMap)session.getAttribute("user");
//이건 나중에 타일즈 만들때 그쪽 위쪽에 로긴 여부 판단. 할 것.
%>

[<%=(Integer)map.get("user_number")%>] Number user 


<br>

<table width="554" height="186" border="0" align="center"
	cellpadding="5" cellspacing="5">
	<tr>
		<td>
		<h1 align="center">Openpage Create</h1>
		<form method="post">
		<br><font color="red"><form:errors path="openpagelistdto.user_number"></form:errors></font>
		<input type="hidden" name="user_number" value="<%=(Integer)map.get("user_number")%>">
		<table width="495" height="254" border="0" align="center"
			cellpadding="1" cellspacing="1" bgcolor="#CCCCCC">
			<tr bgcolor="#FFFFFF">
				<td width="135">site name<br>
				  <font color="red">
				<form:errors path="openpagelistdto.openpage_name"></form:errors></font>
			  </td>
			  <td width="354"><input name="openpage_name" type="text"
					id="openpage_name"></td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td>site url
					<br>
					<font color="red"><form:errors path="openpagelistdto.openpage_url"></form:errors></font>
			  </td>
				<td>
				<p>http://localhost:8081/final_project/openpages/ <input
					name="openpage_url" type="text" id="openpage_url"></p>
			  </td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td>site description
									<br>
									<font color="red"> <form:errors path="openpagelistdto.openpage_description"></form:errors></font>
			  </td>
			  <td><input name="openpage_description" type="text"
					id="openpage_description"></td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td height="16">shar wirth
				</td>
				<td>&nbsp;</td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td height="17">&nbsp;</td>
				<td><input name="openpage_type" type="radio" value="persnal" checked>
			  persnal</td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td>&nbsp;</td>
				<td><input type="radio" name="openpage_type" value="group">
			  group</td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td>site theme
				</td>
				<td>&nbsp;</td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td colspan="2">
				<table width="200" border="0" align="center" cellpadding="0"
					cellspacing="0">
					<tr>
						<td>
						<div align="center">B</div>
						</td>
						<td>
						<div align="center">R</div>
						</td>
						<td>
						<div align="center">G</div>
						</td>
					</tr>
					<tr>
						<td>
						<div align="center"><input name="setting_theme" type="radio"
							value="#0000FF" checked>
						</div>
						</td>
						<td>
						<div align="center"><input type="radio" name="setting_theme"
							value="##FF0000"></div>
						</td>
						<td>
						<div align="center"><input type="radio" name="setting_theme"
							value="#00FF00"></div>
						</td>
					</tr>
				</table>
				</td>
		  </tr>
			<tr bgcolor="#FFFFFF">
				<td colspan="2">
				<div align="center"><input type="reset">
				&nbsp;&nbsp;&nbsp; <input type="submit" name="Submit"></div>
			  </td>
		  </tr>
		</table>
		</form>
		</td>
	</tr>
</table>
<p>&nbsp;</p>
