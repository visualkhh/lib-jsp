<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<% request.setAttribute("name","최규범");         
		//를 불러오는 것 .
  %>
${requestScope.name}





<%-- URL&code=5555  Get 방식  말고도 post방식도 상관없다.
를 불러오는것--%>
${param.code}
${param.id}
${param["id"]}


<%--
${cookie.ID.value}
EL  접근방법
cookie.ID.value  로도 가능하고   
cookie[ID] 같이도 가능하다.
 --%>

<%--
${name}
를하면 명시적으로 Scope를 안적어줘도
차례대로 찾는다. 알아서
 --%>


</body>
</html>