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
				$("#b").append("<option    value='AA'>��������</option>");
				$("#b").append("<option    value='AB'>����</option>");
				$("#b").append("<option    value='AC'>����</option>");
				$("#b").append("<option    value='AD'>�ۺ���</option>");
			}else if(selected_option.val()=="BB"){
				$("#b").append("<option    value='BA'>����</option>");
				$("#b").append("<option    value='BB'>����</option>");
				$("#b").append("<option    value='BC'>����+����</option>");
			}
		});
		$("#a").trigger("change");
	});
</script>
</head>
<body>
<select id="a">
	<option value="AA">�ۺ���</option>
	<option value="BB">����</option>
</select>
<select id="b"></select>
</body>
</html>