<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>Insert title here</title>
	<style type="text/css">
		.container1 {
			width: 963px;	/*너비*/
			height : 450px;
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 0px; 	/*패딩(테두리안쪽공간): 전체*/			
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
		.error_message {
			position:absolute;
			left: 90px;
			top: 300px;			
			width: 300px;	/*너비*/
			height : 60px;
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 0px; 	/*패딩(테두리안쪽공간): 전체*/			
			
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
		.inner_container, .joinform_container1, .joinform_container2 {
			width: 500px;	/*너비*/
			height : 450px;
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 0px; 	/*패딩(테두리안쪽공간): 전체*/
			/*border: 1px solid red;	테두리: 굵기, 타입, 색깔*/
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
		#check_radio {
			width: 200px;	/*너비*/
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 10px; 	/*패딩(테두리안쪽공간): 전체*/			
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
		#atype, #btype, #check_radio, #ctype {
			color:#708090;
			text-decoration:none;
			font-family: 굴림체,양재블럭체;
			line-height:130%;
			font-weight:700;
			font-size:9pt;
		}
		
		form{
			margin: 0px;
		}
		
		.button1 {
			width: 50px;
			height : 16px;
			
			margin: 0px 0px 0px 5px;
			padding: 2px 0px;
			/*	border: 1px solid #3B6E22; */	
			cursor: pointer;
			text-align: center;
			float: center;
			background-image: url("/final_project/images/members/UILinkButton_Blue[1].png");
		}
				
		.button1 p{
			color: #ffffff;
			font-weight: bold;
			font-size: 12px;
			text-decoration: none;
		}

	</style>
	
	<script type="text/javascript" src="/final_project/members/ajax.js"></script>	
	
	<script type="text/javascript">
		window.onload = function(){			
			var radio1 = document.getElementById("radio1");
			var radio2 = document.getElementById("radio2");
			var c_bt1 = document.getElementById("conf_button1");
			var c_bt2 = document.getElementById("conf_button2");
			ajax.Event.addListener(radio1, "click", check_radio);
			ajax.Event.addListener(radio2, "click", check_radio);
			ajax.Event.addListener(c_bt1, "click", move_join);
			ajax.Event.addListener(c_bt2, "click", move_join);
		}
		
		function change_form(){
			var radio = document.join1.radio;
			
			for(var i=0; i < radio.length; ++i){
				if(radio[0].checked)
					radio = 'a';
				else
					radio = 'b';
			}
			
			document.join2.radio.value = radio;
			
			if(radio == 'a'){				
				var user_name = document.join1.user_name.value;
				var user_jumin1 = document.join1.user_jumin1.value;
				var user_jumin2 = document.join1.user_jumin2.value;
				var jumin = user_jumin1 + ' - *******';
				
				var td_name = document.getElementById("td_name");
				var td_jumin = document.getElementById("td_jumin");
				
				td_name.innerText = user_name;
				td_jumin.innerText = jumin;
				
				document.join2.user_name.value = user_name;
				document.join2.user_jumin1.value = user_jumin1;
				document.join2.user_jumin2.value = user_jumin2;
				
				var check_type_c = document.getElementById("ctype");
				var check_type_d = document.getElementById("dtype");
				check_type_d.style.display="none";				
				check_type_c.style.display="";					
			}else{				
				var company_name = document.join1.company_name.value;
				var company_licensenumber = document.join1.company_licensenumber.value;
				var star = '';
				for(var i=0; i < company_licensenumber.length-1; ++i){
					star += '*';
				}
				
				company_license = company_licensenumber.substring(0, 1) + star;
				
				
				
				var td_name = document.getElementById("td_company_name");
				var td_licensenumber = document.getElementById("td_licensenumber");
													
				td_name.innerText = company_name;
				td_licensenumber.innerText = company_license;
				
				document.join2.company_name.value = company_name;
				document.join2.company_licensenumber.value = company_licensenumber;
																	 
				var check_type_e = document.getElementById("etype");
				var check_type_d = document.getElementById("dtype");
				check_type_d.style.display="none";				
				check_type_e.style.display="";
			}			
		}
		
		function check_radio(e){		
			var event = window.event || e;
			var check_type_a = document.getElementById("atype");
			var check_type_b = document.getElementById("btype");
			
			var target = ajax.Event.getTarget(event);
			if(target.id=='radio1'){
				check_type_a.style.display="";
				check_type_b.style.display="none";
			}else if(target.id='radio2'){
				check_type_b.style.display="";
				check_type_a.style.display="none";
			}		
		}
		
		function checkNumber(e){
			var event = window.event || e;
          	if((event.keyCode<48)||(event.keyCode>57))
          		event.returnValue = false;
       	}    
       	
       	function checklength(){       	
   			if(document.join1.user_jumin1.value.length==6){
     			document.join1.user_jumin2.focus();
     			return;
    		}
  		}   
  		
  		function JuminCheck(jumin1, jumin2){
			check = false;
			total = 0;
			temp = new Array(13);
				
			for(i=1; i<=6; i++){
				temp[i] = jumin1.charAt(i-1);
			}
			
			for(i=7; i<=13; i++){
				temp[i] = jumin2.charAt(i-7);
			}
				 
			for(i=1; i<=12; i++){
				k = i + 1;
				if(k >= 10)
					k = k % 10 + 2;
				total = total + temp[i] * k;
			}
				
			mm = temp[3] + temp[4];
			dd = temp[5] + temp[6];
							
			totalmod = total % 11;
			chd = 11 - totalmod;
			
			if(chd == 11){
				chd = 1;
			}
			else if(chd == 10){
				chd = 0;
			}
			if(chd == temp[13] && mm < 13 && dd < 32 && (temp[7]==1 || temp[7]==2)){
				check=true;					
			}
			return check;
		}	
		
		
		function move_join(){
			var view = document.getElementById("opacity");
			var radio = document.join1.radio;
			
			for(var i=0; i < radio.length; ++i){
				if(radio[0].checked)
					radio = 'a';
				else
					radio = 'b';
			}
			if(radio == 'a'){												
				if(join1.user_name.value == null || join1.user_name.value.length == 0){				
					ajax.GUI.setOpacity(view, eval(0.2));				
					alert("이름을 입력하세요.");
					ajax.GUI.setOpacity(view, eval(1.0));
					join1.user_name.focus();
					return;
				}
				
				if(join1.user_jumin1.value.length == 0){
					ajax.GUI.setOpacity(view, eval(0.2));	
					alert("주민등록번호 앞 자리를 입력하세요.");
					ajax.GUI.setOpacity(view, eval(1.0));
					join1.user_jumin1.focus();
					join1.user_jumin2.value='';
					return;
				}else{
					if(join1.user_jumin1.value.length != 6){
						ajax.GUI.setOpacity(view, eval(0.2));	
						alert("주민등록번호 앞 자리가 올바르지 않습니다.");
						ajax.GUI.setOpacity(view, eval(1.0));
						join1.user_jumin1.focus();
						join1.user_jumin1.value='';
						join1.user_jumin2.value='';
						return;
					}
				}
				
				if(join1.user_jumin1.value.length == 0){
					ajax.GUI.setOpacity(view, eval(0.2));	
					alert("주민등록번호 뒷 자리를 입력하세요.");
					ajax.GUI.setOpacity(view, eval(1.0));
					join1.user_jumin2.focus();
					return;
				}else{
					if(join1.user_jumin2.value.length != 7){
						ajax.GUI.setOpacity(view, eval(0.2));	
						alert("주민등록번호 뒷 자리가 올바르지 않습니다.");
						ajax.GUI.setOpacity(view, eval(1.0));
						join1.user_jumin2.focus();
						join1.user_jumin2.value='';
						return;
					}
				}
				
				if(!JuminCheck(join1.user_jumin1.value, join1.user_jumin2.value)){
					ajax.GUI.setOpacity(view, eval(0.2));	
					alert("주민등록번호가 올바르지 않습니다.");
					ajax.GUI.setOpacity(view, eval(1.0));
					join1.user_jumin1.focus();
					join1.user_jumin1.value='';
					join1.user_jumin2.value='';						
					return;
				}
			}else if(radio == 'b'){
				if(join1.company_name.value == null || join1.company_name.value.length == 0){	
					ajax.GUI.setOpacity(view, eval(0.2));								
					alert("기업명을 입력하세요.");
					ajax.GUI.setOpacity(view, eval(1.0));
					join1.company_name.focus();				
					return;
				}
				
				if(join1.company_licensenumber.value.length == 0 || join1.company_licensenumber.value == null){				
					ajax.GUI.setOpacity(view, eval(0.2));	
					alert("사업자번호를 입력하세요.");
					ajax.GUI.setOpacity(view, eval(1.0));
					join1.company_licensenumber.focus();				
					return;
				}
			}					
				
			change_form();						
		}
		
		
		
		function check_form(){			
			var radio = document.join2.radio.value;
			var message = '';	
			
			if(radio == 'a'){			
				if(join2.user_id.value == null || join2.user_id.value.length == 0){
					message = '<p>아이디를 입력하세요.</p>';					
				}
				
				if(join2.user_pass.value.length == 0){
					message += '<p>패스워드를 입력하세요.</p>';					
				}else{
					if(join2.user_pass.value != join2.user_pass1.value){
						message += '<p>패스워드를 확인해주세요.</p>';						
					}
				}
				
				if(join2.user_phone.value == null || join2.user_phone.value.length == 0){
					message += '<p>전번을 입력하세요.</p>';
				}
				
				if(join2.user_email.value == null || join2.user_email.value.length == 0){
					message += '<p>이메일을 적어주세요.</p>';
				}else{
					var email = join2.user_email.value;
					if(email.indexOf('@') == -1){
						message += '<p>이메일 형식이 잘못됐네요.</p>';
					}
				}				
			}else if(radio == 'b'){				
				if(join2.company_id.value == null || join2.company_id.value.length == 0){
					message = '<p>아이디를 입력하세요.</p>';					
				}
				
				if(join2.company_pass.value.length == 0){
					message += '<p>패스워드를 입력하세요.</p>';					
				}else{
					if(join2.company_pass.value != join2.company_pass1.value){
						message += '<p>패스워드를 확인해주세요.</p>';						
					}
				}
				
				if(join2.company_phone.value == null || join2.company_phone.value.length == 0){
					message += '<p>전번을 입력하세요.</p>';
				}
				
				if(join2.company_email.value == null || join2.company_email.value.length == 0){
					message += '<p>이메일을 적어주세요.</p>';
				}else{
					var email = join2.company_email.value;
					if(email.indexOf('@') == -1){
						message += '<p>이메일 형식이 잘못됐네요.</p>';
					}
				}
			}
									
			if(message.length != 0){			
				var error_msg = document.getElementById("error_msg");
				error_msg.style.display='';
				error_msg.innerHTML = message;
				return false;
			}else{			
				return true;			
			}
		}
	
	</script>
</head>
<body>
<div class="container1" id="opacity">
	<div class="error_message" id="error_msg" style="display:none; color: red;"></div>
	
	<div class="inner_container" id="dtype">
		<br /><br /><br /><br /><br /><br /><br /><br /><br />
		<form name="join1">			
			<div id="check_radio">
				<input type="radio" id="radio1" name="radio" value="a" checked="checked"/>일반회원
				&nbsp;&nbsp;<input id="radio2" type="radio" name="radio" value="b"/>기업회원
			</div>
				
			<div id="atype">
				<table border=0 width="240" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center" width="90" height="30">회 원 명</td>
						<td align="left" width="150"><input type='text' name='user_name' maxlength='8' size='19'/></td>
					</tr>
					<tr>
						<td align="center" width="90" height="30">주민등록번호</td>
						<td align="left" width="150"><input type='text' name='user_jumin1' maxlength='6' size='7' onkeyup="checklength()" onKeyPress="javascript:checkNumber();"/>
						 - <input type='password' name='user_jumin2' maxlength='7' size='7' onKeyPress="javascript:checkNumber();" onKeyDown="if(event.keyCode==13){move_join();}"/></td>
					</tr>
				</table>
				<br />		
				<div class="button1" id="conf_button1"><p>확인</p></div>	
			</div>
			<div id="btype" style="display:none">
				<table border=0 width="240" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center" width="90" height="30">기 업 명</td>
						<td align="left" width="150"><input type='text' name='company_name' maxlength='8' size='19'/></td>
						
					</tr>
					<tr>
						<td align="center" width="90" height="30">사업자번호</td>
						<td align="left" width="150"><input type='password' name='company_licensenumber' size='19' onKeyPress="javascript:checkNumber();" onKeyDown="if(event.keyCode==13){move_join();}"/>					 		
					</tr>
					<tr>
						<td colspan="2">('-'없이 숫자만 입력하세요)</td>
					</tr>				
				</table>
				<br />		
				<div class="button1" id="conf_button2"><p>확인</p></div>	
			</div>
		</form>
	</div>	
	
	<form name="join2" onsubmit="return check_form();" action="join_member.do" method="post">	
	<input type="hidden" name="radio" value=""/>
	
	<div class="joinform_container1" style="display:none" id="ctype">
		<br /><br /><br /><br /><br /><br />
		<input type="hidden" name="user_name" value=""/>
		<input type="hidden" name="user_jumin1" value=""/>
		<input type="hidden" name="user_jumin2" value=""/>
		
		<table border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td align="right" width="110" height="30">회  원  명 : </td>
				<td align="center" width="160" height="30" id="td_name"></td>
				<td width="90"></td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">주 민 번 호 : </td>
				<td align="center" width="160" height="30" id="td_jumin"></td>
				<td width="90"></td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">아  이  디 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="user_id" size='19' maxlength="15"/>
				</td>
				<td width="90">(15자 이하)</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">비 밀 번 호 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="user_pass" size='19' maxlength="15"/>
				</td>
				<td width="90">(15자 이하)</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">비 번 확 인 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="user_pass1" size='19' maxlength="15"/>
				</td>
				<td width="90"></td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">전 화 번 호 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="user_phone" size='19'/>
				</td>
				<td width="90"></td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">이  메  일 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="user_email" size='19'/>
				</td>
				<td width="70"></td>
			</tr>			
		</table>
		<br />
		<input type="image" src="<%=request.getContextPath()%>/images/commons/signin_button.png"/>
	</div>	
	<div class="joinform_container2" style="display:none" id="etype">
		<br /><br /><br /><br />
		<input type="hidden" name="company_name" value=""/>
		<input type="hidden" name="company_licensenumber" value=""/>
		<table border="0" cellspacing="0" cellpadding="0" width="360" height="320">
			<tr>
				<td align="right" width="110" height="30">기  업  명 : </td>
				<td align="center" width="160" height="30" id="td_company_name"></td>
				<td width="90">&nbsp;</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">사업자번호 : </td>
				<td align="center" width="160" height="30" id="td_licensenumber"></td>
				<td width="90">&nbsp;</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">아  이  디 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="company_id" size='19' maxlength="15"/>
				</td>
				<td width="90">(15자 이하)</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">비 밀 번 호 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="company_pass" size='19' maxlength="15"/>
				</td>
				<td width="90">(15자 이하)</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">비 번 확 인 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="company_pass1" size='19' maxlength="15"/>
				</td>
				<td width="90">&nbsp;</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">전 화 번 호 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="company_phone" size='19'/>
				</td>
				<td width="90">&nbsp;</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">팩 스 번 호 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="company_fax" size='19'/>
				</td>
				<td width="90">&nbsp;</td>
			</tr>
			<tr>
				<td align="right" width="110" height="30">이  메  일 : </td>
				<td align="center" width="160" height="30">
					<input type="text" name="company_email" size='19'/>
				</td>
				<td width="70">&nbsp;</td>
			</tr>			
			<tr>
				<td align="right" width="110" height="40">회 사 정 보 : </td>
				<td align="center" height="40" colspan=2>				
					<textarea name='company_info' style='width:233px; height:40px; border:1px #C4CAD1 solid;font-size:9pt;
					 font-family:gulim;line-height:150%;overflow:visible;word-break:break-all;'></textarea>																				
				</td>				
			</tr>
			<tr>
				<td align="right" width="110" height="40">회 사 연 혁 : </td>
				<td align="center" height="40" colspan=2>				
					<textarea name='company_history' style='width:233px; height:40px; border:1px #C4CAD1 solid;font-size:9pt;
					font-family:gulim;line-height:150%;overflow:visible;word-break:break-all;'></textarea>																				
				</td>				
			</tr>			
		</table>
		<br />
		<input type="image" src="<%=request.getContextPath()%>/images/commons/signin_button.png"/>
									
	</div>
	</form>
</div>
</body>
</html>