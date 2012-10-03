<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>

<script type="text/javascript">

function addrow(){
	var tbody = document.getElementById("tbody");
	var addrow="<b>빵</b>";
//	alert(tbody.innerHTML);
//	tbody.innerHTML += "a";
	var tr = document.createElement("TR");
	var td1 = document.createElement("TD");
	var td2 = document.createElement("TD");
	var td3 = document.createElement("TD");
	
	td1.innerHTML=addrow;
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	
	tbody.appendChild(tr);
}
</script>
<body>

<input type="button" value="aaa"  onclick="addrow();"/>

<table border="1">
<tbody id="tbody">
<tr><td>a</td><td>a</td><td>a</td></tr>
<tr><td>a</td><td>a</td><td>a</td></tr>
<tr><td>a</td><td>a</td><td>a</td></tr>
<tr><td>a</td><td>a</td><td>a</td></tr>
</tbody>
</table>

<div id="g">
</div>
</body>
</html>