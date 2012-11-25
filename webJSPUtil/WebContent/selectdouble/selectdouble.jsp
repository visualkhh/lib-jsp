<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>

<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid,island" />
</jsp:include>
<script type="text/javascript">
	$(function() {
		$("#a").change(function(){
			$("#b").find("option").remove();
			var selected_option = 		$(this).find("option:selected");
			if(selected_option.val()=="AA"){
				$("#b").append("<option    value='AA'>업무구분</option>");
				$("#b").append("<option    value='AB'>승전</option>");
				$("#b").append("<option    value='AC'>연전</option>");
				$("#b").append("<option    value='AD'>송변전</option>");
			}else if(selected_option.val()=="BB"){
				$("#b").append("<option    value='BA'>가공</option>");
				$("#b").append("<option    value='BB'>지중</option>");
				$("#b").append("<option    value='BC'>가공+지중</option>");
			}
		});
		$("#a").trigger("change");
	});
</script>
</head>
<body>
<select id="a">
	<option value="AA">송변전</option>
	<option value="BB">배전</option>
</select>
<select id="b"></select>
</body>
</html>