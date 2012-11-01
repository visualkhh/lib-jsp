<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>
</head>
<script type="text/javascript">



	

	Kclass.prototype = new Object();
	Kclass.prototype.name="-";
	function Kclass(name) {
		alert('생성자:'+this.name);
		this.name = name;
		this.go = function() {
			alert("생성자 안쪽선언한 : "+this.name);
		};
	};
	Kclass.prototype.go=function(){
			alert("prototype 안쪽선언한 : "+this.name);
	};
	Kclass.name="바깥쪽name";
	Kclass.go = function() {
		alert("바로선언한: "+this.name);
	};

	
	function onStart() {

	}
	EventUtil.addOnloadEventListener(onStart);
</script>

<body>

</body>
</html>