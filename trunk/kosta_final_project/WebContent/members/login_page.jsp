<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
    
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
			border: 1px solid #3F5F92;	/*테두리: 굵기, 타입, 색깔*/
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
		.error_message {
			position:absolute;
			left: 600px;
			top: 220px;			
			width: 300px;	/*너비*/
			height : 60px;
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 0px; 	/*패딩(테두리안쪽공간): 전체*/			
			text-decoration:none;
			font-family: 굴림체,양재블럭체;
			line-height:130%;			
			font-size:8pt;
			text-align: left;	/*내부텍스트정렬: 좌측정렬*/
		}
		#error_inv {
			position:absolute;
			left: 400px;
			top: 145px;			
			width: 300px;	/*너비*/
			height : 60px;
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 0px; 	/*패딩(테두리안쪽공간): 전체*/			
			text-decoration:none;			
			line-height:130%;			
			font-size:8pt;
			text-align: left;	/*내부텍스트정렬: 좌측정렬*/
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
					
			ajax.Event.addListener(radio1, "click", check_radio);
			ajax.Event.addListener(radio2, "click", check_radio);						
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
		
		function login_check(){
			var view = document.getElementById("opacity");
			var radio = document.join.radio;
			
			for(var i=0; i < radio.length; ++i){
				if(radio[0].checked)
					radio = 'a';
				else
					radio = 'b';
			}			
		}		
	
	</script>
</head>
<body>
<div class="container1" id="opacity">

	<spring:hasBindErrors name="member"/>
	<div class="error_message" id="error_msg" style="color: red;">
		<form:errors path="member.user_id"/><br/><br/>
		<form:errors path="member.user_pass"/>	
		<form:errors path="member.company_id"/><br/><br/>		
		<form:errors path="member.company_pass"/>
	</div>
	<div class="inner_container" id="dtype">
		<br /><br /><br /><br /><br /><br /><br /><br /><br />
		<div id = "error_inv" style="color : red; font-size: 13px;">		
			${command.company_pass }		
		</div>
		<form name="join" onsubmit="return login_check();" method="post" action="login_page.do">			
			<div id="check_radio">
				<input type="radio" id="radio1" name="radio" value="a" checked="checked"/>일반회원
				&nbsp;&nbsp;<input id="radio2" type="radio" name="radio" value="b"/>기업회원
			</div>
				
			<div id="atype">
				<table border=0 width="240" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center" width="90" height="30">아 이 디</td>
						<td align="left" width="150"><input type='text' name='user_id' maxlength='8' size='19'/></td>
					</tr>
					<tr>
						<td align="center" width="90" height="30">비밀번호</td>
						<td align="left" width="150"><input type='password' name='user_pass' size='19'/></td>
					</tr>
				</table>
				<br />				
			</div>
			<div id="btype" style="display:none">
				<table border=0 width="240" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center" width="90" height="30">아 이 디</td>
						<td align="left" width="150"><input type='text' name='company_id' size='19'/></td>						
					</tr>
					<tr>
						<td align="center" width="90" height="30">비밀번호</td>
						<td align="left" width="150"><input type='password' name='company_pass' size='19'/></td>					 		
					</tr>
				</table>
				<br />					
			</div>
			<input type="image" src=""/>
		</form>
	</div>	
	
	
</div>
</body>
</html>