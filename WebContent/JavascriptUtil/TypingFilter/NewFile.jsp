<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="../Util.js"></script>
<script type="text/javascript">

var matching = Array('!','@','#','$','%','^','&','*','(',')','_','-','+','=','{','}','[',']','<','>',',','.','/','?','~',';',':','\'','\"','|','\\');
function keyonkeypress(envt){
	//var getcode = String(ConvertingUtil.keyCodeToCharcode(envt.keyCode));
	var getcode = String(envt.srcElement.value+ConvertingUtil.keyCodeToCharcode(envt.keyCode));
	
	var matchingArray = ValidationUtil.isMatching(getcode, matching);
	if(matchingArray.length>0){
		alert(matchingArray[0]+"       "+matchingArray.length);
		return false;
	}
}
	
window.onload=eventSetup;
function eventSetup(evnt){
	
	
	var f="1234-12-123";
	var af = f.substring("-");
	
	
	
	var evtObject = document.getElementById("btn");
	if(evtObject.addEventListener){
	    evtObject.addEventListener("onkeypress", keyonkeypress, false);
	}else{
	    evtObject.attachEvent("onkeypress", keyonkeypress);
	}
	
	
}





</script>
</head>
<body>
hello
<input type="text" id="btn"  >
<input type="text" id="btn2"  >
</body>
</html>