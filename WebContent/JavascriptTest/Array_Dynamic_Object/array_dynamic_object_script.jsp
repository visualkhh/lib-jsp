<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript">
function getDomToObj(dom){
	var oAr =Array();
	dom.find("item").each(function(index){
		var o = new Object;
		$(this).children().each(function(i) {
			var value = $.trim($(this).text());
			value = (value=='null'?'-':value);
			o[$(this).get(0).tagName] =value;
	    });
		oAr[index] = o;
	});
	return oAr;
}
</script>
<body>

</body>
</html>