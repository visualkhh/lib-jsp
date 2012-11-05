<%@page import="khh.web.UtilWeb"%>
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
		var browserName = navigator.appName;
		var doc;
		if (browserName == 'Microsoft Internet Explorer')
		{
		doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.async = 'false'
		doc.loadXML(d);
		} else {
		doc = (new DOMParser()).parseFromString(string, 'text/xml');
		}
		return $(doc);
	 */
	 
	var data = $.xml("<items><item><info>a</info></item><item><info>2</info></item> </items>");
	$(data).find("item").each(function(index){
			var code=  $(this).find("info").text();
			alert(code);
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