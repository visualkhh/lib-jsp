<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="../JavascriptUtil/jquery.js"></script>

<script type="text/javascript">
        $(function() {
            $("input#execute").click(function() {
				executeQuery();
            });
            $("input#excelexport").click(function(){
            	$('#table').val($('#result').html());
            	$('#excelform').submit();
            });
        });

function executeQuery(){
/*
alert('ip '+ $('#ip').val());
alert('port '+ $('#port').val());
alert('id '+ $('#id').val());
alert('pwd '+ $('#pwd').val());
alert('db '+ $('#db').val());
alert('sql '+ $('#sql').val());
*/
$('#result').html("...");
					$.ajax({
						type:"POST",
						url:"./sqlreceiver.jsp",
						data:{
							"ip":$('#ip').val(),
							"port":$('#port').val(),
							"id":$('#id').val(),
							"pwd":$('#pwd').val(),
							"sid":$('#sid').val(),
							"db":$('#db').val(),
							"sql":$('#sql').val()
							},
						async:false,
						success:function(data,textStatus){
								alert("잘보냈습니다");
								$('#result').html(data);
								//document.getElementById('innerPage').innerHTML=data;	
						},
						error:function(xhr,textStatus,errorThrown){
							alert('실패하였습니다');
						}
					});
				
					
					
}
</script>
</head>
<body>
	<table >
		<tr>
			<td>ip : <input type="text"  id="ip"/> </td>  <td> port :  <input type="text"  id="port"/> </td>   <td> id : <input type="text" id="id" />  </td> <td> pwd : <input type="text" id="pwd"/>  </td> <td> sid : <input type="text" id="sid"/>  </td> <td> <select id="db"> <option value="oracle">oracle</option> </select>  </td>
		</tr>
		<tr>
		<td colspan="5">
		<textarea style="width: 100%; height: 151px" id="sql"></textarea>
		</td>				
		<td>
		<input type="button" id="execute" value="ExecuteQuery"/>
		
		</td>
		</tr>
	</table>
				<div id="result">result Area!</div><p>
				<input type="button" id="excelexport" value="excel exeport."/>
				<form action="../ExcelExport/exceldownloader.jsp" method="POST" id="excelform">
				<input type="text" name="table" id="table"/>
				</form>
</body>
</html>