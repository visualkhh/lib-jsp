<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>

<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid,island" />
</jsp:include>
<script type="text/javascript">
	$(function() {
		var e ="<div onclick='alert(\"빵꾸똥꾸\")'>aa</div>";
		$("#good").append(e);
	});
</script>
</head>
<body>
<div id="good">
</div>
</body>
</html>