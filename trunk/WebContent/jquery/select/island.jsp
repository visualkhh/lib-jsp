<%@page import="khh.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>

<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=khh.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY%>" />
</jsp:include>
<script type="text/javascript">

	$(function() {
	
		$("select#dept").append("<option>aa</option>");
		$("select#plant option").remove();
		
		alert($("select option:selected").text());
	});
	
</script>
<body>

</body>
<select id="dept" >
</select>

<select id="plant">
<option value="2">avva</option>
<option value="2">aa</option>
<option value="3">bb</option>
</select>

<div  good > asdasd</div>
</html>