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
<b>Openpage content[������]</b><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/pages.do?url=<%=request.getAttribute("url") %>">-Pages[����������]</a><br><br>


<b>Openpage setting[����]</b><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/general.do?url=<%=request.getAttribute("url") %>">-General[�Ϲ�]</a> <br>
<br>


<b>Openpage appearance[���]</b> <br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/layout.do?url=<%=request.getAttribute("url") %>">-Openpage layout[���̾ƿ�]</a><br>
<a href="<%=request.getContextPath()%>/openpage/openpage_edit/color.do?url=<%=request.getAttribute("url") %>">-Theme Color[��]</a>
</p>
</body>
</html>