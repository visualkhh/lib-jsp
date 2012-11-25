<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jquery" />
</jsp:include>
<script type="text/javascript">
$(function() {
    $.ajax({
        type: "GET",
        url: "./loadjs.js",
        dataType: "script",
        success:function(data){
        	alert('g');
        },
        error:function(xhr,textStatus,errorThrown){	
			alert("e"+xhr);
		}
    });
});   


</script>
</head>
<body>
vvvvvvvvv
</body>
</html>