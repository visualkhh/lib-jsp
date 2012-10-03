<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/js_css/jquery.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js_css/jquery.extend.js"></script>
<script type="text/javascript">
$.extend({
    min: function(a, b) {
        return a<b ? a : b;
    },
    max: function(a, b) {
        return a>b ? a : b;
    }
});

$(function(){
	//alert(1);
	//$("#good").extendstest("aaaaaaaaaaaaaaaaaaaaaaaa");
	$("#good").extendstest(
				{
					width:"aaaaaaaaaaaaaaaa",
				good:"testgood",
				good2:"testgood2"
				}
			);
});
</script>
</head>
<body>
<a href="/ww.jsp" id="good">aaa</a>
</body>
</html>