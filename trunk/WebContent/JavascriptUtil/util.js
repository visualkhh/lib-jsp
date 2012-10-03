
/**
  * Object Object()
  * @constructor
  * @since Standard ECMA-262 3rd. Edition
  * @since Level 2 Document Object Model Core Definition.
 */



function StringUtil(){};
StringUtil.prototype = new Object();

/**
 * inputStr 의 내용중    검색대상 StringArray(matchingSrtingArr) 가 매칭되는것이 있으면 매칭된 String의 Array  리턴 
 * @param {String} inputStr,  {StringArray} matchingSrtingArr
 * @returns {Array}.
*/  

StringUtil.isMatching=function(input_s, matchingSrting_Arr){
	var result  = Array();
	var arrindex = 0 ;
	for(var i=0; i <matchingSrting_Arr.length;i++){
		var index = input_s.indexOf(matchingSrting_Arr[i]);
		if(index>=0){
			result[arrindex]=matchingSrting_Arr[i];
			index++;
		}
	}
	return result;
};



function RegExpUtil(){};
RegExpUtil.prototype = new Object();
RegExpUtil.is=function(regexp,msg){
	return regexp.test(msg);
};
function DateUtil(){};
DateUtil.prototype = new Object();
DateUtil.getMilliSecond=function(){
	return regexp.test(new Date().getTime());
};
DateUtil.getSecond=function(){
	return regexp.test(new Date().getTime()/1000);
};

function Validate(){};
Validate.prototype = new Object();
Validate.isPersonalNumber=function(personalNumber_s){
	  var personal_no = personalNumber_s.replace(/[^\d]+/g, ''); 
	    pattern = /^[0-9]{6}[1-8][0-9]{6}$/; 

	    if(!pattern.test(personal_no)) { 
	        return false; 
	    } 
	    var birth = new Array(); 
	    birth[0] = personal_no.substr(0, 2); 
	    switch(personal_no.charAt(6)) { 
	    case '1': 
	    case '2': 
	        birth[0] = ('19' + birth[0]) * 1; 
	        birth[3] = false; 
	        break; 
	    case '3': 
	    case '4': 
	        birth[0] = ('20' + birth[0]) * 1; 
	        birth[3] = false; 
	        break; 
	    case '5': 
	    case '6': 
	        birth[0] = ('19' + birth[0]) * 1; 
	        birth[3] = true; 
	        break; 
	    case '7': 
	    case '8': 
	        birth[0] = ('20' + birth[0]) * 1; 
	        birth[3] = true; 
	        break; 
	     
	    } 

	    birth[1] = personal_no.substr(2, 2) * 1; 
	    birth[2] = personal_no.substr(4, 2) * 1; 

	    if(birth[1] < 1 || birth[1] > 12) { 
	        return false; 
	    } 
	    if(birth[2] < 1 || birth[2] > 31) { 
	        return false; 
	    } 
	    var check = 0; 
	    var mul = 2; 

	    if(birth[3]) { 
	        if(((personal_no.charAt(7) * 10 + personal_no.charAt(8)) % 2) != 0) { 
	            return false; 
	        } 
	    } 
	    for(i = 0; i < 12; i ++) { 
	        check += personal_no.charAt(i) * mul; 
	        mul ++; 
	        if(mul > 9) { 
	            mul = 2; 
	        } 
	    } 

	    check = 11 - (check % 11); 

	    if(check > 9) { 
	        check %= 10; 
	    } 
	    if(birth[3]) { 
	        check += 2; 
	        if(check > 9) { 
	            check %= 10; 
	        } 
	    } 
	    if(check != personal_no.charAt(12)) { 
	        return false; 
	    } 
	    //return birth; 
	    return true;
};
Validate.isBusinessNumber=function(businessNumber_s){
	 var strNumb = ConvertingUtil.replaceAll(businessNumber_s,"-","");
	 strNumb = ConvertingUtil.replaceAll(businessNumber_s," ","");
	 
	 
	 if (strNumb.length != 10) { 
	 //alert("사업자등록번호가 잘못되었습니다."); 
	 return false; 
	 } 
	 
	 sumMod = 0; 
	 sumMod += parseInt(strNumb.substring(0,1)); 
	 sumMod += parseInt(strNumb.substring(1,2)) * 3 % 10; 
	 sumMod += parseInt(strNumb.substring(2,3)) * 7 % 10; 
	 sumMod += parseInt(strNumb.substring(3,4)) * 1 % 10; 
	 sumMod += parseInt(strNumb.substring(4,5)) * 3 % 10; 
	 sumMod += parseInt(strNumb.substring(5,6)) * 7 % 10; 
	 sumMod += parseInt(strNumb.substring(6,7)) * 1 % 10; 
	 sumMod += parseInt(strNumb.substring(7,8)) * 3 % 10; 
	 sumMod += Math.floor(parseInt(strNumb.substring(8,9)) * 5 / 10); 
	 sumMod += parseInt(strNumb.substring(8,9)) * 5 % 10; 
	 sumMod += parseInt(strNumb.substring(9,10)); 
	 
	 if (sumMod % 10 != 0) { 
	 //alert("사업자등록번호가 잘못되었습니다."); 
	 return false; 
	 } 
	 return true; 
};
Validate.isPassWordHigh=function(msg,minlen,maxlen){
	if(!minlen){
		minlen=12;
	}
	if(!maxlen){
		maxlen=99999;
	}
	var chk1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/i;  //특수문자
	//var chk1 = new RegExp("^[a-z\\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{"+minlen+","+maxlen+"}$","i");;  //a-z와 0-9이외의 문자가 있는지 확인
//	var chk1 = new RegExp("^[a-z\\d]{"+minlen+","+maxlen+"}$","i");;  //a-z와 0-9이외의 문자가 있는지 확인
	// var chk0 = /^[a-z\d]{1,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
	//var chk1 = new RegExp("^[a-z\\d~!#$^&*\\=+|:;?\"<,.>%']{"+minlen+","+maxlen+"}$","i"); 
   // var chk1 = /^[a-z\d~!#$^&*\=+|:;?"<,.>%']{12,999999999999}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
				 //  /^[a-z\d~!#$^&*\=+|:;?"<,.>%']{12,99999}$/i
    var chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
    var chk3 = /\d/;  //적어도 한개의 0-9 확인
   // var chk4 = /[~!#$^&*\=+|:;?"<,.>']/;

    
    var range = msg.length>=minlen && msg.length<=maxlen?true:false;
    
	return  RegExpUtil.is(chk1, msg) && RegExpUtil.is(chk2, msg) && RegExpUtil.is(chk3, msg) && range;
};

Validate.isEmail = function (str){
	//    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
    var check=/@[\w\-]+\./;
    var checkend=/\.[a-zA-Z]{2,3}$/;
    try{
        if(((str.search(exclude) != -1)||(str.search(check)) == -1)||(str.search(checkend) == -1)){
            return false;
        }else{
            return true;
        }
    }catch (error){}
    return false;
};

Validate.isPhoneFormat=function(input_s) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(input_s,format);
};

//////////Converting Util

function ConvertingUtil(){};
ConvertingUtil.prototype = new Object();

/**
 * 키보드 키코드를 케릭터로 반환한다     
 * 없으면 -1을 리턴
 * @param {String} inputStr_s
 * @returns {Char}
*/  
ConvertingUtil.keyCodeToCharcode=function(inputStr_s){
	return String.fromCharCode(inputStr_s);
};
ConvertingUtil.charToCode=function(inputStr_c){
	return inputStr_c.charCodeAt(0);
};

ConvertingUtil.toUpperCase=function(inputStr_s){
	return String(inputStr_s).toUpperCase();
};
ConvertingUtil.toLowerCase=function(inputStr_s){
	return  String(inputStr_s).toLowerCase();
};
ConvertingUtil.jsonToAttribute=function(object_o,unionString_s){
	if(!unionString_s){
		unionString_s='=';
	}
    var results = [];
    for (var property in object_o) {
        var value = object_o[property];
        if (value)
            results.push(property.toString() +unionString_s+ "'" + value+"'");
        }
                 
        return results.join('  ');
};
ConvertingUtil.trim=function(msg_s){
	return msg_s.replace(/^\s*|\s*$/g,'');
};
ConvertingUtil.onlyNumber=function(msg_s){
	return msg_s.replace(/[^\d]+/g, ''); 
};
ConvertingUtil.encodeURI=function(url_s){
	return encodeURI(url_s);
};
ConvertingUtil.decodeURI=function(url_s){
	return decodeURI(url_s);
};
ConvertingUtil.replaceAll=function(msg_s,before_s,after_s){
var regexp = new RegExp(before_s,"gi");
	return msg_s.replace(regexp,after_s);
	
};


/*  파라미터 넘어오는거 보는 방법  가변파라미터 처리 가능 
function MM_preloadImages() { // v3.0
	var d = document;
	if (d.images) {
		if (!d.MM_p)
			d.MM_p = new Array();
		var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
		for (i = 0; i < a.length; i++)
			if (a[i].indexOf("#") != 0) {
				d.MM_p[j] = new Image;
				d.MM_p[j++].src = a[i];
			}
	}
}
*/
/*
ConvertingUtil.domToJson=function(obj){
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
*/


//////////Window Util
function WindowUtil(){};
WindowUtil.prototype = new Object();

WindowUtil.newWindow=function(url){
    window.open(url);
};

WindowUtil.newPopup=function(url,width_n,height_n,name_s){
    var winl = ScreenUtil.getCenterWidth();
    var wint = ScreenUtil.getCenterHeight();
    if(!name_s){
    	name_s='new_WindowName';
    }
    winl -= (width_n/2);
    wint -= (height_n/2);
    var winprops = "width="+width_n+",height="+height_n+",top="+wint+",left="+winl+",scrollbars=NO,resizable = YES, status=yes";
    window.open(url,name_s,winprops);
};


WindowUtil.resize=function(window_o_width_n,width_n_height_n,height_n){
	if(JavaScriptUtil.isNumber(window_o_width_n)){
		self.resizeTo(window_o_width_n,width_n_height_n);
		return;
	}
	
	if(!window_o_width_n){
		window_o_width_n=self;
	}
	window_o_width_n.resizeTo(width_n_height_n,height_n);
};
WindowUtil.close=function(window_o){
	if(!window_o){
		window_o = self;
	}
	window_o.close();
};


WindowUtil.getWindowWidth=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.outerWidth;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.document.documentElement.offsetWidth;
	}
};

WindowUtil.getWindowHeight=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.outerHeight;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.document.documentElement.offsetHeight;
	}
};


WindowUtil.getWindowTop=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.screenX;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.screenTop;
	}
};

WindowUtil.getWindowLeft=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.screenY;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.screenLeft;
	}
};



WindowUtil.getDocumentWidth=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.innerWidth;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.document.documentElement.clientWidth;
	}
};
WindowUtil.getDocumentHeight=function(window_o){
	if(!window_o){
		window_o =  self;
	}
	if(JavaScriptUtil.isNetscape()){
		window_o.innerHeight;
	}else if(JavaScriptUtil.isInternetExplorer()){
		window_o.document.documentElement.clientHeight;
	}
};







function ScreenUtil(){};
ScreenUtil.prototype = new Object();
ScreenUtil.getWidth=function(){
	return screen.width;
};
ScreenUtil.getCenterWidth=function(){
	return this.getWidth()/2;
};
ScreenUtil.getHeight =function(){
	return screen.height;
};
ScreenUtil.getCenterHeight =function(){
	return  this.getHeight()/2;
};
ScreenUtil.getAvailWidth=function(){
	return screen.availWidth;
};
ScreenUtil.getCenterAvailWidth=function(){
	return this.getAvailWidth()/2;
};
ScreenUtil.getAvailHeight =function(){
	return screen.availHeight;
};
ScreenUtil.getCenterAvailHeight =function(){
	return  this.getAvailHeight()/2;
};


///////////Location..유틸
function LocationUtil(){};
LocationUtil.prototype = new Object();
LocationUtil.getHost=function(window_o){
	if(!window_o){
		 window_o = window;
	}
	return window_o.location.host;
};

LocationUtil.getHostName=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_o.location.hostname;
};
LocationUtil.getHref=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_v.location.href;
};
LocationUtil.getPathName=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_v.location.pathname;
};
LocationUtil.getPort=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_o.location.port;
};
LocationUtil.getProtocol=function(window_o){
	if(!window_o){
		window_o = window;
	}
	return window_o.location.protocol;
};
LocationUtil.getSearch=function(window_o){
	if(!window_o){
		 window_o = window;
	}
	return window_o.location.search;
};
LocationUtil.reLoad=function(window_o,optionalArg_b){
	if(!window_o){
		window_o = window;
	}
	window_o.location.reload(optionalArg_b);
};




///////////쿠키..유틸
function CookieUtil(){};
CookieUtil.prototype = new Object();
/*CookieUtil.getCookie = function( name_s ){
	var nameOfCookie = name_s + "=";
	var x = 0;
	while(x <= document.cookie.length){
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
					if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
							endOfCookie = document.cookie.length;
					return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
			break;
	}
	return "";
};
*/



CookieUtil.getCookie=function(name_s) {
    var first;
    var str = name_s + "=";
   var ar = document.cookie.split("; ");
   for(var i=0; i<ar.length; i++) {
         var c = ar[i];
         var nv = c.split("=");
         if(nv[0] == name_s)
             return unescape(nv[1]);
   }
   return null;
};	

CookieUtil.setCookie = function (name_s, value_s, expireSecond_n) {
	 var expireDate = new Date ();
	 expireDate.setTime(expireDate.getTime() + (expireSecond_n * 1000)); //mmsecond -> second
    var cookieStr = name_s + "=" + escape(value_s) + 
     ((expireDate == null)?"":("; expires=" + expireDate.toGMTString()));
     document.cookie = cookieStr;
};






//////////event Util

function EventUtil(){};
EventUtil.prototype = new Object();
EventUtil.TYPE_CLICK="click";
EventUtil.TYPE_ONLOAD="onload";
EventUtil.TYPE_MOUSEDOWN="mousedown";
EventUtil.TYPE_MOUSEUP="mouseup";
EventUtil.TYPE_MOUSEMOVE="mousemove";
EventUtil.TYPE_CHANGE="change";
EventUtil.getEventName=function(type_event_s){
	var accept_event="";
	 if (window.addEventListener) {   // all browsers except IE before version 9
	
		 if(type_event_s==this.TYPE_CLICK){
			 accept_event="click";
		 }else if(type_event_s==this.TYPE_ONLOAD){
			 accept_event="load";
		 }else if(type_event_s==this.TYPE_MOUSEDOWN){
			 accept_event="mousedown";
		 }else if(type_event_s==this.TYPE_MOUSEUP){
			 accept_event="mouseup";
		 }else if(type_event_s==this.TYPE_MOUSEMOVE){
			 accept_event="mousemove";
		 }else if(type_event_s==this.TYPE_CHANGE){
			 accept_event="change";
		 }
		 
		 
    }else {
        if (window.attachEvent) {    // IE before version 9
   		 if(type_event_s==this.TYPE_CLICK){
			 accept_event="onclick";
		 }else if(type_event_s==this.TYPE_ONLOAD){
			 accept_event="onload";
		 }else if(type_event_s==this.TYPE_MOUSEDOWN){
			 accept_event="onmousedown";
		 }else if(type_event_s==this.TYPE_MOUSEUP){
			 accept_event="onlosecapture";
		 }else if(type_event_s==this.TYPE_MOUSEMOVE){
			 accept_event="mousemove";
		 }else if(type_event_s==this.TYPE_CHANGE){
			 accept_event="onchange";
		 }
        }
    }
	 
	 return accept_event;
};
EventUtil.addEventListener=function(obj_o ,type_event_s,function_f){
	var accept_eventname = this.getEventName(type_event_s);
	var sw = false;
	if(type_event_s==this.TYPE_MOUSEUP ||type_event_s==this.TYPE_MOUSEMOVE){
		sw=true;
	}

	 if (obj_o.addEventListener) {   // all browsers except IE before version 9
		 obj_o.addEventListener (accept_eventname, function_f, sw);
     } 
     else {
         if (obj_o.attachEvent) {    // IE before version 9
        	 obj_o.attachEvent (accept_eventname, function_f);
         }
     }
};


EventUtil.removeEventListener=function(obj_o ,type_event_s,function_f){
	var accept_eventname = this.getEventName(type_event_s);
	var sw = false;
	if(type_event_s==this.TYPE_MOUSEUP ||type_event_s==this.TYPE_MOUSEMOVE){
		sw=true;
	}

	 if (obj_o.removeEventListener) {   // all browsers except IE before version 9
		 obj_o.removeEventListener (accept_eventname, function_f, sw);
     } 
     else {
         if (obj_o.detachEvent ) {    // IE before version 9
        	 obj_o.detachEvent  (accept_eventname, function_f);
         }
     }
};

EventUtil.addOnloadEventListener=function(object_o_function_f,function_f){
	if(!object_o_function_f){
		object_o_function_f=window;
	}
	//alert(object_o_function_f+"      "+JavaScriptUtil.isObject(object_o_function_f));
	if(JavaScriptUtil.isObject(object_o_function_f)){
		this.addEventListener(object_o_function_f, this.TYPE_ONLOAD, function_f);
	}else if(JavaScriptUtil.isFunction(object_o_function_f)){
		this.addEventListener(window, this.TYPE_ONLOAD, object_o_function_f);
	};
};

EventUtil.isEnter=function(event_o){
	if(event_o.keyCode == 13){
		return true;
	}else{
		return false;
	}
};




//////////RequestUtil
function RequestUtil(){};
RequestUtil.prototype = new Object();
RequestUtil.getParameter=function(parametername_s){
	var strParamName= parametername_s;
    var arrResult = null;
    if (strParamName) 
            arrResult = location.search.match(new RegExp("[&?]" + strParamName+"=(.*?)(&|$)"));
    return arrResult && arrResult[1] ? arrResult[1] : null;
};
RequestUtil.getParameters=function(window_o){
	if(!window_o){
		window_o = window;
	}
	        var return_o =null;
	        var nowAddress = unescape(window_o.location.href);
	        var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');

	        if(parameters[0]==nowAddress){
	        	return null;
	        }
	        
	        for(var i = 0 ; i < parameters.length ; i++)
	        {
	        	if(!return_o)
	        		return_o = new Object();
	        	
	            var varName = parameters[i].split('=')[0];
	            return_o[varName] = parameters[i].split('=')[1];
	        }
	
	        return return_o;
};


//////////rex Util
function RexUtil(){};
RexUtil.prototype = new Object();





///////////기본적인..유틸
function JavaScriptUtil(){};
JavaScriptUtil.prototype = new Object();
JavaScriptUtil.UNIQUEID=0;
JavaScriptUtil.getNextNumber=function(object_o){
	return  this.UNIQUEID++;
};
JavaScriptUtil.removeComma=function(input_s) {
    return input_s.replace(/,/gi,"");
};
/*  Null 값 Check */
JavaScriptUtil.isNull = function(object_o) {
	if(object_o) {
		return true;
	}
	return false;
};
/*
function isNumber(input) {
    var chars = "0123456789";
    return isCharsOnly(input,chars);
}*/
JavaScriptUtil.isNumberData =function(string_s) {
	var str = string_s.value;
	if(isNaN(str)){
		return false;
	}else if(str.length == 0){
		return false;
	}// end fi

	for(var i=0; i < str.length; i++){
		if(!('0' <= str.charAt(i) &&
             str.charAt(i) <= '9'))
		{
			return false;
		}// end fi
	}// end for
	return true;
};
/********************************************************************
* 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
* ex)if(isEmpty(form.keyword)) {
*		alert("검색조건을 입력하세요.");
*	}
********************************************************************/
JavaScriptUtil.isEmpty =function(input_s) {
    if (input_s.value == null || input_s.value.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
};
JavaScriptUtil.isAlphabet=function(input_s) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return isCharsOnly(input_s,chars);
};
JavaScriptUtil.isAlphabetUpper=function (input_s) {
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
return isCharsOnly(input_s,chars);
};
JavaScriptUtil.isAlphabetLower=function(input_s) {
var chars = "abcdefghijklmnopqrstuvwxyz";
return isCharsOnly(input_s,chars);
};
JavaScriptUtil.isCharsOnly = function(input,chars) {
    for (var inx = 0; inx < input.value.length; inx++) {
       if (chars.indexOf(input.value.charAt(inx)) == -1)
           return false;
    }
    return true;
};
JavaScriptUtil.isArray=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Array]	';
};
JavaScriptUtil.isNumber=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Number]';
};
JavaScriptUtil.isString=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object String]';
};
JavaScriptUtil.isFunction=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Function]';
};
JavaScriptUtil.isObject=function(object_o){
	var sw=false;
	if(this.isNetscape()){
		sw  = Object.prototype.toString.call(object_o)=='[object Object]' || Object.prototype.toString.call(object_o)=='[object global]';
	}else if(this.isInternetExplorer()){
		sw  = Object.prototype.toString.call(object_o)=='[object Object]';
	}
	return sw ;
};
JavaScriptUtil.isBoolean=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object Boolean]';
};
JavaScriptUtil.isRegExp=function(object_o){
	return  Object.prototype.toString.call(object_o)=='[object RegExp]';
};
JavaScriptUtil.getType=function(object_o){
	return  Object.prototype.toString.call(object_o);
};

JavaScriptUtil.copyObject=function(object_o){
	var return_obj=new Object();
    for (var property in object_o) {
    	return_obj[property] = object_o[property]; 
    }
	return  return_obj;
};
/* 왠만하면 copyObject쓰세요  이건 제이슨 값만 복사되더라구요*/
JavaScriptUtil.copyJson=function(object_o){
	return  JSON.parse(JSON.stringify(object_o));
};

JavaScriptUtil.getBrowserType=function(navigator_o){
	if(!navigator_o){
		navigator_o = navigator;
	}
	return  navigator_o.appName;
};

JavaScriptUtil.isNetscape=function(){
	return this.getBrowserType()=='Netscape';
};

JavaScriptUtil.isInternetExplorer=function(){
	return  this.getBrowserType()=='Microsoft Internet Explorer';
};

JavaScriptUtil.extend = function(superreobject_o,childobject_o){
	var return_obj = this.copyObject(childobject_o);
	
    for (var property in superreobject_o) {
    	return_obj[property] = superreobject_o[property]; 
    }
	return return_obj;
};


JavaScriptUtil.autoFocus = function(object_o_s,length_n,focusObject_o){
	var input_data_s ="";
	if(this.isObject(objectz_o)){
		input_data_s = objectz_o.value;
	}else if(this.isString(object_o_s)){
		input_data_s = object_o_s;
	}
	
	
	if(input_data_s.length >= length_n){
		focusObject_o.focus();
		focusObject_o.select();
	}
};

JavaScriptUtil.getRandomInt(size_n){
//	 var result = Math.floor(Math.random() * 10) + 1;
	 return Math.floor(Math.random() * size_n);
};






/*format util*/
function MathUtil(){};
MathUtil.prototype = new Object();
MathUtil.round=function(numValue_n,precision_n)
{
	var wholeNum = Math.floor(numValue_n);
	var tempNum =numValue_n-wholeNum;
	var multiplier=Math.pow(10,precision_n);
	var precNum = Math.round(tempNum*multiplier);
	precNum= precNum/multiplier;
	
	return wholeNum+precNum;	
};



/*format util*/
function FormatUtil(){};
FormatUtil.prototype = new Object();
//alert(FormatUtil.format("####/##", "20120203showmethenoney"));
FormatUtil.format= function(format_s,data_s,matchPattern_s){
	if(!matchPattern_s){
		matchPattern_s = "#";
	}	
	var return_val="";
	var position=0;
	
	for ( var i = 0; i < format_s.length; i++) {
		if(format_s.charAt(i)==matchPattern_s){
			return_val+=data_s.charAt(position++);
		}else{
			return_val+=format_s.charAt(i);
		}
	}
	
	//if(data_s.length>format_s.length){
		return_val+=data_s.substring(position, data_s.length);
	//}
	
	return return_val;
};

/**
 * mask형식으로 문자열을 변환한다.
 * 예) 우편번호일경우 <input type="text" ..... omblur="format_mask(this, '999-999')">
 * 예) 날짜일경우 <input type="text" ..... omblur="format_mask(this, '9999-99-99')">
 * @create 2004-07-28
 * @param obj : 형식을 변환하고자 하는 객체
          mask : 변환할 타입 ex)'9999-99-99'
 * @return 
 * @browser IE6, NS7
 */
FormatUtil.format_mask=function(obj, mask){
    var str = obj.value;
    if(str == "" || str.length == 0) return;
    var sStr = str.replace( /(\$|\^|\*|\(|\)|\+|\.|\?|\\|\{|\}|\||\[|\]|-|:)/g,"");
    var tStr="";
    var i;
    var j=0;
    var tLen = sStr.length +1 ;
    for(i=0; i< sStr.length; i++){
        tStr += sStr.charAt(i);
        j++;
        if (j < mask.length && mask.charAt(j)!="9") tStr += mask.charAt(j++);
    }
    obj.value = tStr;
} ;













