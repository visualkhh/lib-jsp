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



ACLASS.prototype=new Object();
ACLASS.prototype.gogo = function(){
	this.ssing();	
};
ACLASS.prototype.ssing = function(){
	Debug.debug("A ssing");
};
function ACLASS(){
	this.ssing();
};



BCLASS.prototype=new ACLASS();
//BCLASS.prototype.constructor = ACLASS;
BCLASS.prototype.ssing = function(){
	Debug.debug("B ssing");
};
function BCLASS(){};







	
	function onStart() {
		//var aclass = new ACLASS();
		//aclass.gogo();
		var bclass = new BCLASS();
		bclass.gogo();
	}
	EventUtil.addOnloadEventListener(onStart);
</script>

<body>

</body>
</html>