<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=com.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY %>" />
</jsp:include>

<body>
<script type="text/javascript">
var g = {
	aa:"aa",
	bb:"bb"
}
$(function() {
//	var obj = JSONtoString($(g)[0]);
	var obj = JSONtoString(g);
	alert(obj+"          "+typeof obj); // string
	
	
});



function JSONtoString(object) {
    var results = [];
    for (var property in object) {
        var value = object[property];
        if (value)
            results.push(property.toString() + ': ' + value);
        }
                 
        return '{' + results.join(', ') + '}';
}





</script>
</body>
</html>