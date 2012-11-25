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
			width: 500px;	/*�ʺ�*/
			margin: 10px auto 10px;	/*����(�׵θ��ٱ�����): ��,�¿�,��*/	
			padding: 10px; 	/*�е�(�׵θ����ʰ���): ��ü*/
			border: 1px solid #3F5F92;	/*�׵θ�: ����, Ÿ��, ����*/
			text-align: center;	/*�����ؽ�Ʈ����: ��������*/
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
			���⿡ �ִ� ��ư�� ������ �� ȸ������ ���������� �̵��� �ȴ�.<br/>
			1. �ϴ� �Ϲ�ȸ������ ���ȸ�������� ������ üũ�ϰ� �Ѵ�.(selected�� �Ϲ�ȸ��)<br/>
			2. ���� ������ �ٲܶ����� �Ϲ�ȸ���� ���, �̸�, �ֹι�ȣ�� �Է� �޴� ���� ������,<br/>
			3. ���ȸ���� üũ���� ���� ȸ���, ����� ��� ��ȣ�� �Է¹޴� ���� ������ �Ѵ�.<br/>
			4. ������ ������ ä���Ŀ� Ȯ�� ��ư�� ������, �׿� �ش��ϴ� ȸ�� ���� ������ �̵�.<br/>
			5. ������ �� ä���ְ� ������� ��Ű�� �Ϲ�ȸ���� �̷¼� ���������̵��ϰ� �����<br/>
			   ������������ �̵��Ѵ�. session��  ȸ����ȣ�� ȸ�� Ÿ���� �ش�.<br/>
		</div>
	</div>	
	
	
	<div class="container">
		<div class="button-container">
				
		<%if(imsi_usernum.length() == 0){%>
			<div class="button1" id="join_button"><p>ȸ������</p></div>
			&nbsp;		
			<div class="button1" id="login_button"><p>�α���</p></div>
			&nbsp;		
		<% }else{%>
			<input type="button" onclick="move_read_page();" value="�̷¼� ����"/>			
			&nbsp;
			<input type="button" onclick="move_edit_page();" value="�̷¼� ����"/>			
			&nbsp;
			<input type="button" onclick="openmatching_list_page();" value="��Ī ����Ʈ"/>
			&nbsp;
			<input type="button" onclick="move_main();" value="��������"/>
			&nbsp;
			<input type="button" onclick="message_page();" value="�޼���������"/>
			
		<%} %>					
		</div>
	</div>
	
</body>
</html>