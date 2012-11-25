<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
 <script type="text/javascript" src="./util.js"></script> 
<script type="text/javascript">
var a ={
		a:'aa',
		b:'ba',
		c:'ca'
};

var b ={
		b:'a_ba',
		c:'a_ca',
		d:"a_aa",
		e: function(){alert(1);}
};

//var c = JavaScriptUtil.extend(a, b);
//alert(ConvertingUtil.jsonToAttribute(c));
//alert( JavaScriptUtil.getType(c.e));

//WindowUtil.newPopup("http://isl.kepco.co.kr/index.jsp", 1000, 500);
//WindowUtil.resize(window,500, 900);
//EventUtil.addOnloadEventListener(window,function(){alert(1);});
//EventUtil.addOnloadEventListener(function(){alert(2);});

function gogo(){
	alert(FormatUtil.format("####/##/##/", "2012/12/12"));
	
}
EventUtil.addOnloadEventListener(window,gogo);
</script>
<body>
빵꾸똥꾸
</body>
</html>