<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<jsp:include page="/common/include.jsp" flush="false">
	<jsp:param name="css" 	value="<%=com.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERYUI %>" />
	<jsp:param name="javascript" 	value="<%=com.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERYUI %>" />
</jsp:include>
<%
%>


<title>Insert title here</title>
<script type="text/javascript">
<!--
	$(function() {
			alert('1'+'css javascript');
			
			
			//hover states on the static widgets
			$('#dialog_link').hover(
				function() { $(this).addClass('ui-state-hover'); }, 
				function() { $(this).removeClass('ui-state-hover'); }
			);
			
			// Dialog Link
			$('#dialog_link').click(function(){
				$('#dialog').dialog('open');
				return false;
			});
			
			
			
			// Dialog			
			$('#dialog').dialog({
				autoOpen: false,
				resizable : false,
				modal:true,
				width: 300,
				istitle:false,
				show:"slide",
				hide:"explode",
				draggable:false,
				buttons: {
					"Oㄴㄴㄴk": function() { 
						$(this).dialog("close"); 
					},
					"Ok": function() { 
						$(this).dialog("close"); 
					}, 
					"Cancel": function() { 
						$(this).dialog("close"); 
					} 
				}
			});
			
	});
//-->
</script>

</head>
<body>
 

		<h2 class="demoHeaders">Dialogs</h2>
		<p><a href="#" id="dialog_link" class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-newwin"></span>Open Dialog</a></p>
		
		
		

		<div id="dialog" title="Dialog Title">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</div>
</body>
</html>