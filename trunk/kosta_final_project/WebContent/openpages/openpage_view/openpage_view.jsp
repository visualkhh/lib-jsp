<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@ page import="java.util.*" %>
    <%@ page import="openpage.model.*" %>
<%
Boolean loginsw=false;
if(session.getAttribute("user")!=null){ %>
	<%
	HashMap map =(HashMap)session.getAttribute("user");
	ArrayList openpagelist= (ArrayList)map.get("openpagelist");
	


	for(int i=0;i<openpagelist.size();i++){
		OpenPageListDTO openpageat=(OpenPageListDTO)openpagelist.get(i);
		if(openpageat.getOpenpage_url().equals(request.getParameter("url"))){
			request.setAttribute("url",request.getParameter("url"));
			loginsw=true;
			System.out.print("있다 섹션!");
			break;
		}
	}
}
	%>



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<link rel='stylesheet' type='text/css'
	href='<%=request.getContextPath()%>/style/openpage_style.css'>
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/openpage_edit.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script>
	<script src="<%=request.getContextPath()%>/openpages/js/jquery.js"
	type="text/javascript"></script>
		<script src="<%=request.getContextPath()%>/openpages/js/calendar.js"
	type="text/javascript"></script>
		
	<script type="text/javascript">
	function geturl(){
	return '<%=request.getParameter("url")%>';
	}
	</script>
	
	<SCRIPT language=JavaScript src="<%=request.getContextPath()%>/openpages/alditor/alditor.js" type=text/javascript></SCRIPT>

	
	<script type="text/javascript">

var topinfo="";
var menuinfo="";
var contentinfo="";
var editorlocation="";       
	var page='<%=request.getParameter("page")%>';
	
	function addevent(){
	  $("#headeditorbutton").click(function () {
           
           $("#memo1_alditoralditorTd").css("height","200");
           $("#memo1_alditor").css("height","200");
            $("#memo1").css("height","200");
           	editorlocation="top";
           		
           	jQuery("#bottomeditor").append(jQuery("#editorfield"));
	        jQuery("#editorfield").css("visibility","hidden");
           		
           		
           		jQuery("#openpage_menu").html(menuinfo);
           		jQuery("#openpage_content").html(contentinfo);
           		
           		jQuery("#memo1_alditor").contents().find("body").html(topinfo);
           		jQuery("#openpage_header").html("");
           		
	            jQuery("#openpage_header").append(jQuery("#editorfield"));
	            jQuery("#editorfield").css("visibility","visible");
	            
	            
	           
	                });
	          
	 $("#menueditorbutton").click(function () {
	       $("#memo1_alditoralditorTd").css("height","200");
           $("#memo1_alditor").css("height","200");
            $("#memo1").css("height","200");
	             editorlocation="menu";
	        jQuery("#bottomeditor").append(jQuery("#editorfield"));
	        jQuery("#editorfield").css("visibility","hidden");
	             
	            jQuery("#openpage_header").html(topinfo);
           		jQuery("#openpage_content").html(contentinfo);
	            
	             jQuery("#memo1_alditor").contents().find("body").html(menuinfo);
	             jQuery("#openpage_menu").html("");
	             
	            jQuery("#openpage_menu").append(jQuery("#editorfield"));
	            jQuery("#editorfield").css("visibility","visible");
	                });
	                
	             $("#pageeditorbutton").click(function () {
	             $("#memo1_alditoralditorTd").css("height","200");
           $("#memo1_alditor").css("height","200");
            $("#memo1").css("height","200");
	             editorlocation="content";
	        jQuery("#bottomeditor").append(jQuery("#editorfield"));
	        jQuery("#editorfield").css("visibility","hidden");
	             
	            jQuery("#openpage_header").html(topinfo);
           		jQuery("#openpage_menu").html(menuinfo);

				jQuery("#memo1_alditor").contents().find("body").html(contentinfo);
           		jQuery("#openpage_content").html("");
	             
	            jQuery("#openpage_content").append(jQuery("#editorfield"));
	            jQuery("#editorfield").css("visibility","visible");
	                }); 
                
	}
	
	      jQuery(document).ready(function(){
		         openpage_edit.layoutload('<%=request.getParameter("url")%>',layoutloadcallback); //템플릿 잡아주고 mode 내용도잡아주
		         addevent();  //이벤트 걸어주고 
         });
         
          function reseteditor(){
          location.reload();
          }
         
         
         function saveeditor(){
		 var pageinfo="";
          if(editorlocation=="top"){
          pageinfo=topinfo;
           var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					setting_title: jQuery("#memo1_alditor").contents().find("body").html()
				};
				openpage_edit.titleinfoupdate(newComment);
          
          }else if(editorlocation=="menu"){
          pageinfo=menuinfo;
          	var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					setting_menu: jQuery("#memo1_alditor").contents().find("body").html()
				};
				openpage_edit.menuinfoupdate(newComment);
          }else{
          pageinfo=contentinfo;
                 var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					page_name: page,
					page_info: jQuery("#memo1_alditor").contents().find("body").html()
				};
				openpage_edit.pagesinfoupdate(newComment);
          }

          alert('seve');
          location.reload();
        
          }
         
          
          function layoutloadcallback(data) {
           //템플릿잡아주고 
           setting_mode=jQuery.trim(data[0].setting_mode);
                if(setting_mode=='A'){
		             		if(jQuery("#openpage_menu").length==1){
		             			jQuery("td#openpage_menu").insertBefore("td#content");
		             		}else{
		             			jQuery("td#openpage_content").before("<td id='menu'  width='41' height='129' style='border-width:1; border-color:silver; border-style:dashed;'>Menu</td>");
		             		}
             	}else if(setting_mode=='B'){
             	
             		jQuery("td#openpage_menu").remove();
             
             	}else if(setting_mode=='C'){
          				
		             	if(jQuery("#openpage_menu").length==1){
		             		jQuery("td#openpage_menu").insertAfter("td#openpage_content");
		             	}else{
		             		jQuery("td#openpage_content").after("<td id='menu'  width='41' height='129' style='border-width:1; border-color:silver; border-style:dashed;'>Menu</td>");
		             	}
	            
		             	
             	
             	}
			// 배경화면 잡아주고 
			jQuery("td#openpage_header").css("backgroundColor",jQuery.trim(data[0].setting_bgtop));
			jQuery("td#openpage_menu").css("backgroundColor",jQuery.trim(data[0].setting_bgmenu));
			jQuery("td#openpage_content").css("backgroundColor",jQuery.trim(data[0].setting_bgcontent));
            jQuery("table#openpage_table").css("width",data[0].setting_padding+"%");
           
           //내용잡아주고 
            topinfo=jQuery.trim(data[0].setting_title);
            jQuery("td#openpage_header").html(topinfo);
            
            menuinfo=jQuery.trim(data[0].setting_menu);
            jQuery("td#openpage_menu").html(menuinfo);
            
            var index=jQuery.trim(data[0].setting_main);
            pageload(index); //메인 페이지이름만가지고 직접적인 안쪽 내용뽑아오고

            
          }
          
    function pageload(index){
      if(page=='null'){
      page="index";
	       var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					page_name: index
				};
		}else{
		 var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					page_name: page
				};
		}
		
            openpage_edit.pageload(newComment,pageloadfill);
    }
    
    
	function pageloadfill(data){
	
		if(jQuery.trim(data[0].page_type)=='O'){

				jQuery("#etcpageinfo").append("<table width='100%' border='0' cellpadding='5' cellspacing='1' bgcolor='6682a1'>    <tr bgcolor='#FFFFFF'>      <td>프로젝트명</td>      <td><input type='text' id='portfolio_title' name='portfolio_title'></td>      <td>담당업무</td>      <td><input type='text' id='portfolio_position' name='portfolio_position'></td>    </tr>    <tr bgcolor='#FFFFFF'>      <td>프로젝트 시작 날짜 </td>      <td>   <input type='text' id='portfolio_period_start' name='portfolio_period_start'><input type='image'  src='<%=request.getContextPath()%>/images/openpages/icon_calendar.bmp' onclick='Calendar(this)'>    </td>      <td>프로젝트 끝 날짜 </td>      <td>	<input type='text' id='portfolio_period_end' name='portfolio_period_end'><input type='image'  src='<%=request.getContextPath()%>/images/openpages/icon_calendar.bmp' onclick='Calendar(this)'>	</td>    </tr>    <tr bgcolor='#FFFFFF'>      <td colspan='4'><textarea  editable=0 id='portfolio_info' name='portfolio_info' rows='5' style='width:100% '></textarea><br><%if(loginsw){ %><input type='button' onclick='saveportfolio()' value='저장하기'/> <%} %></td>    </tr>  </table>");
				 var newComment = {
							openpage_url: '<%=request.getParameter("url")%>',
							page_name: page
						};
						openpage_edit.portfolioload(newComment,fillportfolio);
						jQuery("#etcpageinfo").css("display","block");
			
	
		}else if(jQuery.trim(data[0].page_type)=='B'){

			jQuery("#etcpageinfo").append("<div id='boardlist'></div><table width='100%' border='0' cellpadding='5' cellspacing='1' bgcolor='#FFFFFF'>    <tr bgcolor='#FFFFFF'>      <td width='10%'>내용:</td>      <td width='52%'><input name='board_info' type='text' id='board_info' size='70'></td>      <td width='9%'>이름:</td>      <td width='12%'><input name='board_writer' type='text' id='board_writer' size='20'></td>      <td width='17%'><input type='button' onClick='boardinsert()'  value='올리기'></td>          </tr>  </table>");
			
			 var newComment = {
							openpage_url: '<%=request.getParameter("url")%>',
							page_name: page
						};
						openpage_edit.boardload(newComment,fillpboard);
									
			jQuery("#etcpageinfo").css("display","block");	
		}
		contentinfo=jQuery.trim(data[0].page_info);
		jQuery("td#openpage_content").html(contentinfo);
		}

	function fillportfolio(data){
	jQuery("#portfolio_title").val(data[0].portfolio_title);
	jQuery("#portfolio_position").val(data[0].portfolio_position);
	jQuery("#portfolio_info").val(data[0].portfolio_info);
	jQuery("#portfolio_period_start").val(data[0].portfolio_period_start.substring(0,10));
	jQuery("#portfolio_period_end").val(data[0].portfolio_period_end.substring(0,10));
	}
    //---------------------------------------------//
    
	function saveportfolio(){
	var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					page_name: page,
					portfolio_title: jQuery("#portfolio_title").val(),
					portfolio_position :jQuery("#portfolio_position").val(),
					portfolio_info : jQuery("#portfolio_info").val(),
					portfolio_period_start : jQuery("#portfolio_period_start").val(),
					portfolio_period_end : jQuery("#portfolio_period_end").val()
					
				};
				  openpage_edit.portfolioinfoupdate(newComment,reseteditor);
	}
	
	function boardinsert(){
	alert(page);
		var newComment = {
					openpage_url: '<%=request.getParameter("url")%>',
					page_name: page,
					board_writer: jQuery("#board_writer").val(),
					board_info :jQuery("#board_info").val()
				};
				openpage_edit.boardsave(newComment,reseteditor);
	}
	function fillpboard(data){
		var boardlist="";
		jQuery.each(data,function(i){
			boardlist+="<table width='100%' border='0' cellpadding='5' cellspacing='1' bgcolor='#6682A1'>    <tr bgcolor='#FFFFFF'>      <td>"+data[i].board_info+"</td>      <td width='18%'>"+data[i].board_writer+"</td>      <td width='16%'>"+data[i].board_regdate+"</td>    </tr>  </table> ";
		});
		jQuery("#boardlist").append(boardlist);
		
	}
	</script>


<body>
<%-- <%HashMap map= (HashMap)session.getAttribute("user");%>
[<%=map.get("user_number")%>] Number user<br>view
뷰--%><br>

	
	<div  id="openpage_editor" style="border: 1px solid #6682a1; background-color: white;">
	 <%if(loginsw){ %>
	  <table width="100%" border="0" cellpadding="0" cellspacing="0">
	  
	 
	    <tr>
	      <td align="left"><a class="titlehead">사이트 도구] Editor<a></td>
	      
	      <td align="right"><a href="#" onclick="window.location='<%=request.getContextPath()%>/openpage/admin?url=<%=request.getParameter("url")%>'">오픈페이지 관리</a>, &nbsp; <a href="#" id="headeditorbutton">헤드 수정,</a> &nbsp; <a href="#" id="menueditorbutton">메뉴 수정,</a>&nbsp; <a href="#" id="pageeditorbutton">현페이지 수정</a> </td>
	    </tr>
	   
	    
	  </table>
	   <%} %>
	 <div id="head_edit" style="display: none;"></div>
	 <div id="menu_edit" style="display: none;"></div>
	 <div id="content_edit" style="display: none;"></div>
	</div>
	


<TABLE width=960 border=0 align="center" cellPadding=0 cellSpacing=0 >
  <TBODY>
    <TR>
      <TD><IMG height=12 src="<%=request.getContextPath()%>/images/openpages/view/tl.png" width=12></TD>
      <TD width="100%" background=<%=request.getContextPath()%>/images/openpages/view/top.png height=12></TD>
      <TD><IMG height=12 src="<%=request.getContextPath()%>/images/openpages/view/tr.png" width=12></TD>
    </TR>
    <TR>
      <TD background=<%=request.getContextPath()%>/images/openpages/view/l.png></TD>
      <TD vAlign=top bgColor=#ffffff><TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
          <TBODY>
            <TR>
              <TD width="60%"><DIV align=left>
                  <TABLE height=100% cellSpacing=0 cellPadding=0 width="100%" border=0>
                    <TBODY>
                      <TR>
                        <TD><IMG height=8 src="<%=request.getContextPath()%>/images/openpages/view/tl.gif" width=8></TD>
                        <TD background=<%=request.getContextPath()%>/images/openpages/view/t.gif><IMG height=8 
src="<%=request.getContextPath()%>/images/openpages/view/t.gif" width=8></TD>
                        <TD><IMG height=8 src="<%=request.getContextPath()%>/images/openpages/view/tr.gif" width=8></TD>
                      </TR>
                      <TR>
                        <TD width=8 background=<%=request.getContextPath()%>/images/openpages/view/l.gif><IMG height=8 
src="<%=request.getContextPath()%>/images/openpages/view/l.gif" width=8></TD>
                        <TD vAlign=top height=50><DIV align=justify>
                            <TABLE cellSpacing=0 cellPadding=4 width="100%" border=0>
                              <TBODY>
                                <TR>
                                  <TD><DIV align=center><table width="100%" border="0" align="center" cellpadding="5" cellspacing="5" id="openpage_table">
	<tr align="left" >
	  <td colspan="2" id="openpage_header" ><p>
	    Header 헤더 </p>
	    </td>
	</tr>
	<tr align="left">
		<td width="220" height="129" id="openpage_menu"
			>		  <p>Menu</p>
      <p>메뉴</p></td><td width="786" height="129" id="openpage_content"
			><p>
		  Content</p>
		  <P ><STRONG>페이지 콘텐츠</STRONG></P>
		  <P >사이트 콘텐츠 전용 공간입니다</P>		 
      <p>&nbsp;</p></td>
	</tr>
	
</table>
<div  id="etcpageinfo" style="border: 1px solid #6682a1; background-color: white; display:none" >

</div>

                                      </DIV></TD>
                                </TR>
                              </TBODY>
                            </TABLE>
                        </DIV></TD>
                        <TD width=8 background=<%=request.getContextPath()%>/images/openpages/view/r.gif><P><IMG height=8 src="<%=request.getContextPath()%>/images/openpages/view/r.gif" width=8></P></TD>
                      </TR>
                      <TR>
                        <TD height=8><IMG height=8 src="<%=request.getContextPath()%>/images/openpages/view/bl.gif" width=8></TD>
                        <TD background=<%=request.getContextPath()%>/images/openpages/view/b.gif><IMG height=8 
src="<%=request.getContextPath()%>/images/openpages/view/b.gif" width=8></TD>
                        <TD><IMG height=8 src="<%=request.getContextPath()%>/images/openpages/view/br.gif" 
width=8></TD>
                      </TR>
                    </TBODY>
                  </TABLE>
              </DIV></TD>
            </TR>
          </TBODY>
        </TABLE>
          <DIV class=bodytext align=left></DIV>
          <DIV></DIV></TD>
      <TD background=<%=request.getContextPath()%>/images/openpages/view/r.png></TD>
    </TR>
    <TR>
      <TD background=<%=request.getContextPath()%>/images/openpages/view/l.png></TD>
      <TD vAlign=bottom bgColor=#ffffff height=15></TD>
      <TD background=<%=request.getContextPath()%>/images/openpages/view/r.png></TD>
    </TR>
    <TR>
      <TD><IMG height=12 src="<%=request.getContextPath()%>/images/openpages/view/bl.png" width=12></TD>
      <TD background=<%=request.getContextPath()%>/images/openpages/view/bot.png height=12></TD>
      <TD><IMG height=12 src="<%=request.getContextPath()%>/images/openpages/view/br.png" 
width=12></TD>
    </TR>
  </TBODY>
</TABLE>
<br>
<% if(loginsw){ %>
<div id="bottomeditor"><div id="editorfield" style="visibility: hidden;"><textarea name=memo1 style='width:100%; height:1px;'>zzzz</textarea><input type="button" value="닫기" onclick="reseteditor()">&nbsp;<input type="button" value="저장하기" onclick="saveeditor()">  </div>
<%} %>
</div>
</body>
</html>