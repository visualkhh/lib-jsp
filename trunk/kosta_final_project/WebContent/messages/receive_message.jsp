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
<h1>받은쪽지함</h1>안읽은 쪽지&nbsp;&nbsp;&nbsp;통
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
  <th height="30px">보낸이</th><th>내용</th><th>시간</th><th>거&nbsp;&nbsp;&nbsp;&nbsp;부</th>
 </tr>
 <c:forEach var="list" items="${messageList}">
  <tr>
 	<td><input type='checkbox' name='sel' value=' %>'></td>
   <th height="27px">${list.message_sender}</th>
   <th>${list.message_info}</th>
   <th>${list.message_regdate }</th>
   <th>거부</th>
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
    <option value="wri" value="1">작성자</option>
    <option value="con" value="2">제목+내용</option>      
    <option value="n" value="3">글번호</option>
   </select>
   <input type="text" size="18" name="key"/>
   <input type="hidden" name="cur_page" value=""/>
   <input type="submit" value="검색"/>
  </td>
 </tr>
</table>
<table width="700">
 <tr>
  <td align="right">
   <input type="button" value="글쓰기" onclick="javascript:location.href='/spring_newBoard/insert_page.do'"/>
  </td>
 </tr>
</table>
</form>
</center>
</body>
</html> 