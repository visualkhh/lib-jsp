<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<%

int a=5;
String aa="aaaaaaa";

a=5;

%>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid" />
</jsp:include>
<script type="text/javascript">
$(function() {
	$("#asd").change(function(){
		alert(1);
	});
	$("#asd").change(function(){
		alert(2);
	});
	

});
function gg(){
	$("#asd").trigger("change");
	
}
</script>
<body>
<select id="asd">
<option>aaA</option>
<option>baaA</option>
<option>caaA</option>
<option>daaA</option>
<option>eaaA</option>
<option>faaA</option>
</select>
<div><a href="#"        onclick="gg()">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</a></div>
</body>
</html>