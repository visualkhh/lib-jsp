var g_timeid = null ;

log(" location[" +  location  + "]" );
/*
	2007. 6. 13 자동로그아웃 적용을 위한 변경
	PopUp 창이 아니면서 로그인이 되어있는 경우에만 5분후에 로그아웃 화면으로 분기 시킨다.
*/
// Login TimeOut SET
function setLoginTimeOut()  {
	if( ! isShinhanPopup() ){
		try{
			if (typeof window.parent.comframe != 'undefined' && window.parent.comframe.framehash != 'undefined') {
				if( window.parent.comframe.framehash.get( "login_user_name" ) != null ){
					if( g_timeid != null ){
						clearTimeout( g_timeid );
					}
					g_timeid = setTimeout("showAoutLogout();" ,  240000);
				}
			}
		}
		catch(e){
			printStackTrace( e );
		}
	}
}
setLoginTimeOut() ;

// Timer 초기화 Logic
function clearLoginTimeOut()  {
	try{
		if( g_timeid != null ){
			clearTimeout( g_timeid );
		}
		g_timeid = null;
	}
	catch(e){
		log("clearLoginTimeOut exception ");
		printStackTrace( e );
	}
}

//4분 경과로 로그아웃 또는 세션연장 화면 출력
function showAoutLogout() {

	log("Login showAoutLogout start ");

    var warningURL = "/rib/common/autoLogout.html";
    var warningMsgHeight = 600 ;
    var warningMsgWidth  = 800 ;

    try{
		warningMsgHeight = document.body.clientHeight;
		warningMsgWidth  = document.body.clientWidth ;
	}
	catch(e){
	}
	var sFeatures = "dialogHeight: " + warningMsgHeight + "pt; dialogWidth: " + warningMsgWidth + "pt; edge: Raised; center: Yes; help: No; edge: raised; resizable: Yes; status: No;";
	showIFrame( warningURL, "" , sFeatures, "___logoutInfolayer" ) ;
	g_timeid = setTimeout("doAutoLogout();" , 60000);
}

// 5분 경과로 인한 자동 접속 종료 화면으로 분기
function doAutoLogout()  {
	try{
		try{
			var sTemp = getSavedDoc( "login_user_name" );   //
			log("doAutoLogout login_user_name["+ serialize(sTemp) + "]");
		}
		catch(ee){
		}

		var topUrl = "" + top.location ;
        if( topUrl.indexOf("nateon") > 0 ){
			location.href = "/nateon/common/O_RIBTIMEOUT.jsp";
        }
        else{
        	location.href = "/rib/common/O_RIBTIMEOUT.jsp";
		}
	}
	catch(e){
		location.href = "/rib/common/O_RIBTIMEOUT.jsp";
	}
}

/*
test
1.12. callInitechXMLService
		Servlet을 통해서 task를 실행시켜 주는 function이다.
		Servlet은 기존에 제공되는 공통 Servlet을 사용해도 되고 커스터마이징한 별도의 Servlet을 사용해도 된다.
		사용방법) callInitechXMLService( feature, servlet, argument );
		servlet     Servlet URL
		argument웹서비스에 전달되는 argument

		feature에 지정된 속성은 다음과 같다.
			-속성간에 구분은 ;(semicolon)을 이용하고, 속성과 값을 구분할 때는 :(colon)을 이용한다.
		-----------------------------------------------------------------------------------------
		속성    필수여부    값              설명
		-----------------------------------------------------------------------------------------
		display     N       -       결과를 출력할 Layer
		xsl         N       -       결과를 변환할 때 사용할 xsl 파일
		sync        Y       -       호출을 Sync/Async모드로 할지 지정( Default : Sync모드 )
		friendly    N       -       결과를 나중에 조회할 때 사용되는 이름
		callback    N       -       웹서비스를 다 처리한 후에 호출할 function
		lock        N   true/false  page에 Tabstrip tag가 존재하는 경우 호출하는 동안 tab을 고정시키지 여부(default: true)
		debug       N   true/false  웹서비스를 호출한 결과를 출력할지 여부
		cursorFix   N   false       웹서비스를 호출하는 동안 마우스 커서를 모래시계로 변경할 지 여부를 선택
									( 기본값은 변경이 가능하도록 하는 false임)
		exceptionCallback N     -   웹서비스 호출 중 exception이 발생하면 호출할 callback 함수
		warningDisplayType N    popup/iframe    에러발생시 Popup으로 에러를 보여줄 지 iframe로 보여줄 지 선택
		processMsg  N       -       웹서비스를 호출하는 동안 안내 문구가 화면에 출력됨(입력하지 않으면 화면이 나타나지 않음)
		srv         Y       -       웹서비스를 호출할 때 사용한 Friendly Name
									(ex)theDocument.body.useService("/services/math.asmx?WSDL","srv");
		------------------------------------------------------------------------------------------
		예)display:layer; xsl:auth.xsl; callback:test1; debug:true;

		_block, _status, _statusEntity(),
		_callBackInitechXMLSync()와 _callBackInitechXMLAsync()는 callInitechXMLService에서 내부적으로 호출되는 function이다.
*/
function callInitechXMLService() {
	var cipher = "SEED-CBC";
	var quiet = false, argumentStr, ret, syncMode = "" ,display = "", xsl = "", friendly = "", callBack = "", exceptionCallback = "", warningDisplayType = "", cursorFix = "false", lock = "true", debug = "false", processMsg = "", usecert = "false", usesign = "false";

	//2007. 6. 13 Login timer clear
	clearLoginTimeOut();
	try {
		var sFeatures = arguments[0];
		var servletURI  = arguments[1];
		var arrayOfFeatures = sFeatures.split(";");
		for (var i=0; i < arrayOfFeatures.length; i++) {
			var tmpArray = arrayOfFeatures[i].split(":");
			if ( tmpArray.length == 2 ) {
				if ( trim( tmpArray[0].toLowerCase() ) == "display" )   {
					display = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
					xsl = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "sync" )   {
					syncMode = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "friendly" )   {
					friendly = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "callback" )   {
					callBack = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "lock" )   {
					lock = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "quiet" )  {
					quiet = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
					debug = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "exceptioncallback" )  {
					exceptionCallback = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "warningdisplaytype" ) {
					warningDisplayType = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "cursorfix" )  {
					cursorFix = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "processmsg" ) {
					processMsg = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" ) {
					usecert = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "usesign" ) {
					usesign = trim( tmpArray[1] );
				}
			}
		}

		if( __globalDebug1 || getGlobalDebug() ) {
			debug = "true";
		}

		if( cursorFix == "false" ) {
			setCursor( 'wait' );
		}

		if( syncMode != "true" && syncMode != "false" ) {
			log("[ERROR]callInitechXMLService를 호출하는 중 에러가 발생했습니다. \n 호출시 sync:true / sync:false 를 지정해야 합니다.\n우선 sync:true로 호출합니다. 반드시 소스를 수정해 주세요.\n\n" + arguments[0]);
			syncMode = "true";
//          if( cursorFix == "false" ) {
//              setCursor( 'auto' );
//          }
//          return;
		}

		if ( servletURI != "" && arguments.length == 3 )    {
			if( !_block )   {
				_block = true;
				var args = null;
				var _idx = "idx" + (new Date()).getTime() + Math.random() * 10000;
				__performanceData[_idx] = new __performanceEntity();
				__performanceData[_idx].name = servletURI;
				__performanceData[_idx].startTime = (new Date()).getTime();

				if ( _isDocument( arguments[2] ) ) {        // XML Document
					if ( debug == "true" || debug == "y" )  {
						setDebug( arguments[2] , true );
					}
					__performanceData[_idx].name = getTask( arguments[2] ) + "." + getAction( arguments[2] );
					args = arguments[2].xml;
				} else if ( typeof arguments[2] == 'object' && typeof arguments[2].type != 'undefined'
						&& ( arguments[2].type == 'vector' || arguments[2].type == 'hashtable' ) ) {    // Hashtable or Vector Object
					if ( debug == "true" || debug == "y" )  {
						arguments[2].setDebug( true );
					}
					__performanceData[_idx].name = arguments[2].getTask() + "." + arguments[2].getAction();
					args = arguments[2].toString();
				} else if( typeof arguments[2] == 'string' && _isXMLString( arguments[2] ) ) {  // xml String
					var tmpDom = getDocument( arguments[2] );
					__performanceData[_idx].name = getTask( tmpDom ) + "." + getAction( tmpDom );
					if ( debug == "true" || debug == "y" )  {
						var tmpDom = getDocument( arguments[2] );
						setDebug( tmpDom , true );
						args = tmpDom.xml;
					} else {
						args = arguments[2];
					}
				} else if( typeof arguments[2] == 'string' && !_isXMLString( arguments[2] ) ) { // primitive String( Not XML String )
					args = arguments[2];
				} else {
					args = arguments[2].toString();
				}

				__performanceData[_idx].beforeEncrypt = (new Date()).getTime();

				//수정 start
				var _signDoc;
				var _signData;
				var _signTitle;

				if( usesign == 'true' || usesign == 'view' ){
					_signDoc   = AppendSignData(args);
					_signData  = getString( _signDoc, "_signData");
					_signTitle = getString( _signDoc, "_signTitle");

					if( _signData == "" ){
						alertError("죄송합니다.\n전자서명문이 전달되지 않았습니다.\n처음부터 다시 거래하여 주시기 바랍니다.");
						return false;
					}

					_signData = "&__signData__=" + encodeURIComponent(_signData)
					          + "&__signTitle__=" + encodeURIComponent(_signTitle);

					if ( usesign == 'true' ){
						servletURI 	= servletURI.substring(0, servletURI.lastIndexOf("/")+1)  + "sign"
					           		+ servletURI.substring(servletURI.lastIndexOf("/")) ;
					}
					else{
						servletURI 	= servletURI.substring(0, servletURI.lastIndexOf("/")+1)  + "signView"
					           		+ servletURI.substring(servletURI.lastIndexOf("/")) ;
					}
					//전자서명 검증 여부 추가
					var tDoc = getDocument( args );
					setAttribute(tDoc, "useSign", "true");
					args = tDoc.xml;
				}

				// 수정 end
				try{
					var s_code = getAttribute( args, "serviceCode");
					var s_task = getTask( args );
					var s_action = getAction( args );

					if( s_code == "" ){
						s_code = getString(args, "COM_SVC_CODE");
					}

					document.cookie= 'serviceCode='+s_code+';path=/;';
					document.cookie= 'Task='+s_task+';path=/;';
					document.cookie= 'Action='+s_action+';path=/;';

					//log("Cookie Write s_code [" + s_code + "] s_task[" + s_task + "] s_action[" + s_action + "]");
					//log("request Document[" + args + "]");
				}
				catch(cookieee){
					log("service code Cookie Write error");
					printStackTrace( cookieee );
				}

				if( servletURI.indexOf( location.protocol ) == -1 ) {   // not starts with http
					if( servletURI.charAt(0) == '/' ) {
						servletURI = location.protocol + "//" + location.host + servletURI;
					}
				}

				if( servletURI.indexOf("http") == 0 ){
					 servletURI = "s-" + servletURI ;
				}

				log( "callInitechXMLService 시작 task/action[" + __performanceData[_idx].name + "] servletURI[" + servletURI + "] sFeatures[" + sFeatures + "]");

				if ( display != "" )    {
					theDocument.all[display].innerText = "";
				}

				if ( lock == "true" ) {
					var coll = theDocument.all.tags("TabStrip");
					if (coll.length>0) {
						for ( var i=0; i < coll.length ; i++ ) {
							coll(i).lock();
						}
					}
				}

				if ( friendly != "" ) {
					_cache[friendly] = new _cacheEntity();
				}

				if( syncMode == "true" ) {  // sync모드로 조회
					var statusObj = new _statusEntity();
					statusObj.argument = args;
					statusObj.callBack = callBack;
					statusObj.cursorFix = cursorFix;
					statusObj.debug = debug;
					statusObj.quiet = quiet;
					statusObj.display = display;
					statusObj.exceptionCallback = exceptionCallback;
					statusObj.warningDisplayType = warningDisplayType;
					statusObj.lock = lock;
					statusObj.xsl = xsl;
					statusObj.sFeatures = sFeatures;
					statusObj.friendly = friendly;

					//수정 start
					var oXmlHttp = __createXMLHTTPObject();
					__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, false);
					}
					catch(e){
						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // 신뢰할수 있는 사이트에 등록되지 않은고객 처리.
							oXmlHttp.xmlHttp.open("POST", servletURI, false);
							log("oXmlHttp.xmlHttp.open exception servletURI[ " + servletURI + "]");
						}
					}

					oXmlHttp.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
					oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");

					if( usesign == 'true' || usesign == 'view' ){
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) + _signData );
					}
					else{
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) );
		            }

					__performanceData[_idx].afterAJAXCall = (new Date()).getTime();
					if(oXmlHttp.xmlHttp.Status==0){
						return false;                       //사용자에 의해 요청이 취소되었을 경우
					}
					else if(oXmlHttp.xmlHttp.Status>=800){
						getSFilterMessage(oXmlHttp.xmlHttp.Status);  //SHTTP 오류 메시지를 얻음
						return false;
					}

					var retStr = oXmlHttp.xmlHttp.responseText;
					retStr = delNewLine( retStr );
					//수정 end

					var retObj = getDocument( retStr );
					if (retStr == "") {
						log("복호화 에러이거나 암호화 안된 응답임.");
						retObj = retStr ;
						// 암호화 안된 채 내려온 메시지의 경우 WARNING이 아니면 무시한다.
						if ( retObj == null || typeof retObj.documentElement == 'undefined' || retObj.documentElement == null || retObj.documentElement.nodeName != 'WARNING'  )  {
							log("메시지가 아니거나 암호화 안된 메시지의 root노드가 'WARINING'이 아니므로 무시.");
							retObj = null;
						}
					}
					log("복호화 완료");
					__performanceData[_idx].afterDecrypt = (new Date()).getTime();

					_block = false;
					_chkSession();
					if ( _callBackInitechXMLSync( retObj, statusObj, _idx, servletURI ) ) {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechXMLService callBackMethod실행 완료 ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return retObj.xml;
					} else {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechXMLService callBackMethod실행 완료 ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return null;
					}
				} else {        // async모드로 조회

					var statusObj = new _statusEntity();
					statusObj.argument = args;
					statusObj.callBack = callBack;
					statusObj.cursorFix = cursorFix;
					statusObj.debug = debug;
					statusObj.quiet = quiet;
					statusObj.display = display;
					statusObj.exceptionCallback = exceptionCallback;
					statusObj.warningDisplayType = warningDisplayType;
					statusObj.lock = lock;
					statusObj.processMsg = processMsg;
					statusObj.xsl = xsl;
					statusObj.sFeatures = sFeatures;
					statusObj.friendly = friendly;

					var oXmlHttp = __createXMLHTTPObject();
					__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();

					//수정 start

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, true);
						log("oXmlHttp.xmlHttp.open start  ");
					}
					catch(e){
						log("oXmlHttp.xmlHttp.open exception ");

						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // 신뢰할수 있는 사이트에 등록되지 않은고객 처리.
							oXmlHttp.xmlHttp.open("POST", servletURI, true);
							log("oXmlHttp.xmlHttp.open exception servletURI[ " + servletURI + "]");
						}
					}

					var xmlhttpIDX = oXmlHttp.idx + "";
					oXmlHttp.xmlHttp.onreadystatechange=  function()  {_callBackInitechXMLAsync(xmlhttpIDX, statusObj, _idx, servletURI);};


					oXmlHttp.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
					oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
					if( usesign == 'true' || usesign == 'view' ){
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) + _signData );
					}
					else{
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) );
		            }

	                //수정 end

					log("[callInitechXMLService] Check Session");
					_chkSession();

					if( processMsg != "" ) {
						if( oXmlHttp.isResponse == false ) {
							try {
								if( typeof ___processbar == "undefined" || ___processbar == null ) {
									var processMsgHeight = getConfiguration( "processMsgHeight" );
									var processMsgWidth  = getConfiguration( "processMsgWidth" );
									var processMsgURL	 = getConfiguration( "processMsgURL" );

									if( processMsgHeight == "" || processMsgWidth == "" ) {
										processMsgHeight = "73";
										processMsgWidth = "281";
									}

									if( processMsgURL == "" ){
										processMsgURL = "/common/message/processMsg.jsp";
									}
									var node = document.createElement( "div" );
									node.id = "___processbar";
									node.style.position = "absolute";
									node.style.overflow = "hidden";
									node.style.zIndex = 10000;
									node.style.visibility = "visible";
									node.style.height = processMsgHeight + "px";
									node.style.width = processMsgWidth + "px";
									node.style.top = document.body.scrollTop+document.body.clientHeight/2-117/2;
									node.style.left = document.body.scrollLeft+document.body.clientWidth/2-540/2;
									//node.style.setExpression("top",  "document.body.scrollTop+document.body.clientHeight/2-" + processMsgHeight + "/2" );
									//node.style.setExpression("left", "document.body.scrollLeft+document.body.clientWidth/2-" + processMsgWidth + "/2" );
									document.body.appendChild( node );
									node.innerHTML = "<iframe frameborder='0' scrolling='no' src='" + processMsgURL + "?param=" + URLEncoder(processMsg) + "' style='width:100%; height:100%'></iframe>";
								} else {
									if( ___processbar.innerHTML == "" ) {
										var processMsgURL	 = getConfiguration( "processMsgURL" );
										if( processMsgURL == "" ){
											processMsgURL = "/common/message/processMsg.jsp";
										}

										var nTop = document.body.scrollTop + document.body.clientHeight/2 - parseInt(___processbar.style.height)/2;
										var nLeft = document.body.scrollLeft + document.body.clientWidth/2 - parseInt(___processbar.style.width)/2;
										___processbar.style.top = nTop;
										___processbar.style.left = nLeft;
										___processbar.style.zIndex = 10000;
										___processbar.innerHTML = "<iframe frameborder='0' scrolling='no' src='" + processMsgURL + "?param=" + URLEncoder(processMsg) + "' style='width:100%; height:100%;'></iframe>";
									}
								}
							} catch( eee ) {}
							log("processMessage 생성 완료");
						} else {
							log("processMessage 생성 취소 : 처리가 이미 완료되어서 processMessage를 그려줄 필요가 없습니다.");
						}
					}

					if( xsl != "" ) {
						loadXSLDocument( xsl );
					}

					//  processMsg가 없으면 요청방지 안함.
					if( typeof processMsg == "undefined" || processMsg == "" ) {
						log("중복 요청 방지 안함!");
						_block = false;
					} else {
						log("중복 요청 방지!");
					}
				}
				_block = false;
				return true;
			} else  {
				log("중복 요청 들어옴!");
				if( cursorFix == "false" ) {
					setCursor( 'auto' );
				}
				return false;
			}
		} else  {
			if( cursorFix == "false" ) {
				setCursor( 'auto' );
			}
			var xmlErrObj = new Object();
			xmlErrObj["msg"] = "인자가 부족합니다.";
			xmlErrObj["arguments"] = arguments;
			showErrorMsg( xmlErrObj );
			return false;
		}
	} catch( e ) {
		if ( lock == "true" || lock == "y" )    {
			var coll = theDocument.all.tags("TabStrip");
			if ( coll.length > 0 ) {
				for ( var i=0 ; i < coll.length ; i++ ) {
					coll(i).release();
				}
			}
		}
		printStackTrace( e );
		return false;
	}
}


function _callBackInitechXMLSync( result, statusObj, _idx , servletURI ) {
	// Login Timer set, 거래후 5분동안 거래가 없을경우 자동 로그아웃 처리
	setLoginTimeOut();
	try {
		var srcTree;
		var xsltTree;
		var htmlStr;
		if( statusObj.cursorFix == "false" ) {
			setCursor( 'auto' );
		}

		if ( statusObj.lock == "true" || statusObj.lock == "y" )    {
			var coll = theDocument.all.tags("TabStrip");
			if ( coll.length > 0 ) {
				for ( var i=0 ; i < coll.length ; i++ ) {
					coll(i).release();
				}
			}
		}

		if (!_checkJSPError(result, statusObj )) {
			__performanceData[_idx].beforeEJBCall = getAttribute( result, "beforeEJBCall" );
			__performanceData[_idx].afterEJBCall  = getAttribute( result, "afterEJBCall"  );
			__performanceData[_idx].beforeServletCall = getAttribute( result, "beforeServletCall" );
			__performanceData[_idx].afterServletCall  = getAttribute( result, "afterServletCall"  );
			if ( statusObj.display == "" )  {
				if ( statusObj.friendly != "" ) {
					_cache[statusObj.friendly].cacheContentXML = result.xml;
				}
				if ( statusObj.debug == "true" || statusObj.debug == "y" )  {
					var obj = new Object();
					var re = />[\s]*</g;    //Initialize pattern.
					obj["result"] = result.xml.replace( re ,">\n<");
					obj["input"] = statusObj.argument.replace( re ,">\n<");
//                  obj["result"] = result.value;
					showDebugMsg( obj, 'xml' );
				}
				if ( typeof statusObj.callBack != "undefined" && statusObj.callBack != "" ) {
					try {
						eval( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
					} catch( e ) {
						e.detail = statusObj.callBack + "( result ) 에서 에러가 발생하였습니다. result:" + result.xml ;
						printStackTrace( e );
					}
				}
			} else  {
				if ( typeof statusObj.xsl != "undefined" && statusObj.xsl != "" )   {
					xsltTree= getXSLDocument( statusObj.xsl );
					htmlStr = result.transformNode(xsltTree) + "<XSLINFO value='" + statusObj.xsl + "'/>";
//                  theDocument.all[statusObj.display].xslURI = statusObj.xsl;
				} else {
					htmlStr = result.xml;
				}
				theDocument.all[statusObj.display].innerHTML = htmlStr;
				window.scrollTo(0,0);
				if ( statusObj.friendly != "" ) {
					_cache[statusObj.friendly].cacheContentHTML = htmlStr;
					_cache[statusObj.friendly].cacheContentXML = result.xml;
				}
				if ( statusObj.debug == "true" || statusObj.debug == "y" )  {
					var obj = new Object();
					var re = />[\s]*</g;    //Initialize pattern.
					obj["html"] = htmlStr.replace( re ,">\n<");
					obj["input"] = statusObj.argument.replace( re ,">\n<");
					if ( statusObj.xsl != "" )  {
						obj["xml"] = indent( result );
						obj["xsl"] = indent( xsltTree );
					}
					showDebugMsg( obj, 'xml' );
				}
				if ( typeof statusObj.callBack != "undefined" && statusObj.callBack != "" ) {
					try {
						eval( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
					} catch( e ) {
						e.detail = statusObj.callBack + "( result ) 에서 에러가 발생하였습니다. result:" + result.xml ;
						printStackTrace( e );
					}
				}
			}
			//전자금융서비스 거래또는 Task실행에대한 웹로그 분서을 위하여 추가
			//2008.8.14 Attack
			saveWebLog( result, statusObj, servletURI );

			delete statusObj;
			return true;
		}
		//전자금융서비스 거래또는 Task실행에대한 웹로그 분서을 위하여 추가
		//2008.8.14 Attack
		saveWebLog( result, statusObj, servletURI );

		delete statusObj;
	} catch ( e ) {
		printStackTrace( e );
	}
	return false;
}

function _callBackInitechXMLAsync( idx, statusObj, _idx, servletURI )   {
	// Login Timer set, 거래후 5분동안 거래가 없을경우 자동 로그아웃 처리
	setLoginTimeOut();
	try {
		var oXmlHttp = _aXmlHttp[idx];
		if (oXmlHttp.xmlHttp.readyState == 4) {
			oXmlHttp.isResponse = true;
			__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

			//수정 start
			var srcTree;
			var xsltTree;
			var htmlStr;
			if( statusObj.cursorFix == "false" ) {
				setCursor( 'auto' );
			}

			if ( statusObj.lock == "true" || statusObj.lock == "y" )    {
				var coll = theDocument.all.tags("TabStrip");
				if ( coll.length > 0 ) {
					for ( var i=0 ; i < coll.length ; i++ ) {
						coll(i).release();
					}
				}
			}

			if( typeof ___processbar != "undefined" && ___processbar != null ) {
				if( typeof statusObj.processMsg != "undefined" && statusObj.processMsg != "" ) {
					try {
						log("processbar 제거 시작");
						___processbar.style.zIndex = -1;
						log("processbar 제거 완료 1");
						___processbar.innerText = '';
						log("processbar 제거 완료 2");
					} catch( eee ) {
						log("processbar 제거 에러 출력 시작");
						printStackTrace( eee );
						log("processbar 제거 에러 출력 완료");
					}
				}
			}

			log("복호화 시작");
			var retStr = oXmlHttp.xmlHttp.responseText;
			retStr = delNewLine( retStr );
			var tDoc = getDocument("WARNING");

			log("oXmlHttp.xmlHttp.responseText[" + retStr + "]");
			//수정 start
			if(oXmlHttp.xmlHttp.Status==0){
                try{
                   log("login cancel");
                   thisMovie("PrivateMain").resultFromJsCancel("cancel");
                } catch( e ) {
                       printStackTrace( e );
                }
				return false;                       //사용자에 의해 요청이 취소되었을 경우
			}
			else if( oXmlHttp.xmlHttp.Status>=800 ){
				if ( statusObj.quiet != "true" || oXmlHttp.xmlHttp.Status>=900 ){
					getSFilterMessage(oXmlHttp.xmlHttp.Status);  //SHTTP 오류 메시지를 얻음
					return false;
				}
				else{
					setString( tDoc, "errorCode", "0031");
					retStr = serialize( tDoc );
				}
			}

			var result = getDocument( retStr );

			if (retStr == "") {
				log("복호화 에러이거나 암호화 안된 응답임.");
				result = getDocument(oXmlHttp.xmlHttp.responseText);
				// 암호화 안된 채 내려온 메시지의 경우 WARNING이 아니면 무시한다.
				if ( result == null || typeof result.documentElement == 'undefined' || result.documentElement == null || result.documentElement.nodeName != 'WARNING'  )  {
					log("메시지가 아니거나 암호화 안된 메시지의 root노드가 'WARINING'이 아니므로 무시.");
					result = null;
				}
			}
			//수정 end

			log("복호화 완료");
			__performanceData[_idx].afterDecrypt = (new Date()).getTime();


			log("before check JSPError");
			if (!_checkJSPError(result, statusObj )) {
				__performanceData[_idx].beforeEJBCall = getAttribute( result, "beforeEJBCall" );
				__performanceData[_idx].afterEJBCall  = getAttribute( result, "afterEJBCall"  );
				__performanceData[_idx].beforeServletCall = getAttribute( result, "beforeServletCall" );
				__performanceData[_idx].afterServletCall  = getAttribute( result, "afterServletCall"  );
				if ( statusObj.display == "" )  {
					if ( statusObj.friendly != "" ) {
						_cache[statusObj.friendly].cacheContentXML = result.xml;
					}
					if ( statusObj.debug == "true" || statusObj.debug == "y" )  {
						var obj = new Object();
						var re = />[\s]*</g;    //Initialize pattern.
						obj["result"] = result.xml.replace( re ,">\n<");
						obj["input"] = statusObj.argument.replace( re ,">\n<");
						showDebugMsg( obj, 'xml' );
					}
					if ( typeof statusObj.callBack != "undefined" && statusObj.callBack != "" ) {
						try {
							eval( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
						} catch( e ) {
							e.detail = statusObj.callBack + "( result ) 에서 에러가 발생하였습니다. result:" + result.xml ;
							printStackTrace( e );
						}
					}
				} else  {
					if ( typeof statusObj.xsl != "undefined" && statusObj.xsl != "" )   {
						xsltTree= getXSLDocument( statusObj.xsl );
						htmlStr = result.transformNode(xsltTree) + "<XSLINFO value='" + statusObj.xsl + "'/>";
//                      theDocument.all[statusObj.display].xslURI = statusObj.xsl;
					} else {
						htmlStr = result.xml;
					}
					theDocument.all[statusObj.display].innerHTML = htmlStr;
					window.scrollTo(0,0);
					if ( statusObj.friendly != "" ) {
						_cache[statusObj.friendly].cacheContentHTML = htmlStr;
						_cache[statusObj.friendly].cacheContentXML = result.xml;
					}
					if ( statusObj.debug == "true" || statusObj.debug == "y" )  {
						var obj = new Object();
						var re = />[\s]*</g;    //Initialize pattern.
						obj["html"] = htmlStr.replace( re ,">\n<");
						obj["input"] = statusObj.argument.replace( re ,">\n<");
						if ( statusObj.xsl != "" )  {
							obj["xml"] = indent( result );
							obj["xsl"] = indent( xsltTree );
						}
						showDebugMsg( obj, 'xml' );
					}
					if ( typeof statusObj.callBack != "undefined" && statusObj.callBack != "" ) {
						log( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
						try {
							eval( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
						} catch( e ) {
							e.detail = statusObj.callBack + "( result ) 에서 에러가 발생하였습니다. result:" + result.xml ;
							printStackTrace( e );
						}
					}
				}
			}
			__performanceData[_idx].endTime = (new Date()).getTime();
			savePerformanceData( __performanceData[_idx] );
			_block = false;

			log( "callInitechXMLService callBackMethod실행 완료 ");

			//전자금융서비스 거래또는 Task실행에대한 웹로그 분서을 위하여 추가
			//2008.8.14 Attack
			saveWebLog( result, statusObj, servletURI );

			delete statusObj;
			oXmlHttp.isClose = true;
			oXmlHttp.xmlHttp = null;
			return;
		}
		delete statusObj;
	} catch ( e ) {
		if( typeof ___processbar != "undefined" && ___processbar != null ) {
			try {
				___processbar.style.zIndex = -1;
				___processbar.innerText = '';
			} catch( eee) {}
		}
		oXmlHttp.isClose = true;
		oXmlHttp.xmlHttp = null;
		printStackTrace( e );
	}
}

/*
1.13. callInitechOptionService
		Servlet을 통해서 task를 실행시켜서 select의 값을 setting해 주는 function이다.
		Servlet은 기존에 제공되는 공통 Servlet을 사용해도 되고 커스터마이징한 별도의 Servlet을 사용해도 된다.
		사용방법) callInitechOptionService( feature, taskFullName, argument );
		servlet     Servlet URL
		argument웹서비스에 전달되는 argument

		feature에 지정된 속성은 다음과 같다.
			-속성간에 구분은 ;(semicolon)을 이용하고, 속성과 값을 구분할 때는 :(colon)을 이용한다.
		-----------------------------------------------------------------------------------------
		속성    필수여부    값              설명
		-----------------------------------------------------------------------------------------
		sync         N      -       Webservices를 Sync/Async모드로 할지 지정( Default : Sync모드 )
		friendly    N       -       결과를 나중에 조회할 때 사용되는 이름
		display      Y      -       결과를 출력할 select tag name
		form         N      -       결과를 출력할 select tag가 있는 form이름, 속성값을 입력하지 않은 경우 tag이름으로만 검색한다.
		xsl          N      -       결과를 변환할 때 사용할 xsl 파일
		selected     N      -       선택할 Option의 value값
		chooseOption N  true/false  Option의 맨 위에 '-선택-'을 추가
		allOption    N  true/false  Option의 맨 위에 '전체'을 추가
		append       N  true/false  기존에 존재하는 Option을 삭제하지 않고 뒤에 추가
		sorted       N  true/false  값을 정렬할 지 여부
		callback     N      -       웹서비스를 다 처리한 후에 호출할 function
		debug        N  true/false  웹서비스를 호출한 결과를 출력할지 여부
		exceptionCallback N     -   웹서비스 호출 중 exception이 발생하면 호출할 callback 함수
		------------------------------------------------------------------------------------------
		예)display:selectTag; xsl:auth.xsl; callback:test1; srv:myservice; debug:true;

		_block, _status, _statusEntity(),
		_callBackInitechOptionSync(), _callBackInitechOptionAsync()는 callInitechOptionService에서 내부적으로 호출되는 function이다.
*/
function callInitechOptionService() {
	var quiet = false, argumentStr, ret, syncMode = "" , callBack = "", lock = "true", exceptionCallback = "", xsl = "", friendly = "", debug = "false";
	//2007. 6. 13 Login timer clear
	clearLoginTimeOut();

	try {
		var sFeatures = arguments[0];
		var servletURI = arguments[1];
		var arrayOfFeatures = sFeatures.split(";");
		for (var i=0; i < arrayOfFeatures.length; i++) {
			var tmpArray = arrayOfFeatures[i].split(":");
			if ( tmpArray.length == 2 ) {
				if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )   {
					xsl = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "sync" )   {
					syncMode = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "friendly" )   {
					friendly = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "callback" )   {
					callBack = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "lock" )   {
					lock = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
					debug = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "quiet" )  {
					quiet = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "exceptioncallback" )  {
					exceptionCallback = trim( tmpArray[1] );
				}
			}
		}

		if( __globalDebug1 || getGlobalDebug() ) {
			debug = "true";
		}

		if( syncMode != "true" && syncMode != "false" ) {
			log("[ERROR]callInitechOptionService를 호출하는 중 에러가 발생했습니다. \n 호출시 sync:true / sync:false 를 지정해야 합니다.\n우선 sync:true로 호출합니다. 반드시 소스를 수정해 주세요.\n\n" + arguments[0]);
			syncMode = "true";
//          if( cursorFix == "false" ) {
//              setCursor( 'auto' );
//          }
//          return;
		}

		if ( servletURI != "" && arguments.length == 3 )    {
			if( !_block )   {
				_block = true;
				var args = null;
				var _idx = "idx" + (new Date()).getTime() + Math.random() * 10000;
				__performanceData[_idx] = new __performanceEntity();
				__performanceData[_idx].name = servletURI;
				__performanceData[_idx].startTime = (new Date()).getTime();

				if ( _isDocument( arguments[2] ) ) {        // XML Document
					if ( debug == "true" || debug == "y" )  {
						setDebug( arguments[2] , true );
					}
					__performanceData[_idx].name = getTask( arguments[2] ) + "." + getAction( arguments[2] );
					args = arguments[2].xml;
				} else if ( typeof arguments[2] == 'object' && typeof arguments[2].type != 'undefined'
						&& ( arguments[2].type == 'vector' || arguments[2].type == 'hashtable' ) ) {    // Hashtable or Vector Object
					if ( debug == "true" || debug == "y" )  {
						arguments[2].setDebug( true );
					}
					__performanceData[_idx].name = arguments[2].getTask() + "." + arguments[2].getAction();
					args = arguments[2].toString();
				} else if( typeof arguments[2] == 'string' && _isXMLString( arguments[2] ) ) {  // xml String
					var tmpDom = getDocument( arguments[2] );
					__performanceData[_idx].name = getTask( tmpDom ) + "." + getAction( tmpDom );
					if ( debug == "true" || debug == "y" )  {
						var tmpDom = getDocument( arguments[2] );
						setDebug( tmpDom , true );
						args = tmpDom.xml;
					} else {
						args = arguments[2];
					}
				} else if( typeof arguments[2] == 'string' && !_isXMLString( arguments[2] ) ) { // primitive String( Not XML String )
					args = arguments[2];
				} else {
					args = arguments[2].toString();
				}

				__performanceData[_idx].beforeEncrypt = (new Date()).getTime();

				//수정 start
				var _signDoc;
				var _signData;
				var _signTitle;

				if( usesign == 'true' || usesign == 'view' ){
					_signDoc   = AppendSignData(args);
					_signData  = getString( _signDoc, "_signData");
					_signTitle = getString( _signDoc, "_signTitle");

					if( _signData == "" ){
						alertError("죄송합니다.\n전자서명문이 전달되지 않았습니다.\n처음부터 다시 거래하여 주시기 바랍니다.");
						return false;
					}

					_signData = "&__signData__=" + encodeURIComponent(_signData)
					          + "&__signTitle__=" + encodeURIComponent(_signTitle);

					if ( usesign == 'true' ){
						servletURI 	= servletURI.substring(0, servletURI.lastIndexOf("/")+1)  + "sign"
					           		+ servletURI.substring(servletURI.lastIndexOf("/")) ;
					}
					else{
						servletURI 	= servletURI.substring(0, servletURI.lastIndexOf("/")+1)  + "signView"
					           		+ servletURI.substring(servletURI.lastIndexOf("/")) ;
					}
					//전자서명 검증 여부 추가
					var tDoc = getDocument( args );
					setAttribute(tDoc, "useSign", "true");
					args = tDoc.xml;

				}
				//수정 end

				if( servletURI.indexOf( location.protocol ) == -1 ) {   // not starts with http
					if( servletURI.charAt(0) == '/' ) {
						servletURI = location.protocol + "//" + location.host + servletURI;
					}
				}

				if( servletURI.indexOf("http") == 0 ){
					servletURI = "s-" + servletURI ;
				}

				log( "callInitechOptionService 시작 task/action[" + __performanceData[_idx].name + "] servletURI[" + servletURI + "] sFeatures[" + sFeatures + "]" );

				if ( lock == "true" ) {
					var coll = theDocument.all.tags("TabStrip");
					if (coll.length>0) {
						for ( var i=0; i < coll.length ; i++ ) {
							coll(i).lock();
						}
					}
				}

				if ( friendly != "" ) {
					_cache[friendly] = new _cacheEntity();
				}

				if( syncMode == "true" ) {  // sync모드로 조회
					var statusObj = new _statusEntity();
					statusObj.argument = args;
					statusObj.callBack = callBack;
					statusObj.debug = debug;
					statusObj.quiet = quiet;
					statusObj.exceptionCallback = exceptionCallback;
					statusObj.lock = lock;
					statusObj.sFeatures = sFeatures;
					statusObj.friendly = friendly;

					var oXmlHttp = __createXMLHTTPObject();
					__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();

					//수정 start

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, false);
					}
					catch(e){
						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // 신뢰할수 있는 사이트에 등록되지 않은고객 처리.
							oXmlHttp.xmlHttp.open("POST", servletURI, false);
							log("oXmlHttp.xmlHttp.open exception servletURI[ " + servletURI + "]");
						}
					}

					oXmlHttp.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
					oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
					if( usesign == 'true' || usesign == 'view' ){
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) + _signData);
					}
					else{
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) );
		            }


					__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

					log("복호화 시작");
					var retStr = oXmlHttp.xmlHttp.responseText;
					retStr = delNewLine( retStr );
					//수정 end

					var retObj = getDocument( retStr );
					log("복호화 완료");
					__performanceData[_idx].afterDecrypt = (new Date()).getTime();

					_block = false;
					_chkSession();
					if ( _callBackInitechOptionSync( retObj, statusObj, _idx ) ) {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechOptionService callBackMethod실행 완료 ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return retObj.xml;
					} else {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechOptionService callBackMethod실행 완료 ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return null;
					}
				} else {        // async모드로 조회
					var statusObj = new _statusEntity();
					statusObj.argument = args;
					statusObj.callBack = callBack;
					statusObj.debug = debug;
					statusObj.quiet = quiet;
					statusObj.exceptionCallback = exceptionCallback;
					statusObj.lock = lock;
					statusObj.sFeatures = sFeatures;
					statusObj.friendly = friendly;

					var oXmlHttp = __createXMLHTTPObject();
					__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();

					//수정 start

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, true);
					}
					catch(e){
						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // 신뢰할수 있는 사이트에 등록되지 않은고객 처리.
							oXmlHttp.xmlHttp.open("POST", servletURI, true);
							log("oXmlHttp.xmlHttp.open exception servletURI[ " + servletURI + "]");
						}
					}

					var xmlhttpIDX = oXmlHttp.idx + "";
					oXmlHttp.xmlHttp.onreadystatechange=  function()  {_callBackInitechOptionAsync(xmlhttpIDX, statusObj, _idx);};

					oXmlHttp.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
					oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
					if( usesign == 'true' || usesign == 'view' ){
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) + _signData );
					}
					else{
		                oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args) );
		            }

	                //수정 end

					_chkSession();

					if( xsl != "" ) {
						loadXSLDocument( xsl );
					}
				}
				_block = false;
				return true;
			} else  {
				return false;
			}
		} else  {
			var xmlErrObj = new Object();
			xmlErrObj["msg"] = "인자가 부족합니다.";
			xmlErrObj["arguments"] = arguments;
			showErrorMsg( xmlErrObj );
			return false;
		}
	} catch( e ) {
		if ( lock == "true" || lock == "y" )    {
			var coll = theDocument.all.tags("TabStrip");
			if ( coll.length > 0 ) {
				for ( var i=0 ; i < coll.length ; i++ ) {
					coll(i).release();
				}
			}
		}
		printStackTrace( e );
		return false;
	}
}


function _callBackInitechOptionSync( result, statusObj, _idx )  {
	// Login Timer set, 거래후 5분동안 거래가 없을경우 자동 로그아웃 처리
	setLoginTimeOut();
	try {

		if ( statusObj.lock == "true" || statusObj.lock == "y" )    {
			var coll = theDocument.all.tags("TabStrip");
			if ( coll.length > 0 ) {
				for ( var i=0 ; i < coll.length ; i++ ) {
					coll(i).release();
				}
			}
		}
		if (!_checkJSPError(result, statusObj )) {
			__performanceData[_idx].beforeEJBCall = getAttribute( result, "beforeEJBCall" );
			__performanceData[_idx].afterEJBCall  = getAttribute( result, "afterEJBCall"  );
			__performanceData[_idx].beforeServletCall = getAttribute( result, "beforeServletCall" );
			__performanceData[_idx].afterServletCall  = getAttribute( result, "afterServletCall"  );
			setXMLOption( statusObj.sFeatures , result.xml );
			if ( statusObj.friendly != "" ) {
				_cache[statusObj.friendly].cacheContentXML = result.xml;
			}
			if ( statusObj.debug == "true" || statusObj.debug == "y" )  {
				var obj = new Object();
				var re = />[\s]*</g;    //Initialize pattern.
				obj["result"] = result.xml.replace( re ,">\n<");
				obj["input"] = statusObj.argument.replace( re ,">\n<");
				showDebugMsg( obj, 'xml' );
			}

			if ( typeof statusObj.callBack != "undefined" && statusObj.callBack != "" ) {
				try {
					eval( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
				} catch( e ) {
					e.detail = statusObj.callBack + "( result ) 에서 에러가 발생하였습니다. result:" + result.xml ;
					printStackTrace( e );
				}
			}

			delete statusObj;
			return true;
		}
		delete statusObj;
	} catch ( e ) {
		printStackTrace( e );
	}
	return false;
}

function _callBackInitechOptionAsync( idx, statusObj, _idx )    {
	// Login Timer set, 거래후 5분동안 거래가 없을경우 자동 로그아웃 처리
	setLoginTimeOut();
	try {
		var oXmlHttp = _aXmlHttp[idx];
		if (oXmlHttp.xmlHttp.readyState == 4) {
			oXmlHttp.isResponse = true;
			__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

			log("복호화 시작");

			//수정 start
			var retStr = oXmlHttp.xmlHttp.responseText;
			retStr = delNewLine( retStr );
			//수정 end

			var result = getDocument( retStr );
			log("복호화 완료");
			__performanceData[_idx].afterDecrypt = (new Date()).getTime();

			if ( statusObj.lock == "true" || statusObj.lock == "y" )    {
				var coll = theDocument.all.tags("TabStrip");
				if ( coll.length > 0 ) {
					for ( var i=0 ; i < coll.length ; i++ ) {
						coll(i).release();
					}
				}
			}

			if (!_checkJSPError(result, statusObj )) {
				__performanceData[_idx].beforeEJBCall = getAttribute( result, "beforeEJBCall" );
				__performanceData[_idx].afterEJBCall  = getAttribute( result, "afterEJBCall"  );
				__performanceData[_idx].beforeServletCall = getAttribute( result, "beforeServletCall" );
				__performanceData[_idx].afterServletCall  = getAttribute( result, "afterServletCall"  );
				setXMLOption( statusObj.sFeatures , result.xml );
				if ( statusObj.friendly != "" ) {
					_cache[statusObj.friendly].cacheContentXML = result.xml;
				}
				if ( statusObj.debug == "true" || statusObj.debug == "y" )  {
					var obj = new Object();
					var re = />[\s]*</g;
					obj["result"] = result.xml.replace( re ,">\n<");
					obj["input"] = statusObj.argument.replace( re ,">\n<");
					showDebugMsg( obj, 'xml' );
				}
				if ( typeof statusObj.callBack != "undefined" && statusObj.callBack != "" ) {
					try {
						eval( statusObj.callBack + "( result.xml, statusObj.argument, statusObj.sFeatures );" );
					} catch( e ) {
						e.detail = statusObj.callBack + "( result ) 에서 에러가 발생하였습니다. result:" + result.xml ;
						printStackTrace( e );
					}
				}
			}
			__performanceData[_idx].endTime = (new Date()).getTime();
			savePerformanceData( __performanceData[_idx] );
			delete statusObj;
			log( "callInitechOptionService callBackMethod실행 완료 ");
			oXmlHttp.isClose = true;
			oXmlHttp.xmlHttp = null;
			return;
		}
	} catch ( e ) {
		oXmlHttp.isClose = true;
		oXmlHttp.xmlHttp = null;
		printStackTrace( e );
	}
}

// 전자서명 함수
function AppendSignData(xmlStr)
{
		var tempDoc = getDocument(xmlStr);
		var rootName = tempDoc.documentElement.nodeName;
		var resultDoc = getDocument("<SIGN/>");
		var _signData = "";
		var _signTitle = "";
		if (rootName == "vector") {
//          showObject(tempDoc);
			var vec = toVector(tempDoc);
			var resultVec = new Vector();
			for (var i=0;i<vec.size();i++) {
				var eleDoc = vec.elementAt(i);
				_signTitle += getString(eleDoc, "__signTitle__");
				_signData  += getString(eleDoc, "__signData__");
			}
		} else {
			_signTitle = getString(tempDoc, "__signTitle__");
			_signData  = getString(tempDoc, "__signData__");
		}
		setString( resultDoc, "_signData",  _signData  );
		setString( resultDoc, "_signTitle", _signTitle );
		return resultDoc.xml;
}

function addSignValue2(data, name, value)
{
  if(data!="") data += "\n";
	data += name;
	data += "=";
	data += value;
	return data;
}

function doXML() {
	try {
		var userCallback = "", formName = "ribform", transform = "true", userDisplay = "riblayer", userXsl = "", userLanguage = "ko", keepTransactionSession = "false", useCert = "true", processMsg = "", debug = "false", echoMode = "false", errorMsg = "", responseMessage = "", showJStarError = "true", useSign = "false", errorURL = "", requestMessage="";
		var serviceCode = arguments[0];
		if( typeof serviceCode == "undefined" ) {
			alertError("Service Code는 필수 항목 입니다.");
			return;
		}
		userXsl = "xsl/RIB" + serviceCode + ".xsl";
		var sFeatures = arguments[1];
		var doc = arguments[2];

		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
						formName = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
						userLanguage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "keeptransactionsession" ) {
						keepTransactionSession = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" )    {
						useCert = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "processmsg" ) {
						processMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "echo" )   {
						echoMode = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "error" )  {
						errorMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "responsemessage" )    {
						responseMessage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "requestmessage" )    {
						requestMessage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usesign" )    {
						useSign = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
						errorURL = trim( tmpArray[1] );
					}
				}
			}
		}
		// responseMessage가 설정되지 않았으면 기본값을 사용한다.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		//한전 전기요금 납부로 인한 수정. 구세군이체를 위해 D2001 추가(2008.11.28)
		if( serviceCode == 'D2041' || serviceCode == 'D2001' ){
			if ( requestMessage == "" ) {
				requestMessage = "S_RIB" + serviceCode;
			}
		}
		else{
			requestMessage = "S_RIB" + serviceCode;
		}

		var servletURL = "/common/rib/jsp/callRibCommonService.jsp?serviceCode="+serviceCode;

		if( typeof doc == 'undefined' ) {
			var formObj = null;
			if( formName.indexOf( "." ) > -1 ) {
				formObj = eval( formName );
			} else {
				var idx1 = formName.indexOf("[");
				var idx2 = formName.indexOf("(");
				var sourceName = formName;
				var sourceIdx = 0;
				if( idx1 > -1 ) {
					var idx3 = formName.indexOf("]");
					if( idx3 > -1 ) {
						sourceName = formName.substring(0, idx1);
						sourceIdx  = parseInt( formName.substring(idx1+1, idx3) );
					}
				} else if ( idx2 > -1 ) {
					var idx3 = formName.indexOf(")");
					if( idx3 > -1 ) {
						sourceName = formName.substring(0, idx2);
						sourceIdx  = parseInt( formName.substring(idx2+1, idx3) );
					}
				}

				var oObject = theDocument.forms;
				var objCount = 0;
				if (oObject != null){
					for (var i = 0; i < oObject.length; i++){
						var obj = oObject[i];
						if( obj.name == sourceName )    {
							if( objCount == sourceIdx ) {
								formObj = obj;
								break;
							}
							objCount++;
						}
					}
				}
			}
			if( typeof formObj == 'undefined' || formObj == null ) {
				doc = getDocument("<NOFORM/>");
			} else {
				if( !validateForm(formObj) ) {
					return;
				}
				doc = toDocument( formObj );
			}

		}

		if( processMsg == "" ) {
			processMsg = "처리중입니다.";
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 언어
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session유지 여부
		}
		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;

		var serviceFeatures = "callback:doXMLCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; useCert:" + useCert + "; useSign:" + useSign + "; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl +"; showjstarerror:" + showJStarError;
		log( "[doXML] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
			// 로그아웃 후 첫페이지로.
			//doLogoutWithoutCert();
		}
	} catch( e ) {
		alertError("doXML 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doXMLCallback( result, argument, sFeatures ) {
	try {
		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", transform = "true", userDisplay = "riblayer", userXsl = "", debug = "false", showJStarError = "true";
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					}
				}
			}
		}

		srcTree = getDocument( result );

		// jStar 에러 체크 여부 처리.
		if (showJStarError != "false") {
			if (!checkJStarError(srcTree)) {
				return;
			}
		}

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}
		if( transform == "true" ) {
			if( userDisplay == "" ) {
				alertError( "transform이 true이고 display의 값이 지정되지 않았습니다.");
			} else if( userXsl == "" ) {
				alertError( "transform이 true이고 xsl의 값이 지정되지 않았습니다.");
			} else {
				if( srcTree == null ) {
					srcTree = getDocument( result );
				}
				xsltTree= getXSLDocument( userXsl );
				htmlStr = srcTree.transformNode(xsltTree) + "<XSLINFO value='" + userXsl + "'/>";

				theDocument.all[userDisplay].innerHTML = htmlStr;
				window.scrollTo(0,0);

				if ( debug == "true" || debug == "y" )  {
					var re = />[\s]*</g;    //Initialize pattern.
					obj["html"] = htmlStr.replace( re ,">\n<");
					obj["xsl"] = indent( xsltTree );
				}
			}
		}

		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}

		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doXML 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doSession() {
	try {
		var userCallback = "", userTarget = "", userDisplay = "", userXsl = "", formName = "ribform", userLanguage = "ko", useCert = "true", debug = "false", showJStarError = "true", errorURL = "";
		var strSelected = "", strTextSelected = "", allOption = "", allOptionText = "", chooseOption = "", chooseOptionText = "", append = "", sorted = "", textSorted = "";
		var blankText = "";

		var sSessionStr = arguments[0];
		var sSessionListStr = arguments[1];
		var sFeatures = arguments[2];
		if ( typeof sFeatures == "undefined" ) {
			alertError("인자가 부족합니다.");
			return;
		}
		if (sSessionStr == "" && sSessionListStr == "") {
			alertError("첫번째와 두번째 항목이 동시에 비어 있을 수 없습니다.");
			return;
		}
		if (sFeatures == "") {
			alertError("세번째 항목이 비어 있을 수 없습니다.");
			return;
		}

		var xmlStr = "<SESSION>";
		var arrayOfSession = trim(sSessionStr).split(";");
		var arrayOfSessionList = trim(sSessionListStr).split(";");

		for (var i=0; i < arrayOfSession.length; i++) {
			var value = trim(arrayOfSession[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("첫 번째 항목에 잘못된 문자가 포함되어 있습니다.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError("첫 번째 항목의 형식이 잘못되었습니다.");
					return;
				}
				xmlStr += "<"+key+" getSession='"+value+"'/>";
			}
		}

		for (var i=0; i < arrayOfSessionList.length; i++) {
			var value = trim(arrayOfSessionList[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("두 번째 항목에 잘못된 문자가 포함되어 있습니다.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError("두 번째 항목의 형식이 잘못되었습니다.");
					return;
				}
				xmlStr += "<"+key+" getSessionList='"+value+"'/>";
			}

		}

		xmlStr += "</SESSION>";

		log("doSession xmlStr["+xmlStr+"]");

		var doc = getDocument(xmlStr);


		var arrayOfFeatures = sFeatures.split(";");
		for (var i=0; i < arrayOfFeatures.length; i++) {
			var tmpArray = arrayOfFeatures[i].split(":");
			if ( tmpArray.length == 2 ) {
				if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
					userCallback = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
					formName = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
					userDisplay = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "target" ) {
					userTarget = trim( tmpArray[1] ).toLowerCase();
				} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
					userXsl = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
					userLanguage = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" )    {
					useCert = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
					debug = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
					showJStarError = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
					errorURL = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "selected" )   {
					strSelected = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "textselected" )   {
					strTextSelected = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "alloption" )  {
					allOption = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "alloptiontext" )  {
					allOptionText = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoption" )   {
					chooseOption = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoptiontext" )   {
					chooseOptionText = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "append" ) {
					append = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "sorted" ) {
					sorted = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "textsorted" ) {
					textSorted = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "blanktext" )  {
					blankText = trim( tmpArray[1].toLowerCase() );
				}
			}
		}

		var serviceFeatures = "callback:doSessionCallback; sync:false; lock:false; cursorFix: true; ";

		if (userTarget == "") {
			if (userCallback == "") {
				alertError("target이 미지정인 경우 callback이 반드시 지정되어야 합니다.");
				return;
			}
		} else if (userTarget == "form") {
			serviceFeatures += " userTarget:form;";
			if (userDisplay == "") {
				alertError("target이 form인 경우 display가 반드시 지정되어야 합니다.");
				return;
			} else if (userXsl == "") {
				alertError("target이 지정된 경우 xsl이 반드시 지정되어야 합니다.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";

			// setXMLOption관련 옵션들
			if (strSelected != "") {
				serviceFeatures += " selected:"+strSelected+";";
			}
			if (strTextSelected != "") {
				serviceFeatures += " textselected:"+strTextSelected+";";
			}
			if (allOption != "") {
				serviceFeatures += " alloption:"+allOption+";";
			}
			if (allOptionText != "") {
				serviceFeatures += " alloptiontext:"+allOptionText+";";
			}
			if (chooseOption != "") {
				serviceFeatures += " chooseoption:"+chooseOption+";";
			}
			if (chooseOptionText != "") {
				serviceFeatures += " chooseoptiontext:"+chooseOptionText+";";
			}
			if (append != "") {
				serviceFeatures += " append:"+append+";";
			}
			if (sorted != "") {
				serviceFeatures += " sorted:"+sorted+";";
			}
			if (textSorted != "") {
				serviceFeatures += " textsorted:"+textSorted+";";
			}
			if (blankText != "") {
				serviceFeatures += " blankText:"+blankText+";";
			}
		} else if (userTarget == "layer") {
			serviceFeatures += " userTarget:layer;";
			if (userDisplay == "") {
				userDisplay = "riblayer";
			}
			if (userXsl == "") {
				alertError("target이 지정된 경우 xsl이 반드시 지정되어야 합니다.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";
		} else {
			alertError("target값이 잘못 되었습니다.");
			return;
		}

		if (userCallback != "") {
			serviceFeatures += " userCallback:"+userCallback+";";
		}

		if (debug == "") debug = "false";
		if (userLanguage == "") userLanguage = "ko";
		if (formName == "") formName = "ribform";
		if (useCert == "") useCert = "true";

		serviceFeatures += " debug:"+debug+"; form:"+formName+"; useCert:"+useCert+"; showjstarerror:" + showJStarError + ";";

		var servletURL = "/common/rib/jsp/callRibSessionService.jsp";

		setAttribute( doc, "language", userLanguage);   // 언어

		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		log( "[doSession] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
			// 로그아웃 후 첫페이지로.
			doLogoutWithoutCert();
		}

	} catch( e ) {
		alertError("doSession 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}

}

function doSessionCallback( result, argument, sFeatures ) {
	try {

		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", userTarget = "", userDisplay = "riblayer", userXsl = "", userForm="ribform", debug = "false", showJStarError = "true";
		var strSelected = "", strTextSelected = "", allOption = "", allOptionText = "", chooseOption = "", chooseOptionText = "", append = "", sorted = "", textSorted = "";
		var blankText = "";
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usertarget" ) {
						userTarget = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userform" )   {
						userForm = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "selected" )   {
						strSelected = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "textselected" )   {
						strTextSelected = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "alloption" )  {
						allOption = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "alloptiontext" )  {
						allOptionText = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoption" )   {
						chooseOption = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoptiontext" )   {
						chooseOptionText = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "append" ) {
						append = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "sorted" ) {
						sorted = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "textsorted" ) {
						textSorted = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "blanktext" )  {
						blankText = trim( tmpArray[1].toLowerCase() );
					}
				}
			}
		}

		srcTree = getDocument( result );

		// jStar 에러 체크 여부 처리.
		if (showJStarError != "false") {
			if (!checkJStarError(srcTree)) {
				return;
			}
		}

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}


		if( !userTarget == "") {
			if( userDisplay == "" ) {
				alertError( "display의 값이 지정되지 않았습니다.");
			} else if( userXsl == "" ) {
				alertError( "xsl의 값이 지정되지 않았습니다.");
			} else {
				if( srcTree == null ) {
					srcTree = getDocument( result );
				}

				if( userTarget == "layer" ) {
					xsltTree= getXSLDocument( userXsl );
					htmlStr = srcTree.transformNode(xsltTree) + "<XSLINFO value='" + userXsl + "'/>";

					theDocument.all[userDisplay].innerHTML = htmlStr;
					window.scrollTo(0,0);
					if ( debug == "true" || debug == "y" )  {
						var re = />[\s]*</g;    //Initialize pattern.
						obj["html"] = htmlStr.replace( re ,">\n<");
						obj["xsl"] = indent( xsltTree );
					}
				} else if (userTarget == "form" ) {
					var sFeatures2 = "display:"+userDisplay+"; form:"+userForm+"; xsl:"+userXsl+"; debug:"+debug+";";
					if (strSelected != "") {
						sFeatures2 += " selected:"+strSelected+";";
					}
					if (strTextSelected != "") {
						sFeatures2 += " textselected:"+strTextSelected+";";
					}
					if (allOption != "") {
						sFeatures2 += " alloption:"+alloption+";";
					}
					if (allOptionText != "") {
						sFeatures2 += " alloptiontext:"+allOptionText+";";
					}
					if (chooseOption != "") {
						sFeatures2 += " chooseoption:"+chooseOption+";";
					}
					if (chooseOptionText != "") {
						sFeatures2 += " chooseoptiontext:"+chooseOptionText+";";
					}
					if (append != "") {
						sFeatures2 += " append:"+append+";";
					}
					if (sorted != "") {
						sFeatures2 += " sorted:"+sorted+";";
					}
					if (textSorted != "") {
						sFeatures2 += " textsorted:"+textSorted+";";
					}
					if (blankText != "") {
						sFeatures2 += " blankText:"+blankText+";";
					}
					setXMLOption( sFeatures2, result );
				}
			}
		}
		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}

		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doSession 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}


function doXSL(){
	var xslName = arguments[0];
	if( typeof xslName == "undefined" ) {
		alertError("xsl Name은 필수 항목 입니다.");
		return;
	}
	var userDisplay = arguments[1];
	if( typeof userDisplay == "undefined" ) {
		userDisplay = "inslayer";
	}
	var emptyDoc = getDocument("<emptyDoc/>");
	theDocument.all[userDisplay].innerHTML = transform(emptyDoc, xslName);
	window.scrollTo(0,0);
}

// 로그아웃 실행
function doLogout()  {
	log("LOGOUT!");
	try{
		var sTemp = getSavedDoc( "login_user_name" );   // 로그인 정보 초기화
		var topUrl = "" + top.location ;
		var xmlDoc = getDocument("<LOGOUT/>");			// XML파일 선택
        if( topUrl.indexOf("nateon") > 0 ){
            callInitechXMLService( "callback:doLogoutCallback; sync:false; debug:false; usecert:false; ", "/common/admin/jsp/callAdminLogoutService.jsp", xmlDoc );
        }
        else{
            callInitechXMLService( "callback:doLogoutCallback; sync:false; debug:false; usecert:false; ", "/common/admin/jsp/callAdminLogoutService.jsp", xmlDoc );
		}
	}
	catch(ee){
	    alert(printStackTrace( ee ));
	    callInitechXMLService( "callback:doLogoutCallback; sync:false; debug:false; usecert:false; ", "/common/admin/jsp/callAdminLogoutService.jsp", xmlDoc );
	}
}

// 로그아웃 실행 - 인증서 오류시 실행된다. 암호화 없이 JSP실행.
function doLogoutWithoutCert() {
	log("LOGOUT!");
	try{
		var topUrl = "" + top.location ;
        if( topUrl.indexOf("nateon") > 0 ){
			location.href = "/mng/index.jsp";
        }
        else{
        	location.href = "/mng/index.jsp";
		}
	}
	catch(ee){
		location.href = "/mng/index.jsp";
	}
}

function doLogoutCallback(result) {
	var resultDoc = getDocument(result);
	if(getResult(resultDoc) == 1) {

		var topUrl = "" + top.location ;
		alert("로그아웃되었습니다.");
		InitCache();	// 인증서 정보 초기화.
        if( topUrl.indexOf("nateon") > 0 ){
			location.href = "/mng/index.jsp";
        }
        else{
        	location.href = "/mng/index.jsp";
		}
	}
	else{ //오류가 발생해도 일단 logOut처리
		location.href='/mng/index.jsp';
	}
}

function validateForm( formName ) {
	try {
		var formObj = null;
		if( typeof formName == 'object' && formName.tagName == "FORM" ) {
			formObj = formName;
		} else if( formName.indexOf( "." ) > -1 ) {
			formObj = eval( formName );
		} else {
			var idx1 = formName.indexOf("[");
			var idx2 = formName.indexOf("(");
			var sourceName = formName;
			var sourceIdx = 0;
			if( idx1 > -1 ) {
				var idx3 = formName.indexOf("]");
				if( idx3 > -1 ) {
					sourceName = formName.substring(0, idx1);
					sourceIdx  = parseInt( formName.substring(idx1+1, idx3) );
				}
			} else if ( idx2 > -1 ) {
				var idx3 = formName.indexOf(")");
				if( idx3 > -1 ) {
					sourceName = formName.substring(0, idx2);
					sourceIdx  = parseInt( formName.substring(idx2+1, idx3) );
				}
			}

			var oObject = theDocument.forms;
			var objCount = 0;
			if (oObject != null){
				for (var i = 0; i < oObject.length; i++){
					var obj = oObject[i];
					if( obj.name == sourceName )    {
						if( objCount == sourceIdx ) {
							formObj = obj;
							break;
						}
						objCount++;
					}
				}
			}
		}
		if( typeof formObj == 'undefined' || formObj == null ) {
			alertError("이름이 [" + formName + "]인 form객제가 존재하지 않습니다.");
			return;
		}
		for ( var i=0 ; i < formObj.elements.length ; i++ ) {
			var e = formObj.elements[i];
			if ( e.name != null && e.name != "" )  {
				log("validateForm input name[" + e.name + "] index[" + i + "] start");
				if( e.type == 'text' || e.type == 'password' || e.type == 'textarea' || e.type == 'file' || e.type == 'select-one' ) {
					if( typeof e.validation != "undefined" && e.validation != null && e.validation != "" ) {
						var validationSeparator = ":";
						if( typeof e.validationSeparator != "undefined" && e.validationSeparator != null && e.validationSeparator != "" ) {
							validationSeparator = e.validationSeparator;
						}
						var arrayOfFeatures = e.validation.split( validationSeparator );
						var functionStr = "VALIDATION_";
						for (var j=0; j < arrayOfFeatures.length; j++) {
							if( j == 0 ) {
								functionStr += arrayOfFeatures[j] + "('" + e.uniqueID + "";
							} else {
								functionStr += ",'" + arrayOfFeatures[j] + "";
							}
						}
						functionStr += ")";
						var ret = true;
						try {
							ret = eval( functionStr );
						} catch( e1 ) {
							alertError("입력값 검증 프로세스에서 '" + functionStr + "' 를 실행하는데 에러가 발생했습니다.");
							log("입력값 검증 프로세스에서 '" + functionStr + "' 를 실행하는데 에러가 발생했습니다.");
							printStackTrace( e1 );
						}
						if( !ret ) {
							return false;
						}
					}
				}
				log("validateForm input name[" + e.name + "] index[" + i + "]end");
			}
		}
	} catch( e2 ) {
		printStackTrace( e2 );
	}
	return true;
}

function VALIDATION_DEFAULT( id, displayName ) {
	var e = document.all[id];
	var str = ''
    if(trim(e.value) =="" || trim(e.value) == null){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( ( e.type=='text' || e.type=='password' || e.type=='textarea' || e.type=='file' ) && (e.value==null || e.value=='') )    {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			//displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.type=='select-one' && e.selectedIndex == 0 )   {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 선택하십시오.";
		} else {
			str += "" + displayName + " 를 선택하십시오.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}
// 숫자 입력 Check
function VALIDATION_HANCHECK( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
		displayName = e.name;
	}

	if( e.value == "" ) return true;

	if( e.value.length != getByteHanLen(e.value) ) {
		str += "" + displayName + " 에는 한글없이 입력하셔야 합니다.";
		alert( str );
		e.focus();
		return false;
	}

	return true;
}

function getByteHanLen(str){
    return(str.length+(escape(str)+"%u").match(/%u/g).length-1);
}

// 숫자 입력 Check
function VALIDATION_DIGIT( id, displayName, min, max ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
		displayName = e.name;
	}

	if( !isDigit( e.value ) ) {
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 은 숫자만 입력해야 합니다.";
		} else {
			str += "" + displayName + " 는 숫자만 입력해야 합니다.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	}
	if( typeof min != 'undefined' && min != '' ) {
		if( typeof max != 'undefined' && max != '' ) {
			if( min == max  ) {
				if( e.value.length != min ) {
					if( _isFinalConsonant( displayName ) ) {
						str += "" + displayName + " 은 " + min + "자리를 입력해 주십시오.";
					} else {
						str += "" + displayName + " 는 " + min + "자리를 입력해 주십시오.";
					}
					alert( str );
					e.focus();
					return false;
				}
			}
			else{
				if( e.value.length < min || e.value.length > max ) {
					if( _isFinalConsonant( displayName ) ) {
						str += "" + displayName + " 은 " + min + "에서 " + max +"자리를 입력해 주십시오.";
					} else {
						str += "" + displayName + " 는 " + min + "에서 " + max +"자리를 입력해 주십시오.";
					}
					alert( str );
					e.focus();
					return false;
				}
			}
		}
		else {
			if( e.value.length < min ) {
				if( _isFinalConsonant( displayName ) ) {
					str += "" + displayName + " 은 " + min + "자리 이상 입력해 주십시오.";
				} else {
					str += "" + displayName + " 는 " + min + "자리 이상 입력해 주십시오.";
				}
				alert( str );
				e.focus();
				return false;
			}
		}
	}
	return true;
}

// 금액만 포함되어있는지 Check
function VALIDATION_MONEY( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( !isMoney( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 은 숫자만 입력해야 합니다.";
		} else {
			str += "" + displayName + " 는 숫자만 입력해야 합니다.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// 외환만 포함되어있는지 Check
function VALIDATION_FOREIGN_MONEY( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( !isForeignMoney( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 은 숫자만 입력해야 합니다.";
		} else {
			str += "" + displayName + " 는 숫자만 입력해야 합니다.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// 입금 계좌 Check
function VALIDATION_ACCOUNT_IN( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	e.value = e.value.replaceAll("-", "");
	if( !isAlphanumeric( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 은 숫자와 영문자만 입력해야 합니다.";
		} else {
			str += "" + displayName + " 는 숫자와 영문자만 입력해야 합니다.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value.length < 6  || e.value.length > 14 ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 정확하게 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 정확하게 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// 출금 계좌 Check
function VALIDATION_ACCOUNT_OUT( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( !isDigit( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 은 숫자만 입력해야 합니다.";
		} else {
			str += "" + displayName + " 는 숫자만 입력해야 합니다.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value.length != 11  && e.value.length != 12 ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 정확하게 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 정확하게 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + " 을 입력해 주십시오.";
		} else {
			str += "" + displayName + " 를 입력해 주십시오.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// 날짜  Check
function VALIDATION_DATEDIFF( id, startDisplayName, end,endDisplayName, max ) {
	var startObj = document.all[id];
	var endObj = getFormObject( end );
	var re = /[/]/g;
	var day1 = getDate( startObj.value );
	var day2 = getDate( endObj.value );
	var str = "";
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		startDisplayName = startObj.name;
	}
	if( typeof endDisplayName == 'undefined' || endDisplayName == null || endDisplayName == '' ) {
		endDisplayName = endObj.name;
	}

	if( day1.length != 8 ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 yyyyMMdd형식이어야 합니다." + day1 ;
		} else {
			str += "" + startDisplayName + " 는 yyyyMMdd형식이어야 합니다." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	if( isNaN( day1 ) ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 숫자형식이어야 합니다." + day1 ;
		} else {
			str += "" + startDisplayName + " 는 숫자형식이어야 합니다." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	if( day2.length != 8 ) {
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + " 은 yyyyMMdd형식이어야 합니다." + day2 ;
		} else {
			str += "" + endDisplayName + " 는 yyyyMMdd형식이어야 합니다." + day2 ;
		}
		alert( str );
		endObj.focus();
		return false;
	}
	if( isNaN( day2 ) ) {
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + " 은 숫자형식이어야 합니다." + day2 ;
		} else {
			str += "" + endDisplayName + " 는 숫자형식이어야 합니다." + day2 ;
		}
		alert( str );
		endObj.focus();
		return false;
	}

	var y1 = parseInt( day1.substring( 0, 4 ), 10);
	var m1 = parseInt( day1.substring( 4, 6 ), 10);
	var d1 = parseInt( day1.substring( 6, 8 ), 10);

	var y2 = parseInt( day2.substring( 0, 4 ), 10);
	var m2 = parseInt( day2.substring( 4, 6 ), 10);
	var d2 = parseInt( day2.substring( 6, 8 ), 10);

	if( y1 > 2100 || y1 < 1900 ) {
		alert( "연도는 1901부터 2099사이 값이어야 합니다." + y1 );
		startObj.focus();
		return false;
	}
	if( m1 > 12 || m1 < 1 ) {
		alert( "월은 1부터 12사이 값이어야 합니다." + m1 );
		startObj.focus();
		return false;
	}

	// 날짜 확인
	var total_days;

	if(m1 == 1) total_days = 31;
	else if(m1 == 2) {
		if(((y1 % 4 == 0) && (y1 % 100 != 0)) || (y1 % 400 == 0))
			 total_days = 29;
		else total_days = 28;
	}
	else if(m1 == 3) total_days = 31;
	else if(m1 == 4) total_days = 30;
	else if(m1 == 5) total_days = 31;
	else if(m1 == 6) total_days = 30;
	else if(m1 == 7) total_days = 31;
	else if(m1 == 8) total_days = 31;
	else if(m1 == 9) total_days = 30;
	else if(m1 == 10) total_days = 31;
	else if(m1 == 11) total_days = 30;
	else if(m1 == 12) total_days = 31;

	if( d1 > total_days || d1 < 1 ) {
		alert( m1 + "월의 일자는 1부터 " + total_days + "사이 값이어야 합니다.\n입력값 " + d1  + "일");
		startObj.focus();
		return false;
	}

	if( y2 > 2100 || y2 < 1900 ) {
		alert( "연도는 1901부터 2099사이 값이어야 합니다." + y2 );
		endObj.focus();
		return false;
	}
	if( m2 > 12 || m2 < 1 ) {
		alert( "월은 1부터 12사이 값이어야 합니다." + m2 );
		endObj.focus();
		return false;
	}

	// 날짜 확인

	if(m2 == 1) total_days = 31;
	else if(m2 == 2) {
		if(((y2 % 4 == 0) && (y2 % 100 != 0)) || (y2 % 400 == 0))
			 total_days = 29;
		else total_days = 28;
	}
	else if(m2 == 3) total_days = 31;
	else if(m2 == 4) total_days = 30;
	else if(m2 == 5) total_days = 31;
	else if(m2 == 6) total_days = 30;
	else if(m2 == 7) total_days = 31;
	else if(m2 == 8) total_days = 31;
	else if(m2 == 9) total_days = 30;
	else if(m2 == 10) total_days = 31;
	else if(m2 == 11) total_days = 30;
	else if(m2 == 12) total_days = 31;

	if( d2 > total_days || d2 < 1 ) {
		alert( m2 + "월의 일자는 1부터 " + total_days + "사이 값이어야 합니다.\n입력값 " + d2  + "일");
		endObj.focus();
		return false;
	}
	if( d2 > 31 || d2 < 1 ) {
		alert( "일은 1부터 31사이 값이어야 합니다." + d2 );
		endObj.focus();
		return false;
	}

	var DyMilli = 24 * 60 * 60 * 1000;

	var t1 = Date.UTC( y1, m1 - 1 , d1 );
	var t2 = Date.UTC( y2, m2 - 1 , d2 );
	var diff = (t2 - t1) / DyMilli;

	if( isNaN( diff ) ) {
		str += "숫자형식을 입력해 주십시오.";
		alert( str );
		startObj.focus();
		return false;
	} else if( diff >= max ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "'와 ";
		} else {
			str += "" + startDisplayName + "'과 ";
		}
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + " 은 '"+ max +"'일 이내로 입력해 주십시오.";
		} else {
			str += "" + endDisplayName + " 는 '"+ max +"'일 이내로 입력해 주십시오.";
		}
		alert( str );
		startObj.focus();
		return false;
	} else if( diff < 0 ) {
		str += "" + endDisplayName + "'이 '" + startDisplayName + "'보다 빠를 수 없습니다.";
		alert( str );
		startObj.focus();
		return false;
	} else if( startObj.value == null || startObj.value == '' ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 을 입력해 주십시오.";
		} else {
			str += "" + startDisplayName + " 를 입력해 주십시오.";
		}
		alert( str );
		startObj.focus();
		return false;
	} else if( endObj.value == null || endObj.value == '' ) {
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + " 을 입력해 주십시오.";
		} else {
			str += "" + endDisplayName + " 를 입력해 주십시오.";
		}
		alert( str );
		endObj.focus();
		return false;
	}
	return true;
}

// 날짜  Check
function VALIDATION_DATE( id, startDisplayName ) {
	var startObj = document.all[id];
	var re = /[/]/g;
	var day1 = getDate( startObj.value );
	var str = "";

	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		startDisplayName = startObj.name;
	}

	if( day1.length != 8 ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 yyyyMMdd형식이어야 합니다." + day1 ;
		} else {
			str += "" + startDisplayName + " 는 yyyyMMdd형식이어야 합니다." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	if( isNaN( day1 ) ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 숫자형식이어야 합니다." + day1 ;
		} else {
			str += "" + startDisplayName + " 는 숫자형식이어야 합니다." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	var y1 = parseInt( day1.substring( 0, 4 ), 10);
	var m1 = parseInt( day1.substring( 4, 6 ), 10);
	var d1 = parseInt( day1.substring( 6, 8 ), 10);

	if( y1 > 2100 || y1 < 1900 ) {
		alert( "연도는 1901부터 2099사이 값이어야 합니다." + y1 );
		startObj.focus();
		return false;
	}
	if( m1 > 12 || m1 < 1 ) {
		alert( "월은 1부터 12사이 값이어야 합니다." + m1 );
		startObj.focus();
		return false;
	}

	// 날짜 확인
	var total_days;

	if(m1 == 1) total_days = 31;
	else if(m1 == 2) {
		if(((y1 % 4 == 0) && (y1 % 100 != 0)) || (y1 % 400 == 0))
			 total_days = 29;
		else total_days = 28;
	}
	else if(m1 == 3) total_days = 31;
	else if(m1 == 4) total_days = 30;
	else if(m1 == 5) total_days = 31;
	else if(m1 == 6) total_days = 30;
	else if(m1 == 7) total_days = 31;
	else if(m1 == 8) total_days = 31;
	else if(m1 == 9) total_days = 30;
	else if(m1 == 10) total_days = 31;
	else if(m1 == 11) total_days = 30;
	else if(m1 == 12) total_days = 31;

	if( d1 > total_days || d1 < 1 ) {
		alert( m1 + "월의 일자는 1부터 " + total_days + "사이 값이어야 합니다.\n입력값 " + d1  + "일");
		startObj.focus();
		return false;
	}

	if( startObj.value == null || startObj.value == '' ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 을 입력해 주십시오.";
		} else {
			str += "" + startDisplayName + " 를 입력해 주십시오.";
		}
		alert( str );
		startObj.focus();
		return false;
	}
	return true;
}

// 전화번호 Check
function VALIDATION_TELEPHONE( id, startDisplayName ) {
	var e = document.all[id];
	var str = "";
    if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(startDisplayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		//startDisplayName = e.name;
	}

	if( ! isTelNumber( e.value ) ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 숫자와 - 만 입력 가능합니다.";
		} else {
			str += "" + startDisplayName + " 는 숫자와 - 만 입력 가능합니다." ;
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// 이메일 Check
function VALIDATION_EMAIL( id, startDisplayName ) {
	var e = document.all[id];
	var str = "";
    if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(startDisplayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		//startDisplayName = e.name;
	}
	if( ! isAlphanumeric( trim(e.value) ) ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 형식에 맞지 않습니다.";
		} else {
			str += "" + startDisplayName + " 형식에 맞지 않습니다." ;
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// 시간 Check
function VALIDATION_TIME( id, startDisplayName ) {
	var e = document.all[id];
	var str = "";
    if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(startDisplayName + " 항목에 공백을 입력할수 없습니다.");
        e.focus();
        return false;
    }
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		startDisplayName = e.name;
	}

	if( ! isDigit( e.value ) ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 숫자만 입력 가능합니다.";
		} else {
			str += "" + startDisplayName + " 는 숫자만 입력 가능합니다." ;
		}
		alert( str );
		e.focus();
		return false;
	}
	if( e.value.length != 4 ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 은 4자리를 입력하셔야 합니다.";
		} else {
			str += "" + startDisplayName + " 는 4자리를 입력하셔야 합니다.";
		}
		alert( str );
		e.focus();
		return false;
	}
	var hh = parseInt( e.value, 10 ) / 100;
	var mm = parseInt( e.value, 10 ) % 100;

	if( hh < 0 || hh > 23  || mm < 0 || mm > 59 ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " 는  0000에서 2359까지 입력 하실 수 있습니다.";
		} else {
			str += "" + startDisplayName + " 는  0000에서 2359까지 입력 하실 수 있습니다.";
		}
		alert( str );
		e.focus();
		return false;
	}

	return true;
}
// 숫자가 포함되어있는지 Check
function isDigit( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ch < "0" || ch > "9" ) {
			 return false;
		}
	}
	return true;
}

// 숫자, 쉼표(,), 마침표(.)가 포함되어있는지 Check
function isForeignMoney( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "0" || ch > "9" ) && ch != ',' && ch != '.') {
			 return false;
		}
	}
	return true;
}

// 숫자 및 쉼표(,)가 포함되어있는지 Check
function isMoney( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "0" || ch > "9" ) && ch != ',' ) {
			 return false;
		}
	}
	return true;
}

// 알파벳만 포함되어 있는지 Check
function isAlphabet( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "a" || ch > "z" ) && ( ch < "A" || ch > "Z" ) ) {
			return false;
		}
	}
	return true;
}

// 알파벳과 숫자만 포함되어 있는지 Check
function isAlphanumeric( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "0" || ch > "9" ) && ( ch < "a" || ch > "z" ) && ( ch < "A" || ch > "Z" ) ) {
			 return false;
		}
	}
	return true;
}

// eMail Check
function isEmail( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ch != "." ) {
			 return false;
		}
	}
	return true;
}

//  전화번호 Check 숫자 , '-', '(', ')', ' '만 가능 포함되어 있는지 Check
function isTelNumber( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "0" || ch > "9" ) && ( ch !='-') && ( ch != '(') && ( ch != ')' ) && ( ch !=
' ' ) ) {
			 return false;
		}
	}
	return true;
}

function doSimple() {
	try {
		var userCallback = "", formName = "ribform", transform = "true", userDisplay = "riblayer", userXsl = "", userLanguage = "ko", processMsg = "", debug = "false", echoMode = "false", errorMsg = "", showJStarError = "true", errorURL = "";
		var serviceCode = arguments[0];
		if( typeof serviceCode == "undefined" ) {
			alertError("Service Code는 필수 항목 입니다.");
			return;
		}
		userXsl = "xsl/RIB" + serviceCode + ".xsl";
		var sFeatures = arguments[1];
		var doc = arguments[2];

		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
						formName = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
						userLanguage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "processmsg" ) {
						processMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "echo" )   {
						echoMode = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "error" )  {
						errorMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
						errorURL = trim( tmpArray[1] );
					}
				}
			}
		}
		var responseMessage = "R_RIB" + serviceCode;
		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibSimpleService.jsp?serviceCode="+serviceCode;

		if( typeof doc == 'undefined' ) {
			var formObj = null;
			if( formName.indexOf( "." ) > -1 ) {
				formObj = eval( formName );
			} else {
				var idx1 = formName.indexOf("[");
				var idx2 = formName.indexOf("(");
				var sourceName = formName;
				var sourceIdx = 0;
				if( idx1 > -1 ) {
					var idx3 = formName.indexOf("]");
					if( idx3 > -1 ) {
						sourceName = formName.substring(0, idx1);
						sourceIdx  = parseInt( formName.substring(idx1+1, idx3) );
					}
				} else if ( idx2 > -1 ) {
					var idx3 = formName.indexOf(")");
					if( idx3 > -1 ) {
						sourceName = formName.substring(0, idx2);
						sourceIdx  = parseInt( formName.substring(idx2+1, idx3) );
					}
				}

				var oObject = theDocument.forms;
				var objCount = 0;
				if (oObject != null){
					for (var i = 0; i < oObject.length; i++){
						var obj = oObject[i];
						if( obj.name == sourceName )    {
							if( objCount == sourceIdx ) {
								formObj = obj;
								break;
							}
							objCount++;
						}
					}
				}
			}
			if( typeof formObj == 'undefined' || formObj == null ) {
				alertError("이름이 [" + formName + "]인 form객제가 존재하지 않습니다.");
				return;
			}

			if( !validateForm(formObj) ) {
				alert("validate실패");
				return;
			}


			doc = toDocument( formObj );
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 언어
		}

		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;

		var serviceFeatures = "callback:doSimpleCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl + "; showjstarerror:" + showJStarError;
		log( "[doSimple] callServletXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callServletXMLService( serviceFeatures, servletURL, doc )) {
			log("callServletXMLService호출 하기 전에 에러가 발생했습니다.");
		}
	} catch( e ) {
		alertError("doSimple 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doSimpleCallback( result, argument, sFeatures ) {
	try {
		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", transform = "true", userDisplay = "riblayer", userXsl = "", debug = "false", showJStarError = "true";
		log("AA");
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					}
				}
			}
		}
		log("BB");
		srcTree = getDocument( result );

		// jStar 에러 체크 여부 처리.
		if (showJStarError != "false") {
			if (!checkJStarError(srcTree)) {
				return;
			}
		}

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}
		log("DD");
		if( transform == "true" ) {
			if( userDisplay == "" ) {
				alertError( "transform이 true이고 display의 값이 지정되지 않았습니다.");
			} else if( userXsl == "" ) {
				alertError( "transform이 true이고 xsl의 값이 지정되지 않았습니다.");
			} else {
				if( srcTree == null ) {
					srcTree = getDocument( result );
				}
				xsltTree= getXSLDocument( userXsl );
				htmlStr = srcTree.transformNode(xsltTree) + "<XSLINFO value='" + userXsl + "'/>";

				theDocument.all[userDisplay].innerHTML = htmlStr;
				window.scrollTo(0,0);
				if ( debug == "true" || debug == "y" )  {
					var re = />[\s]*</g;    //Initialize pattern.
					obj["html"] = htmlStr.replace( re ,">\n<");
					obj["xsl"] = indent( xsltTree );
				}
			}
		}
		log("EE");

		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}
log("FF");
		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}
log("GG");
	} catch( e ) {
		alertError("doSimple 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function goPage( pageUrl, key, doc ) {

	log("goPage URL[" + pageUrl + "]" );

	if( typeof pageUrl == 'undefined' ) {
		alertError("URL을 입력해 주시기 바랍니다.");
		log("URL을 입력해 주시기 바랍니다.");
		return;
	}

	if (typeof key == '') {
		alertError("key가 공백입니다.");
		log("key가 공백입니다.");
		return;
	}

	log("goPage setSaveDoc START ");
	setSavedDoc(key, doc);
	log("goPage setSaveDoc END ");
//  alert("goPage START!");
	location.href = pageUrl;
//  location.replace(pageUrl);
//  alert("goPage END!");
}

function goServiceUrl( serviceUrl, data ){
	//  EncLinkVeriry(serviceUrl, data, "main");
	EncLink(serviceUrl, data, 'main');
}


function getSavedDoc(key) {
	var str = getFrameHashDoc(key);
	var result = null;
	if (str == null || str == "") {
		log("데이터가 없습니다.");
	} else {
		result = getDocument(str);
	}

	return result;

}

function setSavedDoc(key, doc) {
	var str = serialize(doc);
	if (str == null) {
		alertError("데이터가 올바르지 않습니다.");
		return;
	}
	setFrameHashDoc(key, str);
}

function getFrameHashDoc(key) {
	var oFrame = window.frameElement;
	try {
		if( isShinhanPopup() ) {		//팝업 창인 경우
			log("Popup");
			if (typeof comframe == 'undefined') {
				if( __isPopupMethod( "getFrameHashDoc" ) ) {
					return opener.getFrameHashDoc(key);
				} else {
					alertError("opener.getFrameHashDoc이 없습니다. [" + opener.location + "][" + (typeof opener.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
					log("opener.getFrameHashDoc이 없습니다. [" + opener.location + "][" + (typeof opener.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
					return null;
				}
			} else if ( typeof comframe.getSavedDoc  == 'function' || typeof comframe.getSavedDoc  == 'object' ) {
				var str = comframe.getSavedDoc(key);
				if (str == null) {
					log("Key["+key+"]에 해당하는 Document가 없음.");
				}
				return str;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.getSavedDoc이 없습니다. [" + comframe.location + "][" + typeof (comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.getSavedDoc이 없습니다. [" + comframe.location + "][" + (typeof comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				return null;
			}

		} else if( hasParentFrame() ) {
			log("상위 Frame 존재 : " + window.parent.location);
			if( __isParentFrameMethod( "getFrameHashDoc" ) ) {
				return window.parent.getFrameHashDoc( key );
			} else {
				// do what?
				alertError("window.parent.getFrameHashDoc이 없습니다. [" + window.parent.location + "][" + (typeof window.parent.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				log("window.parent.getFrameHashDoc이 없습니다. [" + window.parent.location + "][" + (typeof window.parent.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				return null;
			}
		} else {
			log("최 상위 Frame");
			if (typeof comframe == 'undefined') {
				alertError("프레임이 없습니다.");
				log("comframe이 없음.");
				return null;
			} else if ( typeof comframe.getSavedDoc  == 'function' || typeof comframe.getSavedDoc  == 'object' ) {
				log("GF_"+key+"_2");
				var str = comframe.getSavedDoc(key);
				if (str == null) {
					log("Key["+key+"]에 해당하는 Document가 없음.");
				}
				return str;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.getSavedDoc이 없습니다. [" + comframe.location + "][" + typeof (comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.getSavedDoc이 없습니다. [" + comframe.location + "][" + (typeof comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				return null;
			}
		}
	} catch( e ) {
		alertError("getFrameHashDoc Exception이 발생했습니다.[" + (typeof isPopup) + "]", e);
		printStackTrace( e );
		return;
	}
}

function setFrameHashDoc(key, str) {
	var oFrame = window.frameElement;
	try {
		if( isShinhanPopup() ) {		//팝업 창인 경우
			log("Popup");
			if (typeof comframe == 'undefined') {
				if( __isPopupMethod( "setFrameHashDoc" ) ) {
					opener.setFrameHashDoc(key, str );
				} else {
					alertError("opener.setFrameHashDoc이 없습니다. [" + opener.location + "][" + (typeof opener.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
					log("opener.setFrameHashDoc이 없습니다. [" + opener.location + "][" + (typeof opener.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				}
			} else if ( typeof comframe.setSavedDoc  == 'function' || typeof comframe.setSavedDoc  == 'object' ) {
				log("SF_"+key+"_3");
				comframe.setSavedDoc(key, str);
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.setSavedDoc이 없습니다. [" + comframe.location + "][" + typeof (comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.setSavedDoc이 없습니다. [" + comframe.location + "][" + (typeof comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
			}

			return;
		} else if( hasParentFrame() ) {
			log("상위 Frame 존재 ");
			if( __isParentFrameMethod( "setFrameHashDoc" ) ) {
				window.parent.setFrameHashDoc( key, str );
			} else {
				// do what?
				alertError("window.parent.setFrameHashDoc이 없습니다. [" + window.parent.location + "][" + (typeof window.parent.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				log("window.parent.setFrameHashDoc이 없습니다. [" + window.parent.location + "][" + (typeof window.parent.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
			}
			return;
		} else {
			log("최 상위 Frame");
			if (typeof comframe == 'undefined') {
				alertError("프레임이 없습니다.");
				log("comframe이 없음.");
			} else if ( typeof comframe.setSavedDoc  == 'function' || typeof comframe.setSavedDoc  == 'object' ) {
				log("SF_"+key+"_3");
				comframe.setSavedDoc(key, str);
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.setSavedDoc이 없습니다. [" + comframe.location + "][" + typeof (comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.setSavedDoc이 없습니다. [" + comframe.location + "][" + (typeof comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
			}
			return;
		}
	} catch( e ) {
		alertError("setFrameHashDoc Exception이 발생했습니다. [" + (typeof isPopup) + "]" , e);
		printStackTrace( e );
		return;
	}
}

function doCode() {
	try {
		var userTransform = "", userDisplay = "", formName = "ribform", userXsl = "", userLanguage = "ko", useCert = "true", debug = "false", userCallback = "";
		var strSelected = "", strTextSelected = "", allOption = "", allOptionText = "", chooseOption = "", chooseOptionText = "", append = "", sorted = "", textSorted = "";
		var blankText = "";
		var listType = "hashtable";
		var sCodeKeyStr = arguments[0];
		var sFeatures = arguments[1];
		if ( typeof sFeatures == "undefined" ) {
			alertError("인자가 부족합니다.");
			return;
		}
		if (sCodeKeyStr == "") {
			alertError("첫 번째 항목이 비어 있을 수 없습니다.");
			return;
		}
		if (sFeatures == "") {
			alertError("두 번째 항목이 비어 있을 수 없습니다.");
			return;
		}

		var doc = getDocument("<CODE/>");
		var arrayOfCodeKey = trim(sCodeKeyStr).split(";");

		for (var i=0; i < arrayOfCodeKey.length; i++) {
			var value = trim(arrayOfCodeKey[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("첫 번째 항목에 잘못된 문자가 포함되어 있습니다.");
					return;
				}
			}
		}
		setString(doc, "codeKey", sCodeKeyStr);

		log("doCode xmlStr["+indent(doc)+"]");

		var arrayOfFeatures = sFeatures.split(";");
		for (var i=0; i < arrayOfFeatures.length; i++) {
			var tmpArray = arrayOfFeatures[i].split(":");
			if ( tmpArray.length == 2 ) {
				if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
					userCallback = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
					formName = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
					userDisplay = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
					userTransform = trim( tmpArray[1] ).toLowerCase();
				} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
					userXsl = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
					userLanguage = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" )    {
					useCert = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
					debug = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "selected" )   {
					strSelected = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "textselected" )   {
					strTextSelected = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "alloption" )  {
					allOption = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "alloptiontext" )  {
					allOptionText = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoption" )   {
					chooseOption = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoptiontext" )   {
					chooseOptionText = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "append" ) {
					append = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "sorted" ) {
					sorted = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "textsorted" ) {
					textSorted = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "type" )   {
					listType = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "blanktext" )  {
					blankText = trim( tmpArray[1].toLowerCase() );
				}
			}
		}

		var serviceFeatures = "callback:doCodeCallback; sync:false; lock:false; cursorFix: true; ";

		if (userTransform == "") {
			userTransform = "true";
		}

		if (userTransform == "false") {
			if (userCallback == "") {
				alertError("transform이 false인 경우 callback이 반드시 지정되어야 합니다.");
				return;
			}
			serviceFeatures += "userTransform:false; userCallback:"+userCallback+";";
		} else if (userTransform == "true") {
			if (arrayOfCodeKey.length > 1) {
				alertError("두개이상을 코드를 받아올 경우 화면에 직접그릴 수 없습니다.");
				retrun;
			}
			serviceFeatures += " userTransform:true;";
			if (userDisplay == "") {
				alertError("transform이 true인 경우 display가 반드시 지정되어야 합니다.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+";";
			if (userCallback != "") {
				serviceFeatures += " userCallback:"+userCallback+";";
			}

			if (strSelected != "") {
				serviceFeatures += " selected:"+strSelected+";";
			}
			if (strTextSelected != "") {
				serviceFeatures += " textselected:"+strTextSelected+";";
			}
			if (allOption != "") {
				serviceFeatures += " alloption:"+allOption+";";
			}
			if (allOptionText != "") {
				serviceFeatures += " alloptiontext:"+allOptionText+";";
			}
			if (chooseOption != "") {
				serviceFeatures += " chooseoption:"+chooseOption+";";
			}
			if (chooseOptionText != "") {
				serviceFeatures += " chooseoptiontext:"+chooseOptionText+";";
			}
			if (append != "") {
				serviceFeatures += " append:"+append+";";
			}
			if (sorted != "") {
				serviceFeatures += " sorted:"+sorted+";";
			}
			if (textSorted != "") {
				serviceFeatures += " textsorted:"+textSorted+";";
			}
			if (userXsl != "") {
				serviceFeatures += " userXsl:"+userXsl+";";
			}
			if (blankText != "") {
				serviceFeatures += " blankText:"+blankText+";";
			}

		} else {
			alertError("target값이 잘못 되었습니다.");
			return;
		}

		if (debug == "") debug = "false";
		if (userLanguage == "") userLanguage = "ko";
		if (listType == "") listType = "hashtable";
		if (formName == "") formName = "ribform";
		if (useCert == "") useCert = "true";

		serviceFeatures += " debug:"+debug+"; form:"+formName+"; useCert:"+useCert+";";

		var servletURL = "/common/rib/jsp/callRibCodeService.jsp";

		setAttribute( doc, "language", userLanguage);   // 언어
		setAttribute( doc, "type", listType);           // 반환 타입.

		log( "[doCode] callServletXMLService 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callServletXMLService호출 하기 전에 에러가 발생했습니다.");
		}

	} catch( e ) {
		alertError("doCode 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}

}

function doCodeCallback( result, argument, sFeatures ) {
	try {
		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", userTransform = "", userDisplay = "riblayer", userXsl = "", userForm="ribform", debug = "false";
		var strSelected = "", strTextSelected = "", allOption = "", allOptionText = "", chooseOption = "", chooseOptionText = "", append = "", sorted = "", textSorted = "";
		var blankText = "";
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usertransform" )  {
						userTransform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userform" )   {
						userForm = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "selected" )   {
						strSelected = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "textselected" )   {
						strTextSelected = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "alloption" )  {
						allOption = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "alloptiontext" )  {
						allOptionText = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoption" )   {
						chooseOption = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoptiontext" )   {
						chooseOptionText = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "append" ) {
						append = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "sorted" ) {
						sorted = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "textsorted" ) {
						textSorted = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "blanktext" )  {
						blankText = trim( tmpArray[1].toLowerCase() );
					}
				}
			}
		}
		srcTree = getDocument( result );

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}

		if( userTransform == "true") {
			// 결과를 재 정렬
//          result = arrangeCode(result);

			if( userDisplay == "" ) {
				alertError( "display의 값이 지정되지 않았습니다.");
			} else {
//              if( srcTree == null ) {
//                  srcTree = getDocument( result );
//              }

				var sFeatures2 = "display:"+userDisplay+"; form:"+userForm+"; debug:"+debug+";";

				if (strSelected != "") {
					sFeatures2 += " selected:"+strSelected+";";
				}
				if (strTextSelected != "") {
					sFeatures2 += " textselected:"+strTextSelected+";";
				}
				if (allOption != "") {
					sFeatures2 += " alloption:"+alloption+";";
				}
				if (allOptionText != "") {
					sFeatures2 += " alloptiontext:"+allOptionText+";";
				}
				if (chooseOption != "") {
					sFeatures2 += " chooseoption:"+chooseOption+";";
				}
				if (chooseOptionText != "") {
					sFeatures2 += " chooseoptiontext:"+chooseOptionText+";";
				}
				if (append != "") {
					sFeatures2 += " append:"+append+";";
				}
				if (sorted != "") {
					sFeatures2 += " sorted:"+sorted+";";
				}
				if (textSorted != "") {
					sFeatures2 += " textsorted:"+textSorted+";";
				}
				if (userXsl != "") {
					sFeatures2 += " xsl:"+userXsl+";";
				}
				if (blankText != "") {
					sFeatures2 += " blankText:"+blankText+";";
				}

				setXMLOption( sFeatures2, result );

			}
		}

		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}

		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}

	} catch( e ) {
		alertError("doCode 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function arrangeCode(hashStr) {
	var hash = toHashtable(hashStr);
	var keys = hash.keys();
	var newHash = new Hashtable();
	for (i=0; i < keys.length;  i++) {
		var key = keys[i];
		var value = hash.get(key);
		if ( typeof value != 'string' ) {
			return hashStr;
		}
		if ( value.indexOf("신한") != -1) {
			hash.remove(key);
			newHash.put(key, value);
			break;
		}
	}
	keys = hash.keys();
	for (i=0; i < keys.length;  i++) {
		var key = keys[i];
		var value = hash.get(key);
		newHash.put(key, value);
	}

	return newHash.toString();
}

function saveExcelList(){
	log("saveExcelList start");
	saveExcel(null, pageObj.data.toDocument(), "");
}

function saveExcel(templateDoc, dataDoc, fileName) {
	if (templateDoc == null) {
		log("템플릿 XML이 Null.");
		templateDoc = makeTemplateDoc(dataDoc);
		if (templateDoc == null) {
			log("템플릿 Null");
			return false;
		}
	}
	if (dataDoc == null) {
		log("데이터 XML이 Null.");
		return false;
	}
	if (typeof fileName == 'undefined') {
		fileName = 'default';
	}
	var templateStr = serialize(templateDoc);
	var dataStr = serialize(dataDoc);
	if (templateStr == null) {
		log("템플릿 XML serialize 실패");
		return false;
	}
	if (dataStr == null) {
		log("데이터 XML serialize 실패");
		return false;
	}

	return DataToExcel(templateStr, dataStr, fileName);

}

function DataToExcel(gridStyle, gridData, fileName) {
	var oFrame = window.frameElement;
	try {
		if( isShinhanPopup() ) {		//팝업 창인 경우
			log("Popup");
			if (typeof comframe == 'undefined') {
				if( __isPopupMethod( "DataToExcel" ) ) {
					return opener.DataToExcel(gridStyle, gridData, fileName);
				} else {
					alertError("opener.DataToExcel이 없습니다. [" + opener.location + "][" + (typeof opener.DataToExcel) + "][" + (typeof isPopup) + "]" );
					log("opener.DataToExcel이 없습니다. [" + opener.location + "][" + (typeof opener.DataToExcel) + "][" + (typeof isPopup) + "]" );
					return false;
				}
			} else if ( typeof comframe.DataToExcel  == 'function' || typeof comframe.DataToExcel  == 'object' ) {
				var result = comframe.DataToExcel(gridStyle, gridData, fileName);
				if (result == false) {
					log("저장실패");
				}
				return result;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.DataToExcel이 없습니다. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				log("comframe.DataToExcel이 없습니다. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				return false;
			}
		} else if( hasParentFrame() ) {
			log("상위 Frame 존재 ");
			if( __isParentFrameMethod( "DataToExcel" ) ) {
				return window.parent.DataToExcel(gridStyle, gridData, fileName);
			} else {
				// do what?
				alertError("window.parent.DataToExcel이 없습니다. [" + window.parent.location + "][" + (typeof window.parent.DataToExcel) + "][" + (typeof isPopup) + "]" );
				log("window.parent.DataToExcel이 없습니다. [" + window.parent.location + "][" + (typeof window.parent.DataToExcel) + "][" + (typeof isPopup) + "]" );
				return false;
			}

		} else {
			log("최 상위 Frame");
			if (typeof comframe == 'undefined') {
				alertError("프레임이 없습니다.");
				log("comframe이 없음.");
				return false;
			} else if ( typeof comframe.DataToExcel  == 'function' || typeof comframe.DataToExcel  == 'object' ) {
				var result = comframe.DataToExcel(gridStyle, gridData, fileName);
				if (result == false) {
					log("저장실패");
				}
				return result;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.DataToExcel이 없습니다. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				log("comframe.DataToExcel이 없습니다. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				return false;
			}
		}
	} catch( e ) {
		alertError("DataToExcel Exception이 발생했습니다.[" + (typeof isPopup) + "]", e);
		printStackTrace( e );
		return false;
	}
}

function makeTemplateDoc(xmlDoc) {
	try {
		var iCnt = 0;
		if (xmlDoc.documentElement.nodeName != 'vector') {
			log("Vector모양이 아님");
			return null;
		}
		var vec = toVector(xmlDoc);
		if (vec.size() == 0) {
			log("데이터가 없음");
			return null;
		}
		var eleDoc = vec.elementAt(0);
		// gridStyle String만든다.
		var docId = eleDoc.documentElement.nodeName;
		var gridStr = "<gridStyle id='"+docId+"' charaterSet='euc-kr'>";
		var childElements = eleDoc.documentElement.childNodes;
		for (var i=0; i<childElements.length; i++) {
			var eleNode = childElements.item(i);
			if (eleNode.nodeType == 1) {
				var name = eleNode.nodeName;
				// excel 저장여부  체크
				var excel = eleNode.getAttribute("excel");
				if ( excel != null) {
					if (excel == "9") {
						gridStr += "<column id='"+eleNode.nodeName+"' name='"+eleNode.nodeName+"' dataType='numeric' displayType='#,###' ignoreChar=',' />";
					} else {
						gridStr += "<column id='"+eleNode.nodeName+"' name='"+eleNode.nodeName+"'/>";
					}
					iCnt = 1;
				}
			}
		}

		if( iCnt == 0 ){
			for (var i=0; i<childElements.length; i++) {
				var eleNode = childElements.item(i);
				if (eleNode.nodeType == 1) {
					gridStr += "<column id='"+eleNode.nodeName+"' name='"+eleNode.nodeName+"'/>";
				}
			}
		}

		gridStr += "</gridStyle>";
		log("GRIDSTR:"+gridStr);
		return getDocument(gridStr);
	} catch (e) {
		printStackTrace(e);
		return null;
	}
}

var doMultiXMLCallbackDoc;
function doMultiXML() {
	try {
		var formName = "ribform";
		var errorURL = "";
		var callbackServiceCode = arguments[0];
		if( typeof callbackServiceCode == "undefined" ) {
			alertError("Service Code는 필수 항목 입니다.");
			return;
		}
		var sFeatures = arguments[1];
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "form" )  {
						formName = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
						errorURL = trim( tmpArray[1] );
					}
				}
			}
		}

		var callbackDoc = arguments[2];
		if( typeof callbackDoc == 'undefined' ) {
			doMultiXMLCallbackDoc = null;
		} else {
			doMultiXMLCallbackDoc = callbackDoc;
		}

		var formObj = null;
		if( formName.indexOf( "." ) > -1 ) {
			formObj = eval( formName );
		} else {
			var idx1 = formName.indexOf("[");
			var idx2 = formName.indexOf("(");
			var sourceName = formName;
			var sourceIdx = 0;
			if( idx1 > -1 ) {
				var idx3 = formName.indexOf("]");
				if( idx3 > -1 ) {
					sourceName = formName.substring(0, idx1);
					sourceIdx  = parseInt( formName.substring(idx1+1, idx3) );
				}
			} else if ( idx2 > -1 ) {
				var idx3 = formName.indexOf(")");
				if( idx3 > -1 ) {
					sourceName = formName.substring(0, idx2);
					sourceIdx  = parseInt( formName.substring(idx2+1, idx3) );
				}
			}

			var oObject = theDocument.forms;
			var objCount = 0;
			if (oObject != null){
				for (var i = 0; i < oObject.length; i++){
					var obj = oObject[i];
					if( obj.name == sourceName )    {
						if( objCount == sourceIdx ) {
							formObj = obj;
							break;
						}
						objCount++;
					}
				}
			}
		}
		if( typeof formObj == 'undefined' || formObj == null ) {
			alertError("이름이 [" + formName + "]인 form객제가 존재하지 않습니다.");
			return;
		}

		var serviceCode = formObj.서비스코드.value;
		if( typeof serviceCode == 'undefined' || serviceCode == null || trim(serviceCode) == '' ) {
			alert("입출금 조회를 하시어 처리결과를 반드시 확인하신후에\n\n계속해서 서비스를 이용하시려면\n처음 부터 다시 거래하여 주시기 바랍니다.");
			if( errorURL != null &&  errorURL != "" ){
				document.location = errorURL;
			}
			else{
				document.location.reload();
			}
			return;
		}

		var doc = getDocument("<FORMMSG/>");
		if( !isAlphanumeric( formObj.이체비밀번호.value ) ) {
			alert( "'이체비밀번호'는 숫자와 영문자만 입력해야 합니다." );
			formObj.이체비밀번호.value="";
			formObj.이체비밀번호.focus();
			return;
		}
		if( formObj.이체비밀번호.value.length < 6 || formObj.이체비밀번호.value.length > 8 ){
			alert( "'이체비밀번호'는 6~8자리로 입력해야 합니다." );
			formObj.이체비밀번호.value="";
			formObj.이체비밀번호.focus();
			return;
		}

		if( serviceCode == 'C2098' ) { // 보안 카드
			if( formObj.보안카드암호11.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호11.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호11.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호11.value="";
				formObj.보안카드암호11.focus();
				return;
			}

			if( formObj.보안카드암호12.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호12.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호12.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호12.value="";
				formObj.보안카드암호12.focus();
				return;
			}

			if( formObj.보안카드암호21.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호21.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호21.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호21.value="";
				formObj.보안카드암호21.focus();
				return;
			}

			if( formObj.보안카드암호22.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호22.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호22.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호22.value="";
				formObj.보안카드암호22.focus();
				return;
			}
			try {
				formObj.보안카드암호11.value = get_e2e_value(formObj.보안카드암호11.value, "보안카드암호11" );
				formObj.보안카드암호12.value = get_e2e_value(formObj.보안카드암호12.value, "보안카드암호12" );
				formObj.보안카드암호21.value = get_e2e_value(formObj.보안카드암호21.value, "보안카드암호21" );
				formObj.보안카드암호22.value = get_e2e_value(formObj.보안카드암호22.value, "보안카드암호22" );
				formObj.이체비밀번호.value   = get_e2e_value(formObj.이체비밀번호.value,  "이체비밀번호"   );
			} catch (ee) {
				log(" 보안카드암호 필드 e2e처리 중 오류발생. 암호화 안함.");
				printStackTrace(ee);
				alert("키보드 암호화 과정중 오류가 발생되었습니다.\n 죄송하지만 로그아웃 후 다시 로그인 하여 사용하기 바랍니다.");
				return;
			}

			setString( doc, "보안카드암호1" , formObj.보안카드암호11.value + formObj.보안카드암호12.value );
			setString( doc, "보안카드암호2" , formObj.보안카드암호21.value + formObj.보안카드암호22.value );
			setString( doc, "이체비밀번호" , formObj.이체비밀번호.value );
			formObj.보안카드암호11.value = "";
			formObj.보안카드암호12.value = "";
			formObj.보안카드암호21.value = "";
			formObj.보안카드암호22.value = "";
			formObj.이체비밀번호.value = "";
		} else {    // OTP
			if( formObj.OTP카드암호.value.length != 6 ) {
				alert( "'OTP카드 비밀번호'는 숫자 6자리를 입력해 주십시오." );
				formObj.OTP카드암호.focus();
				return;
			}
			if( !isDigit( formObj.OTP카드암호.value ) ) {
				alert( "'OTP카드 비밀번호'는 숫자만 입력해야 합니다." );
				formObj.OTP카드암호.value="";
				formObj.OTP카드암호.focus();
				return;
			}
			try {
				formObj.OTP카드암호.value   = get_e2e_value(formObj.OTP카드암호.value,   "OTP카드암호"    );
				formObj.이체비밀번호.value  = get_e2e_value(formObj.이체비밀번호.value,  "이체비밀번호"   );
			} catch (ee) {
				log(" OTP카드 필드 e2e처리 중 오류발생. 암호화 안함.");
				alert("키보드 암호화 과정중 오류가 발생되었습니다.\n 죄송하지만 로그아웃 후 다시 로그인 하여 사용하기 바랍니다.");
				printStackTrace(ee);
			}
			setString( doc, "OTP카드암호" , formObj.OTP카드암호.value );
			setString( doc, "이체비밀번호" , formObj.이체비밀번호.value );
			formObj.OTP카드암호.value = "";
			formObj.이체비밀번호.value = "";
		}

		var responseMessage = "R_RIB" + serviceCode;
		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibCommonService.jsp?serviceCode="+serviceCode;

		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "callbackServiceCode", callbackServiceCode); // 서비스 코드
		setAttribute( doc, "callbackFeatures", sFeatures);  // 서비스 코드
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;
		try{
			var pcDoc = getSavedDoc("PCCONFIG");
			if( pcDoc != null ){
				copyXML( pcDoc, doc, "merge");
			}
		}
		catch(e){
			log("pc 환경 정보 저장중 오류발생");
		}

		/* 2006. 7. 15 보안체크 웹대응답 제거 Attack
		setAttribute( doc, "mode", "ECHO");                     // 웹대응답 처리;
		*/

		var serviceFeatures = "callback:doMultiXMLCallback; sync:false; lock:false; cursorFix: true; useCert:true; useSign:false";
		log( "[doMultiXML] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
			// 로그아웃 후 첫페이지로.
			doLogoutWithoutCert();

		}

		try{
			var Obj = document.all["서비스코드"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("서비스코드 삭제중 오류 발생");
		}
		try{
			Obj = document.all["질의번호1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["질의번호2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("질의번호 삭제중 오류 발생");
		}

	} catch( e ) {
		alertError("doMultiXML 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doMultiXMLCallback( result, argument ) {
	try {
		var resultDoc = getDocument( result );
		var argumentDoc = getDocument( argument );

		if (!checkJStarError(resultDoc)) {
			try{
				var Obj = document.all["서비스코드"];
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SVC_CODE");
				}
			}
			catch(e){
				log("서비스코드 삭제중 오류 발생");
			}
			try{
				Obj = document.all["질의번호1"] ;
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SEC_CHAL1");
					Obj = document.all["질의번호2"];
					Obj.value = getString(resultDoc, "COM_SEC_CHAL2");;
				}
			}
			catch(e){
				log("질의번호 삭제중 오류 발생");
			}
			return;
		}

		try{
			var Obj = document.all["서비스코드"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("서비스코드 삭제중 오류 발생");
		}
		try{
			Obj = document.all["질의번호1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["질의번호2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("질의번호 삭제중 오류 발생");
		}

		var sFeatures = getAttribute( argumentDoc, "callbackFeatures" );
		var serviceCode = getAttribute( argumentDoc, "callbackServiceCode" );

		try {
			if (typeof doMultiXMLCallbackDoc == 'undefined' || doMultiXMLCallbackDoc == null) {
				log("doMultiXML - Doc 없음");
				eval( "doXML( serviceCode, sFeatures );" );
			} else {
				log("doMultiXML - Doc 있음");
				eval( "doXML( serviceCode, sFeatures, doMultiXMLCallbackDoc );" );
			}
		} catch( e ) {
			e.detail = "doXML(  serviceCode, sFeatures ); 에서 에러가 발생하였습니다. result:" + result ;
			printStackTrace( e );
		}
	} catch( e ) {
		alertError("doMultiXMLCallback 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

var doMultiXML2CallbackDoc;
function doMultiXML2() {
	try {
		var formName = "ribform";
		var errorURL = "";
		var callbackServiceCode = arguments[0];
		if( typeof callbackServiceCode == "undefined" ) {
			alertError("Service Code는 필수 항목 입니다.");
			return;
		}

		var callbackDoc = arguments[2];
		if( typeof callbackDoc == "undefined" ) {
			alertError("document가 입력되지 않았습니다.");
			return;
		} else {
			doMultiXML2CallbackDoc = callbackDoc;
		}

		var sFeatures = arguments[1];
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "form" )  {
						formName = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
						errorURL = trim( tmpArray[1] );
					}
				}
			}
		}
		var formObj = null;
		if( formName.indexOf( "." ) > -1 ) {
			formObj = eval( formName );
		} else {
			var idx1 = formName.indexOf("[");
			var idx2 = formName.indexOf("(");
			var sourceName = formName;
			var sourceIdx = 0;
			if( idx1 > -1 ) {
				var idx3 = formName.indexOf("]");
				if( idx3 > -1 ) {
					sourceName = formName.substring(0, idx1);
					sourceIdx  = parseInt( formName.substring(idx1+1, idx3) );
				}
			} else if ( idx2 > -1 ) {
				var idx3 = formName.indexOf(")");
				if( idx3 > -1 ) {
					sourceName = formName.substring(0, idx2);
					sourceIdx  = parseInt( formName.substring(idx2+1, idx3) );
				}
			}

			var oObject = theDocument.forms;
			var objCount = 0;
			if (oObject != null){
				for (var i = 0; i < oObject.length; i++){
					var obj = oObject[i];
					if( obj.name == sourceName )    {
						if( objCount == sourceIdx ) {
							formObj = obj;
							break;
						}
						objCount++;
					}
				}
			}
		}
		if( typeof formObj == 'undefined' || formObj == null ) {
			alertError("이름이 [" + formName + "]인 form객제가 존재하지 않습니다.");
			return;
		}

		var serviceCode = formObj.서비스코드.value;
		if( typeof serviceCode == 'undefined' || serviceCode == null || trim(serviceCode) == '' ) {
			alert("입출금 조회를 하시어 처리결과를 반드시 확인하신후에\n\n계속해서 서비스를 이용하시려면\n처음 부터 다시 거래하여 주시기 바랍니다.");
			if( errorURL != null &&  errorURL != "" ){
				document.location = errorURL;
			}
			else{
				document.location.reload();
			}
			return;
		}

		var doc = getDocument("<FORMMSG/>");
		if( !isAlphanumeric( formObj.이체비밀번호.value ) ) {
			alert( "'이체비밀번호'는 숫자와 영문자만 입력해야 합니다." );
			formObj.이체비밀번호.value="";
			formObj.이체비밀번호.focus();
			return;
		}
		if( formObj.이체비밀번호.value.length < 6 || formObj.이체비밀번호.value.length > 8 ){
			alert( "'이체비밀번호'는 6~8자리로 입력해야 합니다." );
			formObj.이체비밀번호.value="";
			formObj.이체비밀번호.focus();
			return;
		}

		if( serviceCode == 'C2098' ) { // 보안 카드
			if( formObj.보안카드암호11.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호11.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호11.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호11.value="";
				formObj.보안카드암호11.focus();
				return;
			}

			if( formObj.보안카드암호12.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호12.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호12.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호12.value="";
				formObj.보안카드암호12.focus();
				return;
			}

			if( formObj.보안카드암호21.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호21.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호21.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호21.value="";
				formObj.보안카드암호21.focus();
				return;
			}

			if( formObj.보안카드암호22.value == '' ) {
				alert( "'보안카드암호'를 입력해 주십시오." );
				formObj.보안카드암호22.focus();
				return;
			}
			if( !isDigit( formObj.보안카드암호22.value ) ) {
				alert( "'보안카드암호'는 숫자만 입력해야 합니다." );
				formObj.보안카드암호22.value="";
				formObj.보안카드암호22.focus();
				return;
			}
			try {
				formObj.보안카드암호11.value = get_e2e_value(XMLEncoder(formObj.보안카드암호11.value), "보안카드암호11" );
				formObj.보안카드암호12.value = get_e2e_value(XMLEncoder(formObj.보안카드암호12.value), "보안카드암호12" );
				formObj.보안카드암호21.value = get_e2e_value(XMLEncoder(formObj.보안카드암호21.value), "보안카드암호11" );
				formObj.보안카드암호22.value = get_e2e_value(XMLEncoder(formObj.보안카드암호22.value), "보안카드암호11" );
				formObj.이체비밀번호.value   = get_e2e_value(XMLEncoder( formObj.이체비밀번호.value),  "이체비밀번호"   );
			} catch (ee) {
				log(" 보안카드암호 필드 e2e처리 중 오류발생. 암호화 안함.");
				printStackTrace(ee);
				alert("키보드 암호화 과정중 오류가 발생되었습니다.\n 죄송하지만 로그아웃 후 다시 로그인 하여 사용하기 바랍니다.");
				return;
			}

			setString( doc, "보안카드암호1" , formObj.보안카드암호11.value + formObj.보안카드암호12.value );
			setString( doc, "보안카드암호2" , formObj.보안카드암호21.value + formObj.보안카드암호22.value );
			setString( doc, "이체비밀번호" , formObj.이체비밀번호.value );
			formObj.보안카드암호11.value = "";
			formObj.보안카드암호12.value = "";
			formObj.보안카드암호21.value = "";
			formObj.보안카드암호22.value = "";
			formObj.이체비밀번호.value = "";
		} else {    // OTP
			if( formObj.OTP카드암호.value.length != 6 ) {
				alert( "'OTP카드 비밀번호'는 숫자 6자리를 입력해 주십시오." );
				formObj.보안카드암호22.focus();
				return;
			}
			if( !isDigit( formObj.OTP카드암호.value ) ) {
				alert( "'OTP카드 비밀번호'는 숫자만 입력해야 합니다." );
				formObj.OTP카드암호.value="";
				formObj.OTP카드암호.focus();
				return;
			}
			try {
				formObj.OTP카드암호.value   = get_e2e_value(XMLEncoder( formObj.OTP카드암호.value),   "OTP카드암호"    );
				formObj.이체비밀번호.value  = get_e2e_value(XMLEncoder( formObj.이체비밀번호.value),  "이체비밀번호"   );
			} catch (ee) {
				log(" OTP카드 필드 e2e처리 중 오류발생. 암호화 안함.");
				alert("키보드 암호화 과정중 오류가 발생되었습니다.\n 죄송하지만 로그아웃 후 다시 로그인 하여 사용하기 바랍니다.");
				printStackTrace(ee);
			}
			setString( doc, "OTP카드암호" , formObj.OTP카드암호.value );
			setString( doc, "이체비밀번호" , formObj.이체비밀번호.value );
			formObj.OTP카드암호.value = "";
			formObj.이체비밀번호.value = "";
		}


		var responseMessage = "R_RIB" + serviceCode;
		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibCommonService.jsp?serviceCode="+serviceCode;

		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "callbackServiceCode", callbackServiceCode); //
		setAttribute( doc, "callbackFeatures", sFeatures);
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;

		try{
			var pcDoc = getSavedDoc("PCCONFIG");
			if( pcDoc != null ){
				copyXML( pcDoc, doc, "merge");
			}
		}
		catch(e){
			log("pc 환경 정보 저장중 오류발생");
		}

		var serviceFeatures = "callback:doMultiXML2Callback; sync:false; lock:false; cursorFix: true; useCert:true; useSign:false;";
		log( "[doMultiXML2] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
			// 로그아웃 후 첫페이지로.
			doLogoutWithoutCert();
		}
		try{
			var Obj = document.all["서비스코드"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("서비스코드 삭제중 오류 발생");
		}
		try{
			Obj = document.all["질의번호1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["질의번호2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("질의번호 삭제중 오류 발생");
		}
	} catch( e ) {
		alertError("doMultiXML2 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doMultiXML2Callback( result, argument ) {
	try {
		var resultDoc = getDocument( result );
		var argumentDoc = getDocument( argument );

		if (!checkJStarError(resultDoc)) {
			try{
				var Obj = document.all["서비스코드"];
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SVC_CODE");
				}
			}
			catch(e){
				log("서비스코드 삭제중 오류 발생");
			}
			try{
				Obj = document.all["질의번호1"] ;
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SEC_CHAL1");
					Obj = document.all["질의번호2"];
					Obj.value = getString(resultDoc, "COM_SEC_CHAL2");;
				}
			}
			catch(e){
				log("질의번호 삭제중 오류 발생");
			}

			return;
		}

		var svc_code  = getString(resultDoc, "COM_SVC_CODE");

		try{
			var Obj = document.all["서비스코드"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("서비스코드 삭제중 오류 발생");
		}
		try{
			Obj = document.all["질의번호1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["질의번호2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("질의번호 삭제중 오류 발생");
		}

		var sFeatures = getAttribute( argumentDoc, "callbackFeatures" );
		var serviceCode = getAttribute( argumentDoc, "callbackServiceCode" );

		try {
//          eval( "doXML( serviceCode, sFeatures );" );
//          eval( "callInitechXMLService( sFeatures, '/common/rib/jsp/callRibMultiService.jsp', doMultiXML2CallbackDoc);" );
			eval( "doVectorXML( serviceCode, sFeatures, doMultiXML2CallbackDoc);" );
		} catch( e ) {
			e.detail = "doMultiXML2(  serviceCode, sFeatures ); 에서 에러가 발생하였습니다. result:" + result ;
			printStackTrace( e );
		}
	} catch( e ) {
		alertError("doMultiXML2Callback 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}


/*
toDocument
		argument로 넘어온 form(Object)에 있는 text, password, textarea, file, hidden, checkbox, radio, select element를 xml Document로 변환한다.
		두번째 인자로 MSGID를 넘길 수 있다.
		사용방법) toDocument( this.form ) 또는 toDocument( this.form, msgID );
			form    form object
*/
function toDocument( form, msgID )  {
	var result = "";
	try {
		var rootID = "FORMMSG";
		if( typeof msgID != 'undefined' && msgID != null && msgID != '' ) {
			rootID = msgID;
		}

		result += "<" + rootID + ">";
		for ( var i=0 ; i < form.elements.length ; i++ ) {
			var e = form.elements[i];
			if ( e.name != null && e.name != "" )  {
				if( e.type == 'text' || e.type == 'textarea' || e.type == 'file' || e.type == 'hidden' ) {
					result += "<" + e.name + " value='" + XMLEncoder( e.value ) + "'/>\n";
				} else if( e.type == 'password' ) {
					var encValue = e.value ;
                    var encName  = e.name ;
                    try {
                        if( encName.indexOf("_E2E123_") >= 0 ){
                            encName = encName.substring(8);
                            encValue = get_e2e_value( encValue , encName );
                        }
                        else{
							log("INPUT name에 _E2E123_ 가 없음 e2e처리 Skip. ");
						}
                        log("PASSWORD필드["+e.name+"] e2e처리 완료.");
                    } catch (ee) {
                        log("PASSWORD필드["+e.name+"] e2e처리 중 오류발생. 암호화 안함.");
                        printStackTrace(ee);
                        encValue = XMLEncoder(e.value);
                    }
                    result += "<" + encName + " value='" + encValue + "'/>\n";

//                  result += "<" + e.name + " value='" + XMLEncoder( e.value ) + "'/>\n";
					e.value = "";
				} else if( e.type == 'checkbox' && e.checked ) {
					result += "<" + e.name + " value='" + XMLEncoder( e.value ) + "'/>\n";
				} else if( e.type == 'radio' && e.checked  ) {
					result += "<" + e.name + " value='" + XMLEncoder( e.value ) + "'/>\n";
				} else if( e.type == 'select-one' ) {
					result += "<" + e.name + " value='" + XMLEncoder( e.value ) + "'/>\n";
				} else if( e.type == 'select-multiple'  ) {
					for( var j = 0 ; j < e.options.length ; j++ ) {
						var opt = e.options[j];
						if( opt.selected ) {
							result += "<" + e.name + " value='" + XMLEncoder( opt.value ) + "'/>\n";
						}
					}
				}
			}
		}
		result += "</" + rootID + ">\n";
	} catch( e ) {
		printStackTrace( e );
	}
	return getDocument( result );
}

/*
  Function : setFromToDate
  param 1: 조회시작일 입력명
  param 2: 조회종료일 입력명
  param 3: 조회시작일과 조회종료일 차(offset)
  param 4: 단위 D-date, M-Month
*/
function setFromToDate(sDate, eDate, offset, gubun) {
	var currDate = getCurrentDate("yyyyMMdd");
	var sDateObj = document.all[sDate];
	var eDateObj = document.all[eDate];
	var toDate   = parseDate(currDate);

	eDateObj.value = getFormattedDate( toDate, "yyyy.MM.dd");

	if( gubun == 'M' ) {
		toDate.setMonth(toDate.getMonth() + (offset) );
	}
	else{
		toDate.setDate(toDate.getDate() + (offset) );
	}
	sDateObj.value = getFormattedDate( toDate, "yyyy.MM.dd");
	return;
}

// ◀◀   ◀ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | ▶   ▶▶
//            min             cur                  max       last
//  Interface 정의
//  objName    : pageList객체 이름
//  currPage   : 현재 페이지 번호
//  minPage    : 현재 화면에서 첫번째 페이지 번호
//  maxPage    : 현재 화면에서 마지막 페이지 번호
//  lastPage   : 마지막 페이지
function userDefinedDesign1( objectName, currPage, minPage, maxPage, lastPage ) {
	var returnStr ="<table border=\"0\" cellpadding=\"0\" align=\"left\" cellspacing=\"0\" class=\"t_ta_04\">"
					+"<tr>"
					+"  <td colspan=\"3\"><table class=\"ta_blank_03\" cellpadding=\"0\" cellspacing=\"0\"> "
					+"      <tr>"
					+"        <td></td> "
					+"      </tr> "
					+"    </table></td> "
					+"</tr> "
					+"<tr>"
					+"  <td width=\"120\"></td>"
					+"  <!-- 페이지 리스트 시작 --> "
					+"  <td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\"> "
					+"      <tr>";

			// 이전 페이지 표현
	if( minPage > 1 ) {
		returnStr +="<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (minPage-1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_back.gif\" alt=\"이전\" border=\"0\" /></a></td> "
	}
	//페이지 리스트 표현
	returnStr +="<td class=\"list_t_l\"></a></td> " ;
	for (var j = minPage; j <= maxPage; j++) {
		if(j == currPage){
			returnStr += "<td width=\"1\" class=\"list_t_01\"></td><td class=\"list_f_off\">" + j + "</font></td>"  ;

		} else{
			returnStr  += "<td width=\"1\" class=\"list_t_01\"></td>"
						+ "<td onmouseover=\"this.style.background='#efece5'\" onmouseout=\"this.style.background=''\" onclick=\"location.href=\"#\"\"><a href=\"javascript:" + objectName + ".goMove("+ j +");\" class=\"list_f_on\">" + j + "</a></td> ";
		}
	}
	returnStr +="<td width=\"1\" class=\"list_t_01\"></td><td class=\"list_t_r\"></td>";

	if ( maxPage < lastPage ){
		 returnStr  += "<td width=\"1\" class=\"list_t_01\"></td>"
					+"<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (maxPage+1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_next.gif\" alt=\"다음\" border=\"0\" /></a></td> "
	}

	returnStr += "</tr></table></td>"
			  +  "<td width=\"120\" class=\"m_td_rightbtn\"><a href='#'><img src=\"" + IMAGE_URL + "/ko/btn/btn_icon02.gif\" alt=\"엑셀파일 저장\" onclick=\"javascript:saveExcelList();\" /></a></td>"
			  +  "</tr><tr><td colspan=\"3\"><table class=\"ta_blank_03\" cellpadding=\"0\" cellspacing=\"0\"><tr><td></td></tr></table></td></tr></table>";

	return returnStr;
}

// ◀◀   ◀ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | ▶   ▶▶
//            min             cur                  max       last
//  Interface 정의
//  objName    : pageList객체 이름
//  currPage   : 현재 페이지 번호
//  minPage    : 현재 화면에서 첫번째 페이지 번호
//  maxPage    : 현재 화면에서 마지막 페이지 번호
//  lastPage   : 마지막 페이지
function userDefinedDesign2( objectName, currPage, minPage, maxPage, lastPage ) {
	var returnStr ="<table border=\"0\" cellpadding=\"0\" align=\"left\" cellspacing=\"0\" class=\"t_ta_04\">"
					+"<tr>"
					+"  <td colspan=\"3\"><table class=\"ta_blank_03\" cellpadding=\"0\" cellspacing=\"0\"> "
					+"      <tr>"
					+"        <td></td> "
					+"      </tr> "
					+"    </table></td> "
					+"</tr> "
					+"<tr>"
					+"  <td width=\"120\"></td>"
					+"  <!-- 페이지 리스트 시작 --> "
					+"  <td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\"> "
					+"      <tr>";

			// 이전 페이지 표현
	if( minPage > 1 ) {
		returnStr +="<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (minPage-1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_back.gif\" alt=\"이전\" border=\"0\" /></a></td> "
	}
	//페이지 리스트 표현
	returnStr +="<td class=\"list_t_l\"></a></td> " ;
	for (var j = minPage; j <= maxPage; j++) {
		if(j == currPage){
			returnStr += "<td width=\"1\" class=\"list_t_01\"></td><td class=\"list_f_off\">" + j + "</font></td>"  ;

		} else{
			returnStr  += "<td width=\"1\" class=\"list_t_01\"></td>"
						+ "<td onmouseover=\"this.style.background='#efece5'\" onmouseout=\"this.style.background=''\" onclick=\"location.href=\"#\"\"><a href=\"javascript:" + objectName + ".goMove("+ j +");\" class=\"list_f_on\">" + j + "</a></td> ";
		}
	}
	returnStr +="<td width=\"1\" class=\"list_t_01\"></td><td class=\"list_t_r\"></td>";

	if ( maxPage < lastPage ){
		 returnStr  += "<td width=\"1\" class=\"list_t_01\"></td>"
					+"<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (maxPage+1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_next.gif\" alt=\"다음\" border=\"0\" /></a></td> "
	}

	returnStr += "</tr></table></td>"
			  +  "<td width=\"120\" class=\"m_td_rightbtn\"></td>"
			  +  "</tr><tr><td colspan=\"3\"><table class=\"ta_blank_03\" cellpadding=\"0\" cellspacing=\"0\"><tr><td></td></tr></table></td></tr></table>";

	return returnStr;
}

// ◀◀   ◀ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | ▶   ▶▶
//            min             cur                  max       last
//  Interface 정의
//  objName    : pageList객체 이름
//  currPage   : 현재 페이지 번호
//  minPage    : 현재 화면에서 첫번째 페이지 번호
//  maxPage    : 현재 화면에서 마지막 페이지 번호
//  lastPage   : 마지막 페이지
//  classNm    : css 변경
//  linkNm     : 링크goMove이름 변경
function pagingView( objectName, currPage, minPage, maxPage, lastPage ,classNm ,linkNm) {
    if(classNm=="miniPager") {
        var returnStr ="<div class=\"miniPager\">";
    }else {
        var returnStr ="<div class=\"pager\">";
    }

    if(linkNm == "" || linkNm == null || linkNm == "undefined"){
        linkNm = "goMove";
    }
	// 이전 페이지 표현
	if( currPage > 1 ) {
	    
	    returnStr +="<a href=\"javascript:"+linkNm+"(1);\" title=\"처음으로\"><img src=\"" + IMAGE_USL + "/images/customer/pre1.gif\" alt=\"처음\" class=\"position1\" /></a>";
	    returnStr +="<a href=\"javascript:"+linkNm+"("+ (eval(currPage)-1)+");\"  title=\"이전으로\"><img src=\"" + IMAGE_USL + "/images/customer/pre2.gif\" alt=\"이전\" class=\"position1\" /></a>";
	   
	} else {
	    returnStr +="<img src=\"" + IMAGE_USL + "/images/customer/pre1.gif\" alt=\"처음으로\" class=\"position1\"  />";
	    returnStr +="&#xa0;";
	    returnStr +="<img src=\"" + IMAGE_USL + "/images/customer/pre2.gif\" alt=\"이전으로\" class=\"position1\"  />";
	    
	}
	
	returnStr +="&#xa0;&#xa0;&#xa0;";
	
	//페이지 리스트 표현
	for (var j = parseInt(minPage); j <= parseInt(maxPage); j++) {
		if(j == parseInt(currPage)) {
			//if(j == parseInt(maxPage)) {
			    returnStr += "<span class=\"thispage\" >" + j + "</span>"  ;
			   
			//} else {
			    //returnStr += "<span class=\"thispage\">" + j + "</span>"  ;
			//}

		} else if(j == parseInt(maxPage)) {
		    returnStr  += "<a href=\"javascript:"+linkNm+"("+ j +");\"><span>" + j + "</span></a>";
		} else {
			returnStr  += "<a href=\"javascript:"+linkNm+"("+ j +");\"><span>" + j + "</span></a>";
		}
		
		returnStr  += "&#xa0;"
	}
	
	returnStr +="&#xa0;&#xa0;&#xa0;&#xa0;";
	
	if ( parseInt(currPage) < parseInt(lastPage) ){
         returnStr  += "<a href=\"javascript:"+linkNm+"("+ (eval(currPage)+1) + ");\" title=\"다음으로\"><img src=\"" + IMAGE_USL + "/images/customer/next1.gif\" alt=\"다음으로\" class=\"position1\"  /></a>";
         returnStr  += "<a href=\"javascript:"+linkNm+"(" + lastPage + ");\" title=\"마지막으로\"><img src=\"" + IMAGE_USL + "/images/customer/next2.gif\" alt=\"마지막으로\" class=\"position1\"  /></a>";
	} else {
         returnStr  += "<img src=\"" + IMAGE_URL + "usr/images/customer/next1.gif\" alt=\"다음\" class=\"position1\" />";
         returnStr +="&#xa0;";
         returnStr  += "<img src=\"" + IMAGE_URL + "usr/images/customer/next2.gif\" alt=\"끝\" class=\"position1\" />";
	}

	returnStr += "</div>";
	return returnStr;
}

/*  숫자가 입력되었을때 한글로 금액을 리턴한다.
	fnc(num,1):alert
	fnc(num,2):같은화면
	fnc(num,3,id): id 의 value에 한글금액을 SET
*/
function ribMoneyToHan(num,mode,id)
{
	var len  ;
	var temp1 = "";
	var temp2 = "";
	var temp3 = "";
	var Obj   = document.all[id]

	if ( num == "" || num == "0" ) {
		if ( mode == "3" ) {
			Obj.value = "";
		}
		return;
	}

	num=new String(num);
	num=num.replace(/,/gi,"");

	len  = num.length;

	if ( len/4 > 3 && len/4 <= 4 ) {
		if ( len%4 == 0 ) {
			temp1 = ribCiphersHan(num.substring(0,4)) + "조" + ribCiphersHan(num.substring(4,8)) + "억" + ribCiphersHan(num.substring(8,12)) + "만" + ribCiphersHan(num.substring(12,16));
		}
		else {
			temp1 = ribCiphersHan(num.substring(0,len%4)) + "조" + ribCiphersHan(num.substring(len%4,len%4+4)) + "억" + ribCiphersHan(num.substring(len%4+4,len%4+8)) + "만" + ribCiphersHan(num.substring(len%4+8,len%4+12));
		}
	}
	else if ( len/4 > 2 && len/4 <= 3 ) {
		if ( len%4 == 0 ) {
			temp1 = ribCiphersHan(num.substring(0,4)) + "억" + ribCiphersHan(num.substring(4,8)) + "만" + ribCiphersHan(num.substring(8,12));
		}
		else {
			temp1 = ribCiphersHan(num.substring(0,len%4)) + "억" + ribCiphersHan(num.substring(len%4,len%4+4)) + "만" + ribCiphersHan(num.substring(len%4+4,len%4+8));
		}
	}
	else if ( len/4 > 1 && len/4 <= 2 ) {
		if ( len%4 == 0 ) {
			temp1 = ribCiphersHan(num.substring(0,4)) + "만" + ribCiphersHan(num.substring(4,len));
		}
		else {
			temp1 = ribCiphersHan(num.substring(0,len%4)) + "만" + ribCiphersHan(num.substring(len%4,len));
		}
	}
	else if ( len/4 <= 1 ) {
		temp1 = ribCiphersHan(num.substring(0,len));
	}

	for (var i=0; i<temp1.length; i++) {
		temp2 = temp2 + ribNumToHan(temp1.substring(i, i+1));
	}

	temp3=new String(temp2);
	temp3=temp3.replace(/억 만/gi,"억 ");
	temp3=temp3.replace(/조 억/gi,"조 ");

	if ( mode == 1 ) {
		alert(temp3 + " 원");
	} else if ( mode == 2 ) {
		return temp3;
	} else if ( mode == 3 ) {
		Obj.value = "( " + temp3 + " 원 )";
	}
}

// 금액 숫자를 한글로.. : NumToHan, ribCiphersHan, NUM_HAN
function ribNumToHan(num)
{
	if ( num == "1" )       return "일";
	else if ( num == "2" )  return "이";
	else if ( num == "3" )  return "삼";
	else if ( num == "4" )  return "사";
	else if ( num == "5" )  return "오";
	else if ( num == "6" )  return "육";
	else if ( num == "7" )  return "칠";
	else if ( num == "8" )  return "팔";
	else if ( num == "9" )  return "구";
	else if ( num == "십" ) return "십";
	else if ( num == "백" ) return "백";
	else if ( num == "천" ) return "천";
	else if ( num == "만" ) return "만 ";
	else if ( num == "억" ) return "억 ";
	else if ( num == "조" ) return "조 ";
	else if ( num == "0" )  return "";
}

function ribCiphersHan(num)
{
	var len  = num.length;
	var temp = "";

	if ( len == 1 ) {
		temp = num;
	}
	else if ( len == 2 ) {
		temp = num.substring(0,1) + "십" + num.substring(1,2);
	}
	else if ( len == 3 ) {
		temp = num.substring(0,1) + "백" + num.substring(1,2) + "십" + num.substring(2,3);
	}
	else if ( len == 4 ) {
		temp = num.substring(0,1) + "천" + num.substring(1,2) + "백" + num.substring(2,3) + "십" + num.substring(3,4);
	}

	num=new String(temp);
	num=num.replace(/0십/gi,"");
	num=num.replace(/0백/gi,"");
	num=num.replace(/0천/gi,"");
	return num;
}

// 에러전문 여부를 판단한다. 에러인 경우 에러 메시지를 표시한다.
function checkJStarError(xmlWarn, callback, showMessageType) {

	if ( typeof xmlWarn == "string" ) {
		log("input data is string. convert to dom.");
		xmlWarn = getDocument(xmlWarn);
	}

	if ( xmlWarn.documentElement.nodeName == 'JSTAR_ERROR'  )  {
		log( "JSTAR_ERROR" );
		if( typeof callback != 'undefined' && callback != '' && callback != null ) {
			setString( xmlWarn, "callback", callback );
		}
		if ( typeof showMessageType == 'undefined' || showMessageType == 1 ) {
			var warningURL = getConfiguration( "jstarErrorURL" );
			var warningMsgHeight = getConfiguration( "warningMsgHeight" );
			var warningMsgWidth = getConfiguration( "warningMsgWidth" );

			if( warningURL == "" ){
				warningURL = "/common/rib/message/jStarErrorMsg.jsp";
				warningMsgHeight = 390;
				warningMsgWidth = 580;
			}

			var sFeatures = "dialogHeight: " + warningMsgHeight + "pt; dialogWidth: " + warningMsgWidth + "pt; edge: Raised; center: Yes; help: No; edge: raised; resizable: Yes; status: No;";
			showIFrame( warningURL, serialize(xmlWarn), sFeatures, "___warninglayer" ) ;
		}
		return false;
	} else {
		log("OK");
		return true;
	}
}

function closeJstarErrorFrame( idx, callback, redirectURL ) {
	var name = _showIFrameName[idx];

	if ( typeof redirectURL != "undefined" && redirectURL != null && redirectURL != "") {
		location.href = redirectURL;
		return;
	} else {
		if( typeof document.all[name] != "undefined" && document.all[name] != null ) {
			document.all[name].innerHTML = '';
			document.all[name].style.zIndex = 1;
			document.all[name].visibility = "hidden";
			document.body.removeChild(document.all[name]);
		}

		if( callback != '' ) {
			try {
				log( "JStarErrorCallback : " + callback  );
				eval( callback + "();" );
			} catch( e ) {
				printStackTrace( e );
			}
		}
	}
}

function doSessionXML() {
	try {
		var userTarget = "", userDisplay = "", userXsl = "", formName = "ribform", userLanguage = "ko", useCert = "true", debug = "false", userCallback = "", keepTransactionSession = "false", processMsg = "", echoMode = "false", errorMsg = "", responseMessage = "", showJStarError = "true", useSign = "false", errorURL = "";
		var strSelected = "", strTextSelected = "", allOption = "", allOptionText = "", chooseOption = "", chooseOptionText = "", append = "", sorted = "", textSorted = "";
		var blankText = "";

		var sSessionStr = arguments[0];
		var sSessionListStr = arguments[1];
		var sFeatures = arguments[2];
		var serviceCode = arguments[3];

		if ( typeof serviceCode == "undefined" ) {
			alertError("인자가 부족합니다.");
			return;
		}
		if (sSessionStr == "" && sSessionListStr == "") {
			alertError("첫번째와 두번째 항목이 동시에 비어 있을 수 없습니다.");
			return;
		}
		if (sFeatures == "") {
			alertError("세번째 항목이 비어 있을 수 없습니다.");
			return;
		}
		if (serviceCode == "") {
			alertError("네번째 항목이 비어 있을 수 없습니다.");
			return;
		}

		var xmlStr = "<SESSION>";
		var arrayOfSession = trim(sSessionStr).split(";");
		var arrayOfSessionList = trim(sSessionListStr).split(";");

		log("1");
		for (var i=0; i < arrayOfSession.length; i++) {
			var value = trim(arrayOfSession[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("첫 번째 항목에 잘못된 문자가 포함되어 있습니다.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError("첫 번째 항목의 형식이 잘못되었습니다.");
					return;
				}
				xmlStr += "<"+key+" getSession='"+value+"'/>";
			}
		}
		log("2");
		for (var i=0; i < arrayOfSessionList.length; i++) {
			var value = trim(arrayOfSessionList[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("두 번째 항목에 잘못된 문자가 포함되어 있습니다.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError("두 번째 항목의 형식이 잘못되었습니다.");
					return;
				}
				xmlStr += "<"+key+" getSessionList='"+value+"'/>";
			}

		}

		xmlStr += "</SESSION>";

		log("doSession xmlStr["+xmlStr+"]");

		var doc = getDocument(xmlStr);


		var arrayOfFeatures = sFeatures.split(";");
		for (var i=0; i < arrayOfFeatures.length; i++) {
			var tmpArray = arrayOfFeatures[i].split(":");
			if ( tmpArray.length == 2 ) {
				if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
					userCallback = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
					formName = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
					userDisplay = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "target" ) {
					userTarget = trim( tmpArray[1] ).toLowerCase();
				} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
					userXsl = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
					userLanguage = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" )    {
					useCert = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
					debug = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "keeptransactionsession" ) {
					keepTransactionSession = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "processmsg" ) {
					processMsg = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "echo" )   {
					echoMode = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "error" )  {
					errorMsg = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "responsemessage" )    {
					responseMessage = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
					showJStarError = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
					errorURL = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "selected" )   {
					strSelected = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "textselected" )   {
					strTextSelected = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "alloption" )  {
					allOption = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "alloptiontext" )  {
					allOptionText = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoption" )   {
					chooseOption = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoptiontext" )   {
					chooseOptionText = trim( tmpArray[1] );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "append" ) {
					append = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "sorted" ) {
					sorted = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "textsorted" ) {
					textSorted = trim( tmpArray[1].toLowerCase() );
				} else if ( trim( tmpArray[0].toLowerCase() ) == "blanktext" )  {
					blankText = trim( tmpArray[1].toLowerCase() );
				}
			}
		}

		// responseMessage가 설정되지 않았으면 기본값을 사용한다.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		var requestMessage = "S_RIB" + serviceCode;

		if( processMsg == "" ) {
			processMsg = "처리중입니다.";
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 언어
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session유지 여부
		}
		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;

		var serviceFeatures = "callback:doSessionXMLCallback; sync:false; lock:false; cursorFix: true; ";
		log("3");
		if (userTarget == "") {
			if (userCallback == "") {
				alertError("target이 미지정인 경우 callback이 반드시 지정되어야 합니다.");
				return;
			}
		} else if (userTarget == "form") {
			serviceFeatures += " userTarget:form;";
			if (userDisplay == "") {
				alertError("target이 form인 경우 display가 반드시 지정되어야 합니다.");
				return;
			} else if (userXsl == "") {
				alertError("target이 지정된 경우 xsl이 반드시 지정되어야 합니다.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";

			// setXMLOption관련 옵션들
			if (strSelected != "") {
				serviceFeatures += " selected:"+strSelected+";";
			}
			if (strTextSelected != "") {
				serviceFeatures += " textselected:"+strTextSelected+";";
			}
			if (allOption != "") {
				serviceFeatures += " alloption:"+allOption+";";
			}
			if (allOptionText != "") {
				serviceFeatures += " alloptiontext:"+allOptionText+";";
			}
			if (chooseOption != "") {
				serviceFeatures += " chooseoption:"+chooseOption+";";
			}
			if (chooseOptionText != "") {
				serviceFeatures += " chooseoptiontext:"+chooseOptionText+";";
			}
			if (append != "") {
				serviceFeatures += " append:"+append+";";
			}
			if (sorted != "") {
				serviceFeatures += " sorted:"+sorted+";";
			}
			if (textSorted != "") {
				serviceFeatures += " textsorted:"+textSorted+";";
			}
			if (blankText != "") {
				serviceFeatures += " blankText:"+blankText+";";
			}

		} else if (userTarget == "layer") {
			serviceFeatures += " userTarget:layer;";
			if (userDisplay == "") {
				userDisplay = "riblayer";
			}
			if (userXsl == "") {
				alertError("target이 지정된 경우 xsl이 반드시 지정되어야 합니다.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";
		} else {
			alertError("target값이 잘못 되었습니다.");
			return;
		}

		if (userCallback != "") {
			serviceFeatures += " userCallback:"+userCallback+";";
		}

		if (debug == "") debug = "false";
		if (formName == "") formName = "ribform";
		if (useCert == "") useCert = "true";

		serviceFeatures += " debug:"+debug+"; form:"+formName+"; useCert:"+useCert+"; processMsg:" + processMsg +"; showjstarerror:" + showJStarError + "; useSign:"+useSign;

		var servletURL = "/common/rib/jsp/callRibSessionXMLService.jsp?serviceCode="+serviceCode;

		log( "[doSessionXML] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
			// 로그아웃 후 첫페이지로.
			doLogoutWithoutCert();
		}

	} catch( e ) {
		alertError("doSession 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}

}

function doSessionXMLCallback( result, argument, sFeatures ) {
	try {
		log("1");
		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", userTarget = "", userDisplay = "riblayer", userXsl = "", userForm="ribform", debug = "false", showJStarError = "true";
		var strSelected = "", strTextSelected = "", allOption = "", allOptionText = "", chooseOption = "", chooseOptionText = "", append = "", sorted = "", textSorted = "";
		var blankText = "";

		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usertarget" ) {
						userTarget = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userform" )   {
						userForm = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "selected" )   {
						strSelected = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "textselected" )   {
						strTextSelected = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "alloption" )  {
						allOption = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "alloptiontext" )  {
						allOptionText = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoption" )   {
						chooseOption = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "chooseoptiontext" )   {
						chooseOptionText = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "append" ) {
						append = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "sorted" ) {
						sorted = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "textsorted" ) {
						textSorted = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "blanktext" )  {
						blankText = trim( tmpArray[1].toLowerCase() );
					}
				}
			}
		}
		log("2");
		srcTree = getDocument( result );

		// jStar 에러 체크 여부 처리.
		if (showJStarError != "false") {
			if (!checkJStarError(srcTree)) {
				return;
			}
		}

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}

		log("3");
		if( !userTarget == "") {
			if( userDisplay == "" ) {
				alertError( "display의 값이 지정되지 않았습니다.");
			} else if( userXsl == "" ) {
				alertError( "xsl의 값이 지정되지 않았습니다.");
			} else {
				if( srcTree == null ) {
					srcTree = getDocument( result );
				}

				if( userTarget == "layer" ) {
					xsltTree= getXSLDocument( userXsl );
					htmlStr = srcTree.transformNode(xsltTree) + "<XSLINFO value='" + userXsl + "'/>";

					theDocument.all[userDisplay].innerHTML = htmlStr;
					window.scrollTo(0,0);
					if ( debug == "true" || debug == "y" )  {
						var re = />[\s]*</g;    //Initialize pattern.
						obj["html"] = htmlStr.replace( re ,">\n<");
						obj["xsl"] = indent( xsltTree );
					}
				} else if (userTarget == "form" ) {
					var sFeatures2 = "display:"+userDisplay+"; form:"+userForm+"; xsl:"+userXsl+"; debug:"+debug+";";

					if (strSelected != "") {
						sFeatures2 += " selected:"+strSelected+";";
					}
					if (strTextSelected != "") {
						sFeatures2 += " textselected:"+strTextSelected+";";
					}
					if (allOption != "") {
						sFeatures2 += " alloption:"+alloption+";";
					}
					if (allOptionText != "") {
						sFeatures2 += " alloptiontext:"+allOptionText+";";
					}
					if (chooseOption != "") {
						sFeatures2 += " chooseoption:"+chooseOption+";";
					}
					if (chooseOptionText != "") {
						sFeatures2 += " chooseoptiontext:"+chooseOptionText+";";
					}
					if (append != "") {
						sFeatures2 += " append:"+append+";";
					}
					if (sorted != "") {
						sFeatures2 += " sorted:"+sorted+";";
					}
					if (textSorted != "") {
						sFeatures2 += " textsorted:"+textSorted+";";
					}
					if (blankText != "") {
						sFeatures2 += " blankText:"+blankText+";";
					}
					log("33");
					setXMLOption( sFeatures2, result );
					log("34");
				}
			}
		}
		log("4");
		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}

		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}
		log("5");
	} catch( e ) {
		alertError("doSession 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

// 메시지의 에러 여부를 판단한다.
function checkError(result) {
	if ( result == "undefined" || result == null ) {
		return false;
	} else  if ( result.documentElement.nodeName == 'JSTAR_ERROR' || result.documentElement.nodeName == 'WARNING' )  {
		return false;
	} else if ( getString("COM_RESULT_CD") != "0" ) {
		return false;
	}
	return true;
}

// 인증센터 전문처리용. 인증서를 제출하지 않는다. 나머지는 doXML과 동일.
function doCert() {
	try {
		var userCallback = "", formName = "ribform", transform = "true", userDisplay = "riblayer", userXsl = "", userLanguage = "ko", keepTransactionSession = "false", useCert = "false", processMsg = "", debug = "false", echoMode = "false", errorMsg = "", responseMessage = "", showJStarError = "true", errorURL = "";
		var serviceCode = arguments[0];
		if( typeof serviceCode == "undefined" ) {
			alertError("Service Code는 필수 항목 입니다.");
			return;
		}
		userXsl = "xsl/RIB" + serviceCode + ".xsl";
		var sFeatures = arguments[1];
		var doc = arguments[2];

		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
						formName = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
						userLanguage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "keeptransactionsession" ) {
						keepTransactionSession = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" )    {
						useCert = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "processmsg" ) {
						processMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "echo" )   {
						echoMode = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "error" )  {
						errorMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "responsemessage" )    {
						responseMessage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
						errorURL = trim( tmpArray[1] );
					}
				}
			}
		}
		// responseMessage가 설정되지 않았으면 기본값을 사용한다.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		var requestMessage = "S_RIB" + serviceCode;


		if( typeof doc == 'undefined' ) {
			var formObj = null;
			if( formName.indexOf( "." ) > -1 ) {
				formObj = eval( formName );
			} else {
				var idx1 = formName.indexOf("[");
				var idx2 = formName.indexOf("(");
				var sourceName = formName;
				var sourceIdx = 0;
				if( idx1 > -1 ) {
					var idx3 = formName.indexOf("]");
					if( idx3 > -1 ) {
						sourceName = formName.substring(0, idx1);
						sourceIdx  = parseInt( formName.substring(idx1+1, idx3) );
					}
				} else if ( idx2 > -1 ) {
					var idx3 = formName.indexOf(")");
					if( idx3 > -1 ) {
						sourceName = formName.substring(0, idx2);
						sourceIdx  = parseInt( formName.substring(idx2+1, idx3) );
					}
				}

				var oObject = theDocument.forms;
				var objCount = 0;
				if (oObject != null){
					for (var i = 0; i < oObject.length; i++){
						var obj = oObject[i];
						if( obj.name == sourceName )    {
							if( objCount == sourceIdx ) {
								formObj = obj;
								break;
							}
							objCount++;
						}
					}
				}
			}
			if( typeof formObj == 'undefined' || formObj == null ) {
				doc = getDocument("<NOFORM/>");
			} else {
				if( !validateForm(formObj) ) {
					return;
				}
				doc = toDocument( formObj );
			}

		}

        log("  validateForm end ");
		//수정시작용
		var servletURL = "/common/rib/jsp/callRibCertService.jsp?serviceCode="+serviceCode;

		if( useCert == "true" ){
			if ( doc.documentElement.nodeName == 'CERTINFO_REQUEST'  )  {
				servletURL = "/common/rib/jsp/callRibCertServiceReq.jsp?serviceCode="+serviceCode;
			}
			else if ( doc.documentElement.nodeName == 'VID_VERIFY'  )  {
				servletURL = "/common/rib/jsp/callRibCertServiceVid.jsp?serviceCode="+serviceCode;
			}
		}
		else if( useCert == "init" ){ //인증서 정보를 clear 하고자 할 경우 사
			servletURL = "/common/rib/jsp/callRibCertServiceInitReq.jsp?serviceCode="+serviceCode;
			useCert = "true";
		}
		//수정종료

		if( processMsg == "" ) {
			processMsg = "처리중입니다.";
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 언어
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session유지 여부
		}

		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;

		var serviceFeatures = "callback:doCertCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; useCert:" + useCert + "; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl +"; showjstarerror:" + showJStarError;
		log( "[doCert] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
		}
	} catch( e ) {
		alertError("doCert 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doCertCallback( result, argument, sFeatures ) {
	try {
		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", transform = "true", userDisplay = "riblayer", userXsl = "", debug = "false", showJStarError = "true";
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					}
				}
			}
		}
		srcTree = getDocument( result );
		// jStar 에러 체크 여부 처리.
		if (showJStarError != "false") {
			if (!checkJStarError(srcTree)) {
				return;
			}
		}

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}
		if( transform == "true" ) {
			if( userDisplay == "" ) {
				alertError( "transform이 true이고 display의 값이 지정되지 않았습니다.");
			} else if( userXsl == "" ) {
				alertError( "transform이 true이고 xsl의 값이 지정되지 않았습니다.");
			} else {
				if( srcTree == null ) {
					srcTree = getDocument( result );
				}
				xsltTree= getXSLDocument( userXsl );
				htmlStr = srcTree.transformNode(xsltTree) + "<XSLINFO value='" + userXsl + "'/>";

				theDocument.all[userDisplay].innerHTML = htmlStr;
				window.scrollTo(0,0);

				if ( debug == "true" || debug == "y" )  {
					var re = />[\s]*</g;    //Initialize pattern.
					obj["html"] = htmlStr.replace( re ,">\n<");
					obj["xsl"] = indent( xsltTree );
				}
			}
		}

		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}

		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doCert 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

// Vector형태의 doc을 받아서 다중 전문 요청을 처리한다.
// 2007. 1. 11 delayTime
function doVectorXML() {
	try {
		var userCallback = "", formName = "ribform", transform = "true", userDisplay = "riblayer", userXsl = "", userLanguage = "ko", keepTransactionSession = "false", useCert = "true", processMsg = "", debug = "false", echoMode = "false", errorMsg = "", responseMessage = "", showJStarError = "true", useSign = "false", errorURL = "", delayTime = "";
		var serviceCode = arguments[0];
		if( typeof serviceCode == "undefined" ) {
			alertError("Service Code는 필수 항목 입니다.");
			return;
		}
		userXsl = "xsl/RIB" + serviceCode + ".xsl";
		var sFeatures = arguments[1];
		var doc = arguments[2];
		if( typeof doc == "undefined" ) {
			alertError("document가 입력되지 않았습니다.");
			return;
		}

		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "callback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "form" )   {
						formName = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "display" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "xsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "language" )   {
						userLanguage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "keeptransactionsession" ) {
						keepTransactionSession = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usecert" )    {
						useCert = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "processmsg" ) {
						processMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "echo" )   {
						echoMode = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "error" )  {
						errorMsg = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "responsemessage" )    {
						responseMessage = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "usesign" )    {
						useSign = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "errorurl" )   {
						errorURL = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "delaytime" )   {
						delayTime = trim( tmpArray[1] );
					}
				}
			}
		}
		// responseMessage가 설정되지 않았으면 기본값을 사용한다.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibMultiService.jsp?serviceCode="+serviceCode;

		if( processMsg == "" ) {
			processMsg = "처리중입니다.";
		}

		// Vector처리.
		var tempVec = toVector(doc);
		for (i=0 ; i<tempVec.size();i++) {
			var tempDoc = tempVec.remove(i);
			var tempServiceCode = getAttribute(tempDoc, "serviceCode");
			var tempRequestMessage = getAttribute(tempDoc, "requestMessage");
			var tempResponseMessage = getAttribute(tempDoc, "responseMessage");

			if (tempServiceCode == null || tempServiceCode == '') {
				setAttribute( tempDoc, "serviceCode", serviceCode); // 서비스 코드
			}
			if (tempRequestMessage == null || tempRequestMessage == '') {
				setAttribute( tempDoc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
			}
			if (tempResponseMessage == null || tempResponseMessage == '') {
				setAttribute( tempDoc, "responseMessage", responseMessage); // 요청 전문명 세팅;
			}
			if ( delayTime != "" ) {
				setAttribute( tempDoc, "DELAYTIME", delayTime );
			}
			tempVec.insertElementAt(tempDoc, i);
		}

		doc = tempVec.toDocument();

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 언어
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session유지 여부
		}
		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}


		setAttribute( doc, "serviceCode", serviceCode); // 서비스 코드
		setAttribute( doc, "requestMessage", requestMessage);   // 요청 전문명 세팅;
		setAttribute( doc, "responseMessage", responseMessage); // 요청 전문명 세팅;


		var serviceFeatures = "callback:doVectorXMLCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; useCert:" + useCert + "; useSign:" + useSign +"; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl +"; showjstarerror:" + showJStarError;
		log( "[doVectorXML] callInitechXMLServices 호출 전 Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLService호출 하기 전에 에러가 발생했습니다.");
			// 로그아웃 후 첫페이지로.
			// 2006.12.27일 제거
			// doLogoutWithoutCert();
		}
	} catch( e ) {
		alertError("doVectorXML 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function doVectorXMLCallback( result, argument, sFeatures ) {
	try {
		var srcTree = null, xsltTree = null, htmlStr = null, obj = null;
		var userCallback = "", transform = "true", userDisplay = "riblayer", userXsl = "", debug = "false", showJStarError = "true";
		if( typeof sFeatures != "undefined" ) {
			var arrayOfFeatures = sFeatures.split(";");
			for (var i=0; i < arrayOfFeatures.length; i++) {
				var tmpArray = arrayOfFeatures[i].split(":");
				if ( tmpArray.length == 2 ) {
					if ( trim( tmpArray[0].toLowerCase() ) == "usercallback" )  {
						userCallback = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "transform" )  {
						transform = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userdisplay" )    {
						userDisplay = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "userxsl" )    {
						userXsl = trim( tmpArray[1] );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "debug" )  {
						debug = trim( tmpArray[1].toLowerCase() );
					} else if ( trim( tmpArray[0].toLowerCase() ) == "showjstarerror" ) {
						showJStarError = trim( tmpArray[1] );
					}
				}
			}
		}

		srcTree = getDocument( result );

		// jStar 에러 체크 여부 처리.
//      if (showJStarError != "false") {
//          if (!checkJStarError(srcTree)) {
//              return;
//          }
//      }

		if ( debug == "true" || debug == "y" )  {
			obj = new Object();
			var re = />[\s]*</g;    //Initialize pattern.
			obj["input"] = argument.replace( re ,">\n<");
			obj["xml"] = indent( srcTree );
		}
		if( transform == "true" ) {
			if( userDisplay == "" ) {
				alertError( "transform이 true이고 display의 값이 지정되지 않았습니다.");
			} else if( userXsl == "" ) {
				alertError( "transform이 true이고 xsl의 값이 지정되지 않았습니다.");
			} else {
				if( srcTree == null ) {
					srcTree = getDocument( result );
				}
				xsltTree= getXSLDocument( userXsl );
				htmlStr = srcTree.transformNode(xsltTree) + "<XSLINFO value='" + userXsl + "'/>";

				theDocument.all[userDisplay].innerHTML = htmlStr;
				window.scrollTo(0,0);

				if ( debug == "true" || debug == "y" )  {
					var re = />[\s]*</g;    //Initialize pattern.
					obj["html"] = htmlStr.replace( re ,">\n<");
					obj["xsl"] = indent( xsltTree );
				}
			}
		}

		if ( debug == "true" || debug == "y" )  {
			showDebugMsg( obj, 'xml' );
		}

		if ( typeof userCallback != "undefined" && userCallback != "" ) {
			try {
				eval( userCallback + "( result, argument );" );
			} catch( e ) {
				e.detail = userCallback + "( result ) 에서 에러가 발생하였습니다. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doVectorXML 호출 중 에러가 발생했습니다.", e);
		printStackTrace( e );
		return;
	}
}

function __quicksortArray(a, lo, hi, b) {
	// i.e. at least 2 elements, then
	if( hi > lo ) {
		var left=lo, right=hi, median = a[lo];
		// a[lo..left-1] <= median and a[right+1..hi] >= median
		while(right >= left) {
			while (a[left] < median) left++;
			while (a[right] > median) right--;

			// a[left] >= median >= a[right]
			if(left > right) break;
			// SWAP
			var temp=a[left]; a[left]=a[right]; a[right]=temp; //swap
			var temp2=b[left]; b[left]=b[right]; b[right]=temp2; //swap
			left++; right--;
		}
		// a[lo..left-1] <= median and a[right+1..hi] >= median and left > right

		__quicksortArray(a, lo, right, b);// sort the small elements divide and conquer
		__quicksortArray(a, left, hi, b);
	}
}//quicksort

function qsortVector(vector, key, type) {

	var initSize = vector.size();
	var a = new Array();
	var b = new Array();
	for (i=0;i<initSize;i++) {
		var doc = vector.elementAt(i);
		var val;
		if (type == "number") {
			val = getInt(doc, key);
		} else {
			val = getString(doc, key);
		}
		a[i] = val;
		b[i] = doc.xml;
	}
	__quicksortArray(a, 0, initSize-1, b);
	var newVec = new Vector();
	for (i=0;i<b.length;i++) {
		newVec.addDocumentElement(getDocument(b[i]));
	}
	return newVec;
}

function findSelect(item, val){
	var i=0;
	for(i=0;i< item.length; i++){
log("item.options[" + i + "] value[" + val + "]");
		if(item.options[i].value == val){
			item.selectedIndex = i;
			break;
		}
	}
	return;
}

/*
toForm
	XML Message를 지정된 form에 입력한다. 지원되는 객체로는 text, password, textarea, file, hidden, checkbox, radio, select 이다.
	그중 checkbox와 radio, select는 지정된 값이 있는 경우 선택한다.
	사용방법) toForm( doc, this.form)
	doc     xml document
	form    form object
*/
function toForm( doc, form )    {
	try {
		var dom = null;
		if( typeof doc == 'string' ) {
			dom = getDocument( doc );
		} else if ( _isDocument( doc ) ) {
			dom = doc;
		} else if ( typeof doc == 'undefined' ) {
			return;
		}
		for ( var i=0 ; i < form.elements.length ; i++ ) {
			var e = form.elements[i];
			if ( e.name != null && e.name != "" )  {
				if( e.type == 'text' || e.type == 'password' || e.type == 'textarea' || e.type == 'file' || e.type == 'hidden' ) {
					if( e.className.indexOf( 'Number' ) == 0 ) {
						var sign = "", commaStr = "", cent = "";
						var numStr = getString( dom, e.name );
//                      var re = /[,]/g;    //Initialize pattern.
//                      numStr = numStr.replace( re ,"");
//                      if ( numStr.substring(0, 1) == "+" || numStr.substring(0, 1) == "-" ) {
//                          sign = numStr.substring(0,1);
//                          numStr = numStr.substring(1);
//                      }
//                      if ( numStr.indexOf(".") > -1 ) {
//                          cent = numStr.substring(numStr.indexOf("."));
//                          numStr = numStr.substring(0, numStr.indexOf("."));
//                      }
//                      for ( ii = numStr.length - 3 ; ii >= 1 ; ii = ii - 3 ) {
//                          commaStr = "," + numStr.substring(ii, ii + 3) + commaStr;
//                      }
//                      commaStr = numStr.substring(0 , i + 3) + commaStr;
//                      e.value = sign + commaStr + cent;
						e.value = numStr;
					} else if ( e.className.indexOf( 'Date' ) == 0 ) {
						var dateStr = getString( dom, e.name );
						if( dateStr.length == 8 ) {
							e.value = dateStr.substring( 0, 4 ) + "." + dateStr.substring( 4, 6) + "." + dateStr.substring( 6, 8);
						} else {
							e.value = dateStr;
						}
					} else if ( e.className.indexOf( 'Time' ) == 0 ) {
						var timeStr = getString( dom, e.name );
						if( timeStr.length == 4 ) {
							e.value = timeStr.substring( 0, 2 ) + ":" + timeStr.substring( 2, 4);
						} else {
							e.value = timeStr;
						}
					} else {
						e.value = getString( dom, e.name );
					}
				} else if( e.type == 'checkbox' ) {
					var nodeList = dom.getElementsByTagName( e.name );
					for( var j = 0 ; j < nodeList.length ; j++ ) {
						if( nodeList.item( j ).getAttribute("value") == e.value ) {
							e.checked = true;
							break;
						}
					}
				} else if( e.type == 'radio' && getString( dom, e.name ) == e.value ) {
					e.checked = true;
				} else if( e.type == 'select-one' ) {
					e.value = getString( dom, e.name );
				} else if( e.type == 'select-multiple'  ) {
					var nodeList = dom.getElementsByTagName( e.name );
					for( var j = 0 ; j < e.options.length ; j++ ) {
						var opt = e.options[j];
						for( var k = 0 ; k < nodeList.length ; k++ ) {
							if( nodeList.item( k ).getAttribute("value") == opt.value ) {
								opt.selected = true;
								break;
							}
						}
					}
				}
			}
		}
	} catch( e ) {
		printStackTrace( e );
	}
}

function goErrmsg(errCode){
	var reqDoc = getDocument("<EMPT/>");
	setString( reqDoc, "ERROR_CODE", errCode );
	setString( reqDoc, "CHAN_TYPE", "A0");
	setString( reqDoc, "LAN_G", "1");
	setTask  ( reqDoc, "sfg.rib.task.common.DBTask" );
	setAction( reqDoc, "getErrorMessage");
	var myFeature = "Width=450pt, Height=300, left=50, top=150, scrollbars=auto, resizable=yes, location=no, menubar=no, status=no, titlebar=yes, toolbar=no";
	showWindow("/rib/common/O_RIBERRMSG.jsp", reqDoc, myFeature);
}

// 지정날짜 전 후 영업일을 가져온다. 0이면 최종영업일 즉, 현재일이 영업일이면 현재일을, 아니면 바로 이전 영업일을 반환한다.
function getOPDate( days ) {
	var oXmlHttp = __createXMLHTTPObject();
	if( typeof pattern == 'undefined' || pattern == null ) {
		pattern = "";
	}
	oXmlHttp.xmlHttp.open("POST", location.protocol + "//" + location.host + "/common/rib/jsp/getOPDate.jsp?days=" + days + "&idx=" + (new Date()).getTime() + Math.random() * 10000 , false);
	oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
	oXmlHttp.xmlHttp.send();
	var dateTime =  getString( oXmlHttp.xmlHttp.responseXML, "date" );
	oXmlHttp.isClose = true;
	oXmlHttp.xmlHttp = null;
	return dateTime;
}

// 최종 영업일을 가져온다.
function getCurOPDate( days ) {
	return getOPDate(0);
}

// 입력일이 영업일인지 판단한다. 'yyyyMMdd'형식.
function isOPDate( day ) {
	var oXmlHttp = __createXMLHTTPObject();
	day = getDate( day );
	if( typeof pattern == 'undefined' || pattern == null ) {
		pattern = "";
	}
	oXmlHttp.xmlHttp.open("POST", location.protocol + "//" + location.host + "/common/rib/jsp/isOPDate.jsp?day=" + day + "&idx=" + (new Date()).getTime() + Math.random() * 10000 , false);
	oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
	oXmlHttp.xmlHttp.send();
	var isOp =  getString( oXmlHttp.xmlHttp.responseXML, "isOPDate" );
	oXmlHttp.isClose = true;
	oXmlHttp.xmlHttp = null;

	if( isOp == "true" ){
		return true;
	}
	else{
		return false;
	}
}

// 입력일을 기준으로 가장 가까운 영업일을 구한다. getPreOPDate('yyyyMMdd') 형식.
function getPreOPDate( sDate ) {

	while( ! isOPDate( sDate) ){
		sDate = dateAdd(sDate, -1 );
	}
	return sDate;
}

// 입력일을 기준으로 익 영업일을 구한다. getNextOPDate('yyyyMMdd') 형식.
function getNextOPDate( sDate , gub ) {
	while( ! isOPDate( sDate) ){
		sDate = dateAdd(sDate, 1 );
	}
	return sDate;
}

// 입력일을 기준으로 익 영업일을 구한다. getNextOPDate('yyyyMMdd') 형식.
function getNextMonthOPDate( sDate ) {
	var oDate = getDate( sDate );
	oDate.setMonth(oDate.getMonth() + 1 );

	while( ! isOPDate( getFormattedDate( toDate, "yyyyMMdd") ) ){
		sDate = dateAdd(sDate, 1 );
	}
	return sDate;
}

// 세션타임아웃방지를 위해 정해진 주기로 세션갱신 서블릿을 호출한다.
function refreshAccessTime() {
	var count = arguments[0];
	var timeout = ( 4 * 60 * 1000 ) - 5000;	// 4분에서 -5 초

	if (count == 0) return;
	if( arguments.length == 2 ){
		callServletXMLService("callback:refreshAccessTimeCallback;sync:false;cursor:false;", "/common/rib/jsp/callRibRefreshSession.jsp", getDocument("<request/>"));
		count = count-1;
	}
	window.setTimeout( "refreshAccessTime("+count+", 1)", timeout);
}

function refreshAccessTimeCallback(result) {
	if (getResult(result) == 1) {
		setLoginTimeOut();
		log("세션타임아웃 갱신 성공!");
	} else {
		log("세션타임아웃 갱신 실패!");
	}
}

function alertError(errMsg, e) {
	var msg = "처리 중 오류가 발생했습니다. 브라우저를 새로 고침 하신 뒤 다시 거래해 주시기 바랍니다.\n";
	msg += "오류가 지속되는 경우 다음 상세 메시지를 참고하시어 고객 상담 센터로 문의해 주시기 바랍니다.\n";
	msg += "\n";

	if (typeof e != "undefined") {
		errMsg += "\n" + getStackTrace(e);
	}

	msg += "상세 메시지 : " + errMsg;
	msg += "\n";
	msg += "URL            : " + location;
	alert(msg);
}

function getStackTrace( e ) {
	var str = "";
	for ( var idx in e ) {
		var tmp = idx + "              ";
		tmp = tmp.substring(0, 15);
		if (idx == "number" ) {
			str += tmp + ":" + ( e[idx] & 0xFFFF ) + "\n";	// Prints Error Code
		} else {
			str += tmp + ":" + e[idx] + "\n";
		}
	}
	return str;
}

function isShinhanPopup() {
	try {
		if( typeof window.opener == 'undefined' ) {
			return false;
		} else if( window.opener.closed ) {
			return false;
		} else {
			return true;
		}
	} catch( e ) {
		return false;
	}
}

function enableMouse(){
    document.oncontextmenu = null;  //오른쪽마우스클릭
    document.ondragstart = null;    //복사제어
    document.onselectstart = null;  //복사제어
}

function writeUserName(){
	var sName = "";
	try{
		sName = getFrameHashDoc("login_user_name");
		if( sName == null || sName.length == 0 ){
			sName = "고객";
		}
	}
	catch( e ) {
		sName = "고객";
	}
	document.write(sName);
}


var shttp_status_map = new ActiveXObject("Scripting.Dictionary");

//암호화 오류 정의
shttp_status_map.Add("800", "로그인 오류 입니다.\n등록되지 않은 인증서 입니다.\n확인 버튼을 클릭하시어 사용등록 후에 이용하기 바랍니다.\n|/mng/index.jsp");
shttp_status_map.Add("851", "암호화 오류 입니다.\n고객님께서 입력하신 비밀번호 확인중 오류가 발생하였습니다.\n현재 로그인한 브라우저를 종료하시고, 새로 브라우져를 실행하여 이용하여 주시기 바랍니다.\n");
shttp_status_map.Add("900", "암호화 오류 입니다.\n암호화 세션이 초기화 되었습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("901", "암호화 오류 입니다.\n암호화된 Master Secret 이 도착하지 않았습니다\n 네트워크 환경을 확인하세요\n");
shttp_status_map.Add("902", "암호화 오류 입니다.\n암호화된 Master Secret 을 복호화 하는 도중 오류가 발생했습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("903", "암호화 오류 입니다.\n보안 시퀀스가 존재하지 않아 페이지를 표시할 수 없습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("904", "암호화 오류 입니다.\n보안 시퀀스가 일치하지 않아 페이지를 표시할 수 없습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("905", "암호화 오류 입니다.\n서버에서 메시지 복호화 도중 오류가 발생했습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("906", "암호화 오류 입니다.\n요청하고자 하는 데이터의 길이가 한계치를 넘어섰습니다\n 파일 업로드를 시도 중이라면 용량이 작은 파일을 업로드 하세요\n");
shttp_status_map.Add("907", "암호화 오류 입니다.\n메시지 복호화를 위한 Cipher-Parity 헤더가 도착하지 않았습니다\n 네트워크 환경을 확인하세요\n");
shttp_status_map.Add("908", "암호화 오류 입니다.\n잘못된 파라메터 입력입니다\n 네트워크 환경을 확인하세요\n");
shttp_status_map.Add("909", "암호화 오류 입니다.\n서버에 등록되지 않은 호스트 주소 입니다\n 올바른 도메인을 사용하세요\n");
shttp_status_map.Add("910", "암호화 오류 입니다.\n보안 세션과 WAS 세션의 동기화 확인에 실패했습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("911", "암호화 오류 입니다.\n인증서 목록에 존재하지 않는 호스트 입니다\n 올바른 도메인을 사용하세요\n");

//공인인증 오류 정의
shttp_status_map.Add("921", "공인인증 오류 입니다.\n인증서 정책이 존재하지 않는 페이지 입니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("922", "공인인증 오류 입니다.\n인증서 제출이 필요한 페이지 입니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("923", "공인인증 오류 입니다.\n올바른 형식의 인증서가 아닙니다\n X\n509 표준 인증서만 사용 가능합니다\n");
shttp_status_map.Add("924", "공인인증 오류 입니다.\n개인키 소유여부 확인을 위한 서명 데이터가 들어오지 않았습니다\n 네트워크 환경을 확인하세요\n");
shttp_status_map.Add("925", "공인인증 오류 입니다.\n개인키 소유여부 확인(서명 검증)에 실패했습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("926", "공인인증 오류 입니다.\n인증서 본인 확인에 필요한 VID Random 값이 들어오지 않았습니다\n 네트워크 환경을 확인하세요\n");
shttp_status_map.Add("927", "공인인증 오류 입니다.\n인증서 본인 확인 기능을 제공하지 않는 인증서 입니다\n 인증서를 재발급 받아 사용하십시오\n");
shttp_status_map.Add("928", "공인인증 오류 입니다.\n인증서 본인 확인에 실패했습니다\n 본인 주민번호(또는 사업자번호)와 일치하는 인증서만 사용 가능합니다\n");
shttp_status_map.Add("929", "공인인증 오류 입니다.\n낮은 버전의 인증서는 허용하지 않습니다\n 인증서를 재발급 받아 사용하십시오\n");
shttp_status_map.Add("930", "공인인증 오류 입니다.\n인증서가 아직 유효하지 않습니다\n 잠시 후 이용하시기 바랍니다\n");
shttp_status_map.Add("931", "공인인증 오류 입니다.\n인증서가 만료되어 더 이상 사용할 수 없습니다\n 인증서를 재발급 받아 사용하십시오\n|/mng/index.jsp");
shttp_status_map.Add("932", "공인인증 오류 입니다.\n신뢰된 인증기관(CA) 에서 발급한 인증서가 아닙니다\n 관리자에게 문의하세요\n");
shttp_status_map.Add("933", "공인인증 오류 입니다.\n인증서 서명 검증에 실패했습니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("934", "공인인증 오류 입니다.\n인증서 경로 검증에 실패했습니다\n 인증서를 재발급 받아 사용하십시오\n");
shttp_status_map.Add("935", "공인인증 오류 입니다.\n인증서 상호 연동 정책(OID) 에 부합하지 않는 인증서입니다\n");
shttp_status_map.Add("936", "공인인증 오류 입니다.\n인증서 상호 연동 정책(OID) 검증에 실패했습니다\n");
shttp_status_map.Add("937", "공인인증 오류 입니다.\n본 페이지 사용에 적합한 용도(KeyUsage)의 인증서가 아닙니다\n");
shttp_status_map.Add("938", "공인인증 오류 입니다.\n인증서가 폐기되어 더 이상 사용할 수 없습니다\n 인증서를 재발급 받아 사용하십시오\n|/mng/index.jsp");
shttp_status_map.Add("939", "공인인증 오류 입니다.\n인증서가 효력정지 되어 현재는 사용할 수 없습니다\n 효력 회복 후 사용 가능합니다\n|/mng/index.jsp");
shttp_status_map.Add("940", "공인인증 오류 입니다.\n인증서 상태(폐기 여부) 확인에 실패했습니다\n 관리자에게 문의하세요\n");
shttp_status_map.Add("949", "공인인증 오류 입니다.\n인증서 검증 과정 중에 내부 서버 오류가 발생했습니다\n 관리자에게 문의하세요\n");

//전자서명 오류 정의
shttp_status_map.Add("951", "전자서명 오류 입니다.\n전자서명 데이터 제출이 필요한 페이지 입니다\n 현재 브라우저를 닫고, 새로 접속하시기 바랍니다\n");
shttp_status_map.Add("952", "전자서명 오류 입니다.\n클라이언트에서 보낸 전자서명 검증에 실패했습니다\n 확인 버튼을 클릭하시어 보안프로그램을 수동설치 하시고 이용하시기 바랍니다.\n|http://img.shinhan.com/shttp/install/down/INIS70.exe");
shttp_status_map.Add("953", "전자서명 오류 입니다.\n서버 측 전자서명에 실패했습니다\n 관리자에게 문의하세요\n");
shttp_status_map.Add("954", "전자서명 오류 입니다.\n전자서명 값을 저장하는 도중 오류가 발생했습니다\n 관리자에게 문의하세요\n");

//오류 메시지를 리턴함
function getSFilterMessage(status){
	var tmp = shttp_status_map.Item(status.toString());
	if(tmp==null || tmp=="")
		return null;

	var arr = tmp.split("|");
	var msg = "[" + arr[0] + "]\r\n\r\n" +  arr[1] + "\r\n오류 코드 : " + status

    var warningDoc = getDocument("<WARNING/>");
    setString( warningDoc, "errorCode", status );
    setString( warningDoc, "msg", arr[0] );
	if( arr.length > 1 ){
		var topUrl = "" + top.location ;
        if( topUrl.indexOf("/rib/easy") < 0 ){ //간편서비스가 아니면
	        setString( warningDoc, "redirectURL", arr[1] );
	   	}
    }

    var warningURL = "/common/message/certErrorMsg.jsp";
    var warningMsgHeight = 300;
    var warningMsgWidth = 580;


	var sFeatures = "dialogHeight: " + warningMsgHeight + "pt; dialogWidth: " + warningMsgWidth + "pt; edge: Raised; center: Yes; help: No; edge: raised; resizable: Yes; status: No;";
	showIFrame( warningURL, serialize(warningDoc), sFeatures, "___warninglayer" ) ;

	return ;
}

//전자어음 전자서명을 위한 함수
function getEBillSign( data ){
	var warningDoc = getDocument("<WARNING/>");
	var args = getDocument("<EBILLSIGN/>");

	//수정 start
	var _idx = "idx" + (new Date()).getTime() + Math.random() * 10000;
	__performanceData[_idx] = new __performanceEntity();
	__performanceData[_idx].name = "1111";
	__performanceData[_idx].startTime = (new Date()).getTime();

	var oXmlHttp = __createXMLHTTPObject();
	__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();
	oXmlHttp.xmlHttp.open("POST", "/common/rib/jsp/sign/callRibSignService.jsp", false);
	oXmlHttp.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
    oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args.xml) + "&__signData__=" + encodeURIComponent(data) );

	__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

	if(oXmlHttp.xmlHttp.Status==0){
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); //사용자에 의해 요청이 취소되었을 경우
		return warningDoc.xml;

	}
	else if(oXmlHttp.xmlHttp.Status>=800){
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status );
		return warningDoc.xml;
	}

	var retStr = oXmlHttp.xmlHttp.responseText;
	retStr = delNewLine( retStr );
	//수정 end
	log( retStr );
	if (retStr == "") {
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); //오류로 인하여 응답값이 없을경우
		return warningDoc.xml;
	}
	log("복호화 완료");
	__performanceData[_idx].afterDecrypt = (new Date()).getTime();
	log("11111");
	return retStr;
}


//간편서비스 이체 FLEX 전자서명을 위한 함수.
function FlexSignData( argString ){
	var warningDoc = getDocument("<WARNING/>");
	var args = getDocument("<FLEXSIGN/>");
	var t_array = String(argString).split("&");
	var signTitle = String(t_array[1]);
	var signData = String(t_array[2]);
	var signType = String(t_array[0]);

	//수정 start
	var _idx = "idx" + (new Date()).getTime() + Math.random() * 10000;
	__performanceData[_idx] = new __performanceEntity();
	__performanceData[_idx].name = "1111";
	__performanceData[_idx].startTime = (new Date()).getTime();

	var oXmlHttp = __createXMLHTTPObject();
	__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();
	oXmlHttp.xmlHttp.open("POST", "/common/rib/jsp/signView/callRibSignService.jsp", false);
	oXmlHttp.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	oXmlHttp.xmlHttp.setRequestHeader("Connection", "close");
    oXmlHttp.xmlHttp.send( "plainXML=" + encodeURIComponent(args.xml) + "&__signData__=" + encodeURIComponent(signData)   + "&__signTitle__=" + encodeURIComponent(signTitle));

	__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

	if(oXmlHttp.xmlHttp.Status==0){
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); //사용자에 의해 요청이 취소되었을 경우
		return null;
	}
	else if(oXmlHttp.xmlHttp.Status>=800){
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status );
		return null;
	}

	var retStr = oXmlHttp.xmlHttp.responseText;
	retStr = delNewLine( retStr );
	//수정 end
	log( retStr );
	if (retStr == "") {
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); //오류로 인하여 응답값이 없을경우
		return null;
	}
	log("복호화 완료");
	__performanceData[_idx].afterDecrypt = (new Date()).getTime();
	log("11111");
	var retDoc = getDocument(retStr);

	var runValue = replaceAll(getString( retDoc, "__IniSignData__"), "=", "*" ); //runValue.replaceAll("=","*");
	return runValue;
}

function delNewLine(str){
	var ch ;
	var i  ;
	for( i=0; i< str.length; i++){
		ch = str.charAt(i);
		log("delNewLine index["+ i + "] value["+ ch + "]");

		if( ch != '\n' && ch != '\r' && ch != ' ' ){
			break;
		}
	}
	return str.substring(i);
}

//웹로그 모듈 호출
function saveWebLog( result, statusObj, servletURI ){
	try{
	    var svc_code = getString(statusObj.argument);
	    var task	 = getTask(statusObj.argument);
	    var action   = getAction(statusObj.argument);
	    var req_url  = servletURI;

	    var resultDoc = getDocument( result );
	    var resultState = "OK";

		if( resultDoc.documentElement.nodeName == 'JSTAR_ERROR'  )  {
			resultState = "JERROR";
		}
		else if( resultDoc.documentElement.nodeName == 'WARNING'  )  {
			resultState = "WARNING";
		}

		if( req_url.indexOf("s-http") == 0 ){
			req_url = req_url.substring(2);
		}

		//처리결과 set
		if( req_url.indexOf("?") > 0 ){
			req_url = req_url + "&resultState=" + resultState;
		}
		else{
			req_url = req_url + "?resultState=" + resultState;
		}

		//서비스코드 set
		if( req_url.indexOf("serviceCode") < 0 && svc_code != "" ){
			req_url = req_url + "&serviceCode=" + svc_code;
		}

		//task, action set
		req_url = req_url + "&task=" + task + "&action=" + action ;

		//처리시간 SET
		req_url = req_url + "&beforeEJBCall="     + getAttribute( result, "beforeEJBCall" );
		req_url = req_url + "&afterEJBCall="      + getAttribute( result, "afterEJBCall"  );
		req_url = req_url + "&beforeServletCall=" + getAttribute( result, "beforeServletCall" );
		req_url = req_url + "&afterServletCall="  + getAttribute( result, "afterServletCall"  );
		log("n_logging request URL[" + req_url + "]");
		n_click_logging( req_url, document.location.href );
	}
	catch(ee){
		log("saveWebLog Exception");
		printStackTrace( ee );
	}
}

function showProcessMsg(isShow) {

    if(isShow) {
    	if( typeof ___processbar == "undefined" || ___processbar == null ) {
    		var processMsgHeight = getConfiguration( "processMsgHeight" );
    		var processMsgWidth  = getConfiguration( "processMsgWidth" );
    		var processMsgURL	 = getConfiguration( "processMsgURL" );

    		if( processMsgHeight == "" || processMsgWidth == "" ) {
    			processMsgHeight = "73";
    			processMsgWidth = "281";
    		}
    		if( processMsgURL == "" ){
    			//processMsgURL = __baseURI + "message/processMsg.html";
    			processMsgURL = "/common/message/processMsg.html";
    		}
    		var node = document.createElement( "div" );
    		node.id = "___processbar";
    		node.style.position = "absolute";
    		node.style.overflow = "hidden";
    		node.style.zIndex = 10000;
    		node.style.visibility = "visible";
    		node.style.height = processMsgHeight + "px";
    		node.style.width = processMsgWidth + "px";
    		node.style.setExpression("top",  "document.body.scrollTop+document.body.clientHeight/2-" + processMsgHeight + "/2" );
    		node.style.setExpression("left", "document.body.scrollLeft+document.body.clientWidth/2-" + processMsgWidth + "/2" );
    		document.body.appendChild( node );
    		node.innerHTML = "<iframe frameborder='0' scrolling='no' src='" + processMsgURL + "?param=" + URLEncoder(processMsg) + "' style='width:100%; height:100%'></iframe>";
    	} else {
    		if( ___processbar.innerHTML == "" ) {
    			var processMsgURL	 = getConfiguration( "processMsgURL" );
    			if( processMsgURL == "" ){
    				//processMsgURL = __baseURI + "message/processMsg.html";
    				processMsgURL = "/common/message/processMsg.html";
    			}

    			var nTop = document.body.scrollTop + document.body.clientHeight/2 - parseInt(___processbar.style.height)/2;
    			var nLeft = document.body.scrollLeft + document.body.clientWidth/2 - parseInt(___processbar.style.width)/2;
    			___processbar.style.top = nTop;
    			___processbar.style.left = nLeft;
    			___processbar.style.zIndex = 10000;
    			___processbar.innerHTML = "<iframe frameborder='0' scrolling='no' src='" + processMsgURL + "?param=show' style='width:100%; height:100%;'></iframe>";
    		}
    	}
    } else {
		if( typeof ___processbar != "undefined" && ___processbar != null ) {
			try {
				log("processbar 제거 시작");
				___processbar.style.zIndex = -1;
				log("processbar 제거 완료 1");
				___processbar.innerText = '';
				log("processbar 제거 완료 2");
			} catch( eee ) {
				log("processbar 제거 에러 출력 시작");
				printStackTrace( eee );
				log("processbar 제거 에러 출력 완료");
			}
		}
	}
}

function cutString(str, limitBytes)
{
    var byteLen = 0;
    for(i=0; i<str.length; i++)
    {
        if(str.charCodeAt(i) > 255)
            byteLen += 2;
        else
            byteLen ++;

    if(byteLen > limitBytes)
        return str.substring(0, i) + '...';
    }
    return str;
}

/* Tab Content
 * tab 메뉴 컨트롤
*/
function initTabMenu(tabContainerID,viewID) {
    if(viewID == "" || viewID == null || viewID == "undefined") {
        viewID = 0;
    }
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;
	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		thismenu.onclick = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return;
			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
					currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", "_off.gif");
				} else {
					currentmenu.className = currentmenu.className.replace("on", "");
				}
			}

			this.targetEl.style.display = "block";
			if (this.imgEl) {
				this.imgEl.src = this.imgEl.src.replace("_off.gif", "_on.gif");
			} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};

		if (!thismenu.container.first) {
    			thismenu.container.first = tabAnchor.item(viewID);
        }
	}
	if (tabContainer.first)
		tabContainer.first.onclick();
}

/* Tab Content2
 * tab 메뉴 컨트롤(메인페이지)
*/
function initTabMenu2(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;
	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		thismenu.onclick = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return;
			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
					currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", "_off.gif");
				} else {
					currentmenu.className = currentmenu.className.replace("on", "");
				}
			}

			this.targetEl.style.display = "block";
			if (this.imgEl) {
				this.imgEl.src = this.imgEl.src.replace("_off.gif", "_on.gif");
			} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};

		if (!thismenu.container.first) {
    			thismenu.container.first = thismenu;
        }
	}
	if (tabContainer.first)
		tabContainer.first.onclick();
}


/**
 * Grid 초기화.
 */
function initGridStyle(grid, style) {
	setAttribute(style, "defaultHeaderStyle","background-color:#EFE8DE;border-style:none;border-width:0px;border-color:#CCC4B9");
	setAttribute(style, "defaultDataStyle","background-color-even:#FAFAF7;color:#444444;border-style:solid;border-width:1px;border-color:#CCC4B9;font-family:돋움");
	setAttribute(style, "rowHeaderStyle","background-color:#EFE8DE;border-style:none;border-width:0px;border-color:#CCC4B9");

	grid.setGridStyleXML(serialize(style));

//	grid.rowCellBackgroundColorEven = "#FAFAF7";
//	grid.columnHeaderBackgroundColorDefault = "#EFE8DE";
//	grid.rowHeaderBackgroundColor = "#EFE8DE";
	grid.selectedHeaderBackgroundColor = "#DAC0A5";
	grid.focusedHeaderBackgroundColor = "#DAC0A5";
	grid.focusedHeaderTextColor = "#351000";
	grid.selectedHeaderTextColor = "#351000";
//	grid.cellTextColorDefault = "#72573E";
//	grid.headerBorderStyle = 0;
//	grid.cellBorderStyle = 0;
//	grid.headerBorderWidth = 0;
//	grid.headerBorderColor = "#CCC4B9";
//	grid.cellBorderColor = "#CCC4B9";
//	grid.rowHeaderPaddingLeft = 0;
//	grid.cellFontNameDefault = "굴림체";
	grid.rowHeaderWidth = 30;
}

/**
 * 달력 2개 팝업
 */
function ff_Cal(forname,preDate,postDate,event) {
    var iLeft = event.clientX+document.body.scrollLeft;
    var iTop = event.clientY+document.body.scrollTop;
    var oPreDate = eval(forname+"."+preDate+".value");
    var oPostDate = eval(forname+"."+postDate+".value");
    var target = "/common/jsp/Calendar.jsp?forname="+forname+"&preDate="+oPreDate+"&postDate="+oPostDate;
    var targetCal = window.open(target, "calendar", "width=381,height=230,top="+iTop+",left="+iLeft+",scrollbars=no");
    targetCal.focus();
}

/**
 * 달력 1개 팝업
 */
function ff_Cal2(forname,toDate,event) {
    var iWidth  = 255;
    var iHeight = 200;
    var iLeft = event.clientX+document.body.scrollLeft;
    var iTop = event.clientY+document.body.scrollTop;
    var oToDate = eval(forname+"."+toDate+".value");
    var target = "/common/jsp/Calendar2.jsp";

    var xmlDoc = getDocument("CAL2");

    setString(xmlDoc, "forname"     ,  forname);
    setString(xmlDoc, "toDate"      ,  oToDate);
    setString(xmlDoc, "name"        ,  toDate);

    var targetCal = showWindow(target , xmlDoc , "width="+iWidth+",height="+iHeight+",top="+iTop+",left="+iLeft+" ,scrollbars=no,resizable=no","calendar2");
    targetCal.focus();
}

/**
 * 프린트메이드 관련 JS 추가
 */
function Print_Page(targetFrame) {

    objectPrintmadeRun();   //프린트메이드 설치여부확인

    var targetFrame = targetFrame;
	if (typeof targetFrame != 'undefined' && targetFrame != null && targetFrame != '') {
		if (PrintMade == 'undefined') {
			window.print();
		}	else {
			PrintMade.Run("/lic:'"+PRINT_lIC+"' /eff /ps:1 /sp:0 /vc /ff:'"+PRINT_URL+"/yangsic.xml' /ws:0|0 /sc:0 /cnm /fid:"+targetFrame);
		}
	} else {
		if (PrintMade == 'undefined') {
			window.print();
		}	else {
			//PrintMade.Run("/lic:'"+PRINT_lIC+"' /eff /ps:1 /sp:0 /vc /ff:'"+PRINT_URL+"/yangsic.xml' /ws:0|0 /sc:0 /cnm /cr:0|0|0|0");
	        PrintMade.Run("/scr /eff /ps:1 /sp:0 /lic:'"+PRINT_lIC+"' /ff:'"+PRINT_URL+"/yangsic.xml' /ws:1040|600 /sc:0 /cr:190|27|0|30");
		}
	}
}

/**
 * 우편번호 팝업창
 */
function zipcode_search() {
    var iWidth  = 440;
    var iHeight = 410;
    var iLeft   = (screen.availWidth - iWidth) / 2;
    var iTop    = (screen.availHeight - iHeight) / 2;
    var target  = "/common/jsp/zipCodePopUp.jsp";
    var targetCal = window.open(target, "zipcode", "width="+iWidth+",height="+iHeight+",top="+iTop+",left="+iLeft+",scrollbars=no,resizable=yes");
    targetCal.focus();
}