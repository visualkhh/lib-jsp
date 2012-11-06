<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@taglib prefix="d"  uri="http://visualkhh.com/FunctionCustom"%>
    <%@taglib prefix="s"  uri="http://visualkhh.com/SimpleCustom"%>
    <%@taglib prefix="ss"  uri="http://visualkhh.com/SimpleCustom2"%>
    <%@taglib prefix="myTags" tagdir="/WEB-INF/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%request.setAttribute("a","aaaaaaaaa"); %>
${a}<br>
[${d:plus(1,1) }]       ssssvvv  [${d:getDate("yyyy.MM.dd HH:mm:ss-SSS") }]
<%-- <d:calc username="ffff">vvvvvv</d:calc> --%>
<%= request.getRealPath("/WEB-INF") %>
</p>
</p> 
<s:viewContent name="hhk">aaaa</s:viewContent>
</p>끝<br>
<myTags:Header></myTags:Header>

<br>
<myTags:Header2 fontColor="#660099" subTitle="We take the sting out of SOAP">
Welcome to our site.
Welcome to our site.
Welcome to our site.
Welcome to our site.
Welcome to our site.
Welcome to our site.
Welcome to our site.
Welcome to our site.
Welcome to our site.
</myTags:Header2>
<p>

<table>
<ss:SimpleCustom2 name="">
<tr>
<td>${movie}</td>
</tr>
</ss:SimpleCustom2>
</table>
<jsp:include page="../index.jsp"></jsp:include>

</body>
</html>