<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
	<%@page import="java.util.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/style/openpage_style.css">
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/interface/openpage_edit.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=request.getContextPath() %>/dwr/util.js'></script>
	<script src="<%=request.getContextPath()%>/openpages/js/jquery.js"
	type="text/javascript"></script>
	
<script type="text/javascript">


var setting_mode="";
function layoutloadcallback(data) {
         jQuery("input#setting_padding").val(data[0].setting_padding);
         
          setting_mode=data[0].setting_mode;
         
           if( setting_mode.charCodeAt(0)==65){
           jQuery("input:radio[value='A']").attr("checked","checked");
           }
           else if(setting_mode.charCodeAt(0)==66){
           jQuery("input:radio[value='B']").attr("checked","checked");
           }else {
           jQuery("input:radio[value='C']").attr("checked","checked");
           }
           
           
            jQuery(":radio").each(function() {
           
           
                var wow=true;
		             	if(this.checked==wow){
		             		if(this.value=='A'){
             		if(jQuery("#menu").length==1){
             			jQuery("td#menu").insertBefore("td#content");
             		}else{
             			jQuery("td#content").before("<td id='menu'  width='41' height='129' style='border-width:1; border-color:silver; border-style:dashed;'>Menu</td>");
             		}
             	}else if(this.value=='B'){
             	jQuery("td#menu").remove();
             	}else{
	             	if(jQuery("#menu").length==1){
	             		jQuery("td#menu").insertAfter("td#content");
	             	}else{
	             		jQuery("td#content").after("<td id='menu'  width='41' height='129' style='border-width:1; border-color:silver; border-style:dashed;'>Menu</td>");
	             	}
             	
             	}
		             	}
             	
                });
           
           
           
           
           
        }

		function layoutupdate(){
		
		var newComment = {
			openpage_url: '<%=request.getAttribute("url")%>',
			setting_mode: setting_mode,
			setting_padding: jQuery("input#setting_padding").val()
		};
		
		
		 openpage_edit.layoutsave(newComment);
		 alert('commit');
		 
		
		}

         jQuery(document).ready(function() {
         openpage_edit.layoutload('<%=request.getAttribute("url")%>',layoutloadcallback);
           
          

           
           
           jQuery("input[name='openpage_type']:radio").click(function() {
                setting_mode=this.value;
                 //alert(setting_mode);
             	if(this.value=='A'){
             		if(jQuery("#menu").length==1){
             			jQuery("td#menu").insertBefore("td#content");
             		}else{
             			jQuery("td#content").before("<td id='menu'  width='41' height='129' style='border-width:1; border-color:silver; border-style:dashed;'>Menu</td>");
             		}
             	}else if(this.value=='B'){
             	jQuery("td#menu").remove();
             	}else{
	             	if(jQuery("#menu").length==1){
	             		jQuery("td#menu").insertAfter("td#content");
	             	}else{
	             		jQuery("td#content").after("<td id='menu'  width='41' height='129' style='border-width:1; border-color:silver; border-style:dashed;'>Menu</td>");
	             	}
             	
             	}
            });
        });
        
        
       

        
        
    </script>


</head>
<body>

<h1>사이트 레이아웃 사용자설정 z${requestScope.url}z </h1>
<p><b>
구성요소의 높이와 너비 지정, 메뉴 항목 추가 및 구성 등, 사이트 레이아웃을 변경할 수 있는 페이지입니다.Good</b></p>
<table width="500" border="1" align="center" cellpadding="5" cellspacing="5"
	bgcolor="#FFFFFF"
	style="border-width: 1; border-color: silver; border-style: dashed;">
	<tr bgcolor="eaf3fd" id="header">
	  <td colspan="2"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p>Header 헤더 </p></td>
	</tr>
	<tr bgcolor="eaf3fd">
		<td width="41" height="129" id="menu"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p>Menu</p>
      <p>메뉴</p></td>
		<td width="100%" height="129" id="content"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p>Content</p>
		  <P ><STRONG>페이지 콘텐츠</STRONG></P>
		  <P >사이트 콘텐츠 전용 공간입니다</P>		 
      <p>&nbsp;</p></td>
	</tr>
	<tr bgcolor="eaf3fd">
	  <td colspan="2" id="footer"
			style="border-width: 1; border-color: silver; border-style: dashed;"><p>footer <STRONG>바닥글</STRONG> <SPAN>사이트 링크 전용 공간입니다</SPAN></p></td>
	</tr>
</table>


<p align="center">Openpage 폭 크기 
  <input type="text" name="setting_padding" id="setting_padding"  size="10">
  % </p>



<table width="272" border="0" align="center" cellpadding="5" cellspacing="5">
	<tr>
		<td>
		<div align="center"><img
			src="<%=request.getContextPath()%>/images/openpages/a.gif"><br>
		<input type="radio"  name="openpage_type" value="A">
		</div>
		</td>
		<td>
		<div align="center"><img
			src="<%=request.getContextPath()%>/images/openpages/b.gif"><br>
		<input type="radio" name="openpage_type" value="B" ></div>
		</td>
		<td>
		<div align="center"><img
			src="<%=request.getContextPath()%>/images/openpages/c.gif"><br>
		<input type="radio" name="openpage_type" value="C"></div>
		</td>
	</tr>
</table>
<p>&nbsp;</p>
<input type="reset"> <input type="button" onclick="layoutupdate();" value="submit">



</body>
</html>