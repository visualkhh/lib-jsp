<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<%


%>
<script type="text/javascript" src="<%=request.getContextPath()%>/JavascriptUtil/util.js"></script>
<script type="text/javascript">

function go(){
	var ac = document.getElementById("aa");
	EventUtil.addEventListener(ac, EventUtil.TYPE_CLICK, function(){alert(1);});
	alert(ac.checked);
}
EventUtil.addOnloadEventListener(go);
</script>
</head>
<body>
<input type="checkbox" id="aa"/>
<input type="checkbox" id="bb"/>
<input type="checkbox" id="cc"/>
<input type="button" value="aaaaaaa"/>
</body>
</html>