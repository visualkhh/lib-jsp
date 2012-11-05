<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=khh.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY%>" />
</jsp:include>
<script type="text/javascript">

$(function() {
	
	$('#good').click(function(){
		var jq=$(":checkbox").each(function() {
			$(this).attr('checked','checked');	
		});
		select  * from hxt1010;
	});
	
	
	$('#fail').click(function(){
		var jq=$(":checkbox").each(function() {
			$(this).removeAttr('checked');	
		});
	});
	
});
</script>

<body>
<input type="checkbox"   />
<input type="checkbox"/>
<input type="checkbox"/>
<input type="checkbox"/>
<input type="checkbox"/>
<input type="checkbox"/>
<input type="checkbox"/>
<input type="checkbox"/>
<input type="checkbox"/>
<input type="button" value="aaaaaaaaaaa" id="good"/>
<input type="button" value="aaaaaaaaaaa" id="fail"/>
</body>
</html>