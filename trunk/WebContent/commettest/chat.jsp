<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=com.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY %>" />
</jsp:include>
<script type="text/javascript">
      function pollMessage() {
        /*  new Ajax.Updater({ success: 'panel' }, '/broadcaster', {
              method: 'get',
              insertion: 'bottom',
              onComplete: pollMessage
          });*/
      	  $.ajax({
    			type:"POST",
    			url:"<%=request.getContextPath()%>/CommetServlet",
    			dataType:"txt",
    			async:true,
    			success:function(data,textStatus){
    				$("#panel").append(data);
    					//alert("pollMessage �ߺ��½��ϴ�"+data);
    					pollMessage();
    			},
    			error:function(xhr,textStatus,errorThrown){
    				alert('pollMessage ����');
    			}
    		});
      }
      function sendMessage() {
    //	  alert($('#text').val());
    	 // alert(('#text').val()+'aaa'+$('#name').val());
    	 // return false;
    	  
    	  $.ajax({
  			type:"POST",
  			url:"<%=request.getContextPath()%>/CommetRequestServlet",
  			data:{
  				nick: $('#name').val(), 
  				text: $('#text').val() 
  				},
  			dataType:"txt",
  			async:true,
  			success:function(data,textStatus){
  					//alert("�ߺ��½��ϴ�."+data);
  					
  			},
  			error:function(xhr,textStatus,errorThrown){
  				alert('����');
  			}
  		});
    	  $('#text').val("");
          return false;
      }
      
  	$(function() {
  		pollMessage();
  	});
  </script>

</head>
<body>
  <h1>--</h1>
  <div id="panel"></div>
  <form action="" method="POST" onsubmit="return sendMessage()">
      Nick <input type="text" name="name" id="name" size="10">
      <input type="text" name="text" id="text" size="40">
      <input type="submit" value="������">
  </form>
</body>
</html>