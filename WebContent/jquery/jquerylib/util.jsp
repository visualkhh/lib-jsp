<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid,util" />
</jsp:include>
<script type="text/javascript">
var app;
	$(function() {
		
		var xml  = "<?xml version='1.0' encoding='UTF-8'?>";
			 xml+= "<items>";
				 xml+= "<item>";
				 xml+= "kim";
				 xml+= "</item>";
			 xml+= "</items>";
			 
			 var xml = $.xml(xml);
			 var item = xml.find("item");
			 alert(item.text());
	
	});
	
</script>
<body>
<div id='start_btn'>빵꾸똥꾸</div>
<div id='set_btn'>settuing_chg</div>
<div id='new_btn'>new</div>
<div id='select_btn'>select</div>

<div id="container">

</div>
<select id="selectElement"> </select>
</body>
</html>