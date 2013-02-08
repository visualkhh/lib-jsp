<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script type="text/javascript" src="http://jsputil-visualkhh.googlecode.com/svn/trunk/WebContent/JavascriptUtil/util.js"></script>


<title>test입니다.</title>
</head>
<script type="text/javascript">

Debug.debug("aaaa");
</script>

<body>
<div>1</div> 
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>

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

getRemoteAddr <%=request.getRemoteAddr()%>        <br>
getRequestURI <%=request.getRequestURI()%>        <br>
getRequestURL <%=request.getRequestURL()%>        <br>
getRemoteHost <%=request.getRemoteHost()%>        <br>
getRemoteAddr <%=request.getRemoteAddr()%>        <br>
getRemotePort <%=request.getRemotePort()%>        <br>
getRemoteUser <%=request.getRemoteUser()%>        <br>
request.getAttribute( "javax.servlet.forward.request_uri" );<%=request.getAttribute( "javax.servlet.forward.request_uri" )%> <br>
request.getAttribute( "javax.servlet.include.request_uri" ); <%=request.getAttribute( "javax.servlet.include.request_uri" )%><br>

</body>
</html>