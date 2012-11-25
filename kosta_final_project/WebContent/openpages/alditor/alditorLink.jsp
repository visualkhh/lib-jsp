<%@ page import="java.util.*" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
	<head>
	<STYLE TYPE="TEXT/CSS">
h1 {FONT-SIZE:10pt }
 </STYLE>
	
		<title> 링크 생성 </title>
		<meta name="Generator" content="EditPlus">
		<meta name="Author" content="">
		<meta name="Keywords" content="">
		<meta name="Description" content="">
		<meta http-equiv=content-type content=text/html;charset=euc-kr>

		<link rel=StyleSheet HREF='./alditorPop.css' type='text/css' title='CSS'>
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/openpage_edit.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script>
	<script src='<%=request.getContextPath()%>/openpages/js/jquery.js'
	type='text/javascript'></script>
	<script src='<%=request.getContextPath()%>/openpages/js/plugins/jquery.blockUI.js'
	type='text/javascript'></script>
<script type="text/javascript">
	function pagelist(){
	openpage_edit.pagesload('<%=request.getParameter("url")%>',layoutloadcallback);
	<%HashMap map = (HashMap)session.getAttribute("user");%>
	openpage_edit.resumeload('<%=map.get("user_number")%>',resumeloadcallback);
	
		jQuery.blockUI({
				 message: "<div style='background-color:#HHGFEE '>  <h1><font color='#000000'>resume page</font></h1></div><table width='100%' border='0' background='#G9GFE1'>   <TBODY id=resume>              </TBODY></table><br><br><div class='containers'>  <h1>portfolio<font color='#000000'> page </font></h1>   <TABLE  width=100% border=0 bgcolor='#E9FFE1'>              <TBODY id=portfolio>              </TBODY> </TABLE></div> <br><br><div  class='containers'>    <h1><font color='#000000'>nomal page</font></h1>          <TABLE  width=100% border=0 bgcolor='#F0F0F0'>              <TBODY id=pages>              </TBODY></TABLE></div>     <br><br><div class='containers'>    <h1><font color='#000000'>board page </font></h1>     <TABLE  width=100% border=0 bgcolor='#E1ECFF'>			   <TBODY id=board>			   </TBODY> </TABLE><input type='button' onclick='unblock()' value='Close'>"
				 });
	}
	function unblock() {
           jQuery.unblockUI();
        }
        
 	function resumeloadcallback(data){
 	jQuery("tbody#resume").append("<tr><td><div align=center><a href=#><img  src='<%=request.getContextPath()%>/images/openpages/resumeicon.gif' border=0 width='20' height='20'><br>resume</a></div></td></tr>")
 	}
 	
	function layoutloadcallback(data) {
	var maxlength=2;
	var oat=0;	var oinfo='';
	var pat=0;	var pinfo='';
	var bat=0;	var binfo='';
	

		
	
		jQuery.each(data,function(i){
              if(jQuery.trim(data[i].page_type)=='O'){
              
              		if(oat==0){
              			oinfo+="<tr>";
              		}
              		
              		oinfo+="<td><div align=center><a href=# onClick=filemenupopup('"+jQuery.trim(data[i].page_name)+"','"+jQuery.trim(data[i].page_type)+"','"+jQuery.trim(data[i].page_check)+"')><img  src='<%=request.getContextPath()%>/images/openpages/portfolioicon.gif'width='20' height='20' border=0 ><br>"+jQuery.trim(data[i].page_name)+"</a></div></td>";
              		
              		
              		if(oat==maxlength){
              			oinfo+='</tr>';
              			oat=-1;
              		}
              		
              oat++;
              }else if(jQuery.trim(data[i].page_type)=='P'){
             	if(pat==0){
              			pinfo+="<tr>";
              		}
              		
              		pinfo+="<td><div align=center><a href=# onClick=filemenupopup('"+jQuery.trim(data[i].page_name)+"','"+jQuery.trim(data[i].page_type)+"','"+jQuery.trim(data[i].page_check)+"')><img src='<%=request.getContextPath()%>/images/openpages/pageicon.gif' border=0 width='20' height='20'  ><br>"+jQuery.trim(data[i].page_name)+"</a></div></td>";
              		
              		
              		if(pat==maxlength){
              			pinfo+='</tr>';
              			pat=-1;
              		}
              		
              pat++;
              }else if(jQuery.trim(data[i].page_type)=='B'){
              
              	if(bat==0){
              			binfo+="<tr>";
              		}
              		
              		binfo+="<td><div align=center><a href=# onClick=filemenupopup('"+jQuery.trim(data[i].page_name)+"','"+jQuery.trim(data[i].page_type)+"','"+jQuery.trim(data[i].page_check)+"') ><img src='<%=request.getContextPath()%>/images/openpages/boardicon.gif' border=0 width='20' height='20'  ><br>"+jQuery.trim(data[i].page_name)+"</a></div></td>";
              		
              		
              		if(bat==maxlength){
              			binfo+='</tr>';
              			bat=-1;
              		}
              		
              bat++;
              }
            });
            
            
            jQuery("tbody#pages").append(pinfo);
            jQuery("tbody#board").append(binfo);
            jQuery("tbody#portfolio").append(oinfo);
	
	
	
	}
	function filemenupopup(page_name,page_type,page_check){
		
			document.getElementById("url").value=page_name;
			updateCreateLink();
			unblock();
		}	
	</script>



		<script language=javascript type=text/javascript>
		<!--
			var allowHTML = true;
			var replaceLink = false;

			var _emptyTags = {
			   "IMG":   true,
			   "BR":    true,
			   "INPUT": true,
			   "META":  true,
			   "LINK":  true,
			   "PARAM": true,
			   "HR":    true
			};
			
			var _selection = null;
			var aHref = false;

			function getOutetHTML(obj) {
			   var attrs = obj.attributes;
			   var str = "<" + obj.tagName;
			   for (var i = 0; i < attrs.length; i++) {
				   if (attrs[i].name.indexOf('_moz') == -1)
				   {
					   str += " " + attrs[i].name + "=\"" + attrs[i].value + "\"";
				   }
			   }

			   if (_emptyTags[obj.tagName])
				  return str + ">";

			   return str + ">" + obj.innerHTML + "</" + obj.tagName + ">";
			}

			function getSelectedHTML(win){
					var rng=null,html="";

					if (win.contentWindow.document.selection && win.contentWindow.document.selection.createRange){
							rng=win.contentWindow.document.selection.createRange();
							html=rng.htmlText||"";
					}else if (win.contentWindow.getSelection){
							rng=win.contentWindow.getSelection();
							if (rng.rangeCount > 0 && win.contentWindow.XMLSerializer){
									rng=rng.getRangeAt(0);
									html=new XMLSerializer().serializeToString(rng.cloneContents());
									var regExp = new RegExp("_moz_dirty=\"\"","g");
									html = html.replace(regExp,'');
							}
					}

					var regExp = new RegExp("\t","g");
					html = html.replace(regExp,'');
					var regExp = new RegExp("\n","g");
					html = html.replace(regExp,'');
					var regExp = new RegExp("\r","g");
					html = html.replace(regExp,'');
					return html;
			}

			function getQueryVariable(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i=0;i<vars.length;i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return '';
			}

			if (window.dialogArguments)
			{
				var _iframe = window.dialogArguments._iframe;
			} else {
				var _iframe = opener.document.getElementById(getQueryVariable('id'));
			}
			
			if(window.dialogArguments)
			{
				var sel = _iframe.contentWindow.document.selection;
				var range = sel.createRange();
				if (sel.type == "Control" && range.item(0).tagName.toLowerCase() == 'img')
				{
					_selection= range.item(0).outerHTML;
				} else if ((sel.type == "Text" || sel.type == "None") && range.parentElement().tagName.toLowerCase() == 'a')
				{
					_selection= range.parentElement().innerHTML;
					aHref = range.parentElement().href;
					replaceLink = true;
				}
			} else {
				var sel = _iframe.contentWindow.getSelection();
				var range = sel.getRangeAt(0);
				var p = range.commonAncestorContainer;
				if ( !range.collapsed && range.startContainer == range.endContainer && range.startOffset - range.endOffset <= 1 && range.startContainer.hasChildNodes() )
				{
					p = range.startContainer.childNodes[range.startOffset];
				}
				if (p.nodeName == 'IMG')
				{
					_selection = getOutetHTML(p);
				} else if (p.nodeName == 'A')
				{
					_selection = p.innerHTML;
					aHref = p.href;
				}
			}

			if (allowHTML == true && _selection == null)
			{
				var _html = true;
				_selection = getSelectedHTML(_iframe);
				if (_selection == '<P>&nbsp;</P>')
				{
					_selection = '';
				}
			}

			if (_selection == '')
			{
				var _html = false;
				if (_iframe.contentWindow.document.selection)
				{
					_selection = _iframe.contentWindow.document.selection.createRange().text;
				}
				else
				{
					_selection = _iframe.contentWindow.getSelection();
				}
			} else {
				var _html = true;
			}

			var g_sSelected = _selection;
			if (g_sSelected.indexOf("<") == -1 && _html == true)
			{
				var _html = false;
			}

			if (allowHTML == false)
			{
				var _html = false;
			}

			var g_sUrl = "";

			window.onload = function ()
			{
				document.getElementById('txt').value = g_sSelected;
				updateCreateLink();
				if (g_sSelected) 
					document.forms['iForm'].elements['url'].focus();
				else
					document.forms['iForm'].elements['txt'].focus();

				if (aHref)
				{
					document.forms['iForm'].elements['url'].value = aHref;
				}
				updateCreateLink();
			}


			function updateCreateLink()
			{
				var sUrl = document.forms['iForm'].elements['url'].value;
				g_sUrl = sUrl;

				var sExt = sUrl.substring(sUrl.lastIndexOf("."));
				var sComp = sExt.toUpperCase();
				if (sComp==".WMA" || sComp==".MP3" || sComp==".ASF" || sComp==".WMV" || sComp==".SWF" || sComp == ".AVI" || sComp == ".MPG")
				{
					enableExtraFeature(true);
				}
				else
				{
					enableExtraFeature(false);
				}
			}

			function enableExtraFeature(bEnable)
			{
				document.getElementById("ip_extra1").checked = bEnable;
				clickMultimedia();
			}

			function clickMultimedia() {
				var clicked = document.getElementById("ip_extra1").checked;
				document.getElementById("mediaWidth").disabled = (clicked)? false: true;
				document.getElementById("mediaHeight").disabled = (clicked)? false: true;
				document.getElementById("LmediaWidth").disabled = (clicked)? false: true;
				document.getElementById("LmediaHeight").disabled = (clicked)? false: true;
				genHTML();
			}


			function genHTML()
			{
				if (g_sUrl.indexOf('://') == -1)
				{
					g_sUrl = 'http://localhost:8081/final_project/openpage/view?url=<%=request.getParameter("url")%>&page=' + g_sUrl;
				}
				var sClass = document.forms['iForm'].elements['sClass'].value;
				var sTarget = document.forms['iForm'].elements['sTarget'].value;
				var linktext = document.getElementById('txt').value;
				if (_html == false)
				{
					var regExp = new RegExp("\n","g");
					linktext = linktext.replace(/&/g,'&amp;');
					linktext = linktext.replace(/</g,'&lt;');
					linktext = linktext.replace(/>/g,'&gt;');
					linktext = linktext.replace(regExp,'<br />')
				}
				if (sClass)
				{
					sClass = "AutoLinkType_"+document.forms['iForm'].elements['sClass'].value;
					var sHTML = "<a target=\""+sTarget+"\" href=\""+g_sUrl+"\" class=\""+sClass+"\">" + linktext + "</a>";
				}
				else
				{
					var sHTML = "<a target=\""+sTarget+"\" href=\""+g_sUrl+"\">"+ linktext +"</a>";
				}

				if (document.getElementById("ip_extra1").checked)
				{
					var w = (trim(document.getElementById("mediaWidth").value))?trim(document.getElementById("mediaWidth").value) : null;
					var h = (trim(document.getElementById("mediaHeight").value))?trim(document.getElementById("mediaHeight").value) : null;
					var templink = trim(linktext);
					var a = (!templink)? "'" + g_sUrl + "'": null;
					sHTML += " <span style='color:#EF5900;cursor:pointer' onclick=\"alditor_PlayNow(this,"+w+","+h+","+a+")\"><font color=\"#000\">[</font>바로 재생<font color=\"#000\">]</font></span>";
				}

				document.getElementById("createLinkPreview").innerHTML = sHTML;

				if(window.dialogArguments){
					document.getElementById("createLinkCode").innerText = sHTML;
				} else{
					document.getElementById('createLinkCode').textContent = sHTML;
				}
			}


			function completeCreateLink()
			{
				genHTML();
				var sHTML = document.getElementById("createLinkPreview").innerHTML;

				var finaleUrl = trim(g_sUrl);
				if (!finaleUrl)
				{
					alert('링크 주소를 입력해 주세요.');
					document.forms['iForm'].elements['url'].focus();
					return;
				} else {
					if (!document.getElementById("ip_extra1").checked)
					{
						var finaleTXT = trim( document.getElementById('txt').value);
						if (!finaleTXT)
						{
							alert('텍스트를 입력해 주세요.');
							document.forms['iForm'].elements['txt'].focus();
							return;
						}			
					}
				}

				_iframe.contentWindow.focus();

				if (replaceLink == true && window.dialogArguments)
				{
					range.parentElement().parentNode.removeChild(range.parentElement());
				}

				_iframe.contentWindow.document.execCommand("delete", false, null);

				if (window.dialogArguments)
				{
					range.pasteHTML(sHTML);
				} else {
					_iframe.contentWindow.document.execCommand("InsertHTML", false, sHTML);
				}
				self.close();
			}

			function check_number(field) {
			val=field.value;
			new_val='';
				for(i=0;i<val.length;i++){
					char = val.substring(i,i+1);
					if(char<'0' || char>'9'){
						alert('숫자만 입력하세요.');
						field.value = new_val;
						field.focus();
						return false;
					}else{
						new_val = new_val + char;
					}
				}
			}

			function trim(str) {
				return str.replace (/(^\s*)|(\s*$)/g, "");
			}
			
			function newwindow(){
			alert('z');
			}
		//-->
		</script>

	</head>
    <body scroll=no>  
        <center>  
            <form action="" onsubmit="return false;" name="iForm" style="margin:0px">  
                <fieldset style="width:95%;padding:8px;" align="center">  
                    <legend> 링크 추가 </legend>  
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="fixed">  
                        <col width="40" align="right" style="padding-top:3px"/>  
                        <col style="padding-left:8px"/>  
                        <tr>  
                            <td nowrap="nowrap">  
                                <b>텍스트</b>  
                            </td>  
                            <td>  
                                <textarea onkeyup="updateCreateLink()" id="txt" name="txt" size="20" style="width:100%;height:50px">  
                                </textarea>  
                            </td>  
                        </tr>  
                        <tr>  
                            <td nowrap="nowrap">  
                                <label for="lb_1" id="ip1" checked="checked" class="bold">링크</label>  
                            </td>  
                            <td>  
                                <input onkeyup="updateCreateLink()" id="url" name="url" type="text" size="20" style="width:75%"/>  <input type="button" value="Browser." onclick="pagelist();">
                            </td>  
                        </tr>  
                    </table>  
                </fieldset>  
                <fieldset style="width:95%;padding:8px">  
                    <legend> 스타일 </legend>  
                    <table border="0" cellpadding="0" cellspacing="0" align=center>  
                        <tr>  
                            <td nowrap="nowrap" style="padding-top:6px">링크에 적용할 스타일을 선택하세요</td>  
                            <td valign="top" style="padding-left:15px;padding-top:3px">  
                                <select name="sClass" onchange="updateCreateLink()">  
                                    <option value="blue">Blue</option>  
                                    <option value="red">Red</option>  
                                    <option value="green">Green</option>  
                                    <option value="0001">0001</option>  
                                    <option value="0002">0002</option>  
                                    <option value="0003">0003</option>  
                                    <option value="0004">0004</option>  
                                    <option value="0005">0005</option>  
                                    <option value="0006">0006</option>  
                                    <option value="0007">0007</option>  
                                    <option value="0008">0008</option>  
                                    <option value="0009">0009</option>  
                                    <option value="0010">0010</option>  
                                    <option value="0011">0011</option>  
                                    <option value="0012">0012</option>  
                                    <option value="0013">0013</option>  
                                    <option value="0014">0014</option>  
                                    <option value="0015">0015</option>  
                                    <option value="0016">0016</option>  
                                    <option value="">Default </option>  
                                </select>  
                            </td>
							<td align=right width=80>
								타겟
							</td>
							<td style="padding-left:15px;padding-top:3px">
                               <select name="sTarget" onchange="updateCreateLink()">  
                                    <option value="_blank">새창</option>  
                                    <option value="_self" selected="selected">현재창</option>  
								</select>
							</td>
                        </tr>  
                    </table>  
                </fieldset>  
                <fieldset style="width:95%;padding:8px">  
                    <legend> 미리보기 </legend>  
                    <div style="height:50px;overflow:auto" align="center">  
                        <table border="0" cellpadding="5" cellspacing="0" width="98%" height="100%" bgcolor="white" align="center">  
                            <tr>  
                                <td id="createLinkPreview">  
                                </td>  
                            </tr>  
                        </table>  
                    </div>  
                </fieldset>  
                <fieldset style="width:95%;padding:8px">  
                    <legend> 멀티미디어 </legend>  
                    <table border="0" cellpadding="0" cellspacing="0" align="left" width="100%">  
                        <tr>  
                            <td>  
                                <input onclick="clickMultimedia()" type="checkbox" id="ip_extra1"/>  
								<label id="lb_extra1" for="ip_extra1">'바로 재생' 링크를 추가.</label>  
                            </td>  
                            <td valign=middle>  
								<label disabled="disabled" id="LmediaWidth" for="mediaWidth">넓이:</label> <input disabled="disabled" onkeyup="check_number(this);genHTML()" type="text" id="mediaWidth" name="mediaWidth" size="4"/>&nbsp;&nbsp;&nbsp;&nbsp;<label disabled="disabled" id="LmediaHeight" for="mediaHeight">높이:</label> <input disabled="disabled" onkeyup="check_number(this);genHTML()" type="text" id="mediaHeight" name="mediaHeight" size="4"/>
                            </td>  
                        </tr>  
                    </table>  
                </fieldset>  
                <fieldset style="width:95%;padding:8px">  
                    <legend> 소스 </legend>  
                    <table border="0" cellpadding="5" cellspacing="0" width="100%" class="fixed" align="center">  
                        <tr>  
                            <td style="word-break:break-all">  
                                <div style="height:50px;overflow:auto;font-family:fixedsys" id="createLinkCode"></div>  
                            </td>  
                        </tr>  
                    </table>  
                </fieldset>  
                <table border="0" cellpadding="0" cellspacing="0" align="center">  
                    <tr>  
                        <td height="40" align="right" style="padding-right:5px">  
                            <button onclick="completeCreateLink()" class="tah11px bold" style="width:80px">OK</button>  
                        </td>  
                        <td style="padding-left:5px">  
                            <button style="width:80px" onclick="self.close()" class="tah11px">CANCEL</button>  
                        </td>  
                    </tr>  
                </table>  
            </form>  
        </center>  
    </body> 
</html>
