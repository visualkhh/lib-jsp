<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page import="java.util.*" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>OpenPage.com</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/template.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/body.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/opensearch.css">
</head>
<body>
<div class="template-container">
	<div class="template-header">
		<tiles:insertAttribute name="header"/>
	</div>
	<div class="template-body" id="template-body" >
		<tiles:insertAttribute name="body"/>
	</div>
	<div class="template-footer">
		<tiles:insertAttribute name="footer"/>
	 </div>
</div>
</body>
</html>