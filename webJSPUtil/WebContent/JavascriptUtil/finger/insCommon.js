var g_timeid = null ;

log(" location[" +  location  + "]" );
/*
	2007. 6. 13 ڵα׾ƿ   
	PopUp â ƴϸ鼭 α Ǿִ 쿡 5Ŀ α׾ƿ ȭ б Ų.
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

// Timer ʱȭ Logic
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

//4  α׾ƿ Ǵ ǿ ȭ 
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

// 5   ڵ   ȭ б
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
		Servlet ؼ task  ִ function̴.
		Servlet  Ǵ  Servlet ص ǰ Ŀ͸¡  Servlet ص ȴ.
		) callInitechXMLService( feature, servlet, argument );
		servlet     Servlet URL
		argument񽺿 ޵Ǵ argument

		feature  Ӽ  .
			-Ӽ  ;(semicolon) ̿ϰ, Ӽ    :(colon) ̿Ѵ.
		-----------------------------------------------------------------------------------------
		Ӽ    ʼ                  
		-----------------------------------------------------------------------------------------
		display     N       -         Layer
		xsl         N       -        ȯ   xsl 
		sync        Y       -       ȣ Sync/Async  ( Default : Sync )
		friendly    N       -        ߿ ȸ  Ǵ ̸
		callback    N       -       񽺸  ó Ŀ ȣ function
		lock        N   true/false  page Tabstrip tag ϴ  ȣϴ  tab Ű (default: true)
		debug       N   true/false  񽺸 ȣ   
		cursorFix   N   false       񽺸 ȣϴ  콺 Ŀ 𷡽ð   θ 
									( ⺻  ϵ ϴ false)
		exceptionCallback N     -    ȣ  exception ߻ϸ ȣ callback Լ
		warningDisplayType N    popup/iframe    ߻ Popup    iframe   
		processMsg  N       -       񽺸 ȣϴ  ȳ  ȭ鿡 µ(Է  ȭ Ÿ )
		srv         Y       -       񽺸 ȣ   Friendly Name
									(ex)theDocument.body.useService("/services/math.asmx?WSDL","srv");
		------------------------------------------------------------------------------------------
		)display:layer; xsl:auth.xsl; callback:test1; debug:true;

		_block, _status, _statusEntity(),
		_callBackInitechXMLSync() _callBackInitechXMLAsync() callInitechXMLService  ȣǴ function̴.
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
			log("[ERROR]callInitechXMLService ȣϴ   ߻߽ϴ. \n ȣ sync:true / sync:false  ؾ մϴ.\n켱 sync:true ȣմϴ. ݵ ҽ  ּ.\n\n" + arguments[0]);
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

				// start
				var _signDoc;
				var _signData;
				var _signTitle;

				if( usesign == 'true' || usesign == 'view' ){
					_signDoc   = AppendSignData(args);
					_signData  = getString( _signDoc, "_signData");
					_signTitle = getString( _signDoc, "_signTitle");

					if( _signData == "" ){
						alertError("˼մϴ.\nڼ? ޵ ʾҽϴ.\nó ٽ ŷϿ ֽñ ٶϴ.");
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
					//ڼ   ߰
					var tDoc = getDocument( args );
					setAttribute(tDoc, "useSign", "true");
					args = tDoc.xml;
				}

				//  end
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

				log( "callInitechXMLService  task/action[" + __performanceData[_idx].name + "] servletURI[" + servletURI + "] sFeatures[" + sFeatures + "]");

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

				if( syncMode == "true" ) {  // sync ȸ
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

					// start
					var oXmlHttp = __createXMLHTTPObject();
					__performanceData[_idx].beforeAJAXCall = (new Date()).getTime();

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, false);
					}
					catch(e){
						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // ŷҼ ִ Ʈ ϵ ? ó.
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
						return false;                       //ڿ  û ҵǾ 
					}
					else if(oXmlHttp.xmlHttp.Status>=800){
						getSFilterMessage(oXmlHttp.xmlHttp.Status);  //SHTTP  ޽ 
						return false;
					}

					var retStr = oXmlHttp.xmlHttp.responseText;
					retStr = delNewLine( retStr );
					// end

					var retObj = getDocument( retStr );
					if (retStr == "") {
						log("ȣȭ ̰ų ȣȭ ȵ .");
						retObj = retStr ;
						// ȣȭ ȵ ä  ޽  WARNING ƴϸ Ѵ.
						if ( retObj == null || typeof retObj.documentElement == 'undefined' || retObj.documentElement == null || retObj.documentElement.nodeName != 'WARNING'  )  {
							log("޽ ƴϰų ȣȭ ȵ ޽ root尡 'WARINING' ƴϹǷ .");
							retObj = null;
						}
					}
					log("ȣȭ Ϸ");
					__performanceData[_idx].afterDecrypt = (new Date()).getTime();

					_block = false;
					_chkSession();
					if ( _callBackInitechXMLSync( retObj, statusObj, _idx, servletURI ) ) {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechXMLService callBackMethod Ϸ ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return retObj.xml;
					} else {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechXMLService callBackMethod Ϸ ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return null;
					}
				} else {        // async ȸ

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

					// start

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, true);
						log("oXmlHttp.xmlHttp.open start  ");
					}
					catch(e){
						log("oXmlHttp.xmlHttp.open exception ");

						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // ŷҼ ִ Ʈ ϵ ? ó.
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

	                // end

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
							log("processMessage  Ϸ");
						} else {
							log("processMessage   : ó ̹ ϷǾ processMessage ׷ ʿ䰡 ϴ.");
						}
					}

					if( xsl != "" ) {
						loadXSLDocument( xsl );
					}

					//  processMsg  û .
					if( typeof processMsg == "undefined" || processMsg == "" ) {
						log("ߺ û  !");
						_block = false;
					} else {
						log("ߺ û !");
					}
				}
				_block = false;
				return true;
			} else  {
				log("ߺ û !");
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
			xmlErrObj["msg"] = "ڰ մϴ.";
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
	// Login Timer set, ŷ 5е ŷ  ڵ α׾ƿ ó
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
						e.detail = statusObj.callBack + "( result )   ߻Ͽϴ. result:" + result.xml ;
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
						e.detail = statusObj.callBack + "( result )   ߻Ͽϴ. result:" + result.xml ;
						printStackTrace( e );
					}
				}
			}
			//ڱ ŷǴ Task࿡ α м Ͽ ߰
			//2008.8.14 Attack
			saveWebLog( result, statusObj, servletURI );

			delete statusObj;
			return true;
		}
		//ڱ ŷǴ Task࿡ α м Ͽ ߰
		//2008.8.14 Attack
		saveWebLog( result, statusObj, servletURI );

		delete statusObj;
	} catch ( e ) {
		printStackTrace( e );
	}
	return false;
}

function _callBackInitechXMLAsync( idx, statusObj, _idx, servletURI )   {
	// Login Timer set, ŷ 5е ŷ  ڵ α׾ƿ ó
	setLoginTimeOut();
	try {
		var oXmlHttp = _aXmlHttp[idx];
		if (oXmlHttp.xmlHttp.readyState == 4) {
			oXmlHttp.isResponse = true;
			__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

			// start
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
						log("processbar  ");
						___processbar.style.zIndex = -1;
						log("processbar  Ϸ 1");
						___processbar.innerText = '';
						log("processbar  Ϸ 2");
					} catch( eee ) {
						log("processbar    ");
						printStackTrace( eee );
						log("processbar    Ϸ");
					}
				}
			}

			log("ȣȭ ");
			var retStr = oXmlHttp.xmlHttp.responseText;
			retStr = delNewLine( retStr );
			var tDoc = getDocument("WARNING");

			log("oXmlHttp.xmlHttp.responseText[" + retStr + "]");
			// start
			if(oXmlHttp.xmlHttp.Status==0){
                try{
                   log("login cancel");
                   thisMovie("PrivateMain").resultFromJsCancel("cancel");
                } catch( e ) {
                       printStackTrace( e );
                }
				return false;                       //ڿ  û ҵǾ 
			}
			else if( oXmlHttp.xmlHttp.Status>=800 ){
				if ( statusObj.quiet != "true" || oXmlHttp.xmlHttp.Status>=900 ){
					getSFilterMessage(oXmlHttp.xmlHttp.Status);  //SHTTP  ޽ 
					return false;
				}
				else{
					setString( tDoc, "errorCode", "0031");
					retStr = serialize( tDoc );
				}
			}

			var result = getDocument( retStr );

			if (retStr == "") {
				log("ȣȭ ̰ų ȣȭ ȵ .");
				result = getDocument(oXmlHttp.xmlHttp.responseText);
				// ȣȭ ȵ ä  ޽  WARNING ƴϸ Ѵ.
				if ( result == null || typeof result.documentElement == 'undefined' || result.documentElement == null || result.documentElement.nodeName != 'WARNING'  )  {
					log("޽ ƴϰų ȣȭ ȵ ޽ root尡 'WARINING' ƴϹǷ .");
					result = null;
				}
			}
			// end

			log("ȣȭ Ϸ");
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
							e.detail = statusObj.callBack + "( result )   ߻Ͽϴ. result:" + result.xml ;
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
							e.detail = statusObj.callBack + "( result )   ߻Ͽϴ. result:" + result.xml ;
							printStackTrace( e );
						}
					}
				}
			}
			__performanceData[_idx].endTime = (new Date()).getTime();
			savePerformanceData( __performanceData[_idx] );
			_block = false;

			log( "callInitechXMLService callBackMethod Ϸ ");

			//ڱ ŷǴ Task࿡ α м Ͽ ߰
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
		Servlet ؼ task Ѽ select  setting ִ function̴.
		Servlet  Ǵ  Servlet ص ǰ Ŀ͸¡  Servlet ص ȴ.
		) callInitechOptionService( feature, taskFullName, argument );
		servlet     Servlet URL
		argument񽺿 ޵Ǵ argument

		feature  Ӽ  .
			-Ӽ  ;(semicolon) ̿ϰ, Ӽ    :(colon) ̿Ѵ.
		-----------------------------------------------------------------------------------------
		Ӽ    ʼ                  
		-----------------------------------------------------------------------------------------
		sync         N      -       Webservices Sync/Async  ( Default : Sync )
		friendly    N       -        ߿ ȸ  Ǵ ̸
		display      Y      -         select tag name
		form         N      -         select tag ִ form̸, Ӽ Է   tag̸θ ˻Ѵ.
		xsl          N      -        ȯ   xsl 
		selected     N      -        Option value
		chooseOption N  true/false  Option   '--' ߰
		allOption    N  true/false  Option   'ü' ߰
		append       N  true/false   ϴ Option  ʰ ڿ ߰
		sorted       N  true/false     
		callback     N      -       񽺸  ó Ŀ ȣ function
		debug        N  true/false  񽺸 ȣ   
		exceptionCallback N     -    ȣ  exception ߻ϸ ȣ callback Լ
		------------------------------------------------------------------------------------------
		)display:selectTag; xsl:auth.xsl; callback:test1; srv:myservice; debug:true;

		_block, _status, _statusEntity(),
		_callBackInitechOptionSync(), _callBackInitechOptionAsync() callInitechOptionService  ȣǴ function̴.
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
			log("[ERROR]callInitechOptionService ȣϴ   ߻߽ϴ. \n ȣ sync:true / sync:false  ؾ մϴ.\n켱 sync:true ȣմϴ. ݵ ҽ  ּ.\n\n" + arguments[0]);
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

				// start
				var _signDoc;
				var _signData;
				var _signTitle;

				if( usesign == 'true' || usesign == 'view' ){
					_signDoc   = AppendSignData(args);
					_signData  = getString( _signDoc, "_signData");
					_signTitle = getString( _signDoc, "_signTitle");

					if( _signData == "" ){
						alertError("˼մϴ.\nڼ? ޵ ʾҽϴ.\nó ٽ ŷϿ ֽñ ٶϴ.");
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
					//ڼ   ߰
					var tDoc = getDocument( args );
					setAttribute(tDoc, "useSign", "true");
					args = tDoc.xml;

				}
				// end

				if( servletURI.indexOf( location.protocol ) == -1 ) {   // not starts with http
					if( servletURI.charAt(0) == '/' ) {
						servletURI = location.protocol + "//" + location.host + servletURI;
					}
				}

				if( servletURI.indexOf("http") == 0 ){
					servletURI = "s-" + servletURI ;
				}

				log( "callInitechOptionService  task/action[" + __performanceData[_idx].name + "] servletURI[" + servletURI + "] sFeatures[" + sFeatures + "]" );

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

				if( syncMode == "true" ) {  // sync ȸ
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

					// start

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, false);
					}
					catch(e){
						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // ŷҼ ִ Ʈ ϵ ? ó.
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

					log("ȣȭ ");
					var retStr = oXmlHttp.xmlHttp.responseText;
					retStr = delNewLine( retStr );
					// end

					var retObj = getDocument( retStr );
					log("ȣȭ Ϸ");
					__performanceData[_idx].afterDecrypt = (new Date()).getTime();

					_block = false;
					_chkSession();
					if ( _callBackInitechOptionSync( retObj, statusObj, _idx ) ) {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechOptionService callBackMethod Ϸ ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return retObj.xml;
					} else {
						__performanceData[_idx].endTime = (new Date()).getTime();
						savePerformanceData( __performanceData[_idx] );
						log( "callInitechOptionService callBackMethod Ϸ ");
						oXmlHttp.isClose = true;
						oXmlHttp.xmlHttp = null;
						return null;
					}
				} else {        // async ȸ
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

					// start

					try{
						oXmlHttp.xmlHttp.open("POST", servletURI, true);
					}
					catch(e){
						if( servletURI.indexOf("s-http") >= 0 ){
							servletURI = servletURI.substring(2); // ŷҼ ִ Ʈ ϵ ? ó.
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

	                // end

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
			xmlErrObj["msg"] = "ڰ մϴ.";
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
	// Login Timer set, ŷ 5е ŷ  ڵ α׾ƿ ó
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
					e.detail = statusObj.callBack + "( result )   ߻Ͽϴ. result:" + result.xml ;
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
	// Login Timer set, ŷ 5е ŷ  ڵ α׾ƿ ó
	setLoginTimeOut();
	try {
		var oXmlHttp = _aXmlHttp[idx];
		if (oXmlHttp.xmlHttp.readyState == 4) {
			oXmlHttp.isResponse = true;
			__performanceData[_idx].afterAJAXCall = (new Date()).getTime();

			log("ȣȭ ");

			// start
			var retStr = oXmlHttp.xmlHttp.responseText;
			retStr = delNewLine( retStr );
			// end

			var result = getDocument( retStr );
			log("ȣȭ Ϸ");
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
						e.detail = statusObj.callBack + "( result )   ߻Ͽϴ. result:" + result.xml ;
						printStackTrace( e );
					}
				}
			}
			__performanceData[_idx].endTime = (new Date()).getTime();
			savePerformanceData( __performanceData[_idx] );
			delete statusObj;
			log( "callInitechOptionService callBackMethod Ϸ ");
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

// ڼ Լ
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
			alertError("Service Code ʼ ׸ Դϴ.");
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
		// responseMessage  ʾ ⺻ Ѵ.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		//  η  . ü  D2001 ߰(2008.11.28)
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
			processMsg = "óԴϴ.";
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session 
		}
		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;

		var serviceFeatures = "callback:doXMLCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; useCert:" + useCert + "; useSign:" + useSign + "; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl +"; showjstarerror:" + showJStarError;
		log( "[doXML] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
			// α׾ƿ  ù.
			//doLogoutWithoutCert();
		}
	} catch( e ) {
		alertError("doXML ȣ   ߻߽ϴ.", e);
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

		// jStar  üũ  ó.
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
				alertError( "transform truḛ display   ʾҽϴ.");
			} else if( userXsl == "" ) {
				alertError( "transform truḛ xsl   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doXML ȣ   ߻߽ϴ.", e);
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
			alertError("ڰ մϴ.");
			return;
		}
		if (sSessionStr == "" && sSessionListStr == "") {
			alertError("ù° ι° ׸ ÿ    ϴ.");
			return;
		}
		if (sFeatures == "") {
			alertError("° ׸    ϴ.");
			return;
		}

		var xmlStr = "<SESSION>";
		var arrayOfSession = trim(sSessionStr).split(";");
		var arrayOfSessionList = trim(sSessionListStr).split(";");

		for (var i=0; i < arrayOfSession.length; i++) {
			var value = trim(arrayOfSession[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("ù ° ׸ ߸ ڰ ԵǾ ֽϴ.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError("ù ° ׸  ߸Ǿϴ.");
					return;
				}
				xmlStr += "<"+key+" getSession='"+value+"'/>";
			}
		}

		for (var i=0; i < arrayOfSessionList.length; i++) {
			var value = trim(arrayOfSessionList[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError(" ° ׸ ߸ ڰ ԵǾ ֽϴ.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError(" ° ׸  ߸Ǿϴ.");
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
				alertError("target   callback ݵ Ǿ մϴ.");
				return;
			}
		} else if (userTarget == "form") {
			serviceFeatures += " userTarget:form;";
			if (userDisplay == "") {
				alertError("target form  display ݵ Ǿ մϴ.");
				return;
			} else if (userXsl == "") {
				alertError("target   xsl ݵ Ǿ մϴ.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";

			// setXMLOption ɼǵ
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
				alertError("target   xsl ݵ Ǿ մϴ.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";
		} else {
			alertError("target ߸ Ǿϴ.");
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

		setAttribute( doc, "language", userLanguage);   // 

		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		log( "[doSession] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
			// α׾ƿ  ù.
			doLogoutWithoutCert();
		}

	} catch( e ) {
		alertError("doSession ȣ   ߻߽ϴ.", e);
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

		// jStar  üũ  ó.
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
				alertError( "display   ʾҽϴ.");
			} else if( userXsl == "" ) {
				alertError( "xsl   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doSession ȣ   ߻߽ϴ.", e);
		printStackTrace( e );
		return;
	}
}


function doXSL(){
	var xslName = arguments[0];
	if( typeof xslName == "undefined" ) {
		alertError("xsl Name ʼ ׸ Դϴ.");
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

// α׾ƿ 
function doLogout()  {
	log("LOGOUT!");
	try{
		var sTemp = getSavedDoc( "login_user_name" );   // α  ʱȭ
		var topUrl = "" + top.location ;
		var xmlDoc = getDocument("<LOGOUT/>");			// XML 
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

// α׾ƿ  -   ȴ. ȣȭ  JSP.
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
		alert("α׾ƿǾϴ.");
		InitCache();	//   ʱȭ.
        if( topUrl.indexOf("nateon") > 0 ){
			location.href = "/mng/index.jsp";
        }
        else{
        	location.href = "/mng/index.jsp";
		}
	}
	else{ // ߻ص ϴ logOutó
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
			alertError("̸ [" + formName + "] form  ʽϴ.");
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
							alertError("Է°  μ '" + functionStr + "'  ϴµ  ߻߽ϴ.");
							log("Է°  μ '" + functionStr + "'  ϴµ  ߻߽ϴ.");
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
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( ( e.type=='text' || e.type=='password' || e.type=='textarea' || e.type=='file' ) && (e.value==null || e.value=='') )    {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			//displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.type=='select-one' && e.selectedIndex == 0 )   {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Ͻʽÿ.";
		} else {
			str += "" + displayName + "  Ͻʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}
//  Է Check
function VALIDATION_HANCHECK( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
		displayName = e.name;
	}

	if( e.value == "" ) return true;

	if( e.value.length != getByteHanLen(e.value) ) {
		str += "" + displayName + "  ѱ۾ Էϼž մϴ.";
		alert( str );
		e.focus();
		return false;
	}

	return true;
}

function getByteHanLen(str){
    return(str.length+(escape(str)+"%u").match(/%u/g).length-1);
}

//  Է Check
function VALIDATION_DIGIT( id, displayName, min, max ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
		displayName = e.name;
	}

	if( !isDigit( e.value ) ) {
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		} else {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Է ֽʽÿ.";
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
						str += "" + displayName + "  " + min + "ڸ Է ֽʽÿ.";
					} else {
						str += "" + displayName + "  " + min + "ڸ Է ֽʽÿ.";
					}
					alert( str );
					e.focus();
					return false;
				}
			}
			else{
				if( e.value.length < min || e.value.length > max ) {
					if( _isFinalConsonant( displayName ) ) {
						str += "" + displayName + "  " + min + " " + max +"ڸ Է ֽʽÿ.";
					} else {
						str += "" + displayName + "  " + min + " " + max +"ڸ Է ֽʽÿ.";
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
					str += "" + displayName + "  " + min + "ڸ ̻ Է ֽʽÿ.";
				} else {
					str += "" + displayName + "  " + min + "ڸ ̻ Է ֽʽÿ.";
				}
				alert( str );
				e.focus();
				return false;
			}
		}
	}
	return true;
}

// ݾ׸ ԵǾִ Check
function VALIDATION_MONEY( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( !isMoney( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		} else {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// ȯ ԵǾִ Check
function VALIDATION_FOREIGN_MONEY( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( !isForeignMoney( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		} else {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// Ա  Check
function VALIDATION_ACCOUNT_IN( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	e.value = e.value.replaceAll("-", "");
	if( !isAlphanumeric( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  ڿ ڸ Էؾ մϴ.";
		} else {
			str += "" + displayName + "  ڿ ڸ Էؾ մϴ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value.length < 6  || e.value.length > 14 ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Ȯϰ Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Ȯϰ Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

//   Check
function VALIDATION_ACCOUNT_OUT( id, displayName ) {
	var e = document.all[id];
	var str = "";
	if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(displayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( !isDigit( e.value ) ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		} else {
			str += "" + displayName + "  ڸ Էؾ մϴ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value.length != 11  && e.value.length != 12 ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Ȯϰ Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Ȯϰ Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	} else if( e.value == null || e.value == '' ) {
		if( typeof displayName == 'undefined' || displayName == null || displayName == '' ) {
			displayName = e.name;
		}
		if( _isFinalConsonant( displayName ) ) {
			str += "" + displayName + "  Է ֽʽÿ.";
		} else {
			str += "" + displayName + "  Է ֽʽÿ.";
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// ¥  Check
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
			str += "" + startDisplayName + "  yyyyMMdd̾ մϴ." + day1 ;
		} else {
			str += "" + startDisplayName + "  yyyyMMdd̾ մϴ." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	if( isNaN( day1 ) ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  ̾ մϴ." + day1 ;
		} else {
			str += "" + startDisplayName + "  ̾ մϴ." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	if( day2.length != 8 ) {
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + "  yyyyMMdd̾ մϴ." + day2 ;
		} else {
			str += "" + endDisplayName + "  yyyyMMdd̾ մϴ." + day2 ;
		}
		alert( str );
		endObj.focus();
		return false;
	}
	if( isNaN( day2 ) ) {
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + "  ̾ մϴ." + day2 ;
		} else {
			str += "" + endDisplayName + "  ̾ մϴ." + day2 ;
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
		alert( " 1901 2099 ̾ մϴ." + y1 );
		startObj.focus();
		return false;
	}
	if( m1 > 12 || m1 < 1 ) {
		alert( " 1 12 ̾ մϴ." + m1 );
		startObj.focus();
		return false;
	}

	// ¥ Ȯ
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
		alert( m1 + " ڴ 1 " + total_days + " ̾ մϴ.\nԷ° " + d1  + "");
		startObj.focus();
		return false;
	}

	if( y2 > 2100 || y2 < 1900 ) {
		alert( " 1901 2099 ̾ մϴ." + y2 );
		endObj.focus();
		return false;
	}
	if( m2 > 12 || m2 < 1 ) {
		alert( " 1 12 ̾ մϴ." + m2 );
		endObj.focus();
		return false;
	}

	// ¥ Ȯ

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
		alert( m2 + " ڴ 1 " + total_days + " ̾ մϴ.\nԷ° " + d2  + "");
		endObj.focus();
		return false;
	}
	if( d2 > 31 || d2 < 1 ) {
		alert( " 1 31 ̾ մϴ." + d2 );
		endObj.focus();
		return false;
	}

	var DyMilli = 24 * 60 * 60 * 1000;

	var t1 = Date.UTC( y1, m1 - 1 , d1 );
	var t2 = Date.UTC( y2, m2 - 1 , d2 );
	var diff = (t2 - t1) / DyMilli;

	if( isNaN( diff ) ) {
		str += " Է ֽʽÿ.";
		alert( str );
		startObj.focus();
		return false;
	} else if( diff >= max ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "' ";
		} else {
			str += "" + startDisplayName + "' ";
		}
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + "  '"+ max +"' ̳ Է ֽʽÿ.";
		} else {
			str += "" + endDisplayName + "  '"+ max +"' ̳ Է ֽʽÿ.";
		}
		alert( str );
		startObj.focus();
		return false;
	} else if( diff < 0 ) {
		str += "" + endDisplayName + "' '" + startDisplayName + "'   ϴ.";
		alert( str );
		startObj.focus();
		return false;
	} else if( startObj.value == null || startObj.value == '' ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  Է ֽʽÿ.";
		} else {
			str += "" + startDisplayName + "  Է ֽʽÿ.";
		}
		alert( str );
		startObj.focus();
		return false;
	} else if( endObj.value == null || endObj.value == '' ) {
		if( _isFinalConsonant( endDisplayName ) ) {
			str += "" + endDisplayName + "  Է ֽʽÿ.";
		} else {
			str += "" + endDisplayName + "  Է ֽʽÿ.";
		}
		alert( str );
		endObj.focus();
		return false;
	}
	return true;
}

// ¥  Check
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
			str += "" + startDisplayName + "  yyyyMMdd̾ մϴ." + day1 ;
		} else {
			str += "" + startDisplayName + "  yyyyMMdd̾ մϴ." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	if( isNaN( day1 ) ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  ̾ մϴ." + day1 ;
		} else {
			str += "" + startDisplayName + "  ̾ մϴ." + day1 ;
		}
		alert( str );
		startObj.focus();
		return false;
	}
	var y1 = parseInt( day1.substring( 0, 4 ), 10);
	var m1 = parseInt( day1.substring( 4, 6 ), 10);
	var d1 = parseInt( day1.substring( 6, 8 ), 10);

	if( y1 > 2100 || y1 < 1900 ) {
		alert( " 1901 2099 ̾ մϴ." + y1 );
		startObj.focus();
		return false;
	}
	if( m1 > 12 || m1 < 1 ) {
		alert( " 1 12 ̾ մϴ." + m1 );
		startObj.focus();
		return false;
	}

	// ¥ Ȯ
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
		alert( m1 + " ڴ 1 " + total_days + " ̾ մϴ.\nԷ° " + d1  + "");
		startObj.focus();
		return false;
	}

	if( startObj.value == null || startObj.value == '' ) {
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  Է ֽʽÿ.";
		} else {
			str += "" + startDisplayName + "  Է ֽʽÿ.";
		}
		alert( str );
		startObj.focus();
		return false;
	}
	return true;
}

// ȭȣ Check
function VALIDATION_TELEPHONE( id, startDisplayName ) {
	var e = document.all[id];
	var str = "";
    if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(startDisplayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		//startDisplayName = e.name;
	}

	if( ! isTelNumber( e.value ) ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  ڿ -  Է մϴ.";
		} else {
			str += "" + startDisplayName + "  ڿ -  Է մϴ." ;
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// ̸ Check
function VALIDATION_EMAIL( id, startDisplayName ) {
	var e = document.all[id];
	var str = "";
    if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(startDisplayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		//startDisplayName = e.name;
	}
	if( ! isAlphanumeric( trim(e.value) ) ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + " Ŀ  ʽϴ.";
		} else {
			str += "" + startDisplayName + " Ŀ  ʽϴ." ;
		}
		alert( str );
		e.focus();
		return false;
	}
	return true;
}

// ð Check
function VALIDATION_TIME( id, startDisplayName ) {
	var e = document.all[id];
	var str = "";
    if(trim(e.value) =="" || trim(e.value) ==null || trim(e.value) =='undefined'){
        alert(startDisplayName + " ׸  ԷҼ ϴ.");
        e.focus();
        return false;
    }
	if( typeof startDisplayName == 'undefined' || startDisplayName == null || startDisplayName == '' ) {
		startDisplayName = e.name;
	}

	if( ! isDigit( e.value ) ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  ڸ Է մϴ.";
		} else {
			str += "" + startDisplayName + "  ڸ Է մϴ." ;
		}
		alert( str );
		e.focus();
		return false;
	}
	if( e.value.length != 4 ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "  4ڸ Էϼž մϴ.";
		} else {
			str += "" + startDisplayName + "  4ڸ Էϼž մϴ.";
		}
		alert( str );
		e.focus();
		return false;
	}
	var hh = parseInt( e.value, 10 ) / 100;
	var mm = parseInt( e.value, 10 ) % 100;

	if( hh < 0 || hh > 23  || mm < 0 || mm > 59 ){
		if( _isFinalConsonant( startDisplayName ) ) {
			str += "" + startDisplayName + "   0000 2359 Է Ͻ  ֽϴ.";
		} else {
			str += "" + startDisplayName + "   0000 2359 Է Ͻ  ֽϴ.";
		}
		alert( str );
		e.focus();
		return false;
	}

	return true;
}
// ڰ ԵǾִ Check
function isDigit( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ch < "0" || ch > "9" ) {
			 return false;
		}
	}
	return true;
}

// , ǥ(,), ħǥ(.) ԵǾִ Check
function isForeignMoney( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "0" || ch > "9" ) && ch != ',' && ch != '.') {
			 return false;
		}
	}
	return true;
}

//   ǥ(,) ԵǾִ Check
function isMoney( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "0" || ch > "9" ) && ch != ',' ) {
			 return false;
		}
	}
	return true;
}

// ĺ ԵǾ ִ Check
function isAlphabet( str ){
	for(var i=0; i < str.length; i++) {
		var ch= str.charAt(i);
		if( ( ch < "a" || ch > "z" ) && ( ch < "A" || ch > "Z" ) ) {
			return false;
		}
	}
	return true;
}

// ĺ ڸ ԵǾ ִ Check
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

//  ȭȣ Check  , '-', '(', ')', ' '  ԵǾ ִ Check
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
			alertError("Service Code ʼ ׸ Դϴ.");
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
				alertError("̸ [" + formName + "] form  ʽϴ.");
				return;
			}

			if( !validateForm(formObj) ) {
				alert("validate");
				return;
			}


			doc = toDocument( formObj );
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 
		}

		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;

		var serviceFeatures = "callback:doSimpleCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl + "; showjstarerror:" + showJStarError;
		log( "[doSimple] callServletXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callServletXMLService( serviceFeatures, servletURL, doc )) {
			log("callServletXMLServiceȣ ϱ   ߻߽ϴ.");
		}
	} catch( e ) {
		alertError("doSimple ȣ   ߻߽ϴ.", e);
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

		// jStar  üũ  ó.
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
				alertError( "transform truḛ display   ʾҽϴ.");
			} else if( userXsl == "" ) {
				alertError( "transform truḛ xsl   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}
log("GG");
	} catch( e ) {
		alertError("doSimple ȣ   ߻߽ϴ.", e);
		printStackTrace( e );
		return;
	}
}

function goPage( pageUrl, key, doc ) {

	log("goPage URL[" + pageUrl + "]" );

	if( typeof pageUrl == 'undefined' ) {
		alertError("URL Է ֽñ ٶϴ.");
		log("URL Է ֽñ ٶϴ.");
		return;
	}

	if (typeof key == '') {
		alertError("key Դϴ.");
		log("key Դϴ.");
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
		log("Ͱ ϴ.");
	} else {
		result = getDocument(str);
	}

	return result;

}

function setSavedDoc(key, doc) {
	var str = serialize(doc);
	if (str == null) {
		alertError("Ͱ ùٸ ʽϴ.");
		return;
	}
	setFrameHashDoc(key, str);
}

function getFrameHashDoc(key) {
	var oFrame = window.frameElement;
	try {
		if( isShinhanPopup() ) {		//˾ â 
			log("Popup");
			if (typeof comframe == 'undefined') {
				if( __isPopupMethod( "getFrameHashDoc" ) ) {
					return opener.getFrameHashDoc(key);
				} else {
					alertError("opener.getFrameHashDoc ϴ. [" + opener.location + "][" + (typeof opener.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
					log("opener.getFrameHashDoc ϴ. [" + opener.location + "][" + (typeof opener.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
					return null;
				}
			} else if ( typeof comframe.getSavedDoc  == 'function' || typeof comframe.getSavedDoc  == 'object' ) {
				var str = comframe.getSavedDoc(key);
				if (str == null) {
					log("Key["+key+"] شϴ Document .");
				}
				return str;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.getSavedDoc ϴ. [" + comframe.location + "][" + typeof (comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.getSavedDoc ϴ. [" + comframe.location + "][" + (typeof comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				return null;
			}

		} else if( hasParentFrame() ) {
			log(" Frame  : " + window.parent.location);
			if( __isParentFrameMethod( "getFrameHashDoc" ) ) {
				return window.parent.getFrameHashDoc( key );
			} else {
				// do what?
				alertError("window.parent.getFrameHashDoc ϴ. [" + window.parent.location + "][" + (typeof window.parent.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				log("window.parent.getFrameHashDoc ϴ. [" + window.parent.location + "][" + (typeof window.parent.getFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				return null;
			}
		} else {
			log("  Frame");
			if (typeof comframe == 'undefined') {
				alertError(" ϴ.");
				log("comframe .");
				return null;
			} else if ( typeof comframe.getSavedDoc  == 'function' || typeof comframe.getSavedDoc  == 'object' ) {
				log("GF_"+key+"_2");
				var str = comframe.getSavedDoc(key);
				if (str == null) {
					log("Key["+key+"] شϴ Document .");
				}
				return str;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.getSavedDoc ϴ. [" + comframe.location + "][" + typeof (comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.getSavedDoc ϴ. [" + comframe.location + "][" + (typeof comframe.getSavedDoc) + "][" + (typeof isPopup) + "]" );
				return null;
			}
		}
	} catch( e ) {
		alertError("getFrameHashDoc Exception ߻߽ϴ.[" + (typeof isPopup) + "]", e);
		printStackTrace( e );
		return;
	}
}

function setFrameHashDoc(key, str) {
	var oFrame = window.frameElement;
	try {
		if( isShinhanPopup() ) {		//˾ â 
			log("Popup");
			if (typeof comframe == 'undefined') {
				if( __isPopupMethod( "setFrameHashDoc" ) ) {
					opener.setFrameHashDoc(key, str );
				} else {
					alertError("opener.setFrameHashDoc ϴ. [" + opener.location + "][" + (typeof opener.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
					log("opener.setFrameHashDoc ϴ. [" + opener.location + "][" + (typeof opener.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				}
			} else if ( typeof comframe.setSavedDoc  == 'function' || typeof comframe.setSavedDoc  == 'object' ) {
				log("SF_"+key+"_3");
				comframe.setSavedDoc(key, str);
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.setSavedDoc ϴ. [" + comframe.location + "][" + typeof (comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.setSavedDoc ϴ. [" + comframe.location + "][" + (typeof comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
			}

			return;
		} else if( hasParentFrame() ) {
			log(" Frame  ");
			if( __isParentFrameMethod( "setFrameHashDoc" ) ) {
				window.parent.setFrameHashDoc( key, str );
			} else {
				// do what?
				alertError("window.parent.setFrameHashDoc ϴ. [" + window.parent.location + "][" + (typeof window.parent.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
				log("window.parent.setFrameHashDoc ϴ. [" + window.parent.location + "][" + (typeof window.parent.setFrameHashDoc) + "][" + (typeof isPopup) + "]" );
			}
			return;
		} else {
			log("  Frame");
			if (typeof comframe == 'undefined') {
				alertError(" ϴ.");
				log("comframe .");
			} else if ( typeof comframe.setSavedDoc  == 'function' || typeof comframe.setSavedDoc  == 'object' ) {
				log("SF_"+key+"_3");
				comframe.setSavedDoc(key, str);
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.setSavedDoc ϴ. [" + comframe.location + "][" + typeof (comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
				log("comframe.setSavedDoc ϴ. [" + comframe.location + "][" + (typeof comframe.setSavedDoc) + "][" + (typeof isPopup) + "]" );
			}
			return;
		}
	} catch( e ) {
		alertError("setFrameHashDoc Exception ߻߽ϴ. [" + (typeof isPopup) + "]" , e);
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
			alertError("ڰ մϴ.");
			return;
		}
		if (sCodeKeyStr == "") {
			alertError("ù ° ׸    ϴ.");
			return;
		}
		if (sFeatures == "") {
			alertError(" ° ׸    ϴ.");
			return;
		}

		var doc = getDocument("<CODE/>");
		var arrayOfCodeKey = trim(sCodeKeyStr).split(";");

		for (var i=0; i < arrayOfCodeKey.length; i++) {
			var value = trim(arrayOfCodeKey[i]);
			if (value != "") {
				if (value != XMLEncoder(value)) {
					alertError("ù ° ׸ ߸ ڰ ԵǾ ֽϴ.");
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
				alertError("transform false  callback ݵ Ǿ մϴ.");
				return;
			}
			serviceFeatures += "userTransform:false; userCallback:"+userCallback+";";
		} else if (userTransform == "true") {
			if (arrayOfCodeKey.length > 1) {
				alertError("ΰ̻ ڵ带 ޾ƿ  ȭ鿡 ׸  ϴ.");
				retrun;
			}
			serviceFeatures += " userTransform:true;";
			if (userDisplay == "") {
				alertError("transform true  display ݵ Ǿ մϴ.");
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
			alertError("target ߸ Ǿϴ.");
			return;
		}

		if (debug == "") debug = "false";
		if (userLanguage == "") userLanguage = "ko";
		if (listType == "") listType = "hashtable";
		if (formName == "") formName = "ribform";
		if (useCert == "") useCert = "true";

		serviceFeatures += " debug:"+debug+"; form:"+formName+"; useCert:"+useCert+";";

		var servletURL = "/common/rib/jsp/callRibCodeService.jsp";

		setAttribute( doc, "language", userLanguage);   // 
		setAttribute( doc, "type", listType);           // ȯ Ÿ.

		log( "[doCode] callServletXMLService ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callServletXMLServiceȣ ϱ   ߻߽ϴ.");
		}

	} catch( e ) {
		alertError("doCode ȣ   ߻߽ϴ.", e);
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
			//   
//          result = arrangeCode(result);

			if( userDisplay == "" ) {
				alertError( "display   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}

	} catch( e ) {
		alertError("doCode ȣ   ߻߽ϴ.", e);
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
		if ( value.indexOf("") != -1) {
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
		log("ø XML Null.");
		templateDoc = makeTemplateDoc(dataDoc);
		if (templateDoc == null) {
			log("ø Null");
			return false;
		}
	}
	if (dataDoc == null) {
		log(" XML Null.");
		return false;
	}
	if (typeof fileName == 'undefined') {
		fileName = 'default';
	}
	var templateStr = serialize(templateDoc);
	var dataStr = serialize(dataDoc);
	if (templateStr == null) {
		log("ø XML serialize ");
		return false;
	}
	if (dataStr == null) {
		log(" XML serialize ");
		return false;
	}

	return DataToExcel(templateStr, dataStr, fileName);

}

function DataToExcel(gridStyle, gridData, fileName) {
	var oFrame = window.frameElement;
	try {
		if( isShinhanPopup() ) {		//˾ â 
			log("Popup");
			if (typeof comframe == 'undefined') {
				if( __isPopupMethod( "DataToExcel" ) ) {
					return opener.DataToExcel(gridStyle, gridData, fileName);
				} else {
					alertError("opener.DataToExcel ϴ. [" + opener.location + "][" + (typeof opener.DataToExcel) + "][" + (typeof isPopup) + "]" );
					log("opener.DataToExcel ϴ. [" + opener.location + "][" + (typeof opener.DataToExcel) + "][" + (typeof isPopup) + "]" );
					return false;
				}
			} else if ( typeof comframe.DataToExcel  == 'function' || typeof comframe.DataToExcel  == 'object' ) {
				var result = comframe.DataToExcel(gridStyle, gridData, fileName);
				if (result == false) {
					log("");
				}
				return result;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.DataToExcel ϴ. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				log("comframe.DataToExcel ϴ. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				return false;
			}
		} else if( hasParentFrame() ) {
			log(" Frame  ");
			if( __isParentFrameMethod( "DataToExcel" ) ) {
				return window.parent.DataToExcel(gridStyle, gridData, fileName);
			} else {
				// do what?
				alertError("window.parent.DataToExcel ϴ. [" + window.parent.location + "][" + (typeof window.parent.DataToExcel) + "][" + (typeof isPopup) + "]" );
				log("window.parent.DataToExcel ϴ. [" + window.parent.location + "][" + (typeof window.parent.DataToExcel) + "][" + (typeof isPopup) + "]" );
				return false;
			}

		} else {
			log("  Frame");
			if (typeof comframe == 'undefined') {
				alertError(" ϴ.");
				log("comframe .");
				return false;
			} else if ( typeof comframe.DataToExcel  == 'function' || typeof comframe.DataToExcel  == 'object' ) {
				var result = comframe.DataToExcel(gridStyle, gridData, fileName);
				if (result == false) {
					log("");
				}
				return result;
			} else {
				// comframe.location.replace( comframe.location );
				alertError("comframe.DataToExcel ϴ. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				log("comframe.DataToExcel ϴ. [" + comframe.location + "][" + (typeof comframe.DataToExcel) + "][" + (typeof isPopup) + "]" );
				return false;
			}
		}
	} catch( e ) {
		alertError("DataToExcel Exception ߻߽ϴ.[" + (typeof isPopup) + "]", e);
		printStackTrace( e );
		return false;
	}
}

function makeTemplateDoc(xmlDoc) {
	try {
		var iCnt = 0;
		if (xmlDoc.documentElement.nodeName != 'vector') {
			log("Vector ƴ");
			return null;
		}
		var vec = toVector(xmlDoc);
		if (vec.size() == 0) {
			log("Ͱ ");
			return null;
		}
		var eleDoc = vec.elementAt(0);
		// gridStyle String.
		var docId = eleDoc.documentElement.nodeName;
		var gridStr = "<gridStyle id='"+docId+"' charaterSet='euc-kr'>";
		var childElements = eleDoc.documentElement.childNodes;
		for (var i=0; i<childElements.length; i++) {
			var eleNode = childElements.item(i);
			if (eleNode.nodeType == 1) {
				var name = eleNode.nodeName;
				// excel 忩  üũ
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
			alertError("Service Code ʼ ׸ Դϴ.");
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
			alertError("̸ [" + formName + "] form  ʽϴ.");
			return;
		}

		var serviceCode = formObj.ڵ.value;
		if( typeof serviceCode == 'undefined' || serviceCode == null || trim(serviceCode) == '' ) {
			alert(" ȸ Ͻþ ó ݵ ȮϽĿ\n\nؼ 񽺸 ̿Ͻ÷\nó  ٽ ŷϿ ֽñ ٶϴ.");
			if( errorURL != null &&  errorURL != "" ){
				document.location = errorURL;
			}
			else{
				document.location.reload();
			}
			return;
		}

		var doc = getDocument("<FORMMSG/>");
		if( !isAlphanumeric( formObj.üйȣ.value ) ) {
			alert( "'üйȣ' ڿ ڸ Էؾ մϴ." );
			formObj.üйȣ.value="";
			formObj.üйȣ.focus();
			return;
		}
		if( formObj.üйȣ.value.length < 6 || formObj.üйȣ.value.length > 8 ){
			alert( "'üйȣ' 6~8ڸ Էؾ մϴ." );
			formObj.üйȣ.value="";
			formObj.üйȣ.focus();
			return;
		}

		if( serviceCode == 'C2098' ) { //  ī
			if( formObj.īȣ11.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ11.focus();
				return;
			}
			if( !isDigit( formObj.īȣ11.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ11.value="";
				formObj.īȣ11.focus();
				return;
			}

			if( formObj.īȣ12.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ12.focus();
				return;
			}
			if( !isDigit( formObj.īȣ12.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ12.value="";
				formObj.īȣ12.focus();
				return;
			}

			if( formObj.īȣ21.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ21.focus();
				return;
			}
			if( !isDigit( formObj.īȣ21.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ21.value="";
				formObj.īȣ21.focus();
				return;
			}

			if( formObj.īȣ22.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ22.focus();
				return;
			}
			if( !isDigit( formObj.īȣ22.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ22.value="";
				formObj.īȣ22.focus();
				return;
			}
			try {
				formObj.īȣ11.value = get_e2e_value(formObj.īȣ11.value, "īȣ11" );
				formObj.īȣ12.value = get_e2e_value(formObj.īȣ12.value, "īȣ12" );
				formObj.īȣ21.value = get_e2e_value(formObj.īȣ21.value, "īȣ21" );
				formObj.īȣ22.value = get_e2e_value(formObj.īȣ22.value, "īȣ22" );
				formObj.üйȣ.value   = get_e2e_value(formObj.üйȣ.value,  "üйȣ"   );
			} catch (ee) {
				log(" īȣ ʵ e2eó  ߻. ȣȭ .");
				printStackTrace(ee);
				alert("Ű ȣȭ   ߻Ǿϴ.\n ˼ α׾ƿ  ٽ α Ͽ ϱ ٶϴ.");
				return;
			}

			setString( doc, "īȣ1" , formObj.īȣ11.value + formObj.īȣ12.value );
			setString( doc, "īȣ2" , formObj.īȣ21.value + formObj.īȣ22.value );
			setString( doc, "üйȣ" , formObj.üйȣ.value );
			formObj.īȣ11.value = "";
			formObj.īȣ12.value = "";
			formObj.īȣ21.value = "";
			formObj.īȣ22.value = "";
			formObj.üйȣ.value = "";
		} else {    // OTP
			if( formObj.OTPīȣ.value.length != 6 ) {
				alert( "'OTPī йȣ'  6ڸ Է ֽʽÿ." );
				formObj.OTPīȣ.focus();
				return;
			}
			if( !isDigit( formObj.OTPīȣ.value ) ) {
				alert( "'OTPī йȣ' ڸ Էؾ մϴ." );
				formObj.OTPīȣ.value="";
				formObj.OTPīȣ.focus();
				return;
			}
			try {
				formObj.OTPīȣ.value   = get_e2e_value(formObj.OTPīȣ.value,   "OTPīȣ"    );
				formObj.üйȣ.value  = get_e2e_value(formObj.üйȣ.value,  "üйȣ"   );
			} catch (ee) {
				log(" OTPī ʵ e2eó  ߻. ȣȭ .");
				alert("Ű ȣȭ   ߻Ǿϴ.\n ˼ α׾ƿ  ٽ α Ͽ ϱ ٶϴ.");
				printStackTrace(ee);
			}
			setString( doc, "OTPīȣ" , formObj.OTPīȣ.value );
			setString( doc, "üйȣ" , formObj.üйȣ.value );
			formObj.OTPīȣ.value = "";
			formObj.üйȣ.value = "";
		}

		var responseMessage = "R_RIB" + serviceCode;
		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibCommonService.jsp?serviceCode="+serviceCode;

		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "callbackServiceCode", callbackServiceCode); //  ڵ
		setAttribute( doc, "callbackFeatures", sFeatures);  //  ڵ
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;
		try{
			var pcDoc = getSavedDoc("PCCONFIG");
			if( pcDoc != null ){
				copyXML( pcDoc, doc, "merge");
			}
		}
		catch(e){
			log("pc ȯ   ߻");
		}

		/* 2006. 7. 15 üũ   Attack
		setAttribute( doc, "mode", "ECHO");                     //  ó;
		*/

		var serviceFeatures = "callback:doMultiXMLCallback; sync:false; lock:false; cursorFix: true; useCert:true; useSign:false";
		log( "[doMultiXML] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
			// α׾ƿ  ù.
			doLogoutWithoutCert();

		}

		try{
			var Obj = document.all["ڵ"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("ڵ   ߻");
		}
		try{
			Obj = document.all["ǹȣ1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["ǹȣ2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("ǹȣ   ߻");
		}

	} catch( e ) {
		alertError("doMultiXML ȣ   ߻߽ϴ.", e);
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
				var Obj = document.all["ڵ"];
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SVC_CODE");
				}
			}
			catch(e){
				log("ڵ   ߻");
			}
			try{
				Obj = document.all["ǹȣ1"] ;
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SEC_CHAL1");
					Obj = document.all["ǹȣ2"];
					Obj.value = getString(resultDoc, "COM_SEC_CHAL2");;
				}
			}
			catch(e){
				log("ǹȣ   ߻");
			}
			return;
		}

		try{
			var Obj = document.all["ڵ"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("ڵ   ߻");
		}
		try{
			Obj = document.all["ǹȣ1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["ǹȣ2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("ǹȣ   ߻");
		}

		var sFeatures = getAttribute( argumentDoc, "callbackFeatures" );
		var serviceCode = getAttribute( argumentDoc, "callbackServiceCode" );

		try {
			if (typeof doMultiXMLCallbackDoc == 'undefined' || doMultiXMLCallbackDoc == null) {
				log("doMultiXML - Doc ");
				eval( "doXML( serviceCode, sFeatures );" );
			} else {
				log("doMultiXML - Doc ");
				eval( "doXML( serviceCode, sFeatures, doMultiXMLCallbackDoc );" );
			}
		} catch( e ) {
			e.detail = "doXML(  serviceCode, sFeatures );   ߻Ͽϴ. result:" + result ;
			printStackTrace( e );
		}
	} catch( e ) {
		alertError("doMultiXMLCallback ȣ   ߻߽ϴ.", e);
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
			alertError("Service Code ʼ ׸ Դϴ.");
			return;
		}

		var callbackDoc = arguments[2];
		if( typeof callbackDoc == "undefined" ) {
			alertError("document Էµ ʾҽϴ.");
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
			alertError("̸ [" + formName + "] form  ʽϴ.");
			return;
		}

		var serviceCode = formObj.ڵ.value;
		if( typeof serviceCode == 'undefined' || serviceCode == null || trim(serviceCode) == '' ) {
			alert(" ȸ Ͻþ ó ݵ ȮϽĿ\n\nؼ 񽺸 ̿Ͻ÷\nó  ٽ ŷϿ ֽñ ٶϴ.");
			if( errorURL != null &&  errorURL != "" ){
				document.location = errorURL;
			}
			else{
				document.location.reload();
			}
			return;
		}

		var doc = getDocument("<FORMMSG/>");
		if( !isAlphanumeric( formObj.üйȣ.value ) ) {
			alert( "'üйȣ' ڿ ڸ Էؾ մϴ." );
			formObj.üйȣ.value="";
			formObj.üйȣ.focus();
			return;
		}
		if( formObj.üйȣ.value.length < 6 || formObj.üйȣ.value.length > 8 ){
			alert( "'üйȣ' 6~8ڸ Էؾ մϴ." );
			formObj.üйȣ.value="";
			formObj.üйȣ.focus();
			return;
		}

		if( serviceCode == 'C2098' ) { //  ī
			if( formObj.īȣ11.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ11.focus();
				return;
			}
			if( !isDigit( formObj.īȣ11.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ11.value="";
				formObj.īȣ11.focus();
				return;
			}

			if( formObj.īȣ12.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ12.focus();
				return;
			}
			if( !isDigit( formObj.īȣ12.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ12.value="";
				formObj.īȣ12.focus();
				return;
			}

			if( formObj.īȣ21.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ21.focus();
				return;
			}
			if( !isDigit( formObj.īȣ21.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ21.value="";
				formObj.īȣ21.focus();
				return;
			}

			if( formObj.īȣ22.value == '' ) {
				alert( "'īȣ' Է ֽʽÿ." );
				formObj.īȣ22.focus();
				return;
			}
			if( !isDigit( formObj.īȣ22.value ) ) {
				alert( "'īȣ' ڸ Էؾ մϴ." );
				formObj.īȣ22.value="";
				formObj.īȣ22.focus();
				return;
			}
			try {
				formObj.īȣ11.value = get_e2e_value(XMLEncoder(formObj.īȣ11.value), "īȣ11" );
				formObj.īȣ12.value = get_e2e_value(XMLEncoder(formObj.īȣ12.value), "īȣ12" );
				formObj.īȣ21.value = get_e2e_value(XMLEncoder(formObj.īȣ21.value), "īȣ11" );
				formObj.īȣ22.value = get_e2e_value(XMLEncoder(formObj.īȣ22.value), "īȣ11" );
				formObj.üйȣ.value   = get_e2e_value(XMLEncoder( formObj.üйȣ.value),  "üйȣ"   );
			} catch (ee) {
				log(" īȣ ʵ e2eó  ߻. ȣȭ .");
				printStackTrace(ee);
				alert("Ű ȣȭ   ߻Ǿϴ.\n ˼ α׾ƿ  ٽ α Ͽ ϱ ٶϴ.");
				return;
			}

			setString( doc, "īȣ1" , formObj.īȣ11.value + formObj.īȣ12.value );
			setString( doc, "īȣ2" , formObj.īȣ21.value + formObj.īȣ22.value );
			setString( doc, "üйȣ" , formObj.üйȣ.value );
			formObj.īȣ11.value = "";
			formObj.īȣ12.value = "";
			formObj.īȣ21.value = "";
			formObj.īȣ22.value = "";
			formObj.üйȣ.value = "";
		} else {    // OTP
			if( formObj.OTPīȣ.value.length != 6 ) {
				alert( "'OTPī йȣ'  6ڸ Է ֽʽÿ." );
				formObj.īȣ22.focus();
				return;
			}
			if( !isDigit( formObj.OTPīȣ.value ) ) {
				alert( "'OTPī йȣ' ڸ Էؾ մϴ." );
				formObj.OTPīȣ.value="";
				formObj.OTPīȣ.focus();
				return;
			}
			try {
				formObj.OTPīȣ.value   = get_e2e_value(XMLEncoder( formObj.OTPīȣ.value),   "OTPīȣ"    );
				formObj.üйȣ.value  = get_e2e_value(XMLEncoder( formObj.üйȣ.value),  "üйȣ"   );
			} catch (ee) {
				log(" OTPī ʵ e2eó  ߻. ȣȭ .");
				alert("Ű ȣȭ   ߻Ǿϴ.\n ˼ α׾ƿ  ٽ α Ͽ ϱ ٶϴ.");
				printStackTrace(ee);
			}
			setString( doc, "OTPīȣ" , formObj.OTPīȣ.value );
			setString( doc, "üйȣ" , formObj.üйȣ.value );
			formObj.OTPīȣ.value = "";
			formObj.üйȣ.value = "";
		}


		var responseMessage = "R_RIB" + serviceCode;
		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibCommonService.jsp?serviceCode="+serviceCode;

		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "callbackServiceCode", callbackServiceCode); //
		setAttribute( doc, "callbackFeatures", sFeatures);
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;

		try{
			var pcDoc = getSavedDoc("PCCONFIG");
			if( pcDoc != null ){
				copyXML( pcDoc, doc, "merge");
			}
		}
		catch(e){
			log("pc ȯ   ߻");
		}

		var serviceFeatures = "callback:doMultiXML2Callback; sync:false; lock:false; cursorFix: true; useCert:true; useSign:false;";
		log( "[doMultiXML2] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
			// α׾ƿ  ù.
			doLogoutWithoutCert();
		}
		try{
			var Obj = document.all["ڵ"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("ڵ   ߻");
		}
		try{
			Obj = document.all["ǹȣ1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["ǹȣ2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("ǹȣ   ߻");
		}
	} catch( e ) {
		alertError("doMultiXML2 ȣ   ߻߽ϴ.", e);
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
				var Obj = document.all["ڵ"];
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SVC_CODE");
				}
			}
			catch(e){
				log("ڵ   ߻");
			}
			try{
				Obj = document.all["ǹȣ1"] ;
				if( Obj != 'undefined' && Obj != null ){
					Obj.value = getString(resultDoc, "COM_SEC_CHAL1");
					Obj = document.all["ǹȣ2"];
					Obj.value = getString(resultDoc, "COM_SEC_CHAL2");;
				}
			}
			catch(e){
				log("ǹȣ   ߻");
			}

			return;
		}

		var svc_code  = getString(resultDoc, "COM_SVC_CODE");

		try{
			var Obj = document.all["ڵ"];
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
			}
		}
		catch(e){
			log("ڵ   ߻");
		}
		try{
			Obj = document.all["ǹȣ1"] ;
			if( Obj != 'undefined' && Obj != null ){
				Obj.value = "";
				Obj = document.all["ǹȣ2"];
				Obj.value = "";
			}
		}
		catch(e){
			log("ǹȣ   ߻");
		}

		var sFeatures = getAttribute( argumentDoc, "callbackFeatures" );
		var serviceCode = getAttribute( argumentDoc, "callbackServiceCode" );

		try {
//          eval( "doXML( serviceCode, sFeatures );" );
//          eval( "callInitechXMLService( sFeatures, '/common/rib/jsp/callRibMultiService.jsp', doMultiXML2CallbackDoc);" );
			eval( "doVectorXML( serviceCode, sFeatures, doMultiXML2CallbackDoc);" );
		} catch( e ) {
			e.detail = "doMultiXML2(  serviceCode, sFeatures );   ߻Ͽϴ. result:" + result ;
			printStackTrace( e );
		}
	} catch( e ) {
		alertError("doMultiXML2Callback ȣ   ߻߽ϴ.", e);
		printStackTrace( e );
		return;
	}
}


/*
toDocument
		argument Ѿ form(Object) ִ text, password, textarea, file, hidden, checkbox, radio, select element xml Document ȯѴ.
		ι° ڷ MSGID ѱ  ִ.
		) toDocument( this.form ) Ǵ toDocument( this.form, msgID );
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
							log("INPUT name _E2E123_   e2eó Skip. ");
						}
                        log("PASSWORDʵ["+e.name+"] e2eó Ϸ.");
                    } catch (ee) {
                        log("PASSWORDʵ["+e.name+"] e2eó  ߻. ȣȭ .");
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
  param 1: ȸ Է¸
  param 2: ȸ Է¸
  param 3: ȸϰ ȸ (offset)
  param 4:  D-date, M-Month
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

//     | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |    
//            min             cur                  max       last
//  Interface 
//  objName    : pageListü ̸
//  currPage   :   ȣ
//  minPage    :  ȭ鿡 ù°  ȣ
//  maxPage    :  ȭ鿡   ȣ
//  lastPage   :  
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
					+"  <!--  Ʈ  --> "
					+"  <td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\"> "
					+"      <tr>";

			//   ǥ
	if( minPage > 1 ) {
		returnStr +="<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (minPage-1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_back.gif\" alt=\"\" border=\"0\" /></a></td> "
	}
	// Ʈ ǥ
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
					+"<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (maxPage+1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_next.gif\" alt=\"\" border=\"0\" /></a></td> "
	}

	returnStr += "</tr></table></td>"
			  +  "<td width=\"120\" class=\"m_td_rightbtn\"><a href='#'><img src=\"" + IMAGE_URL + "/ko/btn/btn_icon02.gif\" alt=\" \" onclick=\"javascript:saveExcelList();\" /></a></td>"
			  +  "</tr><tr><td colspan=\"3\"><table class=\"ta_blank_03\" cellpadding=\"0\" cellspacing=\"0\"><tr><td></td></tr></table></td></tr></table>";

	return returnStr;
}

//     | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |    
//            min             cur                  max       last
//  Interface 
//  objName    : pageListü ̸
//  currPage   :   ȣ
//  minPage    :  ȭ鿡 ù°  ȣ
//  maxPage    :  ȭ鿡   ȣ
//  lastPage   :  
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
					+"  <!--  Ʈ  --> "
					+"  <td><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\"> "
					+"      <tr>";

			//   ǥ
	if( minPage > 1 ) {
		returnStr +="<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (minPage-1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_back.gif\" alt=\"\" border=\"0\" /></a></td> "
	}
	// Ʈ ǥ
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
					+"<td valign=\"top\"><a href=\"javascript:" + objectName + ".goMove("+ (maxPage+1)+");\"><img src=\"" + IMAGE_URL + "/ko/btn/btn_next.gif\" alt=\"\" border=\"0\" /></a></td> "
	}

	returnStr += "</tr></table></td>"
			  +  "<td width=\"120\" class=\"m_td_rightbtn\"></td>"
			  +  "</tr><tr><td colspan=\"3\"><table class=\"ta_blank_03\" cellpadding=\"0\" cellspacing=\"0\"><tr><td></td></tr></table></td></tr></table>";

	return returnStr;
}

//     | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |    
//            min             cur                  max       last
//  Interface 
//  objName    : pageListü ̸
//  currPage   :   ȣ
//  minPage    :  ȭ鿡 ù°  ȣ
//  maxPage    :  ȭ鿡   ȣ
//  lastPage   :  
//  classNm    : css 
//  linkNm     : ũgoMove̸ 
function pagingView( objectName, currPage, minPage, maxPage, lastPage ,classNm ,linkNm) {
    if(classNm=="miniPager") {
        var returnStr ="<div class=\"miniPager\">";
    }else {
        var returnStr ="<div class=\"pager\">";
    }

    if(linkNm == "" || linkNm == null || linkNm == "undefined"){
        linkNm = "goMove";
    }
	//   ǥ
	if( currPage > 1 ) {
	    
	    returnStr +="<a href=\"javascript:"+linkNm+"(1);\" title=\"ó\"><img src=\"" + IMAGE_USL + "/images/customer/pre1.gif\" alt=\"ó\" class=\"position1\" /></a>";
	    returnStr +="<a href=\"javascript:"+linkNm+"("+ (eval(currPage)-1)+");\"  title=\"\"><img src=\"" + IMAGE_USL + "/images/customer/pre2.gif\" alt=\"\" class=\"position1\" /></a>";
	   
	} else {
	    returnStr +="<img src=\"" + IMAGE_USL + "/images/customer/pre1.gif\" alt=\"ó\" class=\"position1\"  />";
	    returnStr +="&#xa0;";
	    returnStr +="<img src=\"" + IMAGE_USL + "/images/customer/pre2.gif\" alt=\"\" class=\"position1\"  />";
	    
	}
	
	returnStr +="&#xa0;&#xa0;&#xa0;";
	
	// Ʈ ǥ
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
         returnStr  += "<a href=\"javascript:"+linkNm+"("+ (eval(currPage)+1) + ");\" title=\"\"><img src=\"" + IMAGE_USL + "/images/customer/next1.gif\" alt=\"\" class=\"position1\"  /></a>";
         returnStr  += "<a href=\"javascript:"+linkNm+"(" + lastPage + ");\" title=\"\"><img src=\"" + IMAGE_USL + "/images/customer/next2.gif\" alt=\"\" class=\"position1\"  /></a>";
	} else {
         returnStr  += "<img src=\"" + IMAGE_URL + "usr/images/customer/next1.gif\" alt=\"\" class=\"position1\" />";
         returnStr +="&#xa0;";
         returnStr  += "<img src=\"" + IMAGE_URL + "usr/images/customer/next2.gif\" alt=\"\" class=\"position1\" />";
	}

	returnStr += "</div>";
	return returnStr;
}

/*  ڰ ԷµǾ ѱ۷ ݾ Ѵ.
	fnc(num,1):alert
	fnc(num,2):ȭ
	fnc(num,3,id): id  value ѱ۱ݾ SET
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
			temp1 = ribCiphersHan(num.substring(0,4)) + "" + ribCiphersHan(num.substring(4,8)) + "" + ribCiphersHan(num.substring(8,12)) + "" + ribCiphersHan(num.substring(12,16));
		}
		else {
			temp1 = ribCiphersHan(num.substring(0,len%4)) + "" + ribCiphersHan(num.substring(len%4,len%4+4)) + "" + ribCiphersHan(num.substring(len%4+4,len%4+8)) + "" + ribCiphersHan(num.substring(len%4+8,len%4+12));
		}
	}
	else if ( len/4 > 2 && len/4 <= 3 ) {
		if ( len%4 == 0 ) {
			temp1 = ribCiphersHan(num.substring(0,4)) + "" + ribCiphersHan(num.substring(4,8)) + "" + ribCiphersHan(num.substring(8,12));
		}
		else {
			temp1 = ribCiphersHan(num.substring(0,len%4)) + "" + ribCiphersHan(num.substring(len%4,len%4+4)) + "" + ribCiphersHan(num.substring(len%4+4,len%4+8));
		}
	}
	else if ( len/4 > 1 && len/4 <= 2 ) {
		if ( len%4 == 0 ) {
			temp1 = ribCiphersHan(num.substring(0,4)) + "" + ribCiphersHan(num.substring(4,len));
		}
		else {
			temp1 = ribCiphersHan(num.substring(0,len%4)) + "" + ribCiphersHan(num.substring(len%4,len));
		}
	}
	else if ( len/4 <= 1 ) {
		temp1 = ribCiphersHan(num.substring(0,len));
	}

	for (var i=0; i<temp1.length; i++) {
		temp2 = temp2 + ribNumToHan(temp1.substring(i, i+1));
	}

	temp3=new String(temp2);
	temp3=temp3.replace(/ /gi," ");
	temp3=temp3.replace(/ /gi," ");

	if ( mode == 1 ) {
		alert(temp3 + " ");
	} else if ( mode == 2 ) {
		return temp3;
	} else if ( mode == 3 ) {
		Obj.value = "( " + temp3 + "  )";
	}
}

// ݾ ڸ ѱ۷.. : NumToHan, ribCiphersHan, NUM_HAN
function ribNumToHan(num)
{
	if ( num == "1" )       return "";
	else if ( num == "2" )  return "";
	else if ( num == "3" )  return "";
	else if ( num == "4" )  return "";
	else if ( num == "5" )  return "";
	else if ( num == "6" )  return "";
	else if ( num == "7" )  return "ĥ";
	else if ( num == "8" )  return "";
	else if ( num == "9" )  return "";
	else if ( num == "" ) return "";
	else if ( num == "" ) return "";
	else if ( num == "õ" ) return "õ";
	else if ( num == "" ) return " ";
	else if ( num == "" ) return " ";
	else if ( num == "" ) return " ";
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
		temp = num.substring(0,1) + "" + num.substring(1,2);
	}
	else if ( len == 3 ) {
		temp = num.substring(0,1) + "" + num.substring(1,2) + "" + num.substring(2,3);
	}
	else if ( len == 4 ) {
		temp = num.substring(0,1) + "õ" + num.substring(1,2) + "" + num.substring(2,3) + "" + num.substring(3,4);
	}

	num=new String(temp);
	num=num.replace(/0/gi,"");
	num=num.replace(/0/gi,"");
	num=num.replace(/0õ/gi,"");
	return num;
}

//  θ ǴѴ.    ޽ ǥѴ.
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
			alertError("ڰ մϴ.");
			return;
		}
		if (sSessionStr == "" && sSessionListStr == "") {
			alertError("ù° ι° ׸ ÿ    ϴ.");
			return;
		}
		if (sFeatures == "") {
			alertError("° ׸    ϴ.");
			return;
		}
		if (serviceCode == "") {
			alertError("׹° ׸    ϴ.");
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
					alertError("ù ° ׸ ߸ ڰ ԵǾ ֽϴ.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError("ù ° ׸  ߸Ǿϴ.");
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
					alertError(" ° ׸ ߸ ڰ ԵǾ ֽϴ.");
					return;
				}
				var key = "";
				var tmpArray = value.split(":");
				if ( tmpArray.length == 1 ) {
					key = value;
				} else if ( tmpArray.length == 2 )  {
					key = trim(tmpArray[1]);
				} else {
					alertError(" ° ׸  ߸Ǿϴ.");
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

		// responseMessage  ʾ ⺻ Ѵ.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		var requestMessage = "S_RIB" + serviceCode;

		if( processMsg == "" ) {
			processMsg = "óԴϴ.";
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session 
		}
		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;

		var serviceFeatures = "callback:doSessionXMLCallback; sync:false; lock:false; cursorFix: true; ";
		log("3");
		if (userTarget == "") {
			if (userCallback == "") {
				alertError("target   callback ݵ Ǿ մϴ.");
				return;
			}
		} else if (userTarget == "form") {
			serviceFeatures += " userTarget:form;";
			if (userDisplay == "") {
				alertError("target form  display ݵ Ǿ մϴ.");
				return;
			} else if (userXsl == "") {
				alertError("target   xsl ݵ Ǿ մϴ.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";

			// setXMLOption ɼǵ
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
				alertError("target   xsl ݵ Ǿ մϴ.");
				return;
			}
			serviceFeatures += " userDisplay:"+userDisplay+"; userXsl:"+userXsl+";";
		} else {
			alertError("target ߸ Ǿϴ.");
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

		log( "[doSessionXML] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
			// α׾ƿ  ù.
			doLogoutWithoutCert();
		}

	} catch( e ) {
		alertError("doSession ȣ   ߻߽ϴ.", e);
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

		// jStar  üũ  ó.
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
				alertError( "display   ʾҽϴ.");
			} else if( userXsl == "" ) {
				alertError( "xsl   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}
		log("5");
	} catch( e ) {
		alertError("doSession ȣ   ߻߽ϴ.", e);
		printStackTrace( e );
		return;
	}
}

// ޽  θ ǴѴ.
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

//  ó.   ʴ´.  doXML .
function doCert() {
	try {
		var userCallback = "", formName = "ribform", transform = "true", userDisplay = "riblayer", userXsl = "", userLanguage = "ko", keepTransactionSession = "false", useCert = "false", processMsg = "", debug = "false", echoMode = "false", errorMsg = "", responseMessage = "", showJStarError = "true", errorURL = "";
		var serviceCode = arguments[0];
		if( typeof serviceCode == "undefined" ) {
			alertError("Service Code ʼ ׸ Դϴ.");
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
		// responseMessage  ʾ ⺻ Ѵ.
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
		//ۿ
		var servletURL = "/common/rib/jsp/callRibCertService.jsp?serviceCode="+serviceCode;

		if( useCert == "true" ){
			if ( doc.documentElement.nodeName == 'CERTINFO_REQUEST'  )  {
				servletURL = "/common/rib/jsp/callRibCertServiceReq.jsp?serviceCode="+serviceCode;
			}
			else if ( doc.documentElement.nodeName == 'VID_VERIFY'  )  {
				servletURL = "/common/rib/jsp/callRibCertServiceVid.jsp?serviceCode="+serviceCode;
			}
		}
		else if( useCert == "init" ){ //  clear ϰ   
			servletURL = "/common/rib/jsp/callRibCertServiceInitReq.jsp?serviceCode="+serviceCode;
			useCert = "true";
		}
		//

		if( processMsg == "" ) {
			processMsg = "óԴϴ.";
		}

		if( echoMode == "true" ) {
			setAttribute( doc, "mode", "ECHO" );
			setAttribute( doc, "error", errorMsg );
		}

		if( userLanguage != "ko" )  {
			setAttribute( doc, "language", userLanguage);   // 
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session 
		}

		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}

		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;

		var serviceFeatures = "callback:doCertCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; useCert:" + useCert + "; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl +"; showjstarerror:" + showJStarError;
		log( "[doCert] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
		}
	} catch( e ) {
		alertError("doCert ȣ   ߻߽ϴ.", e);
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
		// jStar  üũ  ó.
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
				alertError( "transform truḛ display   ʾҽϴ.");
			} else if( userXsl == "" ) {
				alertError( "transform truḛ xsl   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doCert ȣ   ߻߽ϴ.", e);
		printStackTrace( e );
		return;
	}
}

// Vector doc ޾Ƽ   û óѴ.
// 2007. 1. 11 delayTime
function doVectorXML() {
	try {
		var userCallback = "", formName = "ribform", transform = "true", userDisplay = "riblayer", userXsl = "", userLanguage = "ko", keepTransactionSession = "false", useCert = "true", processMsg = "", debug = "false", echoMode = "false", errorMsg = "", responseMessage = "", showJStarError = "true", useSign = "false", errorURL = "", delayTime = "";
		var serviceCode = arguments[0];
		if( typeof serviceCode == "undefined" ) {
			alertError("Service Code ʼ ׸ Դϴ.");
			return;
		}
		userXsl = "xsl/RIB" + serviceCode + ".xsl";
		var sFeatures = arguments[1];
		var doc = arguments[2];
		if( typeof doc == "undefined" ) {
			alertError("document Էµ ʾҽϴ.");
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
		// responseMessage  ʾ ⺻ Ѵ.
		if ( responseMessage == "" ) {
			responseMessage = "R_RIB" + serviceCode;
		}

		var requestMessage = "S_RIB" + serviceCode;
		var servletURL = "/common/rib/jsp/callRibMultiService.jsp?serviceCode="+serviceCode;

		if( processMsg == "" ) {
			processMsg = "óԴϴ.";
		}

		// Vectoró.
		var tempVec = toVector(doc);
		for (i=0 ; i<tempVec.size();i++) {
			var tempDoc = tempVec.remove(i);
			var tempServiceCode = getAttribute(tempDoc, "serviceCode");
			var tempRequestMessage = getAttribute(tempDoc, "requestMessage");
			var tempResponseMessage = getAttribute(tempDoc, "responseMessage");

			if (tempServiceCode == null || tempServiceCode == '') {
				setAttribute( tempDoc, "serviceCode", serviceCode); //  ڵ
			}
			if (tempRequestMessage == null || tempRequestMessage == '') {
				setAttribute( tempDoc, "requestMessage", requestMessage);   // û  ;
			}
			if (tempResponseMessage == null || tempResponseMessage == '') {
				setAttribute( tempDoc, "responseMessage", responseMessage); // û  ;
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
			setAttribute( doc, "language", userLanguage);   // 
		}
		if( keepTransactionSession == "true" ) {
			setAttribute( doc, "keepTransactionSession", keepTransactionSession);   // Transaction Session 
		}
		if ( errorURL != "" ) {
			setAttribute( doc, "redirectURL", errorURL );
		}


		setAttribute( doc, "serviceCode", serviceCode); //  ڵ
		setAttribute( doc, "requestMessage", requestMessage);   // û  ;
		setAttribute( doc, "responseMessage", responseMessage); // û  ;


		var serviceFeatures = "callback:doVectorXMLCallback; sync:false; lock:false; cursorFix: true; debug:"+debug + "; useCert:" + useCert + "; useSign:" + useSign +"; processMsg:" + processMsg +"; form:" + formName + "; userCallback:" + userCallback + "; transform:" + transform + "; userDisplay:" + userDisplay + "; userXsl:" + userXsl +"; showjstarerror:" + showJStarError;
		log( "[doVectorXML] callInitechXMLServices ȣ  Features[" + serviceFeatures + "] servletURL[" + servletURL + "] document[" + indent( doc ) + "]" );

		if ( !callInitechXMLService( serviceFeatures, servletURL, doc )) {
			log("callInitechXMLServiceȣ ϱ   ߻߽ϴ.");
			// α׾ƿ  ù.
			// 2006.12.27 
			// doLogoutWithoutCert();
		}
	} catch( e ) {
		alertError("doVectorXML ȣ   ߻߽ϴ.", e);
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

		// jStar  üũ  ó.
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
				alertError( "transform truḛ display   ʾҽϴ.");
			} else if( userXsl == "" ) {
				alertError( "transform truḛ xsl   ʾҽϴ.");
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
				e.detail = userCallback + "( result )   ߻Ͽϴ. result:" + result ;
				printStackTrace( e );
			}
		}
	} catch( e ) {
		alertError("doVectorXML ȣ   ߻߽ϴ.", e);
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
	XML Message  form ԷѴ. Ǵ üδ text, password, textarea, file, hidden, checkbox, radio, select ̴.
	 checkbox radio, select   ִ  Ѵ.
	) toForm( doc, this.form)
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

// ¥    ´. 0̸  ,  ̸ , ƴϸ ٷ   ȯѴ.
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

//   ´.
function getCurOPDate( days ) {
	return getOPDate(0);
}

// Է  ǴѴ. 'yyyyMMdd'.
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

// Է     Ѵ. getPreOPDate('yyyyMMdd') .
function getPreOPDate( sDate ) {

	while( ! isOPDate( sDate) ){
		sDate = dateAdd(sDate, -1 );
	}
	return sDate;
}

// Է    Ѵ. getNextOPDate('yyyyMMdd') .
function getNextOPDate( sDate , gub ) {
	while( ! isOPDate( sDate) ){
		sDate = dateAdd(sDate, 1 );
	}
	return sDate;
}

// Է    Ѵ. getNextOPDate('yyyyMMdd') .
function getNextMonthOPDate( sDate ) {
	var oDate = getDate( sDate );
	oDate.setMonth(oDate.getMonth() + 1 );

	while( ! isOPDate( getFormattedDate( toDate, "yyyyMMdd") ) ){
		sDate = dateAdd(sDate, 1 );
	}
	return sDate;
}

// ŸӾƿ   ֱ ǰ ? ȣѴ.
function refreshAccessTime() {
	var count = arguments[0];
	var timeout = ( 4 * 60 * 1000 ) - 5000;	// 4п -5 

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
		log("ŸӾƿ  !");
	} else {
		log("ŸӾƿ  !");
	}
}

function alertError(errMsg, e) {
	var msg = "ó   ߻߽ϴ.   ħ Ͻ  ٽ ŷ ֽñ ٶϴ.\n";
	msg += " ӵǴ    ޽ Ͻþ ?  ͷ  ֽñ ٶϴ.\n";
	msg += "\n";

	if (typeof e != "undefined") {
		errMsg += "\n" + getStackTrace(e);
	}

	msg += " ޽ : " + errMsg;
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
    document.oncontextmenu = null;  //ʸ콺Ŭ
    document.ondragstart = null;    //
    document.onselectstart = null;  //
}

function writeUserName(){
	var sName = "";
	try{
		sName = getFrameHashDoc("login_user_name");
		if( sName == null || sName.length == 0 ){
			sName = "?";
		}
	}
	catch( e ) {
		sName = "?";
	}
	document.write(sName);
}


var shttp_status_map = new ActiveXObject("Scripting.Dictionary");

//ȣȭ  
shttp_status_map.Add("800", "α  Դϴ.\nϵ   Դϴ.\nȮ ư ŬϽþ  Ŀ ̿ϱ ٶϴ.\n|/mng/index.jsp");
shttp_status_map.Add("851", "ȣȭ  Դϴ.\n?Բ ԷϽ йȣ Ȯ  ߻Ͽϴ.\n α  Ͻð,   Ͽ ̿Ͽ ֽñ ٶϴ.\n");
shttp_status_map.Add("900", "ȣȭ  Դϴ.\nȣȭ  ʱȭ Ǿϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("901", "ȣȭ  Դϴ.\nȣȭ Master Secret   ʾҽϴ\n Ʈũ ȯ Ȯϼ\n");
shttp_status_map.Add("902", "ȣȭ  Դϴ.\nȣȭ Master Secret  ȣȭ ϴ   ߻߽ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("903", "ȣȭ  Դϴ.\n   ʾ  ǥ  ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("904", "ȣȭ  Դϴ.\n  ġ ʾ  ǥ  ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("905", "ȣȭ  Դϴ.\n ޽ ȣȭ   ߻߽ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("906", "ȣȭ  Դϴ.\nûϰ ϴ  ̰ Ѱġ Ѿϴ\n  ε带 õ ̶ 뷮   ε ϼ\n");
shttp_status_map.Add("907", "ȣȭ  Դϴ.\n޽ ȣȭ  Cipher-Parity   ʾҽϴ\n Ʈũ ȯ Ȯϼ\n");
shttp_status_map.Add("908", "ȣȭ  Դϴ.\n߸ Ķ ԷԴϴ\n Ʈũ ȯ Ȯϼ\n");
shttp_status_map.Add("909", "ȣȭ  Դϴ.\n ϵ  ȣƮ ּ Դϴ\n ùٸ  ϼ\n");
shttp_status_map.Add("910", "ȣȭ  Դϴ.\n ǰ WAS  ȭ Ȯο ߽ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("911", "ȣȭ  Դϴ.\n Ͽ  ʴ ȣƮ Դϴ\n ùٸ  ϼ\n");

//  
shttp_status_map.Add("921", "  Դϴ.\n å  ʴ  Դϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("922", "  Դϴ.\n  ʿ  Դϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("923", "  Դϴ.\nùٸ   ƴմϴ\n X\n509 ǥ   մϴ\n");
shttp_status_map.Add("924", "  Դϴ.\nŰ  Ȯ   Ͱ  ʾҽϴ\n Ʈũ ȯ Ȯϼ\n");
shttp_status_map.Add("925", "  Դϴ.\nŰ  Ȯ( ) ߽ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("926", "  Դϴ.\n  Ȯο ʿ VID Random   ʾҽϴ\n Ʈũ ȯ Ȯϼ\n");
shttp_status_map.Add("927", "  Դϴ.\n  Ȯ   ʴ  Դϴ\n  ߱ ޾ Ͻʽÿ\n");
shttp_status_map.Add("928", "  Դϴ.\n  Ȯο ߽ϴ\n  ֹιȣ(Ǵ ڹȣ) ġϴ   մϴ\n");
shttp_status_map.Add("929", "  Դϴ.\n    ʽϴ\n  ߱ ޾ Ͻʽÿ\n");
shttp_status_map.Add("930", "  Դϴ.\n  ȿ ʽϴ\n   ̿Ͻñ ٶϴ\n");
shttp_status_map.Add("931", "  Դϴ.\n Ǿ  ̻   ϴ\n  ߱ ޾ Ͻʽÿ\n|/mng/index.jsp");
shttp_status_map.Add("932", "  Դϴ.\nŷڵ (CA)  ߱  ƴմϴ\n ڿ ϼ\n");
shttp_status_map.Add("933", "  Դϴ.\n   ߽ϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("934", "  Դϴ.\n   ߽ϴ\n  ߱ ޾ Ͻʽÿ\n");
shttp_status_map.Add("935", "  Դϴ.\n ȣ  å(OID)   ʴ Դϴ\n");
shttp_status_map.Add("936", "  Դϴ.\n ȣ  å(OID)  ߽ϴ\n");
shttp_status_map.Add("937", "  Դϴ.\n  뿡  뵵(KeyUsage)  ƴմϴ\n");
shttp_status_map.Add("938", "  Դϴ.\n Ǿ  ̻   ϴ\n  ߱ ޾ Ͻʽÿ\n|/mng/index.jsp");
shttp_status_map.Add("939", "  Դϴ.\n ȿ Ǿ    ϴ\n ȿ ȸ   մϴ\n|/mng/index.jsp");
shttp_status_map.Add("940", "  Դϴ.\n ( ) Ȯο ߽ϴ\n ڿ ϼ\n");
shttp_status_map.Add("949", "  Դϴ.\n   ߿    ߻߽ϴ\n ڿ ϼ\n");

//ڼ  
shttp_status_map.Add("951", "ڼ  Դϴ.\nڼ   ʿ  Դϴ\n   ݰ,  Ͻñ ٶϴ\n");
shttp_status_map.Add("952", "ڼ  Դϴ.\nŬ̾Ʈ  ڼ  ߽ϴ\n Ȯ ư ŬϽþ α׷ ġ Ͻð ̿Ͻñ ٶϴ.\n|http://img.shinhan.com/shttp/install/down/INIS70.exe");
shttp_status_map.Add("953", "ڼ  Դϴ.\n  ڼ? ߽ϴ\n ڿ ϼ\n");
shttp_status_map.Add("954", "ڼ  Դϴ.\nڼ  ϴ   ߻߽ϴ\n ڿ ϼ\n");

// ޽ 
function getSFilterMessage(status){
	var tmp = shttp_status_map.Item(status.toString());
	if(tmp==null || tmp=="")
		return null;

	var arr = tmp.split("|");
	var msg = "[" + arr[0] + "]\r\n\r\n" +  arr[1] + "\r\n ڵ : " + status

    var warningDoc = getDocument("<WARNING/>");
    setString( warningDoc, "errorCode", status );
    setString( warningDoc, "msg", arr[0] );
	if( arr.length > 1 ){
		var topUrl = "" + top.location ;
        if( topUrl.indexOf("/rib/easy") < 0 ){ //?񽺰 ƴϸ
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

//ھ ڼ  Լ
function getEBillSign( data ){
	var warningDoc = getDocument("<WARNING/>");
	var args = getDocument("<EBILLSIGN/>");

	// start
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
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); //ڿ  û ҵǾ 
		return warningDoc.xml;

	}
	else if(oXmlHttp.xmlHttp.Status>=800){
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status );
		return warningDoc.xml;
	}

	var retStr = oXmlHttp.xmlHttp.responseText;
	retStr = delNewLine( retStr );
	// end
	log( retStr );
	if (retStr == "") {
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); // Ͽ 䰪 
		return warningDoc.xml;
	}
	log("ȣȭ Ϸ");
	__performanceData[_idx].afterDecrypt = (new Date()).getTime();
	log("11111");
	return retStr;
}


//? ü FLEX ڼ  Լ.
function FlexSignData( argString ){
	var warningDoc = getDocument("<WARNING/>");
	var args = getDocument("<FLEXSIGN/>");
	var t_array = String(argString).split("&");
	var signTitle = String(t_array[1]);
	var signData = String(t_array[2]);
	var signType = String(t_array[0]);

	// start
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
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); //ڿ  û ҵǾ 
		return null;
	}
	else if(oXmlHttp.xmlHttp.Status>=800){
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status );
		return null;
	}

	var retStr = oXmlHttp.xmlHttp.responseText;
	retStr = delNewLine( retStr );
	// end
	log( retStr );
	if (retStr == "") {
		setString( warningDoc, "errorCode", oXmlHttp.xmlHttp.Status ); // Ͽ 䰪 
		return null;
	}
	log("ȣȭ Ϸ");
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

//α  ȣ
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

		//ó set
		if( req_url.indexOf("?") > 0 ){
			req_url = req_url + "&resultState=" + resultState;
		}
		else{
			req_url = req_url + "?resultState=" + resultState;
		}

		//ڵ set
		if( req_url.indexOf("serviceCode") < 0 && svc_code != "" ){
			req_url = req_url + "&serviceCode=" + svc_code;
		}

		//task, action set
		req_url = req_url + "&task=" + task + "&action=" + action ;

		//óð SET
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
				log("processbar  ");
				___processbar.style.zIndex = -1;
				log("processbar  Ϸ 1");
				___processbar.innerText = '';
				log("processbar  Ϸ 2");
			} catch( eee ) {
				log("processbar    ");
				printStackTrace( eee );
				log("processbar    Ϸ");
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
 * tab ޴ Ʈ
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
 * tab ޴ Ʈ()
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
 * Grid ʱȭ.
 */
function initGridStyle(grid, style) {
	setAttribute(style, "defaultHeaderStyle","background-color:#EFE8DE;border-style:none;border-width:0px;border-color:#CCC4B9");
	setAttribute(style, "defaultDataStyle","background-color-even:#FAFAF7;color:#444444;border-style:solid;border-width:1px;border-color:#CCC4B9;font-family:");
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
//	grid.cellFontNameDefault = "ü";
	grid.rowHeaderWidth = 30;
}

/**
 * ޷ 2 ˾
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
 * ޷ 1 ˾
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
 * Ʈ̵  JS ߰
 */
function Print_Page(targetFrame) {

    objectPrintmadeRun();   //Ʈ̵ ġȮ

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
 * ȣ ˾â
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