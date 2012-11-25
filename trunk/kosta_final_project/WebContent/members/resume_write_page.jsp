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
				fifth.style.display="none";			
			}			
		}
		
	</script>
</head>
<body>
<center>
<div class="container">
	<form name="resume_frm" method="post" action="insert_resume.do" enctype="multipart/form-data">
	<div id="add_photo">
		���� �ø��� <input type="file" name="uploadFile" id="insert_photo"/>
	</div>
	<div id="first">
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/><br/>��<br/><br/>��<br/><br/>��</td>
			<td rowspan="6" width="135">
				<img src="<%=request.getContextPath()%>/images/members/default_photo.jpg" border="1"				
				width="120" height="150" id="photo_id" alt="default_photo"/>
			</td> 
			<td rowspan="3" width="30">��<br/><br/>��</td>
			<td width="35" height="25">�ѱ�</td>
			<td width="130" height="25">
				<input type="text" name="resume_name_kor" size="16"/>
			</td>			
			<td colspan="2" width="120" height="25">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td colspan="4" height="25">
				<input type="text" name="resume_position" size="27"/>
			</td>			
		</tr>
		<tr>			
			<td height="25">����</td>
			<td height="25">
				<input type="text" name="resume_name_eng" size="16"/>
			</td>			
			<td colspan="2" height="25">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td colspan="4" height="25">
				<input type="text" name="resume_salary" size="27"/>
			</td>			
		</tr>
		<tr>			
			<td height="25">����</td>
			<td height="25">
				<input type="text" name="resume_name_chc" size="16"/>
			</td>
			<td height="25" width="35">����</td>
			<td height="25" width="85">
				<input type="radio" id="radio1" name="radio" value="a" checked="checked"/>��
				<input type="radio" id="radio2" name="radio" value="b"/>��			
			</td>
			<td height="25" width="35">����</td>
			<td height="25" width="65">
				<input type="text" name="resume_age" size="7"/>
			</td>
			<td height="25" width="35">����</td>			
			<td height="25" width="65">
				<input type="text" name="resume_nationality" size="7"/>
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">��&nbsp;��</td>
			<td height="25" colspan="7">
				<input type="text" name="resume_address" size="63"/>
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">�ֹι�ȣ</td>			
			<td height="25">
				<input type="text" name="resume_jumin" size="16"/>
			</td>			
			<td height="25" colspan="2">e-mail</td>			
			<td height="25" colspan="4">
				<input type="text" name="resume_email" size="27"/>
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">��ȭ��ȣ</td>			
			<td height="25">
				<input type="text" name="resume_phone" size="16"/>
			</td>			
			<td height="25" colspan="2">��&nbsp;��&nbsp;��</td>			
			<td height="25" colspan="4">
				<input type="text" name="resume_call" size="27"/>
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
			<td height="25"><input type="text" name="resume_previous1" size="24"/></td>
			<td><input type="text" name="resume_school1" size="19"/></td>
			<td><input type="text" name="resume_specialty1" size="20"/></td>
			<td><input type="text" name="resume_location1" size="7"/></td>
			<td><input type="text" name="resume_credit1" size="9"/></td>
		</tr>
		<tr>
			<td height="25"><input type="text" name="resume_previous2" size="24"/></td>
			<td><input type="text" name="resume_school2" size="19"/></td>
			<td><input type="text" name="resume_specialty2" size="20"/></td>
			<td><input type="text" name="resume_location2" size="7"/></td>
			<td><input type="text" name="resume_credit2" size="9"/></td>
		</tr>
		<tr>
			<td height="25"><input type="text" name="resume_previous3" size="24"/></td>
			<td><input type="text" name="resume_school3" size="19"/></td>
			<td><input type="text" name="resume_specialty3" size="20"/></td>
			<td><input type="text" name="resume_location3" size="7"/></td>
			<td><input type="text" name="resume_credit3" size="9"/></td>
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
			<td height="25"><input type="text" name="resume_certificate1" size="14"/></td>
			<td><input type="text" name="resume_acquisition1" size="14"/></td>
			<td><input type="text" name="resume_publish1" size="15"/></td>
			<td width="3">&nbsp;</td>
			<td><input type="text" name="resume_programingname1" size="24"/></td>
			<td><input type="text" name="resume_programingability1" size="10"/></td>
		</tr>
		<tr>
			<td height="25"><input type="text" name="resume_certificate2" size="14"/></td>
			<td><input type="text" name="resume_acquisition2" size="14"/></td>
			<td><input type="text" name="resume_publish2" size="15"/></td>
			<td width="3">&nbsp;</td>
			<td><input type="text" name="resume_programingname2" size="24"/></td>
			<td><input type="text" name="resume_programingability2" size="10"/></td>
		</tr>
		<tr>
			<td height="25"><input type="text" name="resume_certificate3" size="14"/></td>
			<td><input type="text" name="resume_acquisition3" size="14"/></td>
			<td><input type="text" name="resume_publish3" size="15"/></td>
			<td width="3">&nbsp;</td>
			<td><input type="text" name="resume_programingname3" size="24"/></td>
			<td><input type="text" name="resume_programingability3" size="10"/></td>
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
			<td height="25"><input type="text" name="resume_foreign1" size="23"/></td>
			<td><input type="text" name="resume_ability1" size="17"/></td>
			<td>&nbsp;</td>
			<td><input type="text" name="resume_foreigntest1" size="24"/></td>
			<td><input type="text" name="resume_foreigresult1" size="17"/></td>			
		</tr>
		<tr>	
			<td height="25"><input type="text" name="resume_foreign2" size="23"/></td>
			<td><input type="text" name="resume_ability2" size="17"/></td>
			<td>&nbsp;</td>
			<td><input type="text" name="resume_foreigntest2" size="24"/></td>
			<td><input type="text" name="resume_foreigresult2" size="17"/></td>			
		</tr>
		<tr>	
			<td height="25"><input type="text" name="resume_foreign3" size="23"/></td>
			<td><input type="text" name="resume_ability3" size="17"/></td>
			<td>&nbsp;</td>
			<td><input type="text" name="resume_foreigntest3" size="24"/></td>
			<td><input type="text" name="resume_foreigresult3" size="17"/></td>			
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
			<td height="25"><input type="text" name="resume_mili_type" size="17"/></td>			
			<td><input type="text" name="resume_mili_class" size="17"/></td>
			<td><input type="text" name="resume_mili_trench" size="17"/></td>
			<td><input type="text" name="resume_mili_pre" size="30"/></td>			
		</tr>				
	</table>
	</div>
	<br/>
	
	<div id="message1">
		����������� �������� ������ ������ ��ư�� ��������.
		<img src="<%=request.getContextPath()%>/images/members/bt_test.jpg" style="cursor:hand;" id="button1"/>		
	</div>
	
	
	<div id="sixth" style="display:none">
		<div id="message1">
			����������� �������� ������ ������ ��ư�� ��������.
			<img src="<%=request.getContextPath()%>/images/members/bt_test.jpg" style="cursor:hand;" id="button2"/>
		</div>	
		<br/>
	<table border="1" cellspacing="0" cellpadding="0" width="680">		
		<tr>
			<td rowspan="6" width="30">��<br/>��<br/>��<br/>��</td>
			<td width="140" height="25">��&nbsp;��&nbsp;��&nbsp;��&nbsp;��</td>
			<td width="180">��&nbsp;��&nbsp;��&nbsp;��</td>			
			<td width="210">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��</td>
			<td width="120">��&nbsp;��&nbsp;��</td>
		</tr>
		<tr>	
			<td height="25"><input type="text" name="resume_edu1" size="17"/></td>			
			<td><input type="text" name="resume_edu_pre1" size="23"/></td>
			<td><input type="text" name="resume_edu_note1" size="27"/></td>
			<td><input type="text" name="resume_edu_ins1" size="14"/></td>			
		</tr>		
		<tr>	
			<td height="25"><input type="text" name="resume_edu2" size="17"/></td>			
			<td><input type="text" name="resume_edu_pre2" size="23"/></td>
			<td><input type="text" name="resume_edu_note2" size="27"/></td>
			<td><input type="text" name="resume_edu_ins2" size="14"/></td>			
		</tr>	
		<tr>	
			<td height="25"><input type="text" name="resume_edu3" size="17"/></td>			
			<td><input type="text" name="resume_edu_pre3" size="23"/></td>
			<td><input type="text" name="resume_edu_note3" size="27"/></td>
			<td><input type="text" name="resume_edu_ins3" size="14"/></td>			
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
			<td height="25"><input type="text" name="resume_care_name1" size="17"/></td>			
			<td><input type="text" name="resume_care_pre1" size="23"/></td>
			<td><input type="text" name="resume_care_busi1" size="27"/></td>
			<td><input type="text" name="resume_care_retirement1" size="14"/></td>			
		</tr>		
		<tr>	
			<td height="25"><input type="text" name="resume_care_name2" size="17"/></td>			
			<td><input type="text" name="resume_care_pre2" size="23"/></td>
			<td><input type="text" name="resume_care_busi2" size="27"/></td>
			<td><input type="text" name="resume_care_retirement2" size="14"/></td>
		</tr>	
		<tr>	
			<td height="25"><input type="text" name="resume_care_name3" size="17"/></td>			
			<td><input type="text" name="resume_care_pre3" size="23"/></td>
			<td><input type="text" name="resume_care_busi3" size="27"/></td>
			<td><input type="text" name="resume_care_retirement3" size="14"/></td>
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
			<td height="25"><input type="text" name="resume_blood" size="21"/></td>			
			<td><input type="text" name="resume_sight" size="21"/></td>
			<td><input type="text" name="resume_religion" size="21"/></td>
			<td><input type="text" name="resume_family" size="22"/></td>			
		</tr>						
	</table>
	</div>
	<div id="open_resume">
		<input type="checkbox" name="resume_check" checked="checked"/>�̷¼��� �����մϴ�.
	</div>
	<div>
		<input type="image" src="<%=request.getContextPath()%>/images/members/submit.gif" alt="�ۼ��Ϸ�"/>
		
		<input type="image" src="<%=request.getContextPath()%>/images/members/passsubmit.gif" alt="���߿� �ۼ�"/>
		 
	</div>
</form>
</div>
</center>	
</body>
</html>