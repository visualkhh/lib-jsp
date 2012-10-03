<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>

<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid,island" />
</jsp:include>
<script type="text/javascript">
	$(function() {
		$("#dept").island({
			selected_dept_cd : '2101',
			plant:"#plant",
			url : "./islanddata.jsp"
		});
	});
</script>
<body>

</body>
<select id="dept" >
</select>
<select id="plant">
</select>

</html>