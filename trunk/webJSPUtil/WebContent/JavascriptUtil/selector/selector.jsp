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


SelectorK.prototype = new Object();
SelectorK.prototype.selector=null;
SelectorK.prototype.list = new Array();
function SelectorK(selector_s) {
	this.engin(selector_s);
};
SelectorK.prototype.find = function(selector_s){
	return new SelectorK(selector_s);
};
SelectorK.prototype.engin = function(selector_s){
	this.selector=selector_s;
	this.list.length = 0;
	var get = document.getElementById(this.selector);
	this.list.push(get);
};
SelectorK.prototype.eche = function(index_n){
	
};
SelectorK.prototype.get = function(index_n){
	this.list[i];
};
	
	
	function onStart() {
		//var a = document.getElementById("a");
		var selector = new SelectorK("div a");
		var gg = selector.find("finda");
		var xml = XMLUtil.getXMLObj("<?xml version='1.0' encoding='UTF-8'?><a><b id='b'>va</b></a>");
		var e = xml.getElementById('b');
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

</body>
</html>