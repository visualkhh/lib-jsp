<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
 <script type="text/javascript" src="<%=request.getContextPath() %>/GunLongPolling/gquery.js"></script>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery" />
</jsp:include>

 <script type="text/javascript">
 $(function() {
		$("#send").click(function(){
			gQuery.ajaxloop({
				 dataType:'text',
				 //type :'GET',
				 url:'<%=request.getContextPath()%>/GunLongPolling/fnc_settwitter',
				 datacall:getData,
				 success:function(data,info){
					 $("#send_status").append(".");
				 }
				 ,
				 loop:false
		 	});
		});
		
		
		gQuery.ajaxloop({
			 dataType:'text',
			 url:'<%=request.getContextPath()%>/GunLongPolling/fnc_twitter',
			 success:success
	 });
 });
 
 function success(data,info){
	 $("#container").append("<div>"+data+"</div>");
 }
 function getData(){
	 return {
		 "msg":$("#msg").val()
	 }
 }
 
 
 </script>
<body>

<div id="container" ></div>
<input type="text" id="msg" value="defaultvalue" />
<input type="button" id="send" value="send"/>
<div id="send_status" ></div>
</body>
</html>