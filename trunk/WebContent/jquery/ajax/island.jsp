<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>

<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="jqgrid,island" />
</jsp:include>
<script type="text/javascript">

var all=true;
var selected_detp_cd='2106';
var island=null;
	$(function() {
        $("select#dept").change(function() {
        	$("select#plant option").remove();
            var comboValue=$(this).find("option:selected").val();
            var findplant = $(island).find("island[dept_cd="+comboValue+"] plant");
            if(findplant.length<=1){
            	$("select#plant").hide();
            }else{
            	$("select#plant").show();
            }
            findplant.each(function (index){
				 	var plant_cd=$(this).attr('plant_cd');
					var plant_nm=$(this).attr('plant_nm');
					$("select#plant").append("<option    value='"+plant_cd+"'   plant_cd='"+plant_cd+"'>["+plant_cd+"] "+plant_nm+"</option>");						
			});
	
        });
		
		
		
		
		
		
		$.ajax({
			type:"POST",
			url:"./islanddata.jsp",
			data:{
//				"ip":$('#ip').val(),
//				"port":$('#port').val(),
//				"id":$('#id').val(),
//				"pwd":$('#pwd').val(),
//				"sid":$('#sid').val(),
//				"db":$('#db').val(),
//				"sql":$('#sql').val()
				},
			dataType:"xml",
			async:false,
			success:function(data,textStatus){
					//alert("�ߺ��½��ϴ�");
					island = data;
					$("select#dept option").remove();
					if(all){
						$("select#dept").append("<option  dept_cd='9999'>[��ü ����]</option>");						
					}
					$(data).find("island").each(function (index){
						var dept_cd=$(this).attr('dept_cd');
						var dept_nm=$(this).attr('dept_nm');
						var selectedmd = (dept_cd==selected_detp_cd?"selected":"");
						$("select#dept").append("<option  "+selectedmd+"   value='"+dept_cd+"'   dept_cd='"+dept_cd+"'>["+dept_cd+"] "+dept_nm+"</option>");						
					});
					
					$("select#dept").trigger("change");
			},
			error:function(xhr,textStatus,errorThrown){
				alert('���������� �������� ���߽��ϴ�.');
			}
		});
	


		
		
		
		//$("select#plant option").remove();
		
		//alert($("select option:selected").text());
		$("#dept").island({
			plant:"aaaaaaaa"
		}		
		);
		
	});
	
</script>
<body>

</body>
<select id="dept" >
</select>
<select id="plant">
</select>

</html>