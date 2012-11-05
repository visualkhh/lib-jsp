<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=khh.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY%>" />
</jsp:include>
<title>Insert title here</title>
</head>
<script type="text/javascript">
$(function() {
	var a = $("input:radio[name='radio_t']:checked");
	alert(a.val());
});

</script>
<body>
<input  type="radio"  name="radio_t"  value="y" checked="checked"/>y
<input  type="radio"  name="radio_t"  value="n"/>n

</body>
</html>