<%@page import="khh.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=khh.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY%>" />
</jsp:include>
<title>Insert title here</title>
<script type="text/javascript">

$(function() {
$("#ori").click(function(){
	// $.post("./clone.jsp", {pageID: "1"} );
	 $.submit();
});
});
</script>

</head>
<body>
<div id="ori">  fffffffffori  </div>
<div id="container">
	
</div>
</body>
</html>