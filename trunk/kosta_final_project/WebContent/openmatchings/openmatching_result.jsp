<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<style type="text/css">
	.menu2 {
		color:#708090;		
		font-family:굴림체,양재블럭체;
		line-height:130%;
		font-weight:700;
		font-size:9pt;
	}
	DIV{
		border:0px #999999 solid;
		
		width: 50;
		height: 50;
	}
	.formtextarea {
	width:400px;
	height:80px;
    border:1px #999999 solid;
    padding:3px 3px 1px 3px;
    color:#4D4D4D;
    }
	<%--
		INPUT {border:expression((this.type=='text')?'1px solid #7f9db9':'' );}
	--%>
	
</style>
<script type="text/javascript">
	count = 0;
	var save_id = '';
	
	function view_list(id){
		title_id = document.getElementById(id);		
		close_id = document.getElementById(save_id);
		
		save_id = id;
		
		if(count % 2 == 0){
			title_id.style.display='';				
			close_id.style.display='none';								
								
		}else{
			close_id.style.display='none';				
			title_id.style.display='';			
		}		
		count++;
	}
	
	function view_contents(id){			
		input1 = id+''+id;	
		input2 = id+''+id+''+id;	
		tr_tag = document.getElementById(id);
		
		input_tag1 = document.getElementById(input1);
		input_tag2 = document.getElementById(input2);
		
		input_tag1.style.display='';
		input_tag2.style.display='none';
		
		tr_tag.style.display='';
		
	}
	
	function unview_contents(id){
		input1 = id+''+id;	
		input2 = id+''+id+''+id;	
		tr_tag = document.getElementById(id);
		
		input_tag1 = document.getElementById(input1);
		input_tag2 = document.getElementById(input2);
		
		input_tag1.style.display='none';
		input_tag2.style.display='';
		
		tr_tag.style.display='none';
	}
	
	function total_veiw(a){
		
		for(var x=a; x > 0; --x){
			total_id = document.getElementById(x);			
			total_id.style.display = '';			
		}	
		
		var all_view = document.getElementById("all_view");		
		var all_close = document.getElementById("all_close");
		
		all_view.style.display = 'none';		
		all_close.style.display = '';	
		
	}
	
	function total_close(a){		
		for(var x=a; x > 0; --x){
			total_id = document.getElementById(x);
			total_id.style.display = 'none';					
		}		
		var all_close = document.getElementById("all_close");
		var all_view = document.getElementById("all_view");
		
		all_close.style.display = 'none';
		all_view.style.display = '';
	}
</script>
</head>
<body>
<br/><br/>
<form name="frm" method="post" action="send_result_message.do">


<table border=1 cellspacing=0 width=560 cellpadding=0>
	<tr>
		<td align="center">			
			<table>
				<tr>
					<td height="10"></td>
				</tr>
			</table>
			<c:set var="i" value="0"/>
			
			<c:forEach var="result_array" items="${result_array}">				
				<c:set var="j" value="0"/>
				<c:set var="i" value="${i + 1 }"/>
				<input type="hidden" name="matching_number" value="${result_array.matching_number }"/>
				<table class="menu2" border=0 width="510" cellspacing=0 cellpadding=0>
					<tr>
						<td height="10" colspan="6"></td>
					</tr>
					<tr>
						<td align="left" colspan="6">													
							<div style="cursor:hand" onclick="view_list(${i })">&nbsp;∴ &nbsp;${result_array.applier_position_each }</div>																
						</td>
					</tr>
				</table>
				
				
				<div id="${i }" style="display:none">
				<table class="menu2" border=1 width="520" cellspacing=0 cellpadding=0>					
					<tr height="25">
						<td width="20">&nbsp;></td>
						<td width="100">이 름</td>
						<td width="130">지원날짜</td>
						<td width="140">연락처</td>
						<td width="70">경력</td>
						<td width="60">&nbsp;</td>
					</tr>
					<c:forEach var="list" items="${result_array.array}">
						<c:set var="j" value="${j + 1 }"/>
						<tr height="25">
							<td width="20"><input type="checkbox" name="ck" value="${list.applier_id }"/></td>
							<td width="100">${list.applier_name }</td>
							<td width="130">${list.applier_regdate}</td>
							<td width="140">${list.applier_phone}</td>
							<td width="70">${list.applier_carreer}</td>
							<td width="60">
								<input type="button" id="${i }${j}${i }${j}${i }${j}" onclick="view_contents(${i }${j })" value="보기"/>
								<input type="button" id="${i }${j}${i }${j}" style="display:none" onclick="unview_contents(${i }${j})" value="닫기"/>
							
							</td>
						</tr>						
						<tr id="${i }${j}" style="display:none">
							<td colspan="6" height="30">
								${list.applier_contents}
							</td>
						</tr>
					</c:forEach>
				</table>				
				</div>
			</c:forEach>
			<br/><br/>
			<div id="all_view" >
			
			<img onclick="total_veiw(${i })" style="cursor:hand" src="<%=request.getContextPath()%>/images/members/totalview.gif" border="0" alt="전체보기"/>
			
				
			</div>
			<div id="all_close" style="display:none;">
				<img onclick="total_close(${i })" style="cursor:hand" src="<%=request.getContextPath()%>/images/members/allclose.gif" border="0" alt="전체닫기"/>
			</div>
			
			<table>								
				<tr>
					<td align="center">
						&nbsp;&nbsp;&nbsp;&nbsp;<h5>전체 메시지</h5>															
					</td>
				</tr>
				<tr>
					<td align="center">
						<textarea class="formtextarea" name="message"></textarea>															
					</td>
				</tr>
				<tr>
					<td height=10 colspan=6></td>
				</tr>
				<tr>
					<td align="center">											
						<input type="image" src="<%=request.getContextPath()%>/images/members/commit.gif"/>															
					</td>
				</tr>	
				<tr>
					<td height=10 colspan=6></td>
				</tr>			
			</table>			
		</td>
	</tr>
</table>
</form>
<br/><br/>
</body>
</html>