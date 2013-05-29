<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@taglib prefix="fluid"  uri="http://visualkhh.com/fluid"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css.html" />
<script type="text/javascript" src="<%=request.getContextPath()%>/script.html"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/gquery.js.gun"></script>

<script type="text/javascript">
var sendTwitter;
var sendControl;
var getTwitter;

var ui;
var uip= {
		onBeforeProcess : function() {
			Debug.debug("onBeforeProcess");
		},
		onViewSetting : function() {
			Debug.debug("onViewSetting");
			action_ImageChange();
		},
		onDataSetting : function() {
			Debug.debug("onDataSetting");
			event_SendTwitter();
			event_GetTwitter();
			event_Game();
		},
		onAddListener : function() {
			
		},
		onAction : function(gb) {
			Debug.debug("onAction:"+gb);
		},
		onAfterProcess : function() {
			Debug.debug("onAfterProcess");
		},
		dispose : function() {
			alert("dispose");
		},
		autoStart : false
};

//event 
function event_SendTwitter(){
	sendTwitter = new AjaxK(
			{
				url : '<%=request.getContextPath()%>/setTwitter.gun',
				type :'POST',
				data : function(){
						return {"msg":$("#id").val()+" : "+$("#msg").val()};
					},
				dataType:"TEXT",
				async:true,
				autoStart:false,
				loop:false,
				onBeforeProcess:function(){},
				onSuccess:function(data,readyState,status){},
				onError:function(data,readyState,status){},
				onComplete:function(){},
				onMonitor:function(data,readyState,status){}
			}		
	);
	$("#send").click(function(){
		sendTwitter.send();
		$("#msg").val("");
	});
}
function event_Game(){
	sendGame = new AjaxK(
			{
				url : '<%=request.getContextPath()%>/setControl.gun',
				type :'POST',
				data : function(){
						return {"control":$("#control").val()};
					},
				dataType:"TEXT",
				async:true,
				autoStart:false,
				loop:false,
				onBeforeProcess:function(){},
				onSuccess:function(data,readyState,status){},
				onError:function(data,readyState,status){},
				onComplete:function(){},
				onMonitor:function(data,readyState,status){}
			}		
	);
	$("#controlsend").click(function(){
		sendGame.send();
	});
}
function event_GetTwitter(){
	getTwitter = new AjaxK(
			{
				url : '<%=request.getContextPath()%>/getTwitter.gun',
				type :'POST',
				data : null,
				dataType:"TEXT",
				async:true,
				autoStart:true,
				loop:true,
				onBeforeProcess:function(){},
				onSuccess:function(data,readyState,status){
					$("#board").append("<div>"+data+"</div>");
				},
				onError:function(data,readyState,status){},
				onComplete:function(){},
				onMonitor:function(data,readyState,status){}
			}		
	);
}

var id=1;
function action_ImageChange(){
	Debug.debug("ImageChange");
	$("#image").attr("src","<%=request.getContextPath() %>/getImage.gun?id="+(id++));
}

EventUtil.addOnloadEventListener(function(){
	ui = new UiFlow(uip,"uiflow");
	ui.start();
});
</script>


<title><fluid:insertString id="title"></fluid:insertString></title>
</head>


<body>
<fluid:insertString id="title"></fluid:insertString>
방가워요
<div id="board"></div>

<div>
	<input type="text" id="id" disabled="disabled" value="${param.id}"/> 
	<input type="text" size="50" id="msg"/>
	<input type="button" id="send" value="전송"/>
</div>
<div>
	<input type="text" size="50" id="control"/>
	<input type="button" id="controlsend" value="컨트롤제어전송"/>
</div>
<div>
	<!-- 
		<img id="image" onload="action_ImageChange()"/>
	 -->
		<img id="image" onload="action_ImageChange()"/>
</div>
</body>
</html>