<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script type="text/javascript" src="../../JavascriptUtil/util.js"></script>
<title>Insert title here</title>
</head>
<script type="text/javascript">
var varggg=10;
ggg=1;
function fapp(){
	alert(11);
	//eval(" function aa(){alert(1);}");
	eval("Window.prototype.aa = function(){alert(1);}");
}
function fcall(){
	alert(22);
	aa();
}

function fhhk(){
	var print 	= Selector.ei("print");
	var tot ="";
	var p = Window.prototype;
    for (var property in p) {
        var value = p[property];
        tot+=property+":"+p[property]+"<br>";
    }
    print.innerHTML=tot;	
}


function addEvent(){
	
	var app 	= Selector.ei("app");
	var call 	= Selector.ei("call");
	var ok 	= Selector.ei("ok");

	

	
	EventUtil.addEventListener(app,EventUtil.TYPE_CLICK,fapp);
	EventUtil.addEventListener(call,EventUtil.TYPE_CLICK,fcall);
	EventUtil.addEventListener(ok,EventUtil.TYPE_CLICK,fhhk);
}
EventUtil.addOnloadEventListener(addEvent);

</script>
<body>
<input id="app" type="button" value="eval"/>
<input id="call" type="button" value="call"/>
<input id="ok" type="button" value="ok"/>
<div id="print">
</div>
</body>
</html>