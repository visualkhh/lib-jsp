<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@page import="java.util.*" %>
	<%HashMap map =(HashMap)session.getAttribute("user");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><head>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/style/openpage_style.css">
	
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/openpage_edit.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script>
	<script src="<%=request.getContextPath()%>/openpages/js/jquery.js"
	type="text/javascript"></script>
	
	<script type="text/javascript">
	
	
	function layoutupdate(){
		var newComment = {
		openpage_url: '<%=request.getAttribute("url")%>',
		openpage_name: jQuery("input#openpage_name").val(),
		openpage_description: jQuery("#openpage_description").val()
		}
	
	openpage_edit.generalsave(newComment);
	alert('commit');
	}
	
	function layoutloadcallback(data) {
		jQuery("input#openpage_name").val(jQuery.trim(data[0].openpage_name));
		jQuery("input#openpage_url").val(jQuery.trim(data[0].openpage_url));
		jQuery("#openpage_description").val(jQuery.trim(data[0].openpage_description));
		jQuery("#openpage_type").append(jQuery.trim(data[0].openpage_type));
		jQuery("#openpage_memberlist").append(jQuery.trim(data[0].openpage_memberlist));
		
	}
	jQuery(document).ready(function() {
	openpage_edit.generalload('<%=request.getAttribute("url")%>',layoutloadcallback);
 	});
	</script>
	
	</head>




<h1>오픈페이지 일반설정을 변경할수 있습니다.</h1>

<table width="616" height="350" border="0" cellpadding="2" cellspacing="1" bgcolor="#D7E6FF">
  <tr>
    <td width="154" bgcolor="#B5D0FF"><p><strong>OpenPage_name </strong></p></td>
    <td width="276" bgcolor="#D2F4FF"><input name="openpage_name" type="text" id="openpage_name"></td>
  </tr>
  <tr>
    <td bgcolor="#B5D0FF"><p><strong>OpenPage_url</strong></p></td>
    <td bgcolor="#D2F4FF"><font size="2">
      <p>http://192.168.10.95/final_project/openpage?url=
    <input name="openpage_url" type="text" id="openpage_url" readonly="">
      </p></font></td>
  </tr>
  <tr>
    <td bgcolor="#B5D0FF"><p><strong>OpenPage_description</strong></p></td>
    <td bgcolor="#D2F4FF"><textarea name="openpage_description" cols="60" rows="7" id="openpage_description"></textarea></td>
  </tr>
  <tr>
    <td bgcolor="#B5D0FF"><p><strong>Openpage_type</strong></p></td>
    <td bgcolor="#D2F4FF"><p id="openpage_type"></p></td>
  </tr>
  <tr>
    <td bgcolor="#B5D0FF"><p><strong>Openpage_memberlist</strong></p></td>
    <td bgcolor="#D2F4FF"><p id="openpage_memberlist"></p></td>
  </tr>
  <tr>
    <td bgcolor="#B5D0FF"><p><strong>Openpage_statistics</strong></p></td>
    <td bgcolor="#D2F4FF"></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<p>
  <input type="reset" name="Submit" value="Reset">
  <input type="button" name="Submit" value="submit" onclick="layoutupdate();">
</p>
