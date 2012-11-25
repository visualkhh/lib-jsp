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
			font-family: 굴림체,양재블럭체;
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
			<td rowspan="6" width="30">인<br/><br/>적<br/><br/>사<br/><br/>항</td>
			<td rowspan="6" width="135">
				<img src="<%=request.getContextPath()%>/images/photo/${resume.resume_photo }" border="1"				
				width="120" height="150" id="photo_id" alt="default_photo"/>
			</td> 
			<td rowspan="3" width="30">성<br/><br/>명</td>
			<td width="35" height="25">한글</td>
			<td width="130" height="25">
				${resume.resume_name_kor }
			</td>			
			<td colspan="2" width="120" height="25">희&nbsp;망&nbsp;업&nbsp;무</td>			
			<td colspan="4" height="25">
				${resume.resume_position }
			</td>			
		</tr>
		<tr>			
			<td height="25">영문</td>
			<td height="25">
				${resume.resume_name_eng }
				
			</td>			
			<td colspan="2" height="25">희&nbsp;망&nbsp;연&nbsp;봉</td>			
			<td colspan="4" height="25">
				${resume.resume_salary }				
			</td>			
		</tr>
		<tr>			
			<td height="25">한자</td>
			<td height="25">
				${resume.resume_name_chc }				
			</td>
			<td height="25" width="35">성별</td>
			<td height="25" width="85">
				${resume.radio }							
			</td>
			<td height="25" width="35">연령</td>
			<td height="25" width="65">
				${resume.resume_age }	
			</td>
			<td height="25" width="35">국적</td>			
			<td height="25" width="65">
				${resume.resume_nationality }				
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">주&nbsp;소</td>
			<td height="25" colspan="7">
				${resume.resume_address }
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">주민번호</td>			
			<td height="25">
				${resume.resume_jumin }				
			</td>			
			<td height="25" colspan="2">e-mail</td>			
			<td height="25" colspan="4">
				${resume.resume_email }				
			</td>			
		</tr>
		<tr>
			<td height="25" colspan="2">전화번호</td>			
			<td height="25">
				${resume.resume_phone }				
			</td>			
			<td height="25" colspan="2">휴&nbsp;대&nbsp;폰</td>			
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
			<td rowspan="6" width="30">학<br/><br/>력</td>
			<td width="190" height="25">기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간</td>
			<td width="150">출&nbsp;신&nbsp;학&nbsp;교</td>
			<td width="160">전&nbsp;&nbsp;&nbsp;&nbsp;공</td>
			<td width="70">졸업구분</td>
			<td width="80">학&nbsp;점</td>	
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
			<td rowspan="6" width="30">보<br/>유<br/>기<br/>술</td>
			<td width="120" height="25">자&nbsp;격&nbsp;면&nbsp;허</td>
			<td width="120">취&nbsp;&nbsp;득&nbsp;&nbsp;일</td>
			<td width="130">발&nbsp;&nbsp;행&nbsp;&nbsp;처</td>
			<td width="3">&nbsp;</td>
			<td width="187">프&nbsp;로&nbsp;그&nbsp;래&nbsp;밍</td>
			<td width="90">능&nbsp;&nbsp;력</td>	
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
			<td rowspan="6" width="30">외<br/>국<br/>어<br/>능<br/>력</td>
			<td width="179" height="25">외&nbsp;국&nbsp;어&nbsp;명</td>
			<td width="139">능&nbsp;력</td>
			<td width="3">&nbsp;</td>
			<td width="189">외&nbsp;국&nbsp;어&nbsp;시&nbsp;험</td>
			<td width="140">시&nbsp;험&nbsp;점&nbsp;수</td>
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
			<td rowspan="6" width="30">병<br/>역</td>
			<td width="140" height="25">군&nbsp;&nbsp;별</td>
			<td width="140">계&nbsp;&nbsp;급</td>			
			<td width="140">병&nbsp;&nbsp;과</td>
			<td width="230">기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간</td>
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
			<td rowspan="6" width="30">교<br/>육<br/>내<br/>용</td>
			<td width="140" height="25">교&nbsp;육&nbsp;과&nbsp;정&nbsp;명</td>
			<td width="180">교&nbsp;육&nbsp;기&nbsp;간</td>			
			<td width="210">내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용</td>
			<td width="120">기&nbsp;관&nbsp;명</td>
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
			<td rowspan="6" width="30">경<br/><br/>력</td>
			<td width="140" height="25">회&nbsp;사&nbsp;명</td>
			<td width="180">근&nbsp;무&nbsp;기&nbsp;간</td>			
			<td width="210">업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;무</td>
			<td width="120">퇴&nbsp;사&nbsp;사&nbsp;유</td>
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
			<td width="180" height="25">혈&nbsp;액&nbsp;형</td>
			<td width="180">시&nbsp;&nbsp;력</td>
			<td width="180">종&nbsp;&nbsp;교</td>			
			<td width="200">형&nbsp;제&nbsp;관&nbsp;계</td>			
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
		<input type="checkbox" name="resume_check" checked="checked"/>이력서를 공개합니다.
	</div>
	<div>		
		<a href="<%=request.getContextPath() %>/member/move_main.do"><img src="" alt="확인" border="0" style="cursor:hand"/></a>
		수정하기 		 
	</div>
</form>
</div>
</center>	
</body>
</html>