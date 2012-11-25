<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>OpenPage.com</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/login.css">
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
	<div class="login_container">
		<div class="login_header">
			<p>OpenPage</p>
		</div>
		<div class="login_header_sign">
			<p>OpenPage는 당신의 이력과 경력을 체계적이고 효과적으로 홍보할 수 있는 도구입니다.</p>
		</div>
		
		<form name="join" onsubmit="return login_check();" method="post" action="/final_project/member/login_page.do">
		<div class="login_form">
			<div class="login_title">
				<p>OpenPage.com&nbsp;&nbsp;&nbsp;Login</p>
			</div>
			<div class="errormsg">
				<p>여기에 에러메시지가 출력됩니다. 비밀번호를 잘못 입력하셨습니다.</p>
			</div>
			<div id="check_radio">
				<input type="radio" id="radio1" name="radio" value="a" checked="checked"/>일반회원
				&nbsp;&nbsp;<input id="radio2" type="radio" name="radio" value="b"/>기업회원
			</div>
			<div id="atype">
				<table border=0 width="240" cellspacing="0" cellpadding="0">
					<tr>
						<td class="subject" align="center" width="90" height="30">아 이 디</td>
						<td class="subject" align="left" width="150"><input type='text' name='user_id' maxlength='8' size='19'/></td>
					</tr>
					<tr>
						<td class="subject" align="center" width="90" height="30">비밀번호</td>
						<td class="subject" align="left" width="150"><input type='password' name='user_pass' size='19'/></td>
					</tr>
					<tr>
						<td colspan ="2" class="subject">&nbsp;</td>
					</tr>
					<tr>
						
						<td colspan="2" class="subject">
							<input type="image" src="<%=request.getContextPath()%>/images/commons/login_button.png"/>&nbsp;&nbsp;&nbsp;
							<img src="<%=request.getContextPath()%>/images/commons/signin_button.png" border="0"/>
						</td>
					</tr>
					<tr>
						<td class="subject">&nbsp;</td><td>&nbsp;</td>
					</tr>
				</table>
				<br />				
			</div>
			<div id="btype" style="display:none">
				<table border=0 width="240" cellspacing="0" cellpadding="0">
					<tr>
						<td class="subject" align="center" width="90" height="30">아 이 디</td>
						<td class="subject" align="left" width="150"><input type='text' name='company_id' size='19'/></td>						
					</tr>
					<tr>
						<td class="subject" align="center" width="90" height="30">비밀번호</td>
						<td class="subject" align="left" width="150"><input type='password' name='company_pass' size='19'/></td>					 		
					</tr>
					<tr>
						<td colspan ="2" class="subject">&nbsp;</td>
					</tr>
					<tr>
						<td class="subject" colspan="2">&nbsp;</td>
						<td>
							<input type="image" src="<%=request.getContextPath()%>/images/commons/login_button.png"/>&nbsp;&nbsp;&nbsp;
						<%-- 	<img src="<%=request.getContextPath()%>/images/commons/login_button.png"/>&nbsp;&nbsp;&nbsp;--%>
							<img src="<%=request.getContextPath()%>/images/commons/signin_button.png" border="0"/>
						</td>
					</tr>
					<tr>
						<td class="subject">&nbsp;</td><td>&nbsp;</td>
					</tr>
				</table>
				<br />					
			</div>
			
			
			<%-- 
			
			<div class="tablebox">
				<table id="login_table">
					<tr>
						<td class="subject">아이디</td><td><input type="text" id="userid" /></td>
					</tr>
					<tr>
						<td class="subject">비밀번호</td><td><input type="password" id="userpw" /></td>
					</tr>
					<tr>
						<td class="subject">&nbsp;</td><td>&nbsp;</td>
					</tr>
					<tr>
						<td class="subject">&nbsp;</td>
						<td>
							<img src="<%=request.getContextPath()%>/images/commons/login_button.png"/>&nbsp;&nbsp;&nbsp;
							<img src="<%=request.getContextPath()%>/images/commons/signin_button.png"/>
						</td>
					</tr>
					<tr>
						<td class="subject">&nbsp;</td><td>&nbsp;</td>
					</tr>
				</table>
			</div>
			--%>
		</div>
		</form>
		
		
		
		<div class="footer-container">
			<div class="footer-company"><p>OpenPage &copy; 2009</p></div>
			<div class="footer-item-left"><p>한국어</p></div>	
			<div class="footer-item-right"><p>Sitemap</p></div>
			<div class="footer-item-right"><p>Help</p></div>
			<div class="footer-item-right"><p>Advertising</p></div>
			<div class="footer-item-right"><p>Privacy</p></div>
			<div class="footer-item-right"><p>About</p></div>
		</div>
	</div>
	
	
</body>
</html>