<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="./e.js"></script>
<script type="text/javascript">

function base(){
	this.name="aa";
	this.Run=function(){
		alert("base a");	
	}
}

function bb(){
	this.base = new base();
	this.name="bb";
	this.Run=function(){
		alert("bb a");	
	};
}
</script>
<body>

</body>
</html>