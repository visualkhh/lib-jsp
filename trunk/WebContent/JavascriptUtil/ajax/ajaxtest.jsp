<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="<%=request.getContextPath() %>/JavascriptUtil/util.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript">
//creatClass
AjaxK.prototype = new Object();
//AjaxK.prototype	= AjaxUtil.getAjaxObj();
//AjaxK.prototype.constructor	=AjaxK;

AjaxK.READYSTATE_UNINITIALIZED 			= 0; //객체만 생성되고 아직 초기화 되지 않은 상태(open 메서드가 호출되지 않음)
AjaxK.READYSTATE_LOADING 				= 1; //open 메서드가 호출되고 아직 send 메서드가 불리지 않은상태
AjaxK.READYSTATE_LOADED 				= 3; //send 메서드가 불렸지만 status와 헤더는 도착하지 않은상태
AjaxK.READYSTATE_INTERACTIVE 			= 4; //데이터의 일부를 받은상태
AjaxK.READYSTATE_COMPLETED				= 5; //데이터를 전부 받은 상태 완전한 데이터의 이용가능
AjaxK.STATE_OK							= 200; //요청성공
AjaxK.STATE_FORBIDDEN					= 403; //접근거브
AjaxK.STATE_NOTFOUND					= 404; //페이지없어
AjaxK.STATE_INTERNALSERVERERROR			= 500; //서버 오류 발생



AjaxK.prototype.context=null;
AjaxK.prototype.name=null;
AjaxK.prototype.requestObj=null;

//param-----start
AjaxK.prototype.url				= "";
AjaxK.prototype.type			= "POST";
AjaxK.prototype.data			= null,
AjaxK.prototype.dataType		= "TEXT";
AjaxK.prototype.async			= true;
AjaxK.prototype.autoStart		= true;
AjaxK.prototype.loop			= false;
AjaxK.prototype.onBeforeProcess	= function(){};
AjaxK.prototype.onSuccess		= function(){};
AjaxK.prototype.onError			= function(){};
AjaxK.prototype.onComplete		= function(){};
AjaxK.prototype.onMonitor		= function(){};
//param------end


AjaxK.prototype.responsed = false;

/* 익스경우 이렇게 상속자체를 못한다 -_-8에서 아오ㅉ댜ㅓㅁ자ㅣㅇㅁㅇ
AjaxRequest.prototype=AjaxUtil.getAjaxObj();
AjaxRequest.prototype.constructor = AjaxRequest;
AjaxRequest.prototype.ajaxk=null;
AjaxRequest.prototype.onreadystatechange=function(){
	alert(1);
};

function AjaxRequest(ajaxk_o){
	this.ajaxk=ajaxk_o;
};
*/

function AjaxK(name_s_param_o){
	if(JavaScriptUtil.isString(name_s_param_o)){
		this.name=name_s_param_o;
	}else if(JavaScriptUtil.isObject(name_s_param_o)){
		this.setParam(name_s_param_o);
	}
	this.context = this;
	
	var ro = AjaxUtil.getAjaxObj();//new AjaxRequest(this);
	this.requestObj = ro;//this.requestObj = new AjaxRequest(this);//this.requestObj = AjaxUtil.newAjaxObj();
	//this.requestObj.ajaxk=this;
	//this.requestObj.prototype.ajaxk = this;
	//this.requestObj.onreadystatechange = this.onReceive;
	this.requestObj.onreadystatechange = function(){
		this.ajaxk.onReceive.call(this.ajaxk); //this.ajaxk.onReceive.apply(this.ajaxk);
	};
}
AjaxK.prototype.onReceive = function(){
	if(this.responsed){//한번했는데 두번 들어올수있으니.
		return;
	}

	if (this.requestObj.readyState == AjaxK.READYSTATE_INTERACTIVE || this.requestObj.readyState == AjaxK.READYSTATE_COMPLETED) {
        if (this.requestObj.status == AjaxK.STATE_OK) {
        	var indata = null;
        	if(StringUtil.upper(this.dataType)=="TEXT"){
        		indata = this.requestObj.responseText;
        	}else if(StringUtil.upper(this.dataType)=="JSON"){
        		indata = eval("(" + this.requestObj.responseText + ")");
        	}else if(StringUtil.upper(this.dataType)=="XML"){
        		//indata = XMLUtil.getXMLObj(this.request.responseText);
        		indata = this.requestObj.responseXML;
        	}
        	this.onSuccess(indata,this.requestObj.readyState,this.requestObj.status);
        }else{
        	this.onError(this.requestObj.responseText,this.requestObj.readyState,this.requestObj.status);
        }
        this.onComplete();
        this.responsed = true;
        if(this.loop){
        	this.start();
        }
	}
	
	
	//loop!~~
	if(this.requestObj.readyState>3){
		this.onMonitor(this.requestObj.responseText,this.requestObj.readyState,this.requestObj.status);
	}else{
		this.onMonitor(null,this.requestObj.readyState,null);
	}
};


AjaxK.prototype.start = function(){
	this.responsed=false;
	this.onBeforeProcess();
	var serializationData = null;
	var applyURL=null;
	if(StringUtil.upper(this.type)=="GET" && this.data){
		serializationData=null;
		applyURL = this.url + "?"+ConvertingUtil.serializationToParameter(this.data);
	}else if(StringUtil.upper(this.type)=="POST" && this.data){
		applyURL=this.url;
		serializationData=ConvertingUtil.serializationToParameter(this.data);
		// var param = "userid="+userid+"&passwd="+passwd; //POST방식으로 넘길 파라미터 설정 (키1=값1&키2=값3&키3=값3.....key=value식으로 여러개일 겨우 '&;구분하여 설정함)
	};
	if(StringUtil.upper(this.dataType)=="XML"){
		 this.requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	
	this.requestObj.open(this.type, applyURL, this.async);
	this.requestObj.send(serializationData);
};
AjaxK.prototype.stop = function(){
	this.responsed=true;
};


AjaxK.prototype.setParam = function(param_o){
    for (var property in param_o) {
    	this[property] = param_o[property]; 
    };
};
AjaxK.prototype.setData = function(data_o){
	this.data = data_o;
};



</script>
<script type="text/javascript">

var a=new Object();
a.g="ago";
a.startgo=function(){
	
	var go={
		g:"aaa",
		gf:function(){
			alert(this.g);
		}
	};
	return go;
}
function onstart(){
	Debug.debug('start');
	//var g = a.startgo();
	//g.gf();
	/*
		var dparam = {
			url : '',
			type :'POST',
			data : {},
			dataType:"TEXT",
			async:true,
			autoStart:true,
			loop:false,
			onBeforeProcess:function(){},
			onSuccess:function(data,readyState,status){},
			onError:function(data,readyState,status){},
			onComplete:function(){}
		};
	
	*/
	var param ={
			//url:"http://translate.google.com/translate_a/t?client=t&text=love&hl=ko&sl=en&tl=ko&ie=UTF-8&oe=UTF-8&multires=1&otf=2&ssel=3&tsel=6&sc=1",
			url:"./text.jsp",
			type:"GET",
			data:{
				type:"atype김",
				name:"aname",
				pwd:"apwd"
			},
			dataType:"text",
			async:true,
			autoStart:false,
			loop:true,
			onBeforeProcess:function(){
				Debug.debug("onBeforeProcess:function")
			},
			onSuccess:function(data,readyState,status){
				Debug.debug("onSuccess:function()"+data+" "+readyState+" "+status);
				var space = Selector.ei("aspace");
				space.innerHTML = space.innerHTML+"<br>"+data;
			},
			onError:function(data,readyState,status){
				Debug.debug("onError:function()"+data+" "+readyState+" "+status);
			},
			onComplete: function(){
				Debug.debug("onComplete:function()");
			},
			onMonitor:function(data,readyState,status){
				Debug.debug("onMonitor:function()"+data+" "+readyState+" "+status);
			}
	};
	//aaa = new AjaxK("A");
	//aaa.setParam(param);
	aaa = AjaxUtil.ajax(param);
	
	
	
	
	
	
	param ={
			//url:"http://translate.google.com/translate_a/t?client=t&text=love&hl=ko&sl=en&tl=ko&ie=UTF-8&oe=UTF-8&multires=1&otf=2&ssel=3&tsel=6&sc=1",
			url:"./text.jsp",
			type:"POST",
			data:{
				type:"btype",
				name:"bname",
				pwd:"bpwd"
			},
			dataType:"text",
			async:true,
			autoStart:false,
			loop:true,
			onBeforeProcess:function(){
				//Debug.debug("onBeforeProcess:function")
			},
			onSuccess:function(data,readyState,status){
				Debug.debug("onSuccess:function()"+data+" "+readyState+" "+status);
				var space = Selector.ei("bspace");
				space.innerHTML = space.innerHTML+"<br>"+data;
			},
			onError:function(data,readyState,status){
				Debug.debug("onError:function()"+data+" "+readyState+" "+status);
			},
			onComplete: function(){
				//Debug.debug("onComplete:function()");
			},
			onMonitor:function(data,readyState,status){
				//Debug.debug("onMonitor:function()"+data+" "+readyState+" "+status);
			}
	};
	bbb = AjaxUtil.ajax(param);
	
	
}
var aaa  = null;
var bbb  = null;
EventUtil.addOnloadEventListener(onstart);


function aurl(){
	aaa.url = Selector.ei("aurl").value;
}
function burl(){
	bbb.url = Selector.ei("burl").value;
}
</script>
<body>
<input type="button" onclick="alert(aaa.onRequest)" />
<input type="button" onclick="alert(aaa.request.onreadystatechange)" />
<input type="text" value="atype" id="atype"/>
<input type="button" value="Astart" onclick="aaa.start()" />
<input type="button" value="Astop" onclick="aaa.stop()" />
<input type="button" value="Bstart" onclick="bbb.start()" />
<input type="button" value="Bstop" onclick="bbb.stop()" />
<p/>
a : <input type="text" id="aurl"/><input type="button" value="url applay" onclick="aurl()"> <p>
b : <input type="text" id="burl"/><input type="button" value="url bpplay" onclick="burl()"> <p>
<table border="1" width="500">
<tr>
<td id="aspace">atype</td>
<td id="bspace">btype</td>
</tr>
</table>
</body>
</html>