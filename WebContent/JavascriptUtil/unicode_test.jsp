<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
 <script type="text/javascript" src="./util.js"></script> 
 <script type="text/javascript">
 function on(){
	var aa  =  document.getElementById('vv').value;
	alert(ConvertingUtil.encodeURI(aa));
	alert(ConvertingUtil.decodeURI(aa));
 }
 
 function tt(){
//	 alert(1);
EventUtil.addEventListener(document.getElementById('bb'), EventUtil.TYPE_CLICK, on);
 }
 
 EventUtil.addOnloadEventListener(tt);
 
 </script>
</head>

<body>
<input type="text" id="vv"/>
<input type="button"  id="bb" value="55555"/> 
</body>
</html>