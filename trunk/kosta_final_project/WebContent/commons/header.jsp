<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*" %>
    <%
if((HashMap)session.getAttribute("user")==null){
	response.sendRedirect(request.getContextPath());
}
	%>
    
    
    
    
<script type="text/javascript" src="<%=request.getContextPath()%>/commons/script/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/commons/script/ajax.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/commons/script/header.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/commons/script/body.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/commons/script/dnd.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/commons/script/jquery.js"></script>
<script type="text/javascript">
	addLoadEvent(function(){
		new ajax.header.load();
	});
</script>
<div class="header-container">
	<div class="logo"><img src="<%=request.getContextPath()%>/images/commons/template_menu_logo[1].png"/></div>
	<div class="menu-item" id="menuPages"><p>Pages</p></div>
	<div class="menu-item" id="menuSearch"><p>Search</p></div>
	<div class="menu-item" id="menuMatching"><p>Matching</p></div>
	<div class="menu-button"></div>	
	<div class="menu-search"><p><input type="text" size="20" value=" Search" id="searchInputbox"/></p></div>
	<div class="menu-status" id="menuLogin"><p>Log out</p></div>
	<div class="menu-username" id="menuUsername"><p>Barack Obama</p></div>
</div>
