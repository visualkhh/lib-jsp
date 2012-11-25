<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript">
function conversion(){
	var original = goForm.intext.value;
		var conversiontxt = encodeURI(original);
	alert(original+'\n'+conversiontxt);

	goForm.intext.value = conversiontxt;
	goForm.submit();
	

}

</script>
<body>
::input::<p>
<form action="./result.jsp" method="POST" name="goForm">
<input type="text" name="intext" /> <input type="button"  value="gogo" onclick="conversion();"/> 
</form>


</body> 
</html>