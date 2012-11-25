<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%   request.setAttribute("h", "hvalue"); %>
<%=request.getContextPath() %>/includeTest/in.jsp<br>
<jsp:include page="/includeTest/in.jsp">
	<jsp:param name="grade" value="G0,G1,G2" />
</jsp:include>
<a href="<%=request.getContextPath() %>/includeTest/in.jsp">good</a>

<%--response.sendRedirect(request.getContextPath()+"/includeTest/in.jsp"); --%>
</body>
</html>