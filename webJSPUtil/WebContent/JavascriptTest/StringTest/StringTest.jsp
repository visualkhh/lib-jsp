<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="../../JavascriptUtil/util.js"></script>
</head>
<script type="text/javascript">
function check(){
	//alert(arguments);
	var str= Selector.ei("a").value;
	Debug.debug(str);
	/*
	Debug.debug("trim:"+StringUtil.trim(str));
	Debug.debug("ltrim:"+StringUtil.ltrim(str));
	Debug.debug("rtrim:"+StringUtil.rtrim(str));
	Debug.debug("deleteSpace:"+StringUtil.deleteSpace(str));
	*/
	
	/*
	Debug.debug("replaceAll a y:"+StringUtil.replaceAll(str,"a","y"));
	
	Debug.debug("removeComma:"+StringUtil.removeComma(str));
	*/
	/*
	Debug.debug("isInSpecialChar:"+StringUtil.isInSpecialChar(str));
	Debug.debug("isOnlySpecialChar:"+StringUtil.isOnlySpecialChar(str));
	*/
	/*
	Debug.debug("isInNumber:"+StringUtil.isInNumber(str));
	Debug.debug("isOnlyNumber:"+StringUtil.isOnlyNumber(str));
	Debug.debug("isEmpty:"+StringUtil.isEmpty(str));
	*/
	//Debug.debug("isInAlphabet:"+StringUtil.isInAlphabet(str));
	//Debug.debug("isOnlyAlphabet:"+StringUtil.isOnlyAlphabet(str));
	//Debug.debug("isInAlphabetUpper:"+StringUtil.isInAlphabetUpper(str));
	//Debug.debug("isOnlyAlphabetUpper:"+StringUtil.isOnlyAlphabetUpper(str));
	//Debug.debug("isInAlphabetLower:"+StringUtil.isInAlphabetLower(str));
	//Debug.debug("isOnlyAlphabetLower:"+StringUtil.isOnlyAlphabetLower(str));
	
	Debug.debug("isInHangeul:"+StringUtil.isInHangeul(str));
	Debug.debug("isOnlyHangeul:"+StringUtil.isOnlyHangeul(str));
	/*
	Debug.debug("isOnlyChars  d:"+StringUtil.isOnlyChars(str,"d"));
	Debug.debug("onlyNumber:"+StringUtil.onlyNumber(str));
	Debug.debug("encodeURI:"+StringUtil.encodeURI(str));
	Debug.debug("decodeURI:"+StringUtil.decodeURI(str));
	*/
};

function addEvent(){
	EventUtil.addEventListener(Selector.ei("b"),EventUtil.TYPE_CLICK,check);
}
EventUtil.addOnloadEventListener(addEvent);
</script>
<body>
<input id="a" type="text" />
<input id="b" type="button" value="check"/>
</body>
</html>