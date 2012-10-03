<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<% 
//if(true){
%> 
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=UtilWeb.INCLUDE_PARAMVALUE_JQUERY %>" />
</jsp:include>
<%
//}
System.out.print("bb");
%>
<%="빵꾸똥꾸5535" %>
<script type="text/javascript">


	$(function() {

		$.ajax({
			type:"POST",
			url:"./xmldata.jsp",
			data:{
//				"ip":$('#ip').val(),
//				"port":$('#port').val(),
//				"id":$('#id').val(),
//				"pwd":$('#pwd').val(),
//				"sid":$('#sid').val(),
//				"db":$('#db').val(),
//				"sql":$('#sql').val()
				},
			dataType:"xml",
			async:false,
			success:function(data,textStatus){
					alert("잘보냈습니다");
					//alert($(data).find('islands').find('island').length);
				//if($(data).find('islands').find('island').length){
				//}
					//document.getElementById('innerPage').innerHTML=data;	
					
					
					//$(data).find('islands').find('island').each(function (idx){
					//	alert(idx+ "  "+$(this).attr('index'));
					//});
					
					/*$(data).find('islands').find('island').each(function (idx){
						$(this).find('code').each(function(i){
							alert($(this).length);
						});
					});*/
					
					$(data).find("island[index]").each(function(index){
//						var index = $(this).attr("index").trim();
						//	var code=  $(this).find("code").text().trim();
						//	var name= $(this).find("name").text().trim();
						
						var index = $(this).attr("index");
						var code=  $(this).find("code").text();
						//	var name= $(this).find("name").text().trim();
						
						//alert(index+"      " + code + "     "+name );
					});
			},
			error:function(xhr,textStatus,errorThrown){
				alert('실패하였습니다');
			}
		});
	
		
	});
	
</script>
<title>Insert title here</title>
</head>
<body>

</body>
</html>