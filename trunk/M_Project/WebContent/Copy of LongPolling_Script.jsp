<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
 <script type="text/javascript" src="<%=request.getContextPath() %>/GunLongPolling/gquery.js"></script>
 <script type="text/javascript" src="<%=request.getContextPath() %>/jquery.js"></script>
 <script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>

 <script type="text/javascript">
 $(function() {
	 
	 
		$("#send").click(function(){
			
	/*		
		gQuery.ajaxloop({
				 url:'<%=request.getContextPath()%>/GunLongPolling/fnc_settwitter',
				 datacall:getData,
				 success:function(data,info){
					 $("#send_status").append(".");
				 },
				 error:function(xhr,textStatus,errorThrown){
						//alert('error fnc_settwitter.');
					}
				,
				 loop:false
		 	});
	*/
		});
		
		
		gQuery.ajaxloop({
			 url:'<%=request.getContextPath()%>/GunLongPolling/fnc_twitter',
			 success:success,
			error:function(xhr,textStatus,errorThrown){
					//alert('error fnc_twitter.');
			}
	 });
 });
 
 function success(data,info){
	 $("#container").append("<div>"+data+"</div>");
 }
 function getData(){
	 return {
		 "msg":$("#msg").val()
	 };
 }
 </script>
<body>
<div id="container" ></div>
<input type="text" id="msg" value="defaultvalue" />
<input type="button" id="send" value="send"/>
<div id="send_status" ></div>
</body>
</html>