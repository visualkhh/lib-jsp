<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>OpenPage.com</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/login.css">
</head>
<body>
<div class="login_container" id="opacity">
	<div class="login_header">
		<p>OpenPage</p>
	</div>
	<div class="login_header_sign">
		<p>OpenPage�� ����� �̷°� ����� ü�����̰� ȿ�������� ȫ���� �� �ִ� �����Դϴ�.</p>
	</div>
	<tiles:insertAttribute name="body"/>
	<div class="footer-container">
		<div class="footer-company"><p>OpenPage &copy; 2009</p></div>
		<div class="footer-item-left"><p>�ѱ���</p></div>	
		<div class="footer-item-right"><p>Sitemap</p></div>
		<div class="footer-item-right"><p>Help</p></div>
		<div class="footer-item-right"><p>Advertising</p></div>
		<div class="footer-item-right"><p>Privacy</p></div>
		<div class="footer-item-right"><p>About</p></div>
	</div>
</div>
</body>
</html>