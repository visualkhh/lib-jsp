<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@page import="java.util.HashMap"%>
<%
		HashMap hm = (HashMap)session.getAttribute("user");

	
		String imsi_usernum = "";
		if(hm != null){
			imsi_usernum = hm.get("user_number").toString();
		}
%>   
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>Insert title here</title>
	<style type="text/css">
	<!--
		.container {
			width: 500px;	/*너비*/
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 10px; 	/*패딩(테두리안쪽공간): 전체*/
			border: 1px solid #3F5F92;	/*테두리: 굵기, 타입, 색깔*/
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
		
		#comment {
			margin: 10px 0px;
			padding: 0px 10px;
			border: 1px dashed #D6DAD9;
			text-align: left;
			font-size: 12px;	
		}
		
		.button-container {
			height: 20px;
			margin: 0px;
			padding: 5px;
		}
		
		.button1 {
			width: 70px;
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
	-->
	</style>
	
	<script type="text/javascript" src="ajax.js"></script>
	
	<script type="text/javascript">
		window.onload = function(){		
		
			var btn1 = document.getElementById("join_button");
			var btn2 = document.getElementById("login_button");
			
			ajax.Event.addListener(btn1, "click", move_check_page);
			ajax.Event.addListener(btn2, "click", move_login_page);	
		}
		
		function move_check_page(){
			location.href = "/final_project/member/check_type.do";
		}
		
		function move_login_page(){
			location.href = "/final_project/member/login_page.do";
		}
		
		function move_read_page(){			
			location.href = "/final_project/member/resume_read_page.do?user_number=<%=imsi_usernum %>";
		}
		
		function move_edit_page(){			
			location.href = "/final_project/member/resume_edit_page.do?user_number=<%=imsi_usernum %>";
		}
		
		function openmatching_list_page(){
			location.href = "/final_project/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0";
		}
		
		function move_main(){
			location.href = "/final_project/member/move_main.do";
		}
		
		function message_page(){
			location.href = "/final_project/message/move_message_page.do";
		}
	</script>
</head>
<body>
	<div class="container">
		<div id="comment">
			여기에 있는 버튼을 눌렀을 때 회원가입 페이지로의 이동이 된다.<br/>
			1. 일단 일반회원인지 기업회원인지를 라디오를 체크하게 한다.(selected는 일반회원)<br/>
			2. 라디오 선택을 바꿀때마다 일반회원의 경우, 이름, 주민번호를 입력 받는 폼이 나오고,<br/>
			3. 기업회원을 체크했을 경우는 회사명, 사업자 등록 번호를 입력받는 폼이 나오게 한다.<br/>
			4. 각각의 내용을 채운후에 확인 버튼을 누르면, 그에 해당하는 회원 가입 폼으로 이동.<br/>
			5. 내용을 다 채워넣고 서브밋을 시키면 일반회원은 이력서 페이지로이동하고 기업은<br/>
			   메인페이지로 이동한다. session은  회원번호와 회원 타입을 준다.<br/>
		</div>
	</div>	
	
	
	<div class="container">
		<div class="button-container">
				
		<%if(imsi_usernum.length() == 0){%>
			<div class="button1" id="join_button"><p>회원가입</p></div>
			&nbsp;		
			<div class="button1" id="login_button"><p>로그인</p></div>
			&nbsp;		
		<% }else{%>
			<input type="button" onclick="move_read_page();" value="이력서 보기"/>			
			&nbsp;
			<input type="button" onclick="move_edit_page();" value="이력서 수정"/>			
			&nbsp;
			<input type="button" onclick="openmatching_list_page();" value="매칭 리스트"/>
			&nbsp;
			<input type="button" onclick="move_main();" value="메인으로"/>
			&nbsp;
			<input type="button" onclick="message_page();" value="메세지페이지"/>
			
		<%} %>					
		</div>
	</div>
	
</body>
</html>