<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">

<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid,selectutil" />
</jsp:include>
<script type="text/javascript">






	$(function() {
		$("#wow").selectutil({
			url : "./selectdata.jsp",
			selected_value:'2',
			callback:function(data){
			alert(data);	
			},
			before_option: Array($("<option value='11'>b전체1</option>"),$("<option value='121'> b전체11</option>")),
			after_option: Array($("<option value='11'> a전체2</option>"),$("<option value='121'> a전체22</option>"))
		});
		
		$("#wow").change(function(){
			alert(1);
		});
		$("#wow").change(function(){
			alert(4);
		});
		$("#wow").change(function(){
			alert(51);
		});
		$("#wow").change(function(){
			alert(12);
		});
	});
</script>
<body>

</body>
<select id="wow" >
</select>


</html>