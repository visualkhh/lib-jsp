<%@ page language='java' contentType='text/html; charset=EUC-KR'
    pageEncoding='EUC-KR'%>
    <%@ page import="java.util.*" %>
<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
<html>
<head>
<link rel='stylesheet' type='text/css'
	href='<%=request.getContextPath()%>/style/openpage_style.css'>
	
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/openpage_edit.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script>
	<script src='<%=request.getContextPath()%>/openpages/js/jquery.js'
	type='text/javascript'></script>
	<script src='<%=request.getContextPath()%>/openpages/js/plugins/jquery.blockUI.js'
	type='text/javascript'></script>
	
	<script type='text/javascript'>
	
	
	var select_page_name="";
	var select_page_type="";
	var select_page_check="";
	
	
	function layoutinsert(){
	alert('insert');
	}
	function layoutloadcallback(data) {
	var maxlength=4;
	var oat=0;	var oinfo='';
	var pat=0;	var pinfo='';
	var bat=0;	var binfo='';
	

		
	
		jQuery.each(data,function(i){
              if(jQuery.trim(data[i].page_type)=='O'){
              
              		if(oat==0){
              			oinfo+="<tr>";
              		}
              		
              		oinfo+="<td><div align=center><a href=#><img  src='<%=request.getContextPath()%>/images/openpages/portfolioicon.gif' border=0 onClick=filemenupopup('"+jQuery.trim(data[i].page_name)+"','"+jQuery.trim(data[i].page_type)+"','"+jQuery.trim(data[i].page_check)+"')><br>"+jQuery.trim(data[i].page_name)+"<br>"+jQuery.trim(data[i].page_check)+"<br>"+jQuery.trim(data[i].page_regdate)+"</a></div></td>";
              		
              		
              		if(oat==maxlength){
              			oinfo+='</tr>';
              			oat=-1;
              		}
              		
              oat++;
              }else if(jQuery.trim(data[i].page_type)=='P'){
             	if(pat==0){
              			pinfo+="<tr>";
              		}
              		
              		pinfo+="<td><div align=center><a href=#><img src='<%=request.getContextPath()%>/images/openpages/pageicon.gif' border=0 onClick=filemenupopup('"+jQuery.trim(data[i].page_name)+"','"+jQuery.trim(data[i].page_type)+"','"+jQuery.trim(data[i].page_check)+"') ><br>"+jQuery.trim(data[i].page_name)+"<br>"+jQuery.trim(data[i].page_check)+"<br>"+jQuery.trim(data[i].page_regdate)+"</a></div></td>";
              		
              		
              		if(pat==maxlength){
              			pinfo+='</tr>';
              			pat=-1;
              		}
              		
              pat++;
              }else if(jQuery.trim(data[i].page_type)=='B'){
              
              	if(bat==0){
              			binfo+="<tr>";
              		}
              		
              		binfo+="<td><div align=center><a href=#><img src='<%=request.getContextPath()%>/images/openpages/boardicon.gif' border=0 onClick=filemenupopup('"+jQuery.trim(data[i].page_name)+"','"+jQuery.trim(data[i].page_type)+"','"+jQuery.trim(data[i].page_check)+"') ><br>"+jQuery.trim(data[i].page_name)+"<br>"+jQuery.trim(data[i].page_check)+"<br>"+jQuery.trim(data[i].page_regdate)+"</a></div></td>";
              		
              		
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
	
	
	function createpage(title,sw,page_name,page_type,page_check){
		if(sw=="page_update"){
			unpopup();
				if(page_check=="true"){
					page_check="checked";
				}
				
			 jQuery.blockUI({
				 message: "<div align='center'><strong>"+title+"</strong> <br></div><table width='200' border='0' cellpadding='5' bgcolor='#FF8F4D'>      <tr>    <td bgcolor='#FF8F4D'>페이지 이름</td>   </tr>	  <tr>    <td bgcolor='#FFFFFF'><input name='updatepage_name' type='text' value='"+page_name+"' id='updatepage_name'></td>  </tr>  <tr>    <td bgcolor='#FF8F4D'>페이지 타입 </td>    </tr>  <tr>    <td bgcolor='#FFFFFF'>"+page_type+"  </td>  </tr>  <tr>    <td bgcolor='#FFFFFF'>공개          <input name='updatepage_check' type='checkbox' id='updatepage_check' "+page_check+" value='true'> </td>  </tr></table><center>  <input name='Close' type='button' id='Close' onClick='unblock()'  value='Close'>   &nbsp;  <input type='button' name='submit'  value='Submit' onClick='updatepagesave()'></center>"
				 });
		}else{
			jQuery.blockUI({
			 message: "<div align='center'><strong>"+title+"</strong> <br></div><table width='200' border='0' cellpadding='5' bgcolor='#FF8F4D'>      <tr>    <td bgcolor='#FF8F4D'>페이지 이름</td>   </tr>	  <tr>    <td bgcolor='#FFFFFF'><input name='page_name' type='text' id='page_name'></td>  </tr>  <tr>    <td bgcolor='#FF8F4D'>페이지 타입 </td>    </tr>  <tr>    <td bgcolor='#FFFFFF'><table width='134' height='70' border='0' align='center' cellpadding='0' cellspacing='0'>        <tr>        <td width='177'>일반 페이지</td><td width='23'><input name='page_type' type='radio' value='P' checked></td>      </tr> <tr><td>게시판 페이지 </td><td><input type='radio' name='page_type' value='B'></td></tr>      <tr><td>포토폴리오 페이지 </td> <td><input type='radio' name='page_type' value='O'></td> </tr>    </table>      </td>  </tr>  <tr>    <td bgcolor='#FFFFFF'>공개          <input name='page_check' type='checkbox' id='page_check' checked value='true'> </td>  </tr></table><center>  <input name='Close' type='button' id='Close' onClick='unblock()'  value='Close'>   &nbsp;  <input type='button' name='submit'  value='Submit' onClick='createpageupdate()'></center>"
			 });
		}
	}
	
	function updatepagesave(){
	var newComment = {
	
	openpage_url: '<%=request.getAttribute("url")%>',
			page_nameold: select_page_name,
			page_name: jQuery("input#updatepage_name").val(),
			page_check: jQuery("input#updatepage_check").attr("checked")
	}
	alert(jQuery("input#updatepage_name").val());
	alert(jQuery("input#updatepage_check").attr("checked"));
	openpage_edit.pagesupdate(newComment,repage);
	unblock();
	}
	
	
	function createpageupdate(){
	
	
	
	
	var newComment = {
			openpage_url: '<%=request.getAttribute("url")%>',
			page_name: jQuery("input#page_name").val(),
			page_type: jQuery("input:radio:checked").val(),
			page_check: jQuery("input#page_check").attr("checked")
		};
	
	openpage_edit.pagessave(newComment,repage);

	unblock();
	}
	
	function repage(){
	jQuery("tbody#pages").html("");
            jQuery("tbody#board").html("");
            jQuery("tbody#portfolio").html("");
		openpage_edit.pagesload('<%=request.getAttribute("url")%>',layoutloadcallback);
	}
	
	 function unblock() {

           jQuery.unblockUI();
        }
	
	
	

 	
 	function filemenupopup(page_name,page_type,page_check){
 	
 	select_page_name=page_name;
 	select_page_type=page_type;
 	select_page_check=page_check;
	var tempX = 0;
	var tempY = 0;                    
	tempX = event.clientX + document.body.scrollLeft;
	tempY = event.clientY + document.body.scrollTop;
	
	;

 	jQuery("div#filemenu").css({
 	"visibility" : "visible",
 	"left":tempX,
 	"top":tempY
 	});
 	}
 	
 	function unpopup(){
 	document.getElementById('filemenu').style.visibility='hidden'
 	}
 	function deletepage(){
 	alert(select_page_name);

 	var newComment = {
			openpage_url: '<%=request.getAttribute("url")%>',
			page_name: select_page_name
		};
	unpopup();
 	openpage_edit.pagesdelete(newComment,repage);
 	
 	}
 	function updatepage(){
 		createpage("정보수정","page_update",select_page_name,select_page_type,select_page_check);
 	}
 	
 		jQuery(document).ready(function() {
	openpage_edit.pagesload('<%=request.getAttribute("url")%>',layoutloadcallback);
	<%HashMap map = (HashMap)session.getAttribute("user");%>
	openpage_edit.resumeload('<%=map.get("user_number")%>',resumeloadcallback);
 	});
 	
 	function resumeloadcallback(data){
 	
 	jQuery("tbody#resume").append("<tr><td><div align=center><a href=#><img  src='<%=request.getContextPath()%>/images/openpages/resumeicon.gif' border=0 ><br>resume</a></div></td></tr>")
 	}
 	
 	
 	function gotopage(){
 	location.href='<%=request.getContextPath()%>/openpage/view?url=<%=request.getAttribute("url")%>&page='+select_page_name;
 	}
	</script>
	

	</head>
<body>

<div id='filemenu' style='position:absolute; height: 33px; width: 64px; visibility:hidden'>
  <div align='center'></div><table width='71' border='0' cellpadding='5' bgcolor='#D2E4FF'>      
  <tr>    <td bgcolor='#ACCDFF'><div align='center'><strong> <a href=# onclick="updatepage()">정보수정</a></strong></div></td>   
</tr>	  <tr>    <td bgcolor='#84B5FF'><div align='center'><strong><a href=# onclick="gotopage();">내용수정</a></strong></div></td>  
</tr>  <tr>    <td bgcolor='#609FFF'><div align='center'><strong><a href="#" onclick="deletepage()">삭제하기</a></strong></div></td>    
</tr>  <tr>    <td bgcolor='#0267FF'><div align='center'><strong>
  <input name='Close' type='button' id='Close' onClick="unpopup()"  value='Close'>
</strong></div></td>  </tr>  </table>
<center></center></div>





<h1>오픈페이지 페이지 추가, 변경, 수정 할수 있습니다.</h1>

<div style="background-color:#HHGFEE "><h1><font color="#000000">이력서 페이지</font></h1></div>
<table width='700' border='0' background="#G9GFE1">
   <TBODY id=resume>
              </TBODY>
</table>
<br><br>
<div class="container">
  <h1><font color="#000000">포트폴리오  페이지</font></h1>
  <TABLE  width=700 border=0 bgcolor="#E9FFE1">
              <TBODY id=portfolio>
              </TBODY>
 </TABLE>
</div> 
<br><br>
<div  class="container"><h1><font color="#000000">일반 페이지</font></h1>      
<TABLE  width=700 border=0 bgcolor="#F0F0F0">
              <TBODY id=pages>
              </TBODY>
</TABLE>
</div>     
<br><br>
<div class="container"><h1><font color="#000000">게시판 페이지</font></h1>
 <TABLE  width=700 border=0 bgcolor="#E1ECFF">
			   <TBODY id=board>
			   </TBODY>
 </TABLE>

</div>


<p>
  <input type='button' name='createpage' value='페이지생성' onclick="createpage('페이지생성');">
</p>
</body>
</html>