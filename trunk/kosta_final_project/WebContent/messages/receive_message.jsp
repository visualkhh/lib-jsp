<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
<title>Insert title here</title>
 <script type="text/javascript">
	function allChecked() {
		var obj = event.srcElement;
		var input = document.getElementsByName("sel"); 
		if (obj.checked) {
		for (var i=0; i<input.length; i++) { 
		input[i].checked = true;  
		}
	}
	else {  
		for (var i=0; i<input.length; i++) { 
		input[i].checked = false;   
		}
	}  
}
</script>

 
 
 
 
 
 
</head>
<body>
<h1>����������</h1>������ ����&nbsp;&nbsp;&nbsp;��
<center>

<table border=1 cellspacing="0px" cellpadding="0px" width="720px">
 <col width="60px">
 <col width="320px">
 <col width="100px">
 <col width="100px">
 <col width="70px">
 <col width="70px"> 
 
 <tr>
 
	<td align="center"   width = "30"><input type="checkbox" id="all" onclick="allChecked()"></td>
  <th height="30px">������</th><th>����</th><th>�ð�</th><th>��&nbsp;&nbsp;&nbsp;&nbsp;��</th>
 </tr>
 <c:forEach var="list" items="${messageList}">
  <tr>
 	<td><input type='checkbox' name='sel' value=' %>'></td>
   <th height="27px">${list.message_sender}</th>
   <th>${list.message_info}</th>
   <th>${list.message_regdate }</th>
   <th>�ź�</th>
  </tr>
 </c:forEach> 
</table>
<table>
 <tr>
  <td height="10"></td>
 </tr>
 <tr>
  <td align="center">
   << < 1 2 3 4 5 6 7 8 9 10 > >>
  </td>
 </tr>
</table>
<form method="post" action="">
<table>
 <tr>
  <td align="center">
   <select name="search">
    <option value="wri" value="1">�ۼ���</option>
    <option value="con" value="2">����+����</option>      
    <option value="n" value="3">�۹�ȣ</option>
   </select>
   <input type="text" size="18" name="key"/>
   <input type="hidden" name="cur_page" value=""/>
   <input type="submit" value="�˻�"/>
  </td>
 </tr>
</table>
<table width="700">
 <tr>
  <td align="right">
   <input type="button" value="�۾���" onclick="javascript:location.href='/spring_newBoard/insert_page.do'"/>
  </td>
 </tr>
</table>
</form>
</center>
</body>
</html> 