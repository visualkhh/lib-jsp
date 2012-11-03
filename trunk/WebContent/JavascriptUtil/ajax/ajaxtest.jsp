<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript">

function onstart(){
	Debug.debug('start');
	
	var param ={
			url:"./text.jsp",
			type:"POST",
			data:{
				type:"atype김Kim",
				name:"aname",
				pwd:"apwd"
			},
			dataType:"text",
			async:true,
			autoStart:false,
			loop:true,
			onBeforeProcess:function(){
				Debug.debug("onBeforeProcess:function() AAA")
			},
			onSuccess:function(data,readyState,status){
				Debug.debug("onSuccess:function() AAA "+data+" "+readyState+" "+status);
				var space = Selector.ei("aspace");
				space.innerHTML = space.innerHTML+"<br>"+data;
			},
			onError:function(data,readyState,status){
				Debug.debug("onError:function() AAA "+data+" "+readyState+" "+status);
			},
			onComplete: function(){
				Debug.debug("onComplete:function() AAA");
			},
			onMonitor:function(readyState,status,data){
				Debug.debug("onMonitor:function() AAA"+data+" "+readyState+" "+status);
			}
	};
	aaa = new AjaxK(param,"ANAME");
	
	param ={
			url:"./text.jsp",
			type:"POST",
			data:{
				type:"btype",
				name:"bname",
				pwd:"bpwd"
			},
			dataType:"text",
			async:true,
			autoStart:false,
			loop:true,
			onBeforeProcess:function(){
				Debug.debug("onBeforeProcess:function() BBB")
			},
			onSuccess:function(data,readyState,status){
				Debug.debug("onSuccess:function() BBB"+data+" "+readyState+" "+status);
				var space = Selector.ei("bspace");
				space.innerHTML = space.innerHTML+"<br>"+data;
			},
			onError:function(data,readyState,status){
				Debug.debug("onError:function() BBB"+data+" "+readyState+" "+status);
			},
			onComplete: function(){
				Debug.debug("onComplete:function()BBB");
			},
			onMonitor:function(readyState,status,data){
				Debug.debug("onMonitor:function() BBB"+data+" "+readyState+" "+status);
			}
	};
	bbb = new AjaxK(param,"BNAME");
	
}
var aaa  = null;
var bbb  = null;
EventUtil.addOnloadEventListener(onstart);


function aurl(){
	aaa.url = Selector.ei("aurl").value;
}
function burl(){
	bbb.url = Selector.ei("burl").value;
}
</script>
<body>
<input type="button" onclick="alert(aaa.onRequest)" />
<input type="button" onclick="alert(aaa.request.onreadystatechange)" />
<input type="text" value="atype" id="atype"/>
<input type="button" value="Astart" onclick="aaa.start()" />
<input type="button" value="Astop" onclick="aaa.stop()" />
<input type="button" value="Bstart" onclick="bbb.start()" />
<input type="button" value="Bstop" onclick="bbb.stop()" />
<p/>
a : <input type="text" id="aurl"/><input type="button" value="url applay" onclick="aurl()"> <p>
b : <input type="text" id="burl"/><input type="button" value="url bpplay" onclick="burl()"> <p>
<table border="1" width="500">
<tr>
<td id="aspace">atype</td>
<td id="bspace">btype</td>
</tr>
</table>
</body>
</html>