<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery,jqutil" />
</jsp:include>
<title>Insert title here</title>
<script type="text/javascript">
<%
%>
$(function() {
	/*
	var data = eval("([{ 'aa':'vvv','vvvvvv':5,'gg':'555'},{ 'aa':'vv1v','vvvvvv':15,'gg':'5155'}])");
	data = $(data);
	 $.each(data, function() {
		 alert(this.aa+"        "+this.vvvvvv+"       "+this.gg);
	 });
	 */
	 
	var data = $.json("([{ 'aa':'vvv','vvvvvv':5,'gg':'555'},{ 'aa':'vv1v','vvvvvv':15,'gg':'5155'}])");
	 $.each(data, function() {
		 alert("jquery :  " +this.aa+"        "+this.vvvvvv+"       "+this.gg);
	 });
	 
	 
});
</script>

</head>
<body>
<div id="ori">  ori sssssss  </div>
<div id="container">
	
</div>
</body>
</html>