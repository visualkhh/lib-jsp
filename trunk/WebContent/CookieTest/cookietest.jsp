<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript" src="<%=request.getContextPath()%>/js_css/jquery.js"></script>
<script type="text/javascript">
function GetCookie (name) {
    var first;
    var str = name + "=";
   var ar = document.cookie.split("; ");
   for(var i=0; i<ar.length; i++) {
         var c = ar[i];
         var nv = c.split("=");
         if(nv[0] == name)
             return unescape(nv[1]);
   }

   return null;
}

function SetCookie (name, value, expireSecond_n) {
	 var expireDate = new Date ();
	 expireDate.setTime(expireDate.getTime() + (expireSecond_n * 1000));
    var cookieStr = name + "=" + escape(value) + 
     ((expireDate == null)?"":("; expires=" + expireDate.toGMTString()));
     document.cookie = cookieStr;
}


$(function() {
	$("#getbtn").click(function(){
		//alert('1'+ new Date().getTime()/1000);
		alert(GetCookie($("#getname").val()));
	});

	$("#setbtn").click(function(){
		SetCookie($("#setname").val(), $("#setvalue").val(), $("#setexpire").val());
	});

});

</script>
<body>
getname<input type="text"  id="getname" /> <input type="button" id="getbtn" value="get"/>
<p/>
setname<input type="text"  id="setname" /> setvalue<input type="text"  id="setvalue" /> setexpire<input type="text"  id="setexpire" /> <input type="button" id="setbtn" value="set"/>
</body>
</html>