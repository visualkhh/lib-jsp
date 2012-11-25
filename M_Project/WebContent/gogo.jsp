<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<script type="text/javascript">

function getObject(obname){
	
	var o = new Object();
	o.debug=function(s){
		alert(s);
	};
	return o;
	
}
</script>

<script type="text/javascript">
//Debug.debug("a");
getObject("Debug").debug("a");

</script>

<body>
고고.제이에스피
</body>
</html>