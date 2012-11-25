<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
edit menu<br>
<p style="font-size: 12px">
<b>Openpage content[콘텐츠]</b><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/pages.do?url=<%=request.getAttribute("url") %>">-Pages[페이지관리]</a><br><br>


<b>Openpage setting[셋팅]</b><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/general.do?url=<%=request.getAttribute("url") %>">-General[일반]</a> <br>
<br>


<b>Openpage appearance[모양]</b> <br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/layout.do?url=<%=request.getAttribute("url") %>">-Openpage layout[레이아웃]</a><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/color.do?url=<%=request.getAttribute("url") %>">-Theme Color[색]</a>
</p>
</body>
</html>