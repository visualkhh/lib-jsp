<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/sizzle.js"></script>
</head>
<script type="text/javascript">

//include Sizzle.js
SelectorK.prototype = new Object();
SelectorK.prototype.context=null;
SelectorK.prototype.selector=null;
SelectorK.prototype.list = new Array();
function SelectorK(selector_s,context_e) {
	if(selector_s){
		this.engin(selector_s,context_e);
	}
};
SelectorK.prototype.find = function(selector_s,context_e){
	var findlist = new Array();
	
	this.each(function(index){
		findlist = findlist.concat(Sizzle(selector_s,this));
	});
	var  selectork = new SelectorK();
	selectork.list = findlist;
	selectork.selector = this.selector+" "+selector_s;
	return selectork;
};
SelectorK.prototype.engin = function(selector_s,context_e){
	this.selector = selector_s;
	this.context = context_e;
	this.list = Sizzle(this.selector,this.context);
};
SelectorK.prototype.each = function(function_f){
	for ( var i = 0; i < this.list.length; i++) {
		function_f.call(this.list[i],i);
	}
};
SelectorK.prototype.get = function(index_n){
	this.list[i];
};
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