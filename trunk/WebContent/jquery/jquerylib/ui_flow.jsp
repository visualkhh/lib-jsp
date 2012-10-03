<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery,uiflow" />
</jsp:include>
<script type="text/javascript">
var flow = $(this).uiflow({
	onBeforeProcess : function(){
		$("#aacccca").append("<div>onBeforeProcess</div>");
	},
	onViewSetting : function(){
		$("#aacccca").append("<div>onViewSetting</div>");
		
	},
	onDataSetting : function(){
		$("#aacccca").append("<div>onDataSetting</div>");
	},
	onAddListener : function(){
		$("#aacccca").append("<div>onAddListener</div>");
		$("#aaa").click(function(){
			flow.onAction(5);
		});
	},
	onAction : function(gb,data){
		if(gb==5){
		alert("onAction "+gb+"    "+data);
		}else if(gb==6){
		alert("onAction "+gb+"    "+data);
		}
	},
	onAfterProcess : function(){
		$("#aacccca").append("<div>onAfterProcess</div>")
	},
	dispose : function(){
		//$("#aacccca").append("<div>dispose</div>")
		alert("dispose");
	}
});


$(function() {
	flow.flow();
	
	$("#bbb").click(function(){
		flow.onAction(6,"빵꾸");
	});
	
	
});
	
function onViewSetting(){
	alert("onviewSetting");
}
	
</script>
<body >
<div id="aaa"><a>aaaaaaaaaaa</a></div>
<div id="bbb"><a>bbbbbbbbb</a></div>
<div id="aacccca"  bgcolor='pink' width='55' height='55'><a>aaabababaaaaaaaaa</a></div>
</body>
</html>