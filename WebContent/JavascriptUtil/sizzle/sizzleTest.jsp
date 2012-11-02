<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/sizzle.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>
</head>
<script type="text/javascript">
	function onStart() {
		var sz = Sizzle("#f");
		var a = document.getElementById("a");
		var selector = new SelectorK("#z");
		var gg = selector.find("a");
		var xml = XMLUtil.getXMLObj("<?xml version='1.0' encoding='UTF-8'?><a><b id='b'>va</b></a>");
		var e = xml.getElementById('b');
		
		
		var selector2 = new SelectorK("div");
		selector2.each( 
				function(index){
					var g =this;
				} 
		);
	}
	EventUtil.addOnloadEventListener(onStart);
</script>

<body>

<div id="a">a1</div>
<div id="a">a2</div>
<div id="a">a3</div>
<div id="a">a4</div>
<div id="a">a5</div>
<div id="a">a6</div>
<div id="b">b1</div>

<div name="a" class="ac">an1</div>
<div name="a" class="ac">an2</div>
<div name="a" class="ac">an3</div>

<div id="f" class="ac">ffff</div>
<div id="z" class="ac">z
<a>a1</a>
<a id="a2">a2</a>
<a>a3</a>
</div>

</body>
</html>