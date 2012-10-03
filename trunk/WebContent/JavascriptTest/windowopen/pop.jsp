<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript">

alert(opener+ "       "+opener.openerChk+ "          "+(opener != null && opener.openerChk != null)+"      "+(opener.openerChk == null));
opener.ggg();
if (opener != null && opener.openerChk != null) { 
	
} else {
	var a = confirm("결과창으로 이동하시겠습까?");
	alert(a);
}


</script>
<body onunload="opener.document.all.btn.value='4444444444444tt';">
pop
<input type="button" value="close"  onclick="self.close();"/>
</body>
</html>