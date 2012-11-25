<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery,ajaxappend" />
</jsp:include>
<script type="text/javascript">
var app;
	$(function() {
		app = $("#container").ajaxappend({
			url:"./selectdata.jsp",
			autoStart:false,
			beforeElement:Array("<div>1</div>","<div>2</div>"),
			makeElement : function(atItem,index){
				var html=$("<input type='text' value='"+atItem.text()+"'>"+index+"</input></p>");
				return html;
			},
			afterElement:Array("<div>3</div>","<div>4</div>")
		});
	
		
		$("#start_btn").click(function(e){
			app.start();
		});
		
		
		
		
		
		
		$("#set_btn").click(function(e){
			app.setParam({
				dataParser : function(data){
					$(data).find("item").each(function(index) {
						var atItem = $(this).attr("value");
						app.makeElement(atItem,index);
					});
				},
				beforeElement:Array("<div>빵</div>","<div>꾸</div>"),
				makeElement : function(atItem,index){
					var html=$("<a>"+atItem+"</a>");
					return html;
				}
				
			});
		});
		
		
		
		$("#new_btn").click(function(e){
			$("#container").ajaxappend({
				url:"./selectdata.jsp",
				autoStart:true,
				beforeElement:Array("<div>z</div>","<div>z</div>"),
				makeElement : function(atItem,index){
					var html=$("<input type='text' value='"+atItem.text()+"'>"+index+"</input>");
					return html;
				},
				afterElement:Array("<div>b</div>","<div>b</div>")
			});
		});

		$("#select_btn").click(function(e){
			$("#selectElement").empty();
			$("#selectElement").ajaxappend({
				url:"./selectdata.jsp",
				autoStart:true,
				makeElement : function(atItem,index){
					var html=$("<option  value='"+index+"'>"+atItem.text()+"</option>");
					return html;
				}
			});
		});
		
	});
	
</script>
<body>
<div id='start_btn'>빵꾸똥꾸</div>
<div id='set_btn'>settuing_chg</div>
<div id='new_btn'>new</div>
<div id='select_btn'>select</div>

<div id="container">

</div>
<select id="selectElement"> </select>
</body>
</html>