<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="<%=request.getContextPath()%>/JavascriptUtil/util.js"></script>
<script type="text/javascript">
function oo(){
	WindowUtil.newPopup("./newWindow.jsp",100,100);	
	//WindowUtil.close(window);
}
</script>
<body>
<input type="button" value="aaaaaaaaaa"  onclick="oo()"/>
</body>
</html>