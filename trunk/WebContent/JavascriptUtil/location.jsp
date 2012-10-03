<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
 <script type="text/javascript" src="./util.js"></script> 
</head>
<script type="text/javascript">
</script>
<body>
scheme <%=request.getScheme() %> <br>
getServerName <%=request.getServerName() %>        <br>
getServerPort <%=request.getServerPort()%>        <br>
getAuthType <%=request.getAuthType()%>        <br>
getCharacterEncoding <%=request.getCharacterEncoding()%>        <br>
getContentLength <%=request.getContentLength()%>        <br>
getLocalAddr <%=request.getLocalAddr()%>        <br>
getProtocol <%=request.getProtocol()%>        <br>
getMethod <%=request.getMethod()%>        <br>
getServletPath <%=request.getServletPath()%>        <br>
</body>
</html>