<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page import="java.util.*" %>
<%@ page import="openpage.model.*" %>

<%
if(session.getAttribute("user")==null){
	response.sendRedirect("http://localhost:8081/final_project/members/imsi_index.jsp");
	System.out.print("노로긴");
}else{

HashMap map =(HashMap)session.getAttribute("user");
ArrayList openpagelist= (ArrayList)map.get("openpagelist");
Boolean loginsw=false;

	for(int i=0;i<openpagelist.size();i++){
		OpenPageListDTO openpageat=(OpenPageListDTO)openpagelist.get(i);
		System.out.println(openpageat.getOpenpage_url()+i);
		
		if(openpageat.getOpenpage_url().equals(request.getParameter("url"))){
			
			request.setAttribute("url",request.getParameter("url"));
			loginsw=true;
			System.out.print("로긴완");
			break;
		}
	}

	if(loginsw==false){
		response.sendRedirect("http://localhost:8081/final_project/members/imsi_index.jsp");
		System.out.print("노로긴");
	}
}
	%>



<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>OpenPage.com</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/style/template.css">
</head>
<body>

<div class="template-container">
<div class="template-header"><tiles:insertAttribute name="header" />
</div>
<br>
<table width="960" height="500" border="0" cellpadding="10" cellspacing="1" bgcolor="#006699">
	<tr bgcolor="#FFFFFF">
	  <td width="220" valign="top"><div class="template-body" style="background-color: white;" ><tiles:insertAttribute name="left" /></div></td>
	  <td align="center" valign="top"  ><div class="template-body" ><tiles:insertAttribute name="body" /></div></td>
	</tr>
</table>

<br>
<div class="template-footer"><tiles:insertAttribute name="footer" />
</div>
</div>

</body>