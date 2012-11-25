<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="../util.js"></script>
<script type="text/javascript" src="../../js_css/jquery.js"></script>
<script type="text/javascript">



function onon(event){
	alert('onload!!!!!!!!!!!');
	EventUtil.addEventListener(document.getElementById('btn'),EventUtil.TYPE_CLICK,chk);
}

function chk(){
	var msg = $("#input").val();
	
	//alert(ConvertingUtil.replaceAll(msg, "-", "*"));
	alert(Validate.isBusinessNumber(msg));
	//alert(Validate.isPersonalNumber(msg));

	
}
EventUtil.addOnloadEventListener(onon);





/*
$(function() {
	$("#btn").click(function(){
		var msg = $("#input").val();
		alert(msg);
	
		
		for ( var i = 0; i < msg.length; i++) {
			alert(msg.charCodeAt(i));
		}
	});
	
	
});

*/



</script>
</head>
<body>
hello
<input type="text" id="input"  />
<input type="button" value="aaa" id="btn"/>

</body>
</html>