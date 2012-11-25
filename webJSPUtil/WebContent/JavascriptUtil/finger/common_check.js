
IE4 = (document.all)    ? 1 : 0;
NS4 = (document.layers) ? 1 : 0;

/** =============================================
Return : object
Comment: ü̸(objName) ޾ ش ü ȯѴ.
Usage  : obj = getObj(arguments[i]);
---------------------------------------------- */
function getObj(objName)
{
	obj = (IE4 == 1) ? eval("document.all." + objName) : document.forms[0].elements[objName];
	return obj;
}

/** =============================================
Return :
Comment: sMsg  â , obj  Ŀ ̵Ѵ.
Usage  :
---------------------------------------------- */
function fn_MsgPopFocus(obj, sMsg)
{
	alert(sMsg);
	fn_focus(obj); //obj.focus();
}

/** =============================================
Return : boolean (Yes: true)
Comment: sMsg  â  Yes / No  , obj  Ŀ ̵Ѵ.
Usage  :
---------------------------------------------- */
function fn_confirmFocus(obj, sMsg)
{
	var isTrue = false;

	isTrue = confirm(sMsg);
	fn_focus(obj); //obj.focus();

	return isTrue;
}

/** =============================================
Return :
Comment: μ  ü Ŀ ̵Ѵ.
Usage  : onKeyPress="fn_focus(NextObj, isNextObjSelection)"
---------------------------------------------- */
function fn_focus(objTo, bSelection)
{
	// Ӽ: .disabled, .readonly, .enabled, .visible
	// Ӽ   츦 Ұ! 2001-02-10
	if ( ((objTo.readonly == null) || (objTo.readonly != null && objTo.readonly == false)) &&
		 ((objTo.disabled == null) || (objTo.disabled != null && objTo.disabled == false)) &&
		 ((objTo.visible  == null) || (objTo.visible  != null && objTo.visible  == true )) &&
		 ((objTo.enabled  == null) || (objTo.enabled  != null && objTo.enabled  == true )) ) {
		objTo.focus();

		if (!(bSelection == false))
			bSelection = true;

		if ( (bSelection) && objTo.isTextEdit )
			objTo.select();
	}
	return;
}


/** =============================================
Return :
Comment: μ  ü Ŀ ̵Ѵ. ȣ ü EnterŰ  쿡 
Usage  : onKeyPress="fn_focus_enter(NextObj, isNextObjSelection)"
---------------------------------------------- */
function fn_focus_enter(objTo, bSelect)
{
	if (event.keyCode == 13) {
		if (!(bSelect == false))
			bSelect = true;
		fn_focus(objTo, bSelect);
	}
	return;
}


// event.shiftKey : Űڵ尪
// event.shiftKey, event.altKey, event.ctrlKey : boolean
// event.srcElement : ̺Ʈ ߻ ü
// 8: BackSpace, 46: Del
// ","=44, "-"=45, "."=46, "/"=47
// "0"=48, "9"=57
// "@"=64, "A"=65, "Z"=90, "a"=97, "z"=122
// 37:LeftArrow, 38:UpArrow, 39:RightArrow, 40:DownArrow **
/** =============================================
Return : event.returnValue = boolean
Comment: ŰԷ½ ڸ Է ް Ѵ.
Usage  : onKeyDown="fn_onKeyOnlyNumber();"
---------------------------------------------- */
function fn_onKeyOnlyNumber()
{
	var sValid = "0123456789";

	var sValue = event.srcElement.value;
	var iKey = event.keyCode;
	var isShift = event.shiftKey;
	var isMove = false;
	var isCut  = false
	var isTrue = true;

	event.srcElement.style.imeMode = "inactive"; //style.imeMode(active:ѱ, inactive:) ׷, δ ݿ ȵȴ. (html tag style="IME-MODE:inactive;"  Ͽ߸..)

	var sReturnValue = "";
	for (var ii=0; ii < sValue.length; ii++) {
		if (sValid.indexOf(sValue.substring(ii, ii+1)) >= 0) {
			sReturnValue = sReturnValue + sValue.substring(ii, ii+1);
		}
	}

	if ( (iKey == 37 || iKey == 38 || iKey == 39 || iKey == 40) ||
		 (iKey == 13 || iKey == 8  || iKey == 46 || iKey == 9  || iKey == 16  || isShift) || (iKey >= 48 && iKey <= 57) ) {
		for (var ii=0; ii < sValue.length; ii++) {
			if (sValid.indexOf(sValue.substring(ii, ii+1)) < 0) {
				event.returnValue = false;
				isCut  = true;
				isTrue = false;
				break;
			}
		}
	} else {
		event.returnValue = false;
		isTrue = false;
	}

	if (isCut || isTrue == false)
		event.srcElement.value = sReturnValue;

	if (iKey == 13) {
		event.keyCode = 0;
		return sReturnValue;
	} else {
		return sReturnValue;
	}
}

/** =============================================
Return : event.returnValue = boolean
Comment: ŰԷ½ ڿ '-' Է ް Ѵ.
Usage  : onKeyDown="fn_onKeyOnlyNumberDash()" style="text-align:right; width=120;"
---------------------------------------------- */
function fn_onKeyOnlyNumberDash()
{
	var sValid = "0123456789-";

	var sValue = event.srcElement.value;
	var iKey = event.keyCode;
	var isShift = event.shiftKey;
	var isMove = false;
	var isCut  = false
	var isTrue = true;

	event.srcElement.style.imeMode = "inactive"; //style.imeMode(active:ѱ, inactive:) ׷, δ ݿ ȵȴ. (html tag style="IME-MODE:inactive;"  Ͽ߸..)

	var sReturnValue = "";
	for (var ii=0; ii < sValue.length; ii++) {
		if (sValid.indexOf(sValue.substring(ii, ii+1)) >= 0) {
			sReturnValue = sReturnValue + sValue.substring(ii, ii+1);
		}
	}

	if ( (iKey == 37 || iKey == 38 || iKey == 39 || iKey == 40) ||
		 (iKey == 13 || iKey == 8  || iKey == 46 || iKey == 9  || iKey == 16  || isShift) || (iKey >= 48 && iKey <= 57) ) {
		for (var ii=0; ii < sValue.length; ii++) {
			if (sValid.indexOf(sValue.substring(ii, ii+1)) < 0) {
				event.returnValue = false;
				isCut  = true;
				isTrue = false;
				break;
			}
		}
	} else {
		event.returnValue = false;
		isTrue = false;
	}

	if (isCut || isTrue == false)
		event.srcElement.value = sReturnValue;

	if (iKey == 13) {
		event.keyCode = 0;
		return sReturnValue;
	} else {
		return sReturnValue;
	}
}

/** =============================================
Return : event.returnValue = boolean
Comment: ŰԷ½ ڸ Է ް Ѵ.
Usage  : onKeyPress="fn_onKeyOnlyAlpha()" style="text-align:right; width=120;"
---------------------------------------------- */
function fn_onKeyOnlyAlpha()
{
	var sValid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

	var sValue = event.srcElement.value;
	var iKey = event.keyCode;
	var isShift = event.shiftKey;
	var isMove = false;
	var isCut  = false
	var isTrue = true;

	event.srcElement.style.imeMode = "inactive"; //style.imeMode(active:ѱ, inactive:) ׷, δ ݿ ȵȴ. (html tag style="IME-MODE:inactive;"  Ͽ߸..)

	var sReturnValue = "";
	for (var ii=0; ii < sValue.length; ii++) {
		if (sValid.indexOf(sValue.substring(ii, ii+1)) >= 0) {
			sReturnValue = sReturnValue + sValue.substring(ii, ii+1);
		}
	}

	if ( (iKey == 37 || iKey == 38 || iKey == 39 || iKey == 40) ||
		 (iKey == 13 || iKey == 8  || iKey == 46 || iKey == 9  || iKey == 16  || isShift) || (iKey >= 48 && iKey <= 57) ) {
		for (var ii=0; ii < sValue.length; ii++) {
			if (sValid.indexOf(sValue.substring(ii, ii+1)) < 0) {
				event.returnValue = false;
				isCut  = true;
				isTrue = false;
				break;
			}
		}
	} else {
		event.returnValue = false;
		isTrue = false;
	}

	if (isCut || isTrue == false)
		event.srcElement.value = sReturnValue;

	if (iKey == 13) {
		event.keyCode = 0;
		return sReturnValue;
	} else {
		return sReturnValue;
	}
}

/** =============================================
Return : event.returnValue = boolean
Comment: ŰԷ½ ڸ Է ް, /Dash Ű Էµǰų Է° ڸ ä Է¹ ü Ŀ ̵.
Usage  : onKeyUp="fn_onNextFocus(this, this.form.)"
---------------------------------------------- */
function fn_onNextFocus(objFrom, objTo)
{
	var sValid = "0123456789";

	var sValue = event.srcElement.value;
	var iKey = event.keyCode;
	var isShift = event.shiftKey;
	var isMove = false;
	var isCut  = false
	var isTrue = true;
	var oFrom = event.srcElement;

	event.srcElement.style.imeMode = "active"; //style.imeMode(active:ѱ, inactive:) ׷, δ ݿ ȵȴ. (html tag style="IME-MODE:inactive;"  Ͽ߸..)

	var sReturnValue = "";
	for (var ii=0; ii < sValue.length; ii++) {
		if (sValid.indexOf(sValue.substring(ii, ii+1)) >= 0) {
			sReturnValue = sReturnValue + sValue.substring(ii, ii+1);
		}
	}

	if ( (iKey == 37 || iKey == 38 || iKey == 39 || iKey == 40) ||
		 (iKey == 13 || iKey == 8  || iKey == 46 || iKey == 9  || iKey == 16  || isShift) || (iKey >= 48 && iKey <= 57) ) {
		for (var ii=0; ii < sValue.length; ii++) {
			if (sValid.indexOf(sValue.substring(ii, ii+1)) < 0) {
				event.returnValue = false;
				isCut  = true;
				isTrue = false;
				break;
			}
		}
	} else {
		event.returnValue = false;
		isTrue = false;
	}

	if (isCut || isTrue == false)
		oFrom.value = sReturnValue;

	if ( (iKey == 13 || iKey == 45) ||
		 (oFrom.value.length >= oFrom.maxLength &&
		 !(iKey == 37 || iKey == 38 || iKey == 39 || iKey == 40 || iKey == 9 || iKey == 16 || isShift)) ) {
		isMove = true;
	}

	if (isMove) {
		fn_focus(objTo);
	}

	if (iKey == 13) {
		event.keyCode = 0;
		return sReturnValue;
	} else {
		return sReturnValue;
	}
}

/** =============================================
Return : String ()
Comment: Է¹  ڸ Ѵ.
Usage  : onKeyUp="this.value=fn_clearString(this.value)"
---------------------------------------------- */
function fn_clearString(sVal)
{
	var pstr, sstr, ii;
	sstr = sVal;
	pstr = "";
	for(ii=0; ii<sstr.length; ii++) {
		//isNaN() : ԷĶ  ڸ false,ڰ ƴϸ true ȯ
		if( !isNaN(sstr.substr(ii, 1)) )
			pstr = pstr + sstr.substr(ii, 1);
	}
	return pstr;
}

/** =============================================
Return : String
Comment: Է¹ text  յڿ  Space, Tab, CRLF  
Usage  :
---------------------------------------------- */
function fn_trim(text)
{
	if (text == null) {
		return "";
	}

	var txt = text + "";
	var flag = false;

	//  Ʈ
	var ii = 0;

	while (!flag) {
		var ch = txt.charAt(ii);
		if ( (ch == ' ') || (ch == '\t') || (ch == '\n') || (ch == '\r') ) {
			if (ii < txt.length)
				ii++;
			else
				flag = true;
		} else
			flag = true;
	}

	if (ii == (txt.length))
		return "";
	else
		txt = txt.substring(ii);

	//  Ʈ
	flag = false;
	var jj = txt.length - 1;

	while (!flag) {
		var ch = txt.charAt(jj);
		if ( (ch == ' ') || (ch == '\t') || (ch == '\n') || (ch == '\r') ) {
			if ( jj > 0 )
				jj--;
			else
				flag = true;
		} else
			flag = true;
	}

	txt = txt.substring(0, jj+1);
	return txt;
}


/** =============================================
Return : String
Comment: Է¹ text  յڿ  Space, Tab, CRLF  
Usage  :
---------------------------------------------- */
function fn_trimByObj(obj)
{
	obj.value = fn_trim(obj.value);
}


/** =============================================
Return : boolean
Comment: Է°(sVal) /    ̰ 0 ̸ false
Usage  : if (fn_isNotNullByVal(chrr_nm.value) == false) return false;
		 if (fn_isNotNullByVal(tel_no3.value, tel_no2.value, tel_no3.value) == false) return false;
---------------------------------------------- */
function fn_isNotNullByVal()
{
	var isTrue = true;
	var sStr = "";
	for (var ii=0; ii < arguments.length; ii++) {
		sStr = fn_trim(arguments[ii]);
		if (sStr == "" || sStr == "null" || sStr == "undefined") {
			isTrue = false;
			break;
		}
	}
	return isTrue;
}

/** =============================================
Return : boolean
Comment: Է°(sVal) /    ̰ 0 ̸ false
Usage  : fn_isNotNullByVal() 
---------------------------------------------- */
function fn_isNotNullByValue()
{
	var isTrue = true;
	var sStr = "";
	for (var ii=0; ii < arguments.length; ii++) {
		sStr = fn_trim(arguments[ii]);
		if (sStr == "" || sStr == "null" || sStr == "undefined") {
			isTrue = false;
			break;
		}
	}
	return isTrue;
}

/** =============================================
Return : boolean
Comment: Էµ ü̸ شϴ ü  /    ̰ 0 ̸ false
Usage  : fn_isNotNullByVal() 
---------------------------------------------- */
function fn_isNotNullByObjName()
{
	var isTrue = true;
	var sStr = "";
	for (var ii=0; ii < arguments.length; ii++) {
		obj = getObj(arguments[ii]);
		sStr = fn_trim(obj.value);
		if (sStr == "" || sStr == "null" || sStr == "undefined") {
			isTrue = false;
			break;
		}
	}
	return isTrue;
}


//###############################################
// ¥  Լ Start
//###############################################
/** =============================================
Return : String (YYYYMMDD)
Comment: 糯¥,ϴ ¥ Ѵ (:YYYYMMDD) str: ¥(date), gubun:
Usage  :
---------------------------------------------- */
function fn_getDateNowToStr(str, gubun)
{
	if(str == "" || str == null || str == "undefined"){
	    str = 0;
	}
	var dNow = new Date();
	var yyyy = "";
	var mm   = "";
	var dd   = "";

    if( gubun == 'M' ) {
        dNow.setYear(dNow.getYear() + 1);
		dNow.setMonth(11);
		dNow.setDate(31);
	}
	else{
		dNow.setDate(dNow.getDate() + (str) );
	}

	yyyy = dNow.getYear();
	mm   = dNow.getMonth()+1;
	dd   = dNow.getDate();

	yyyy = fn_setFillzeroByVal( yyyy, 4 )+"/";
	mm   = fn_setFillzeroByVal( mm,   2 )+"/";
	dd   = fn_setFillzeroByVal( dd,   2 );
	return (yyyy + mm + dd);
}


/** =============================================
Return : boolean
Comment: Է¹ ⵵ ̸ true
Usage  :
---------------------------------------------- */
function fn_isLeafYear(YYYY)
{
	if ( ( (YYYY%4 == 0) && (YYYY%100 != 0) ) || (YYYY%400 == 0) ) {
		return true;
	}
	return false;
}

/** =============================================
Return : int (ش , )
Comment: Է¹ , ִ  Ѵ.
Usage  :
---------------------------------------------- */
function fn_MaxdayYearMonth(yyyy, mm)
{
	var monthDD = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

	var iMaxDay = 0;

	if ( fn_isLeafYear(yyyy) ) {
		monthDD[1] = 29;
	}
	iMaxDay = monthDD[mm - 1];

	return iMaxDay;
}

/** =============================================
Return : boolean
Comment: ¥ ȿ üũ(и yyyy, mm, dd )
Usage  :
---------------------------------------------- */
function fn_isYearMonthDay(yyyy, mm, dd)
{
	var isTrue  = false;

	var iMaxDay = fn_MaxdayYearMonth(yyyy, mm);

	if ( yyyy == "" && mm == "" && dd == "" ) {
		isTrue = true;
	} else {
		if ( (yyyy >= 1901) && (yyyy <= 9999) &&
			 (mm   >= 1)    && (mm   <= 12) &&
			 (dd   >= 1)    && (dd   <= iMaxDay) )
			isTrue = true;
	}

	return isTrue;
}

/** =============================================
Return : boolean
Comment: ¥ ȿ üũ(յ yyyymmdd )
Usage  :
---------------------------------------------- */
function fn_isDate( yyyymmdd )
{
	var isTrue  = false;

	if ( (yyyymmdd.length == 8) && fn_isNumStr(yyyymmdd) ) {

		var yyyy = eval(yyyymmdd.substring(0,4));
		var mm   = eval(yyyymmdd.substring(4,6));
		var dd   = eval(yyyymmdd.substring(6,8));

		if ( fn_isYearMonthDay(yyyy,mm,dd) )
			isTrue = true;
	} else if (yyyymmdd == "") {
		isTrue = true;
	}

	return isTrue;
}

/** =============================================
Return : boolean
Comment: ¥ ȿ üũ(и objYear, objMonth, objDay ü) ;; ȿ   ü  (⵵: 4ڸ, /: 2ڸ)
Usage  :
---------------------------------------------- */
function fn_isDateByObj( objYear, objMonth, objDay )
{
	var isTrue = false;

	isTrue = fn_isYearMonthDay(objYear.value, objMonth.value, objDay.value);

	if ( isTrue && objYear.value != "" && objMonth.value != "" && objDay.value != "") {
		objYear.value  = fn_setFillzeroByVal(objYear.value,  4);
		objMonth.value = fn_setFillzeroByVal(objMonth.value, 2);
		objDay.value   = fn_setFillzeroByVal(objDay.value,   2);
	}

	return isTrue;
}
//###############################################
// ¥  Լ End
//###############################################

/** =============================================
Return : boolean
Comment: ڿ ּұ ̸  üũ
Usage  :
---------------------------------------------- */
function fn_isLengthMinByVal(sVal, iLen, bMsgPop, sMsgHeader)
{
	var iValLen = fn_getByteLengthByVal(sVal);

	if (iValLen >= iLen) {
		return true;
	} else {
		if (bMsgPop) {
			alert(sMsgHeader + " ּ Է ڼ Դϴ!\n\n"+
				  sMsgHeader + " Է° ڼ ּ " + iLen + "̸\n" +
				  " Էµ ڼ " + iValLen + "Դϴ.\n\n" +
				  "( : ڼ  ̸, ѱ 1ڴ  2Դϴ.)");
		}
		return false;
	}
}

/** =============================================
Return : boolean
Comment: ڿ ִ ʰ  üũ
Usage  :
---------------------------------------------- */
function fn_isLengthMaxByVal(sVal, iLen, bMsgPop, sMsgHeader)
{
	var iValLen = fn_getByteLengthByVal(sVal);

	if (iValLen <= iLen) {
		return true;
	} else {
		if (bMsgPop) {
		    if(sMsgHeader =="̸"){
		        alert(sMsgHeader + "  " +iLen+ "ڱ Է մϴ.");
		    }else{
		        alert(sMsgHeader + "  " +iLen+ ",ѱ "+iLen/2+"ڱ Է մϴ.");
		    }
		}
		return false;
	}
}

/** =============================================
Return : boolean
Comment: ڿ ִ() ʰ(̸)  üũ
Usage  :
---------------------------------------------- */
function fn_isLengthMinMaxByVal(sVal, minLen, maxLen, bMsgPop, sMsgHeader)
{
	var isTrue = false;
	if ( fn_isObjValLenMin(name, minLen, bMsgPop, sMsgHeader) &&
		 fn_isObjValLenMax(name, maxLen, bMsgPop, sMsgHeader) )
		isTrue = true;

	return isTrue;
}

/** =============================================
Return : boolean
Comment: ü ּұ ̸  üũ
Usage  :
---------------------------------------------- */
function fn_isLengthMinByObj(obj, iLen, bMsgPop, sMsgHeader)
{
	var sVal = obj.value;

	if ( fn_isLengthMaxByVal(sVal, iLen, bMsgPop, sMsgHeader) ) {
		return true;
	} else {
		return false;
	}
}

/** =============================================
Return : boolean
Comment: ü ִ ʰ  üũ
Usage  :
---------------------------------------------- */
function fn_isLengthMaxByObj(obj, iLen, bMsgPop, sMsgHeader)
{
	var sVal = obj.value;

	if ( fn_isLengthMaxByVal(sVal, iLen, bMsgPop, sMsgHeader) ) {
		return true;
	} else {
	    obj.focus();
		return false;
	}
}

/** =============================================
Return : boolean
Comment: ü ִ() ʰ(̸)  üũ
Usage  :
---------------------------------------------- */
function fn_isLengthMinMaxByObj(obj, minLen, maxLen, bMsgPop, sMsgHeader)
{
	var sVal = obj.value;

	if ( fn_isLengthMinByVal(sVal, minLen, bMsgPop, sMsgHeader) &&
		 fn_isLengthMaxByVal(sVal, maxLen, bMsgPop, sMsgHeader) ) {
		return true;
	} else {
		return false;
	}
}

/** =============================================
Return :
Comment: ش ü ã 
Usage  :
---------------------------------------------- */
function show(srcName)
{
	src = getObj(srcName);
	if (src.checked == true) {
		for (var i=1; i < arguments.length; i++) {
			obj = getObj(arguments[i]);
			obj.style.display    = "";
			obj.style.visibility = "visible";
		}
	} else {
		for (var i=1; i < arguments.length; i++) {
			obj = getObj(arguments[i]);
			obj.style.display    = "none";
			obj.style.visibility = "hidden";
		}
	}
}

/** =============================================
Return :
Comment: ش ü ã 
Usage  :
---------------------------------------------- */
function hide(srcName)
{
	src = getObj(srcName);
	if (src.checked == true) {
		for (var i=1; i < arguments.length; i++) {
			obj = getObj(arguments[i]);
			obj.style.display    = "none";
			obj.style.visibility = "hidden";
		}
	} else {
		for (var i=1; i < arguments.length; i++) {
			obj = getObj(arguments[i]);
			obj.style.display    = "";
			obj.style.visibility = "visible";
		}
	}
}

/** =============================================
Return : boolean
Comment:  ڰ  üũ
Usage  :
---------------------------------------------- */
function fn_isInt(value)
{
	var   j;
	var   _intValue   = '0123456789';

	for(j=0;j<_intValue.length;j++)
		if(value == _intValue.charAt(j)) {
			return true;
		}
	return false;
}

/** =============================================
Return : boolean
Comment:  ڰ  Ǵ dash üũ
Usage  :
---------------------------------------------- */
function fn_isNumDash(value)
{
	var jj;
	var _phoneValue = '0123456789-';

	for(jj=0; jj<_phoneValue.length; jj++)
		if(value == _phoneValue.charAt(jj)) {
			return true;
		}
	return false;
}

/** =============================================
Return : boolean
Comment: ȭȣ(¹ȣ..)  ڿ üũ
Usage  :
---------------------------------------------- */
function fn_isNumDashStr(no)
{
	var    i;
	var    str = null;

	str = new String(no);

	if(str==null || str.length == 0)
		return false;

	for(i=0;i<str.length;i++)
		if(!fn_isNumDash(str.charAt(i)))
			return false;
	return true;
}

/** =============================================
Return : boolean
Comment: ڷ  ڿ üũ
Usage  :
---------------------------------------------- */
function fn_isNumStr(no)
{
	var    i;
	var    str = null;

	str = new String(no);

	if(str == null || str.length == 0)
		return false;

	for(ii = 0; ii < str.length; ii++)
		if(!fn_isInt(str.charAt(ii)))
			return false;
	return true;
}

var gsJuminNo = "";
/** =============================================
Return : boolean
Comment: ֹεϹȣ üũ
Usage  : if (fn_isJumin(theForm.jumin_biz_no1.value + theForm.jumin_biz_no2.value) == false) {
			 fn_focus(theForm.jumin_biz_no1);
		 }
---------------------------------------------- */
function fn_isJumin(sVal)
{
	var isTrue    = false;
	var isConfirm = false;
	var sJumin = fn_trim(sVal);

	if (sJumin == null || sJumin == "") {
		//  : true;
		return true;
	} else if (sJumin.length != 13) {
		// 13ڸ ƴϸ false;
		alert("ֹεϹȣ ,   13ڸ Դϴ.\n\nԷ׸ Ȯϼ!");
		return  false;
	} else {
		// ڰ ƴѰ : false;
		for (ii = 0; ii < sJumin.length; ii++) {
			if (sJumin.substring(ii, ii+1) < "0" || sJumin.substring(ii, ii+1) > "9") {
				alert("ֹεϹȣ ڰ ƴ ڰ ԷµǾϴ.\n\nԷ׸ Ȯϼ!");
				return false;
			}
		}
	}

	// **************************************************
	//  ˻ ..
	// **************************************************

	// ֹεϹȣ  
	var sBirth = fn_getBirthByVal(sJumin.substring(0, 6), sJumin.substring(6, 13));
	// ֹεϹȣ   ̰, "1111111111111"  ƴϸ
	// **ֹε üũ ˻**
	if (sBirth.length == 8 && fn_isDate(sBirth) &&
		sJumin != "1111111111111" ) {
		// ֹε üũ ˻ ...
		var sJuminChk = new String("234567892345")
		var iJuminSum = 0;
		var sJuminLst = "";
		for (ii = 0; ii < 13; ii++) {
			iJuminSum = iJuminSum + (sJumin.substring(ii, ii+1) * sJuminChk.substring(ii, ii+1));
		}

		sJuminLst = (11 - (iJuminSum % 11)) % 10;

		if (sJuminLst == sJumin.substring(12, 13) ) {
			isTrue = true;
		} else {
			isTrue = false;
		}
	} else {
		isTrue = false;
	}

	if ( !isTrue ) {
		if (gsJuminNo == sJumin) {
			isConfirm = true;
		} else {
			isConfirm = alert("ֹεϹȣ ȿ  ֹεϹȣԴϴ");
		}

		if ( isConfirm ) {
			gsJuminNo = sJumin;
			isTrue = true;
		} else {
			gsJuminNo = "";
		}
	}

	return isTrue;
}

/** =============================================
Return : boolean
Comment: ֹεϹȣ üũ
Usage  : if (fn_isJuminByVal(theForm.jumin_biz_no1.value, theForm.jumin_biz_no2.value) == false) {
			 fn_focus(theForm.jumin_biz_no1);
		 }
---------------------------------------------- */
function fn_isJuminByVal(strJumin1, strJumin2)
{
	var isTrue = false;
	var sJumin1 = strJumin1 + "";
	var sJumin2 = strJumin2 + "";

	isTrue = fn_isJumin(sJumin1 + sJumin2);

	return isTrue;
}

/** =============================================
Return : boolean
Comment: ֹεϹȣ üũ
Usage  : fn_isJuminByVal(strJumin1, strJumin2) 
---------------------------------------------- */
function fn_isJuminByObj(objJumin1, objJumin2)
{
	var isTrue = false;
	var sJumin1 = objJumin1.value + "";
	var sJumin2 = objJumin2.value + "";

	isTrue = fn_isJumin(sJumin1 + sJumin2);

	if ( !isTrue ) {
		fn_focus(objJumin1);
	}

	return isTrue;
}

/** =============================================
Return : boolean
Comment: ڵϹȣ üũ
Usage  :
---------------------------------------------- */
function fn_isBusiNoByValue(strNo)
{

	alert(strNo);

    var sum = 0;
    var getlist =new Array(10);
    var chkvalue =new Array("1","3","7","1","3","7","1","3","5");

    for (var i=0;i<10;i++){
        getlist[i] = strNo.substring(i,i+1);
    }

    for (var i=0;i<9;i++){
        sum += getlist[i]*chkvalue[i];
    }
    sum = sum +parseInt((getlist[8]*5)/10) ;
    sidliy = sum%10;
    sidchk = 0;

    if ( sidliy != 0 ) {
        sidchk = 10 - sidliy;
    } else {
        sidchk = 0;
    }
    if ( sidchk != getlist[9] ) {
        return false;
    }
    return true;


}

/** =============================================
Return : boolean
Comment: ڵϹȣ üũ
Usage  :
---------------------------------------------- */
function fn_isBizRegNoByObj(objBusino1,objBusino2,objBusino3 )
{
	var objBusino;
	objBusino = objBusino1.value+objBusino2.value+objBusino3.value;
	return fn_isBusiNoByValue(objBusino);
}

/** =============================================
Return : boolean
Comment: E-mail ּ üũ Լ
Usage  :
---------------------------------------------- */
function fn_isEmail(email_addr)
{
	if (email_addr == "") return false;

	var t = email_addr;

	var Alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var Digit = '1234567890';
	var Symbol='_-';
	var check = '@.' + Alpha + Digit + Symbol;

	for (i=0; i < t.length; i++)
		if(check.indexOf(t.substring(i,i+1)) < 0)    {
			return false;
		}

	var check = '@';
	var a = 0;
	for (i=0; i < t.length; i++)
		if(check.indexOf(t.substring(i,i+1)) >= 0)    a = i;

	var check = '.';
	var b = 0;

	for (i=a+1; i < t.length; i++)
		if(check.indexOf(t.substring(i,i+1)) >= 0)  b = i;

	if (a != 0 && b != 0 && b!=t.length-1 ) {
		return true;
	} else {
		return false;
	}
}

/** =============================================
Return : boolean
Comment: ȭȣ(DDD, , ȣ  Է ޾ ȿ ȭȣΰ  ȣ 4ڸ ä 
Usage  :
---------------------------------------------- */
function fn_isPhoneByObj( objAreaNo, objCallNo, objTelNo, bFillZeros )
{
	var isTrue = false;
	var sAreaNo = objAreaNo.value + "";
	var sCallNo = objCallNo.value + "";
	var sTelNo  = objTelNo.value  + "";

	if (sAreaNo == "" && sCallNo == "" && sTelNo == "") {
		isTrue = true;
	} else {
		// ****
		// parseInt : ù ڰ ڰ ƴ('0')  NaN 
		// isNaN    :  ƴϸ true
		//  ̷   parseInt(ڰ * 1)  ؾ߸ Ѵ.
		var iAreaNo = parseInt(sAreaNo * 1);
		var iCallNo = parseInt(sCallNo * 1);
		var iTelNo  = parseInt(sTelNo  * 1);
		if ( ( !isNaN(iAreaNo) && !isNaN(iCallNo) && !isNaN(iTelNo) ) &&
			 ( iAreaNo ==  2 /*  */ ||
			   iAreaNo == 31 /*  */ ||
			   iAreaNo == 32 /* õ */ ||
			   iAreaNo == 33 /*  */ ||
			   iAreaNo == 41 /* 泲 */ ||
			   iAreaNo == 42 /*  */ ||
			   iAreaNo == 43 /*  */ ||
			   iAreaNo == 51 /* λ */ ||
			   iAreaNo == 52 /*  */ ||
			   iAreaNo == 53 /* 뱸 */ ||
			   iAreaNo == 54 /*  */ ||
			   iAreaNo == 55 /* 泲 */ ||
			   iAreaNo == 61 /*  */ ||
			   iAreaNo == 62 /*  */ ||
			   iAreaNo == 63 /*  */ ||
			   iAreaNo == 64 /*  */ ||
			   iAreaNo == 10 /* 010  */ ||
			   iAreaNo == 11 /* 011  */ ||
			   iAreaNo == 16 /* 016  */ ||
			   iAreaNo == 17 /* 017  */ ||
			   iAreaNo == 18 /* 018  */ ||
			   iAreaNo == 19 /* 019  */ ) &&
			 ( iCallNo >= 10 && iCallNo <= 9999 ) &&
			 ( iTelNo  >= 0  && iTelNo  <= 9999 ) ) {
			isTrue = true;
			if (bFillZeros || bFillZeros == null) {
				objAreaNo.value = fn_setFillzeroByVal( objAreaNo.value, 4 );
				objCallNo.value = fn_setFillzeroByVal( objCallNo.value, 4 );
				objTelNo.value  = fn_setFillzeroByVal( objTelNo.value,  4 );
			} else {
				objAreaNo.value = "0"+ iAreaNo;
				// objCallNo.value = objCallNo.value;
				// objTelNo.value  = objTelNo.value;
			}
		}
	}

	return isTrue;
}

/** =============================================
Return : String
Comment: sVal ̸ iLen "0" ä 
Usage  :
---------------------------------------------- */
function fn_formatFillZeroByVal( sVal, iLen )
{
	var sStr = fn_trim(sVal);

	for (ii = sStr.length; ii < iLen; ii++)
		sStr = "0" + sStr;

	return sStr;
}

/** =============================================
Return :
Comment: obj.value ̸ iLen "0" ä 
Usage  :
---------------------------------------------- */
function fn_formatFillZeroByObj( obj, iLen )
{
	obj.value = fn_formatFillZeroByVal(obj.value, iLen);
}

/** =============================================
Return : String
Comment: sVal ̸ iLen "0" ä   
Usage  :
---------------------------------------------- */
function fn_setFillzeroByVal( sVal, iVal )
{
	sStr = sVal + "";

	for (ii = sStr.length; ii < iVal; ii++) {
		sStr =  "0" + sStr;
	}

	return sStr;
}

/** =============================================
Return :
Comment: ֹεϹȣ  .
Usage  : sBirth = fn_getBirthdayByVal( sJumin1, sJumin2 );
---------------------------------------------- */
function fn_getBirthByVal( sJumin1, sJumin2 )
{
	var isTrue = true;
	var sYearPreCode = "";
	var sYearBase = "";
	var sBirth = "";

	// 01.ֹεϹȣ  Էµ ʾ return;
	if ( sJumin1.length != 6 || sJumin2.length != 7 || isNaN(sJumin1) || isNaN(sJumin2) ) {
		return "";
	}

	// 02.ֹεϹȣ ڸ ùڰ 9/0:1800, 1/2:1900, 3/4:2000 ƴϸ return;
	sYearPreCode = sJumin2.substring(0,1);
	if (sYearPreCode == "9" || sYearPreCode == "0") {
		sYearBase = "18";
	} else if (sYearPreCode == "1" || sYearPreCode == "2") {
		sYearBase = "19";
	} else if (sYearPreCode == "3" || sYearPreCode == "4") {
		sYearBase = "20";
	} else {
		return "";
	}

	// 11. 
	sBirth = sYearBase + sJumin1.substring(0, 2)
		   + sJumin1.substring(2, 4)
		   + sJumin1.substring(4, 6);

	return sBirth;
}

/** =============================================
Return :
Comment: ֹεϹȣ ̼⿩θ ǺѴ.
Usage  : onBlur="fn_isAdultByObj(objJumin1, objJumin2);"
---------------------------------------------- */
function fn_isAdultByValue( strJumin1, strJumin2 )
{
	var isTrue = false;
	var sJumin1 = strJumin1;
	var sJumin2 = strJumin2;
	var sBirth = fn_getBirthByVal(sJumin1, sJumin2);


	if (sBirth.length == 8) {
		var dNow   = new Date();
		var dLimit = new Date(dNow.getYear()-18, dNow.getMonth(), dNow.getDate());
		var iYear = dLimit.getYear();
		if (iYear <= 99)
			iYear = 1900 + iYear;
		var iMonth = dLimit.getMonth() + 1;
		var iDay   = dLimit.getDate();
		var sLimit = fn_setFillzeroByVal(iYear,  4)
				   + fn_setFillzeroByVal(iMonth, 2)
				   + fn_setFillzeroByVal(iDay,   2);
		if (sBirth > sLimit) {
			isTrue = true;
		}
	} else {
		// ֹεϹȣ  Էµ ʾҰų ֹεϹȣ ڸ ùڰ ̸ return true;
		isTrue = true;
	}

	return isTrue;
}

/** =============================================
Return :
Comment: ֹεϹȣ ̼⿩θ ǺѴ.
Usage  : onBlur="fn_isAdultByObj(objJumin1, objJumin2);"
---------------------------------------------- */
function fn_isAdultByObj( objJumin1, objJumin2 )
{
	var isTrue = false;
	var sJumin1 = objJumin1.value;
	var sJumin2 = objJumin2.value;

	if ( fn_isAdultByValue(sJumin1, sJumin2) ) {
		isTrue = true;
	}

	return isTrue;
}

/** =============================================
Return :
Comment: ֹεϹȣ ϰ  Ѵ. (  select Ǵ radio type  , select  )
Usage  : ֹεϹȣ 2° ü
		 onBlur="fn_setBirthSexFromJumin(this.form.jumin_biz_no1, this.form.jumin_biz_no2, this.form.dt_bir1, this.form.dt_bir2, this.form.dt_bir3, this.form.sex_cd);"
---------------------------------------------- */
function fn_setBirthSexFromJumin( objJumin1, objJumin2, objBirthYear, objBirthMonth, objBirthDay, objGender )
{
	var sGenderMan    = "M";
	var sGenderWoman  = "F";
	var iGenderMan    = 0;
	var iGenderWoman  = 1;

	var sYearPreCode = "";
	var sGender  = ""
	var iGender  = -1;

	var sJumin1 = objJumin1;
	var sJumin2 = objJumin2;
	var sBirth = fn_getBirthByVal(sJumin1, sJumin2);



	// 01.ֹεϹȣ  Էµ ʾҰų
	// 02.ֹεϹȣ ڸ ùڰ ̸ return;
	if (sBirth.length != 8) {
		return;
	}

	// 11. 
	//    ( ϵǾ  ʰų,  ¥ 쿡)
	if (fn_trim(objBirthYear.value) + fn_trim(objBirthMonth.value) + fn_trim(objBirthDay.value) == "" ||
		fn_isDateByObj(objBirthYear, objBirthMonth, objBirthDay) == false) {
		objBirthYear.value  = sBirth.substring(0, 4);
		objBirthMonth.value = sBirth.substring(4, 6);
		objBirthDay.value   = sBirth.substring(6, 8);
	}

	// 12. 
	sYearPreCode = sJumin2.substring(0,1);
	if (sYearPreCode % 2 == 1) {
		sGender = sGenderMan;
		iGender = iGenderMan;
	} else {
		sGender = sGenderWoman;
		iGender = iGenderWoman;
	}

	if ( objGender != null && (objGender.type == "select-one" || objGender.type == "select-multiple") ) {
		//  select ü̸
		objGender.options.selectedIndex = iGender + (objGender.options.length - 2);
	} else if ( (objGender[0] != null && objGender[1] != null) && (objGender[0].type == "radio" && objGender[1].type == "radio") ) {
		//  input type="radio" ü̸
		objGender[(iGender+1) % 2].checked = false;
		objGender[iGender].checked = true;
	}
}

/** =============================================
Return : number
Comment: Է¹ ڿ Ʈ  RETURN
Usage  :
---------------------------------------------- */
function fn_getByteLengthByVal(sVal)
{
	var iMaxlength  = sVal.length;
	var sOneByteStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 !@#$%^&*(),./<>?;':\"=-_+";
	var iByteLength = 0;

	/*
	var MSIEIndex = navigator.userAgent.indexOf("MSIE");
	if (navigator.userAgent.indexOf("MSIE")    == -1 ||
		navigator.userAgent.indexOf("Windows") == -1 ||
		navigator.userAgent.substring((MSIEIndex + 5),(MSIEIndex + 6)) < 4) {
		return  iMaxlength;
	}
	*/

	for(var ii = 0; ii < iMaxlength; ii++) {
		if (sVal.charCodeAt(ii) > 127) { // if (sOneByteStr.indexOf(sVal.substring(ii, ii+1)) < 0) {  // if (sVal.charCodeAt(ii) > 127) {
			iByteLength++;
			iByteLength++;
		} else {
			iByteLength++;
		}
	}

	return iByteLength;
}

/** =============================================
Return : number
Comment: Է¹ ü Ʈ  RETURN
Usage  :
---------------------------------------------- */
function fn_getByteLengthByObj(obj)
{
	return fn_getByteLengthByVal(obj.value)
}

/** =============================================
Return : boolean
Comment: Է¹(input) ش繮(chars) ִ üũѴ.
Usage  :
---------------------------------------------- */
function checkString(input,chars)
{
	for (var inx = 0; inx < input.length; inx++) {
	   if (chars.indexOf(input.charAt(inx)) == -1)
		   return true;
	}
	return false;
}

/** =============================================
Return : boolean
Comment: Է¹(input) ش繮(chars) ִ üũѴ.
Usage  :
---------------------------------------------- */
function checkNumber(input)
{
	var chars = "0123456789";
	return checkString(input,chars);
}

/** =============================================
Return : boolean
Comment: Է¹(input) ش繮(chars) ִ üũѴ.
Usage  :
---------------------------------------------- */
function checkUpperCase(input)
{
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return checkString(input,chars);
}



/** =============================================
Return : boolean
Comment: Է¹(input) ش繮(chars) ִ üũѴ.
Usage  :
---------------------------------------------- */
function checkSearchStr(input, chars)
{
	return checkString(input,chars);
}

/** =============================================
Return :
Comment: ڷΰ
Usage  :
---------------------------------------------- */
function fn_history()
{
	history.back();
}

/** =============================================
Return :
Comment: Ŀ ̵
Usage  :
---------------------------------------------- */
function fn_basic_focus(obj)
{
	obj.focus();
}


/** =============================================
Return : boolean
Comment: ѱ۸ Էߴ üũѴ.
Usage  :
---------------------------------------------- */
function isKorean(obj) {
    //var len = obj.value.length;
    var len = obj.length;
	var numUnicode;

	for(i=0;i<len;i++)
	{
	   //numUnicode = obj.value.charCodeAt(i)
	   numUnicode = obj.charCodeAt(i)
		if ( 44032 <= numUnicode && numUnicode <= 55203 )
		{
			continue;
		}else{
		    return false;
			break;
		}
	}

	return true;
}

/** =============================================
Return : boolean
Comment: (space) Էߴ üũѴ.
Usage  :
---------------------------------------------- */
function space_check(obj)
{
	for(i = 0; i < obj.length; i++)
	{
		s_obj = obj.charAt(i);

		if(s_obj == ' ')
			return false;
	}
	return true;
}

/** =============================================
Return : boolean
Comment: NULL  Էߴ üũѴ.
Usage  :
---------------------------------------------- */
function null_check(obj)
{
	if(obj.value == "")
		return true;
}

/** =============================================
Return : boolean
Comment: /ڸ Էߴ üũѴ.
Usage  :
---------------------------------------------- */
function alpha_num_check(obj){

	str = obj.value;
	len = str.length;
	ch = str.charAt(0);

	for(i = 0; i < len; i++)
	{
		ch = str.charAt(i);
		if( (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') )
		{
			continue;
		}
		else
		{
			return false;
		}
	}

	return true;
}

/** =============================================
Return : boolean
Comment: ư üũ RETURN
Usage  :
---------------------------------------------- */
function hasCheckedRadio(obj) {
	if (obj.length > 1) {
		for (var inx = 0; inx < obj.length; inx++) {
			if (obj[inx].checked) return true;
		}
	} else {
		if (obj.checked) return true;
	}
	return false;
}


/** =============================================
Return : String
Comment: ư üũ RETURN (, üũ ʾ  "0")
Usage  :
---------------------------------------------- */
function retValueRadio(obj, msg) {

	var ret_val = "0";
	if(hasCheckedRadio(obj))
	{
		for (var inx = 0; inx < obj.length; inx++)
		{
			if (obj[inx].checked)
			{
				ret_val = obj[inx].value;
				return ret_val;
			}
		}
	}

	if(obj.value=="undefined")
	{
		return ret_val;

	}

	return ret_val;

}

/** =============================================
Return :
Comment: combo box ִ option ߿ ϰ ϴ  Ŀ .
Usage  :
---------------------------------------------- */
function setComboBox(formName, comboName, selectedOption)
{
	var form=document.forms[formName];
	var combo=form[comboName];

	for( i=0;i < combo.options.length;i++)
	{
		if (combo.options(i).value == selectedOption)
		{
			combo.selectedIndex=i;
			break;
		}
	}
}

/*==============================================================================*/

/*=== 2002 1010 ߰ ===*/
/** =============================================
Return : boolean
Comment: , Էߴ üũѴ.
Usage  :
---------------------------------------------- */
function alpha_num_join(obj)
{
	str = obj.value;
	len = str.length;
    var vFlag = false;
	if(isNaN(str.charAt(0))){
		for(i =0; i < len; i++){
			ch = str.charAt(i);
				if( (ch >= '0' && ch <= '9')){
					vFlag =	true;
				}
		}
	}else{
		for(i =0; i < len; i++){
			ch = str.charAt(i);
				if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')){
					vFlag =	true;
				}
		}
	}
	return vFlag;
}


function fmtNumber(s)
{
	var str  = s.replace(/\D/g,"");
	var len  = str.length;
	var tmp  = "";
	var tm2  = "";
	var i    = 0;

	while (str.charAt(i) == '0') i++;
	str = str.substring(i,len);
	len = str.length;
	if(len < 3) {
		return str;
	} else {
		var sit = len % 3;
		if (sit > 0) {
			tmp = tmp + str.substring(0,sit) + ',';
			len = len - sit;
		}
		while (len > 3) {
			tmp = tmp + str.substring(sit,sit+3) + ',';
			len = len - 3;
			sit = sit + 3;
		}
		tmp = tmp + str.substring(sit,sit+3) + tm2;
		str = tmp;
	}
	return str;
}


// ݾ Է½ "," ڵ Է &  
function addMoneyComma( Name )
{
    var src;
    var i;
    var	factor;
    var	su;
    var	SpaceSize = 0;

	Del_MoneyComma(Name);

    factor = Name.value.length % 3;
    su     = (Name.value.length - factor) / 3;
    src    =  Name.value.substring(0,factor);

    for(i=0; i < su ; i++)
    {
		if((factor == 0) && (i == 0))       // "XXX" ΰ
		{
			src += Name.value.substring(factor+(3*i), factor+3+(3*i));
		}
	    else
		{
		    src += ","  ;
			src += Name.value.substring(factor+(3*i), factor+3+(3*i));
		}
    }
    Name.value = src;

    return true;
}


// ĸ(",") ڵ 
function Del_MoneyComma( Name )
{
    var  x, ch;
    var  i=0;
    var  newVal="";

    for(x = 0; x < Name.value.length ; x++){
    	ch= Name.value.substring(x,x+1);
		if( ch != ",")  newVal += ch;
    }
    Name.value =  newVal;
    return true;
}


// Ű Է½   ',' Է 
function key_amt_number(){
	if (!event.shiftKey
	    && ( event.keyCode >=48 && event.keyCode <=57 )			//  0~9
		|| (event.keyCode >=96 && event.keyCode <= 105 ) 	// keypad 0~9
		|| (event.keyCode == 109 )											//  -
		|| (event.keyCode == 189 )											// keypad -
		|| (event.keyCode == 188 )											//  ,
		|| (event.keyCode == 8 )												// back space
		|| (event.keyCode == 9 )												// tab
		|| (event.keyCode == 13 )											// enter
		|| (event.keyCode == 46 )											// delete
		|| (event.keyCode >= 37 && event.keyCode <= 40 ) )	// Ű
	{
			return true;
	}
	else {
		event.returnValue = false;
	}

}

/** =============================================
Return : string
Comment: ݾ׿ ޸ ߰ Ʈ ȯ
Usage  :
---------------------------------------------- */
function setMoneyComma(str){
	var rtStr;	//  ڿ

	// null ̳ 0 ̸ blank
	if(isNull(str) || str=="0" || str=="0.0") return "0";

	//ùڰ -϶ - ݾ óϰ ߿ -
	var minus = "";
	if(str.substring(0,1) == "-"){
		rtStr = str.substring(1);		// '-'   
		minus = "-";
	}else										// ׿  
		rtStr = str;

	//Ҽ  պκи rtStr ־óϰ ޺κ   ξٰ ߿ .
	var belowzero = "";
	if (chkDot(rtStr)==true){
		arr = rtStr.split(".");
		rtStr = arr[0];		     //Ҽ պκ
		belowzero = "." + arr[1];    //Ҽ  ޺κ
	}

	// ޸
	rtStr = rmString(rtStr, ',');

	var len = rtStr.length ;
	var result ="";

	for (var i=0; i < len;i++){  //   ޸ ǥ
		comma="";
		var schar = rtStr.charAt(i);
		where = len - 1 - i;
		if ((where % 3) == 0 && len > 3 && where != 0) comma = ",";
		result = result +   schar + comma ;
	}
    rtStr = minus + result + belowzero;	// -  Ҽ ϸ 
	return rtStr;
}

/** =============================================
Return : boolean
Comment: ݾ׿ Ҽ ִ üũ. Ѵٸ true, ٸ false
Usage  :
---------------------------------------------- */
function chkDot(str){
	for (var i=0; i< str.length; i++) {
		if(str.charAt(i) == "." )	return true;
	}
	return false;
}

/** =============================================
Return : string
Comment: Ʈ Ķͷ  char 
Usage  :
---------------------------------------------- */
function rmString(str, rmChar){
	//null ִٸ
	if(isNull(str) || isNull(rmChar)) return false;

	// ڸ rmChar üũ
	if(rmChar.length != 1){
		alert("[ũƮ  ]\r\n rmStr 1ڸ ڸ   ֽϴ.");
		return;
	}
	var len = str.length;
	var rtValue = "";

	for(var i =0 ; i < len ; i++){
		if(str.charAt(i) != rmChar){
			rtValue += str.charAt(i);
		}
	}
	return rtValue;
}

function isNull(str) {
 	if (str+"" == "undefined" || str+"" == "NaN" || str+"" == "null" || str+"" == "")
 		return true;
	return false;
}


/** =============================================
Return : string
Comment: Է¹ ¥ 6 ¥ 
Usage  :
---------------------------------------------- */


function cala_weekday( x_nMonth, x_nDay, x_nYear) {

    if(x_nMonth >= 3){
            x_nMonth -= 2;
    }
    else {
            x_nMonth += 10;
    }

    if( (x_nMonth == 11) || (x_nMonth == 12) ){
            x_nYear--;
    }

    var nCentNum = parseInt(x_nYear / 100);
    var nDYearNum = x_nYear % 100;

    var g = parseInt(2.6 * x_nMonth - .2);

    g +=  parseInt(x_nDay + nDYearNum);
    g += nDYearNum / 4;
    g = parseInt(g);
    g += parseInt(nCentNum / 4);
    g -= parseInt(2 * nCentNum);
    g %= 7;

    if(x_nYear >= 1700 && x_nYear <= 1751) {
            g -= 3;
    }
    else {
            if(x_nYear <= 1699) {
                    g -= 4;
            }
    }

    if(g < 0){
            g += 7;
    }

    return g;
}

function mDate_Comp(gbn, ilsu, fr_date, to_date)
{
	var	ilsu_tbl = new Array();
	ilsu_tbl[0] = new Array('00');
	ilsu_tbl[1] = new Array('31');
	ilsu_tbl[2] = new Array('00');
	ilsu_tbl[3] = new Array('31');
	ilsu_tbl[4] = new Array('30');
	ilsu_tbl[5] = new Array('31');
	ilsu_tbl[6] = new Array('30');
	ilsu_tbl[7] = new Array('31');
	ilsu_tbl[8] = new Array('31');
	ilsu_tbl[9] = new Array('30');
	ilsu_tbl[10] = new Array('31');
	ilsu_tbl[11] = new Array('30');
	ilsu_tbl[12] = new Array('31');
	var	year, month, day, wk_ilsu, hyuil_gbn;
	var	wk_sign, wk_date, temp;
	var	fr_dt;
	fr_dt = fr_date.toString();

	if( gbn != '1'  &&  gbn != '2'  &&  gbn != '3'  &&  gbn != '11')
	{
		alert("ȸ  Դϴ");
		return;
	}
	if( !ilsu)
	{
		alert("ȸ  0  Ұմϴ");
		return;
	}
	if( mDate_Check(fr_date))
	{
		alert("Է³ Ȯϼ!");
		return;
	}

	year  = parseInt((fr_dt.substring(0,4)), 10);
	month = parseInt((fr_dt.substring(4,6)), 10);
	day   = parseInt((fr_dt.substring(6,8)), 10);

	if( ilsu < 0){

		wk_ilsu = parseInt(ilsu, 10) * -1;

		wk_sign = '-';
	}else {
		wk_ilsu = ilsu;
		wk_sign = '+';
	}

	if( mYear_Comp(year))
		ilsu_tbl[2] = 29;
	else	ilsu_tbl[2] = 28;

	switch(gbn){
	    case  1:		/*  ϼ   */

		if( wk_sign == '+'){
			wk_ilsu += parseInt(day, 10);

			while(1){
				if( wk_ilsu > ilsu_tbl[month] ){
					wk_ilsu -= ilsu_tbl[month];
					month++;

					if(month > 12){
						year++;
						month = 1;
						if( mYear_Comp(year))
							ilsu_tbl[2] = 29;
						else	ilsu_tbl[2] = 28;
					}
				}else {

					day = wk_ilsu;

					break;
				}
			}

		}
		if( wk_sign == '-'){
			while(1){
				if( (parseInt(day, 10) - parseInt(wk_ilsu, 10)) <= 0 ){
					wk_ilsu -= parseInt(day, 10);

					month--;
					if( month == 0){

						year--;
						month = 12;
						if( mYear_Comp(year))
							ilsu_tbl[2] = 29;
						else	ilsu_tbl[2] = 28;
					}
					day = ilsu_tbl[month];

				}else {


					day -= wk_ilsu;

					break;
				}
			}
		}
		break;
	    case  2:		/*     */
		if( wk_sign == '+'){
			year = year + parseInt((parseInt((wk_ilsu + month), 10) / 12),10) ;
			month = (parseInt(month, 10) + parseInt(wk_ilsu, 10)) % 12;
			if( month == 0){
				year--;
				month = 12;
			}
		}
		if( wk_sign == '-'){
			if( (parseInt(month, 10) - parseInt(wk_ilsu, 10)) <= 0 ){
				year = year - parseInt((parseInt((parseInt(wk_ilsu, 10) - parseInt(month, 10)), 10) / 12),10) -1;
				month = 12 - (parseInt(wk_ilsu, 10) - parseInt(month, 10)) % 12;
			}else {
				month -= wk_ilsu;
			}
		}
		if( mYear_Comp(year))
			ilsu_tbl[2] = 29;
		else	ilsu_tbl[2] = 28;
		if( day > ilsu_tbl[month])
			day = ilsu_tbl[month];
		break;
	    case  3:		/*     */
		if( wk_sign == '+')
			year += wk_ilsu;
		else	year -= wk_ilsu;

		if( mYear_Comp(year))
			ilsu_tbl[2] = 29;
		else	ilsu_tbl[2] = 28;
		if( day > ilsu_tbl[month])
			day = ilsu_tbl[month];
		break;
	}
	if(month < 10)
	{

		to_date = year + "" + "0" + month;

		if(day < 10)
		{
			to_date = to_date + "0" + day;
		}else{
			to_date = to_date + "" + day;
		}
	}else{
		if(day < 10)
		{
			day = "0" + day;
		}
		to_date = year + "" + month + "" + day;
	}
	return	to_date;
}

function mDate_Check(fr_date)
{
    var ilsu_tbl = new Array();
    ilsu_tbl[0] = new Array('00');
    ilsu_tbl[1] = new Array('31');
    ilsu_tbl[2] = new Array('00');
    ilsu_tbl[3] = new Array('31');
    ilsu_tbl[4] = new Array('30');
    ilsu_tbl[5] = new Array('31');
    ilsu_tbl[6] = new Array('30');
    ilsu_tbl[7] = new Array('31');
    ilsu_tbl[8] = new Array('31');
    ilsu_tbl[9] = new Array('30');
    ilsu_tbl[10] = new Array('31');
    ilsu_tbl[11] = new Array('30');
    ilsu_tbl[12] = new Array('31');
    var year, month, day;
    var temp;
    var fr_dt;
    fr_dt = fr_date.toString();

    if(fr_dt.length != 8)
    {
        alert("ڱ ! 8ڸ !");
        return -1;
    }
    if(fr_date * 0 != 0)
    {
        alert("ڰ  ƴմϴ!");
        return -1;
    }

    year  = parseInt(fr_dt.substring(0,4), 10);
    month = parseInt(fr_dt.substring(4,6), 10);
    day   = parseInt(fr_dt.substring(6,8), 10);

    /*  input  üũ  */
    if( month < 1  ||  month > 12)
    {
        alert(" Է  ƴմϴ 1 ~12 !");
        return -1;
    }
    if( mYear_Comp(year))
        ilsu_tbl[2] = 29;
    else    ilsu_tbl[2] = 28;

    if( day < 1  ||  day > ilsu_tbl[month])
    {
        alert("  ڹ 1~31 ʰ!");
        return -1;
    }
    return  0;
}

function mYear_Comp(year)
{
	var	temp=0;

	if( !(parseInt(year, 10)%4))		temp = -1;
	if( !(parseInt(year, 10)%100))		temp =  0;
	if( !(parseInt(year, 10)%400))		temp = -1;
	return temp;
}

function focus_move(p_objCurrent, p_objNext){
  if ( p_objCurrent.getAttribute("Maxlength") == p_objCurrent.value.length){
    p_objNext.focus();
  }
}


/** =====================================================
Return :
Comment: Է¹ ¹ȣ Field "-" ߰
Usage  : 28012345678(11ڸ)  => 280-12-345678(13ڸ)
         010123123456(12ڸ) => 010-123-123456(14ڸ)
------------------------------------------------------- */
function Add_AccDash( AccNum )
{
    var Acc = "";

	if(AccNum.value.length < 11) return;
	if(AccNum.value.length > 12) return;

    //   "-" ִٸ
    for(var x = 0; x < AccNum.value.length ; x++)
    {
        ch = AccNum.value.substring(x,x+1);
        if( ch == "-") return;
    }

	if( AccNum.value.length == 11 ) { // 11ڸ
	    Acc =  AccNum.value.substring(0,3);
	    Acc += "-";
	    Acc += AccNum.value.substring(3,5);
	    Acc += "-";
	    Acc += AccNum.value.substring(5,12);
	}
	else if( AccNum.value.length == 12 ){ //Ű 12ڸ
	    Acc =  AccNum.value.substring(0,3);
	    Acc += "-";
	    Acc += AccNum.value.substring(3,6);
	    Acc += "-";
	    Acc += AccNum.value.substring(6,12);
	}

    AccNum.value = Acc;
	return;
}

/** =====================================================
Return :
Comment: ¹ȣ Field  "-" 
Usage  : 280-12-345678(13ڸ)  => 28012345678(11ڸ)
         010-123-123456(14ڸ) => 010123123456(12ڸ)
------------------------------------------------------- */
function Del_AccDash( AccNum )
{
    var  x, ch;
    var  i=0;
    var  newVal="";

    for(x = 0; x < AccNum.value.length ; x++)
    {
        ch= AccNum.value.substring(x,x+1);
        if( ch != "-") newVal += ch;
    }
    AccNum.value = newVal;
    return;
}


function Del_Dash( orgVal )
{
	var  x, ch;
	var  i=0;
	var  newVal="";

	for(x = 0; x < orgVal.length ; x++)
	{
		ch= orgVal.substring(x,x+1);
		if( ch != "-") newVal += ch;
	}
	return newVal;
}


function checkAccNoPassword(passStr) {

	if(passStr.length != '4') {
		alert("ºйȣ 4ڸԴϴ.");
		return false;
	}

	if(passStr == '1111' || passStr == '2222' || passStr == '3333' || passStr == '4444' || passStr == '5555' || passStr == '6666' ||
		passStr == '7777' || passStr == '8888' || passStr == '9999' || passStr == '0000' ) {
		alert("ºйȣ  ̾ ȵ˴ϴ.");
		return false;
	}

	if(	passStr == '0123' || passStr == '1234' || passStr == '2345' || passStr == '3456' || passStr == '4567' || passStr == '5678' ||
		passStr == '6789' || passStr == '9876' || passStr == '8765' || passStr == '7654' || passStr == '6543' || passStr == '5432' ||
		passStr == '4321' || passStr == '3210' ) {
		alert("ºйȣ ӹȣ̾ ȵ˴ϴ.");
		return false;
	}

	return true;
}

/** =====================================================
Return : boolean
Comment: ѱ ԵǾִ  
Usage  :
------------------------------------------------------- */
function koreanCheck(str) {
    var i;
    var ch;
        var bool = true;
        str= str.substring(str.lastIndexOf('\\')+1, str.len); //ϸ 
    for (i=0;i<str.length;i++) {
        ch = escape(str.charAt(i));        //ISO-Latin-1 ڼ 

        if (strCharByte(ch) == 2) { //ѱ 
                        bool = false;
                        break;
        }
    }
    return bool;
}

/** =====================================================
Return : 2->ѱ
Comment: char ѱ  
Usage  :
------------------------------------------------------- */
function strCharByte(chStr) {
    if (chStr.substring(0, 2) == '%u') {
        if (chStr.substring(2,4) == '00')
            return 1;
        else
            return 2;        //ѱ
    } else if (chStr.substring(0,1) == '%') {
        if (parseInt(chStr.substring(1,3), 16) > 127)
            return 2;        //ѱ
        else
            return 1;
    } else {
            return 1;
    }
}

/** =====================================================
Return :
Comment: ϻ return
Usage  :
------------------------------------------------------- */
function getFileSize(path) {
    var img = new Image();
    var size = 0;
    img.dynsrc = path;
    size = img.fileSize;
    return size;
}

/** =====================================================
Return :
Comment: ڿ ϴ ̰  ɶ ʿ ڸ ش̸ŭ ִ Լ
Usage  :
------------------------------------------------------- */
function lpad(str,n,ch) {
 str = String(str);
 var result = "";
 var len = str.length;
 if ( len < n ) {
  for ( var i=0; i<(n-len); i++ ) {
   result += ch;
  }
  result += str;
 }
 else {
  result = str;
 }
 return result;
}

/** =====================================================
    trim
------------------------------------------------------- */
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/gi, "");
}

/** =====================================================
    replaceAll
------------------------------------------------------- */
String.prototype.replaceAll = function(str1, str2) {
    var temp_str = "";

    if (this.trim() != "" && str1 != str2) {
        temp_str = this.trim();

        while (temp_str.indexOf(str1) > -1) {
            temp_str = temp_str.replace(str1, str2);
        }
    }

  return temp_str;
}

/** =====================================================
Return : ѱ,,ΰ true, ƴϸ flase
Comment: ѱ,,ڸ Էߴ üũ
Usage  :
------------------------------------------------------- */
function isSpecialChar(obj) {
    var inText = obj.value;
    var deny_pattern = /[^(-Ra-zA-Z0-9 )]/;

    if(deny_pattern.test(inText))
    {
        return false;
    }
    return true;
}

/** =====================================================
Return : ΰ true, ƴϸ flase
Comment: ڸ Էߴ üũ
Usage  :
------------------------------------------------------- */
function isOnlyNumber(obj) {
    var inText = obj.value;
    var deny_pattern = /[^(0-9)]/;

    if(deny_pattern.test(inText))
    {
        return false;
    }
    return true;
}

function filterEventsWord(str) {

    var filter = 'script,javascript,onabort,onactivate,onafterprint,onafterupdate,onbeforeactivate,onbeforecopy,onbeforecut,onbeforedeactivate,onbeforeeditfocus,onbeforepaste,onbeforeprint,onbeforeunload,onbeforeupdate,onblur,onbounce,oncellchange,onchange,onclick,oncontextmenu,oncontrolselect,oncopy,oncut,ondataavailable,ondatasetchanged,ondatasetcomplete,ondblclick,ondeactivate,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,onerror,onerrorupdate,onfilterchange,onfinish,onfocus,onfocusin,onfocusout,onhelp,onkeydown,onkeypress,onkeyup,onlayoutcomplete,onload,onlosecapture,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onmove,onmoveend,onmovestart,onpaste,onpropertychange,onreadystatechange,onreset,onresize,onresizeend,onresizestart,onrowenter,onrowexit,onrowsdelete,onrowsinserted,onscroll,onselect,onselectionchange,onselectstart,onstart,onstop,onsubmit,onunload';

    var s = filter.split(",");

    for (i=0; i < s.length; i++)
    {
        if (str.indexOf(s[i]) != -1)
            return s[i];
    }
    return "";
}

/*
 *  length üũ(maxLenth  /ѱ  )
 */
function fn_chkByte(str,strlenMax) {

var ls_str = str.value;
var li_str_len = ls_str.length;

var li_max = strlenMax;
var i = 0;
var li_byte = 0;
var li_len = 0;
var ls_one_char = "";
var ls_str2 = "";

for(i=0; i< li_str_len; i++) {
    ls_one_char = ls_str.charAt(i);

    if (escape(ls_one_char).length > 4) {
        li_byte += 2;
    } else {
        li_byte++;
    }

    if(li_byte <= li_max) {
        li_len = i + 1;
    }
}

    if(li_byte > li_max) {
        alert( " " +li_max+ ",ѱ "+li_max/2+"ڱ Է մϴ.");
        ls_str2 = ls_str.substr(0, li_len);
        str.value = ls_str2;
    }
    str.focus();
}
