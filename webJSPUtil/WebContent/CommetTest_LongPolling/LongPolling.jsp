<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<%--
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery,ajaxloop,util" />
</jsp:include>
<script type="text/javascript">
$(function() {
/*		
	$("#container").ajaxloop({
			dataType:"tevvxt",
			url:"<%=request.getContextPath()%>/LongPolling",
			success:function(data,textStatus){
			},
			error:function(xhr,textStatus,errorThrown){	
				alert("e"+xhr);
			}
		});
*/
		$.ajaxloop({
			dataType:"text",
			url:"<%=request.getContextPath()%>/LongPolling",
			success:function(data,textStatus){
				$("#container").append(data);
			},
			error:function(xhr,textStatus,errorThrown){	
				alert("e"+xhr);
			}
		});
});
</script>
 --%>
 <script type="text/javascript" src="<%=request.getContextPath() %>/GunLongPolling/gquery.js"></script>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery,util" />
</jsp:include>

 <script type="text/javascript">
 $(function() {
	 $("#start").click(function(){
		gQuery.ajaxloop({
				 dataType:'text',
				 url:'<%=request.getContextPath()%>/GunLongPolling/fnc_hhk',
				//url:'<%=request.getContextPath()%>/CommetTest_LongPolling/data.jsp',
				 datacall:getData,
				 success:success,
				 loop:true
			 });
		 });
	 
 });

 function success(data,info){
	 alert("success:  "+data);
 }
 function getData(){
	 return {
		 "ip":$("#ip").val()
	 }
 }
 </script>
<body>

<div id="container" ></div>
<input type="text" id="ip" value="defaultvalue" />
<input type="button" id="start" value="normal_ajax"/>
<input type="button" id="utilstart" value="util_ajax"/>
</body>
</html>