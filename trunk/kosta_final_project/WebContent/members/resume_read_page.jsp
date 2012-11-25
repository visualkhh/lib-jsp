<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>Insert title here</title>
	<style type="text/css">
		#first, #second, #third, #fourth, #fifth, #sixth,
		#seventh, #eighth, #open_resume, #message1, #add_photo{
			color:#708090;
			text-decoration:none;
			font-family: ����ü,�����ü;
			line-height:130%;
			font-weight:700;
			font-size:9pt;		
		}
		#add_photo{
			width:640px;			
			text-align : left;
		}
		#open_resume {
			width: 640px;
			height : 40px;
			margin: 0px 0px 0px 5px;
			padding: 2px 0px;			
			text-align: right;
		}
		#message1{
			width: 400px;
			height : 15px;			
			margin: 0px 0px 0px 5px;
			padding: 2px 0px;				
		}

		form{
			margin:0px;
		}		
	</style>
	
	<script type="text/javascript" src="/final_project/members/ajax.js"></script>	
	
	<script type="text/javascript">
	/*
		window.onload = function(){			
			var button1 = document.getElementById("button1");
			var button2 = document.getElementById("button2");
			var radio1 = document.getElementById("radio1");
			var radio2 = document.getElementById("radio2");
			var insert_ph = document.getElementById("insert_photo");
			
								
			ajax.Event.addListener(button1, "click", add_sixth1);
			ajax.Event.addListener(button2, "click", add_sixth2);
			ajax.Event.addListener(radio1, "click", add_mill);						
			ajax.Event.addListener(radio2, "click", add_mill);		
			ajax.Event.addListener(insert_ph, "change", change_photo);			
		}
						
		function change_photo(){				
			var photo_id = document.getElementById("photo_id");
			photo_id.src = resume_frm.uploadFile.value;			
		}
				
		function add_sixth1(){			
			var sixth = document.getElementById("sixth");			
			var message = document.getElementById("message1");
			sixth.style.display='';				
			message.style.display="none";
		}
		
		function add_sixth2(){		
			var sixth = document.getElementById("sixth");
			var message = document.getElementById("message1");
			sixth.style.display='none';
			message.style.display="";			
		}
		
		function add_mill(){			
			var radio = document.resume_frm.radio;
			
			for(var i=0; i < radio.length; ++i){
				if(radio[0].checked)
					radio = 'a';
				else
					radio = 'b';
			}	
			
			if(radio == 'a'){			
				var fifth = document.getElementById("fifth");								
				fifth.style.display="";					
			}else{													 
				var fifth = document.getElementById("fifth");
				fifth.style.display="none";s			
			}			
		}
		*/
	</script>
</head>
<body>
<center>
<div class="container">
	<form name="resume_frm" method="post" action="insert_resume.do" enctype="multipart/form-data">	
	<div id="first">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/><br/>��<br/><br/>��<br/><br/>��</td>
			<td rowspan="6" width="135">
				<img src="<%=request.getContextPath()%>/images/photo/${resume.resume_photo }" border="1"				
				width="120" height="150" id="photo_id" alt="default_photo"/>
			</td> 
			<td rowspan="3" width="30">��<br/><br/>��</td>
			<td width="35" height="25">�ѱ�</td>
			<td width="130" height="25">
				${resume.resume_name_kor }
			</td>			
			<td colspan="2" width="120" height="25">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td colspan="4" height="25">
				${resume.resume_position }
			</td>			
		</tr>
		<tr>			
			<td height="25">����</td>
			<td height="25">
				${resume.resume_name_eng }
				
			</td>			
			<td colspan="2" height="25">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td colspan="4" height="25">
				${resume.resume_salary }				
			</td>			
		</tr>
		<tr>			
			<td height="25">����</td>
			<td height="25">
				${resume.resume_name_chc }				
			</td>
			<td height="25" width="35">����</td>
			<td height="25" width="85">
				${resume.radio }							
			</td>
			<td height="25" width="35">����</td>
			<td height="25" width="65">
				${resume.resume_age }	
			</td>
			<td height="25" width="35">����</td>			
			<td height="25" width="65">
				${resume.resume_nationality }				
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">��&nbsp;��</td>
			<td height="25" colspan="7">
				${resume.resume_address }
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">�ֹι�ȣ</td>			
			<td height="25">
				${resume.resume_jumin }				
			</td>			
			<td height="25" colspan="2">e-mail</td>			
			<td height="25" colspan="4">
				${resume.resume_email }				
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">��ȭ��ȣ</td>			
			<td height="25">
				${resume.resume_phone }				
			</td>			
			<td height="25" colspan="2">��&nbsp;��&nbsp;��</td>			
			<td height="25" colspan="4">
				${resume.resume_call }				
			</td>	
		</tr>		
	</table>
	</div>
	<br/>
	
	<div id="second">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/><br/>��</td>
			<td width="190" height="25">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��</td>
			<td width="150">��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="160">��&nbsp;&nbsp;&nbsp;&nbsp;��</td>
			<td width="70">��������</td>
			<td width="80">��&nbsp;��</td>	
		</tr>
		<tr>
			<td height="25">${resume.resume_previous1 }</td>
			<td>${resume.resume_school1 }</td>
			<td>${resume.resume_specialty1 }</td>
			<td>${resume.resume_location1 }</td>
			<td>${resume.resume_credit1 }</td>
		</tr>
		<tr>
			<td height="25">${resume.resume_previous2 }</td>
			<td>${resume.resume_school2 }</td>
			<td>${resume.resume_specialty2 }</td>
			<td>${resume.resume_location2 }</td>
			<td>${resume.resume_credit2 }</td>
		</tr>
		<tr>
			<td height="25">${resume.resume_previous3 }</td>
			<td>${resume.resume_school3 }</td>
			<td>${resume.resume_specialty3 }</td>
			<td>${resume.resume_location3 }</td>
			<td>${resume.resume_credit3 }</td>
		</tr>
	</table>
	</div>
	<br/>
	<div id="third">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/>��<br/>��<br/>��</td>
			<td width="120" height="25">��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="120">��&nbsp;&nbsp;��&nbsp;&nbsp;��</td>
			<td width="130">��&nbsp;&nbsp;��&nbsp;&nbsp;ó</td>
			<td width="3">&nbsp;</td>
			<td width="187">��&nbsp;��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="90">��&nbsp;&nbsp;��</td>	
		</tr>
		<tr>
			<td height="25">${resume.resume_certificate1 }</td>
			<td>${resume.resume_acquisition1 }</td>
			<td>${resume.resume_publish1 }</td>
			<td width="3">&nbsp;</td>
			<td>${resume.resume_programingname1 }</td>
			<td>${resume.resume_programingability1 }</td>
		</tr>
		<tr>
			<td height="25">${resume.resume_certificate2 }</td>
			<td>${resume.resume_acquisition2 }</td>
			<td>${resume.resume_publish2 }</td>
			<td width="3">&nbsp;</td>
			<td>${resume.resume_programingname2 }</td>
			<td>${resume.resume_programingability2 }</td>
		</tr>
		<tr>
			<td height="25">${resume.resume_certificate3 }</td>
			<td>${resume.resume_acquisition3 }</td>
			<td>${resume.resume_publish3 }</td>
			<td width="3">&nbsp;</td>
			<td>${resume.resume_programingname3 }</td>
			<td>${resume.resume_programingability3 }</td>
		</tr>
	</table>
	</div>
	<br/>
	<div id="fourth">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/>��<br/>��<br/>��<br/>��</td>
			<td width="179" height="25">��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="139">��&nbsp;��</td>
			<td width="3">&nbsp;</td>
			<td width="189">��&nbsp;��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="140">��&nbsp;��&nbsp;��&nbsp;��</td>
		</tr>
		<tr>	
			<td height="25">${resume.resume_foreign1 }</td>
			<td>${resume.resume_ability1 }</td>
			<td>&nbsp;</td>
			<td>${resume.resume_foreigntest1 }</td>
			<td>${resume.resume_foreigresult1 }</td>			
		</tr>
		<tr>	
			<td height="25">${resume.resume_foreign2 }</td>
			<td>${resume.resume_ability2 }</td>
			<td>&nbsp;</td>
			<td>${resume.resume_foreigntest2 }</td>
			<td>${resume.resume_foreigresult2 }</td>			
		</tr>
		<tr>	
			<td height="25">${resume.resume_foreign3 }</td>
			<td>${resume.resume_ability3 }</td>
			<td>&nbsp;</td>
			<td>${resume.resume_foreigntest3 }</td>
			<td>${resume.resume_foreigresult3 }</td>			
		</tr>	
	</table>
	</div>
	
	<div id="fifth">
	<br/>
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/>��</td>
			<td width="140" height="25">��&nbsp;&nbsp;��</td>
			<td width="140">��&nbsp;&nbsp;��</td>			
			<td width="140">��&nbsp;&nbsp;��</td>
			<td width="230">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��</td>
		</tr>
		<tr>	
			<td height="25">${resume.resume_mili_type }</td>			
			<td>${resume.resume_mili_class }</td>
			<td>${resume.resume_mili_trench }</td>
			<td>${resume.resume_mili_pre }</td>			
		</tr>				
	</table>
	</div>
	<br/>
	
	<div id="sixth">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/>��<br/>��<br/>��</td>
			<td width="140" height="25">��&nbsp;��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="180">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td width="210">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��</td>
			<td width="120">��&nbsp;��&nbsp;��</td>
		</tr>
		<tr>	
			<td height="25">${resume.resume_edu1 }</td>			
			<td>${resume.resume_edu_pre1 }</td>
			<td>${resume.resume_edu_note1 }</td>
			<td>${resume.resume_edu_ins1 }</td>			
		</tr>		
		<tr>	
			<td height="25">${resume.resume_edu2 }</td>			
			<td>${resume.resume_edu_pre2 }</td>
			<td>${resume.resume_edu_note2 }</td>
			<td>${resume.resume_edu_ins2 }</td>			
		</tr>	
		<tr>	
			<td height="25">${resume.resume_edu3 }</td>			
			<td>${resume.resume_edu_pre3 }</td>
			<td>${resume.resume_edu_note3 }</td>
			<td>${resume.resume_edu_ins3 }</td>			
		</tr>			
	</table>
	</div>
	<br/>		
	<div id="seventh">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/><br/>��</td>
			<td width="140" height="25">ȸ&nbsp;��&nbsp;��</td>
			<td width="180">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td width="210">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��</td>
			<td width="120">��&nbsp;��&nbsp;��&nbsp;��</td>
		</tr>
		<tr>	
			<td height="25">${resume.resume_care_name1 }</td>			
			<td>${resume.resume_care_pre1 }</td>
			<td>${resume.resume_care_busi1 }</td>
			<td>${resume.resume_care_retirement1 }</td>			
		</tr>		
		<tr>	
			<td height="25">${resume.resume_care_name2 }</td>			
			<td>${resume.resume_care_pre2 }</td>
			<td>${resume.resume_care_busi2 }</td>
			<td>${resume.resume_care_retirement2 }</td>
		</tr>	
		<tr>	
			<td height="25">${resume.resume_care_name3 }</td>			
			<td>${resume.resume_care_pre3 }</td>
			<td>${resume.resume_care_busi3 }</td>
			<td>${resume.resume_care_retirement3 }</td>
		</tr>			
	</table>
	</div>
	<br/>	

	<div id="eighth">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td width="180" height="25">��&nbsp;��&nbsp;��</td>
			<td width="180">��&nbsp;&nbsp;��</td>
			<td width="180">��&nbsp;&nbsp;��</td>			
			<td width="200">��&nbsp;��&nbsp;��&nbsp;��</td>			
		</tr>
		<tr>	
			<td height="25">${resume.resume_blood }</td>			
			<td>${resume.resume_sight }</td>
			<td>${resume.resume_religion }</td>
			<td>${resume.resume_family }</td>			
		</tr>						
	</table>
	</div>
	<div id="open_resume">
		<input type="checkbox" name="resume_check" checked="checked"/>�̷¼��� �����մϴ�.
	</div>
	<div>		
		<a href="<%=request.getContextPath() %>/member/move_main.do"><img src="" alt="Ȯ��" border="0" style="cursor:hand"/></a>
		�����ϱ� 		 
	</div>
</form>
</div>
</center>	
</body>
</html>