<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@page import="java.util.*" %>
	<%HashMap map =(HashMap)session.getAttribute("user");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/openpage_edit.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script>
	<script src="<%=request.getContextPath()%>/openpages/js/jquery.js"
	type="text/javascript"></script>
<script type="text/javascript">

var thisplace="";


function layoutloadcallback(data) {



	
document.getElementById('header').bgColor= jQuery.trim(data[0].setting_bgtop);
document.getElementById('menu').bgColor= jQuery.trim(data[0].setting_bgmenu);
document.getElementById('content').bgColor= jQuery.trim(data[0].setting_bgcontent);




/*
document.getElementById('header').bgColor=data[0].setting_bgtop;
alert(document.getElementById('header').bgColor);
document.getElementById('menu').bgColor=menu;
alert(document.getElementById('menu').bgColor);
document.getElementById('content').bgColor=content;
alert(document.getElementById('content').bgColor);

*/

}
function layoutupdate(){
	var newComment = {
			openpage_url: '<%=request.getAttribute("url")%>',
			setting_bgtop: document.getElementById('header').bgColor,
			setting_bgmenu: document.getElementById('menu').bgColor,
			setting_bgcontent: document.getElementById('content').bgColor
		};
		
		
		 openpage_edit.bgsave(newComment);
		  alert('commit');
}


 jQuery(document).ready(function() {
	openpage_edit.layoutload('<%=request.getAttribute("url")%>',layoutloadcallback);

 });





function previewColor(color) {
		document.getElementById("color_view").bgColor = color;
		document.getElementById("color_value").style.color = "#"+color;
		document.getElementById("color_value").value = color;
	}
		function chooseColor(color) {
				document.getElementById(thisplace).bgColor = color;
		hideColorPicker();
	}
		function hideColorPicker()
	{
		document.getElementById("colorSelector").style.visibility="hidden";
	}
	function visibleColorPicker(title)
	{
	var colorSelector=document.getElementById("colorSelector");
	thisplace=title;
	
	var tempX = 0;
	var tempY = 0;                    
	tempX = event.clientX + document.body.scrollLeft;
	tempY = event.clientY + document.body.scrollTop;
	colorSelector.style.left=tempX;
	colorSelector.style.top=tempY;
		colorSelector.style.visibility="";
	}
</script>
<title>Insert title here</title>
</head>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/style/openpage_style.css">
<body>
<h1>사이트 배경화면 사용자설정 </h1>
<p>
<b>구성요소의 배경색 지정, 변경할 수 있는 페이지입니다.Color</b></p>
<table width="500" height="318" border="1" align="center" cellpadding="5" cellspacing="5"
	style="border-width: 1; border-color: silver; border-style: dashed;">
	<tr >
	  <td height="76"  colspan="2" id="header"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p align="center">Header 헤더 </p>
	    <p align="center"><img src="<%=request.getContextPath()%>/images/openpages/fill.gif" border="0" name="header" onmouseover="visibleColorPicker(this.name)"></p>
	    
	    
      </td>
	</tr>
	<tr>
		<td width="41" height="179" id="menu"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p align="center">Menu<br>
		  <strong>메뉴</strong></p>
      <p align="center"><img src="<%=request.getContextPath()%>/images/openpages/fill.gif" border="0" name="menu" onmouseover="visibleColorPicker(this.name)"></p>
      <p align="center">&nbsp;</p></td>
		<td width="100%" height="179"  id="content"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p align="center">Content <STRONG>페이지 콘텐츠</STRONG></p>
		  <p align="center"><img src="<%=request.getContextPath()%>/images/openpages/fill.gif" border="0" name="content" onmouseover="visibleColorPicker(this.name)"></p>
	  </td>
	</tr>
	<tr >
	  <td colspan="2" id="footer"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p>footer <STRONG>바닥글</STRONG> <SPAN>사이트 링크 전용 공간입니다</SPAN></p></td>
	</tr>
</table>
<p align="center"><input name="" type="button" value="Submit" onclick="layoutupdate();"></p>
<DIV id=colorSelector 
style="BORDER-RIGHT: #9b9b9b 1px solid; visibility: hidden; PADDING-RIGHT: 5px; BORDER-TOP: #9b9b9b 1px solid; PADDING-LEFT: 5px; Z-INDEX: 5; LEFT: 266px; PADDING-BOTTOM: 5px; BORDER-LEFT: #9b9b9b 1px solid; PADDING-TOP: 5px; BORDER-BOTTOM: #9b9b9b 1px solid; POSITION: absolute; TOP: 107px; BACKGROUND-COLOR: #ffffff" 
align=center unselectable="on">

  <TABLE cellSpacing=1 cellPadding=0 width=145 bgColor=#000000 border=0>
    <TBODY>
      <TR height=11>
        <TD onmouseover="previewColor('FE1100')" style="CURSOR: pointer" 
onclick="chooseColor('FE1100');" bgColor=#fe1100 unselectable="on"></TD>
        <TD onmouseover="previewColor('FE4C24')" style="CURSOR: pointer" 
onclick="chooseColor('FE4C24');" bgColor=#fe4c24 unselectable="on"></TD>
        <TD onmouseover="previewColor('FE875A')" style="CURSOR: pointer" 
onclick="chooseColor('FE875A');" bgColor=#fe875a unselectable="on"></TD>
        <TD onmouseover="previewColor('FECDA7')" style="CURSOR: pointer" 
onclick="chooseColor('FECDA7');" bgColor=#fecda7 unselectable="on"></TD>
        <TD onmouseover="previewColor('040967')" style="CURSOR: pointer" 
onclick="chooseColor('040967');" bgColor=#040967 unselectable="on"></TD>
        <TD onmouseover="previewColor('2D328D')" style="CURSOR: pointer" 
onclick="chooseColor('2D328D');" bgColor=#2d328d unselectable="on"></TD>
        <TD onmouseover="previewColor('44499A')" style="CURSOR: pointer" 
onclick="chooseColor('44499A');" bgColor=#44499a unselectable="on"></TD>
        <TD onmouseover="previewColor('686EB8')" style="CURSOR: pointer" 
onclick="chooseColor('686EB8');" bgColor=#686eb8 unselectable="on"></TD>
        <TD onmouseover="previewColor('007B1D')" style="CURSOR: pointer" 
onclick="chooseColor('007B1D');" bgColor=#007b1d unselectable="on"></TD>
        <TD onmouseover="previewColor('2F9D4C')" style="CURSOR: pointer" 
onclick="chooseColor('2F9D4C');" bgColor=#2f9d4c unselectable="on"></TD>
        <TD onmouseover="previewColor('8BCDA2')" style="CURSOR: pointer" 
onclick="chooseColor('8BCDA2');" bgColor=#8bcda2 unselectable="on"></TD>
        <TD onmouseover="previewColor('AEDEC1')" style="CURSOR: pointer" 
onclick="chooseColor('AEDEC1');" bgColor=#aedec1 unselectable="on"></TD>
      </TR>
      <TR height=11>
        <TD onmouseover="previewColor('6E0017')" style="CURSOR: pointer" 
onclick="chooseColor('6E0017');" bgColor=#6e0017 unselectable="on"></TD>
        <TD onmouseover="previewColor('7B243D')" style="CURSOR: pointer" 
onclick="chooseColor('7B243D');" bgColor=#7b243d unselectable="on"></TD>
        <TD onmouseover="previewColor('834C6B')" style="CURSOR: pointer" 
onclick="chooseColor('834C6B');" bgColor=#834c6b unselectable="on"></TD>
        <TD onmouseover="previewColor('987E95')" style="CURSOR: pointer" 
onclick="chooseColor('987E95');" bgColor=#987e95 unselectable="on"></TD>
        <TD onmouseover="previewColor('006BD4')" style="CURSOR: pointer" 
onclick="chooseColor('006BD4');" bgColor=#006bd4 unselectable="on"></TD>
        <TD onmouseover="previewColor('0087E1')" style="CURSOR: pointer" 
onclick="chooseColor('0087E1');" bgColor=#0087e1 unselectable="on"></TD>
        <TD onmouseover="previewColor('37B7FE')" style="CURSOR: pointer" 
onclick="chooseColor('37B7FE');" bgColor=#37b7fe unselectable="on"></TD>
        <TD onmouseover="previewColor('A7DEFE')" style="CURSOR: pointer" 
onclick="chooseColor('A7DEFE');" bgColor=#a7defe unselectable="on"></TD>
        <TD onmouseover="previewColor('FEFE00')" style="CURSOR: pointer" 
onclick="chooseColor('FEFE00');" bgColor=#fefe00 unselectable="on"></TD>
        <TD onmouseover="previewColor('FEFE03')" style="CURSOR: pointer" 
onclick="chooseColor('FEFE03');" bgColor=#fefe03 unselectable="on"></TD>
        <TD onmouseover="previewColor('FEFE9F')" style="CURSOR: pointer" 
onclick="chooseColor('FEFE9F');" bgColor=#fefe9f unselectable="on"></TD>
        <TD onmouseover="previewColor('FEFED0')" style="CURSOR: pointer" 
onclick="chooseColor('FEFED0');" bgColor=#fefed0 unselectable="on"></TD>
      </TR>
      <TR height=11>
        <TD onmouseover="previewColor('4E003D')" style="CURSOR: pointer" 
onclick="chooseColor('4E003D');" bgColor=#4e003d unselectable="on"></TD>
        <TD onmouseover="previewColor('6D2262')" style="CURSOR: pointer" 
onclick="chooseColor('6D2262');" bgColor=#6d2262 unselectable="on"></TD>
        <TD onmouseover="previewColor('926594')" style="CURSOR: pointer" 
onclick="chooseColor('926594');" bgColor=#926594 unselectable="on"></TD>
        <TD onmouseover="previewColor('C2A9C5')" style="CURSOR: pointer" 
onclick="chooseColor('C2A9C5');" bgColor=#c2a9c5 unselectable="on"></TD>
        <TD onmouseover="previewColor('005557')" style="CURSOR: pointer" 
onclick="chooseColor('005557');" bgColor=#005557 unselectable="on"></TD>
        <TD onmouseover="previewColor('03747B')" style="CURSOR: pointer" 
onclick="chooseColor('03747B');" bgColor=#03747b unselectable="on"></TD>
        <TD onmouseover="previewColor('579D9F')" style="CURSOR: pointer" 
onclick="chooseColor('579D9F');" bgColor=#579d9f unselectable="on"></TD>
        <TD onmouseover="previewColor('A2C6CC')" style="CURSOR: pointer" 
onclick="chooseColor('A2C6CC');" bgColor=#a2c6cc unselectable="on"></TD>
        <TD onmouseover="previewColor('F45F00')" style="CURSOR: pointer" 
onclick="chooseColor('F45F00');" bgColor=#f45f00 unselectable="on"></TD>
        <TD onmouseover="previewColor('FE9739')" style="CURSOR: pointer" 
onclick="chooseColor('FE9739');" bgColor=#fe9739 unselectable="on"></TD>
        <TD onmouseover="previewColor('FECD8A')" style="CURSOR: pointer" 
onclick="chooseColor('FECD8A');" bgColor=#fecd8a unselectable="on"></TD>
        <TD onmouseover="previewColor('FEE2B0')" style="CURSOR: pointer" 
onclick="chooseColor('FEE2B0');" bgColor=#fee2b0 unselectable="on"></TD>
      </TR>
      <TR height=11>
        <TD onmouseover="previewColor('1B0B73')" style="CURSOR: pointer" 
onclick="chooseColor('1B0B73');" bgColor=#1b0b73 unselectable="on"></TD>
        <TD onmouseover="previewColor('4C379D')" style="CURSOR: pointer" 
onclick="chooseColor('4C379D');" bgColor=#4c379d unselectable="on"></TD>
        <TD onmouseover="previewColor('876EBA')" style="CURSOR: pointer" 
onclick="chooseColor('876EBA');" bgColor=#876eba unselectable="on"></TD>
        <TD onmouseover="previewColor('BBBAEF')" style="CURSOR: pointer" 
onclick="chooseColor('BBBAEF');" bgColor=#bbbaef unselectable="on"></TD>
        <TD onmouseover="previewColor('008E37')" style="CURSOR: pointer" 
onclick="chooseColor('008E37');" bgColor=#008e37 unselectable="on"></TD>
        <TD onmouseover="previewColor('26B168')" style="CURSOR: pointer" 
onclick="chooseColor('26B168');" bgColor=#26b168 unselectable="on"></TD>
        <TD onmouseover="previewColor('47BE80')" style="CURSOR: pointer" 
onclick="chooseColor('47BE80');" bgColor=#47be80 unselectable="on"></TD>
        <TD onmouseover="previewColor('76D3A2')" style="CURSOR: pointer" 
onclick="chooseColor('76D3A2');" bgColor=#76d3a2 unselectable="on"></TD>
        <TD onmouseover="previewColor('B31C00')" style="CURSOR: pointer" 
onclick="chooseColor('B31C00');" bgColor=#b31c00 unselectable="on"></TD>
        <TD onmouseover="previewColor('B03F21')" style="CURSOR: pointer" 
onclick="chooseColor('B03F21');" bgColor=#b03f21 unselectable="on"></TD>
        <TD onmouseover="previewColor('AE623A')" style="CURSOR: pointer" 
onclick="chooseColor('AE623A');" bgColor=#ae623a unselectable="on"></TD>
        <TD onmouseover="previewColor('AC6E54')" style="CURSOR: pointer" 
onclick="chooseColor('AC6E54');" bgColor=#ac6e54 unselectable="on"></TD>
      </TR>
      <TR height=11>
        <TD onmouseover="previewColor('FFFFFF')" style="CURSOR: pointer" 
onclick="chooseColor('FFFFFF');" bgColor=#fefefe unselectable="on"></TD>
        <TD onmouseover="previewColor('E6E6E6')" style="CURSOR: pointer" 
onclick="chooseColor('E6E6E6');" bgColor=#e6e6e6 unselectable="on"></TD>
        <TD onmouseover="previewColor('CDCDCD')" style="CURSOR: pointer" 
onclick="chooseColor('CDCDCD');" bgColor=#cdcdcd unselectable="on"></TD>
        <TD onmouseover="previewColor('B4B4B4')" style="CURSOR: pointer" 
onclick="chooseColor('B4B4B4');" bgColor=#b4b4b4 unselectable="on"></TD>
        <TD onmouseover="previewColor('A8A8A8')" style="CURSOR: pointer" 
onclick="chooseColor('A8A8A8');" bgColor=#a8a8a8 unselectable="on"></TD>
        <TD onmouseover="previewColor('8D8D8D')" style="CURSOR: pointer" 
onclick="chooseColor('8D8D8D');" bgColor=#8d8d8d unselectable="on"></TD>
        <TD onmouseover="previewColor('747474')" style="CURSOR: pointer" 
onclick="chooseColor('747474');" bgColor=#747474 unselectable="on"></TD>
        <TD onmouseover="previewColor('595959')" style="CURSOR: pointer" 
onclick="chooseColor('595959');" bgColor=#595959 unselectable="on"></TD>
        <TD onmouseover="previewColor('4B4B4B')" style="CURSOR: pointer" 
onclick="chooseColor('4B4B4B');" bgColor=#4b4b4b unselectable="on"></TD>
        <TD onmouseover="previewColor('303030')" style="CURSOR: pointer" 
onclick="chooseColor('303030');" bgColor=#303030 unselectable="on"></TD>
        <TD onmouseover="previewColor('0A0A0A')" style="CURSOR: pointer" 
onclick="chooseColor('0A0A0A');" bgColor=#0a0a0a unselectable="on"></TD>
        <TD onmouseover="previewColor('000000')" style="CURSOR: pointer" 
onclick="chooseColor('000000');" bgColor=#000000 
unselectable="on"></TD>
      </TR>
    </TBODY>
  </TABLE>
  <TABLE cellSpacing=0 cellPadding=0 width=145 bgColor=#ffffff border=0>
    <TBODY>
      <TR height=6>
        <TD colSpan=3></TD>
      </TR>
      <TR>
        <TD style="CURSOR: pointer" unselectable="on"><INPUT id=color_value 
style="BORDER-RIGHT: #cccccc 1px solid; BORDER-TOP: #cccccc 1px solid; BORDER-LEFT: #cccccc 1px solid; WIDTH: 57px; COLOR: #c2a9c5; BORDER-BOTTOM: #cccccc 1px solid; HEIGHT: 18px" 
readOnly maxLength=6 value=C2A9C5 name=color_value unselectable="on"></TD>
        <TD unselectable="on"><TABLE height=18 cellSpacing=1 cellPadding=0 width=51 bgColor=#cccccc border=0>
            <TBODY>
              <TR vAlign=center align=middle bgColor=#ffffff>
                <TD><TABLE height=12 cellSpacing=0 cellPadding=0 width=45 bgColor=#ffffff border=0>
                    <TBODY>
                      <TR>
                        <TD id=color_view bgColor=#c2a9c5 
unselectable="on"></TD>
                      </TR>
                    </TBODY>
                </TABLE></TD>
              </TR>
            </TBODY>
        </TABLE></TD>
        <TD style="CURSOR: pointer" onclick=hideColorPicker(); align=right 
unselectable="on"><IMG 
src="http://localhost:8081/final_project/openpages/alditor/images/ok.gif" 
border=0 unselectable="on"></TD>
      </TR>
    </TBODY>
  </TABLE>
  <DIV></DIV>
</DIV>
</body>
</html>