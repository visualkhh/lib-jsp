<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="openpage.model.*" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

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
	Form{
		margin:0px;
	}
	
	.error_message1{
		position:absolute;
		left: 690px;
		top: 90px;			
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
	.error_message2{
		position:absolute;
		left: 690px;
		top: 118px;			
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
	.error_message3{
		position:absolute;
		left: 690px;
		top: 260px;			
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
</style>
<script type="text/javascript">

	var count = 0;

	function insert_position(){		
		var first_index = document.frm.job_position_select.selectedIndex;
		var position = document.frm.job_position_select.options[first_index].text;
		var input_text = document.frm.input_text.value;
		
		var second_index = document.frm.job_count_select.selectedIndex;
		var app_su = document.frm.job_count_select.options[second_index].text;
		
		var old_calc = eval(frm.matching_tot.value);
		var new_calc = eval(old_calc + eval(app_su));
		document.frm.matching_tot.value = new_calc;
		document.frm.matching_total.value = new_calc;
		
			
		count++;
		
		var table_tag = document.getElementById("target_table");		
		
		row = document.createElement('tr');
		cell_first = document.createElement('td');
		cell_second = document.createElement('td');
		cell_third = document.createElement('td');
		cell_fourth = document.createElement('td');		
		
		row.setAttribute("id", count);
		row.appendChild(cell_first);
		row.appendChild(cell_second);
		row.appendChild(cell_third);
		row.appendChild(cell_fourth);
		
		cell_first.style.textAlign='left';
		cell_first.style.height='20px';
		cell_first.style.width='200px';
		
		if(input_text.length == 0 && position != "직접입력"){
			cell_first.innerHTML = position;
			//히든 삽입(job_position_select과 job_count_select)
			cell_third.innerHTML = '<input type="hidden" name="position" value="'+ position +'">' + 
							'<input type="hidden" name="count" value="'+ eval(app_su) +'">';										
		}else{
			cell_first.innerHTML = input_text;
			//히든 삽입(job_position_select과 job_count_select)
			cell_third.innerHTML = '<input type="hidden" name="position" value="'+ input_text +'">' + 
							'<input type="hidden" name="count" value="'+ eval(app_su) +'">';
			
			document.frm.input_text.value = "";									
		}
		
		document.frm.job_position_select.selectedIndex = 0;
		document.frm.job_count_select.selectedIndex = 9;
				
		cell_second.innerHTML = app_su + ' 명';		
		
		cell_second.style.textAlign='right';
		cell_second.style.width='50px';
		cell_third.style.width='10px';
		cell_fourth.style.textAlign='right';
		cell_fourth.style.width='20px';
		
		cell_fourth.innerHTML = '<a href="javascript:delete_row(' + count + ');">' + 
							'<img src="<%=request.getContextPath()%>/images/openmatchings/button_delete_01.jpg" border="0" style="cursor:hand;"/></a>';
		
		
		table_tag.children(0).appendChild(row);	
		
		var select_position = document.getElementById("select_position");
		var direct_input = document.getElementById("direct_input");
		select_position.style.display = "";
		direct_input.style.display = "none";		
	}
	
	function delete_row(cnt){
		var del_row = document.getElementById(cnt);
		--count;			
		var del_row = document.getElementById(cnt)
		target = document.getElementById("target_table").firstChild;					
		target.removeChild(del_row);			
		
		del_calc = del_row.firstChild.nextSibling.firstChild.nodeValue;
		del_calc = del_calc.substring(0, 2);		
		
		var old_calc = eval(frm.matching_tot.value);
		var new_calc = eval(old_calc - eval(del_calc));
		document.frm.matching_tot.value = new_calc;		
		document.frm.matching_total.value = new_calc;
	}
	
	function direct_input(){
		var first_index = document.frm.job_position_select.selectedIndex;
		var position = document.frm.job_position_select.options[first_index].text;
		
		if(position == '직접입력'){
			var select_position = document.getElementById("select_position");
			var direct_input = document.getElementById("direct_input");
			select_position.style.display = "none";
			direct_input.style.display = "";			
		}
	}
</script>
</head>
<body>
	<spring:hasBindErrors name="matching"/>
	<div class="error_message1" style="color: red;">
		<form:errors path="matching.matching_title"/>		
	</div>
	<div class="error_message2" style="color: red;">		
		<form:errors path="matching.matching_writer"/>		
	</div>
	<div class="error_message3" style="color: red;">
		
		<form:errors path="matching.matching_info"/>
	</div>

<center>
<br /><br /><br />
<form name="frm" method="post" action="openmatching_write.do" enctype="multipart/form-data"/>
<table border=1 cellspacing=0 width=420 cellpadding=0>	
	<tr>
		<td align="center" colspan="2">
			<table class="menu2" border=0 cellspacing=0 cellpadding=0>
				<tr>
					<td colspan=2 height="20"></td>
				</tr>
				<tr>
					<td width=80>주 &nbsp;제 :</td>
					<td align=left width=300><input type="text" size="34" name="matching_title"/></td>
				</tr>
				<tr>
					<td colspan=2 height="4"></td>
				</tr>
				<tr>
					<td>주최자 :</td>
					<td align=left><input type="text" size="20" name="matching_writer"/>(기업명/회원명)</td>
				</tr>
				<tr>
					<td colspan=2 height="5"></td>
				</tr>
				<tr>
					<td colspan=2>
						<input type="radio" name="matching_type" value="company" checked="checked"/>기업 <input type="radio" value="team" name="matching_type"/>팀
						&nbsp;&nbsp;&nbsp; 총 <input type="text" size="1" disabled="disabled" name="matching_tot" value="0"
						style="color:blck; text-align:right;font-size: 9pt; background-color:888888; border:1 solid white;height:12px"/> 명
						<input type="hidden" name="matching_total"/>
					</td>
				</tr>
				<tr>
					<td colspan=2 height="5"></td>
				</tr>
				<tr>
					<td colspan=2 height="230">
						<textarea cols=50 rows=15 name="matching_info"></textarea>
					</td>
				</tr>
				<tr>
					<td colspan=2 align="center">
						<table border=0 width=340 cellspacing=0 cellpadding=0>
							<tr>
								<td colspan="2" height="15"></td>
							</tr>
							<tr>
								<td align="left" width=170>									
									<div style="float: left; width: 200px">
										<div id="select_position" style="float: left">
											<select name="job_position_select" onchange="direct_input();">
												<option selected="selected">웹 개발자</option>
												<option>디자이너</option>
												<option>DBA</option>
												<option>프로그램 매니져</option>
												<option>직접입력</option>												
											</select>
										</div>
										<div id="direct_input" style="float: left; display:none;" >
											<input type="text" size="15" name="input_text"/>
										</div>
										
										
										<div style="float: left">&nbsp;&nbsp;</div>
										<div id="select_count" style="float: left">
											<select name="job_count_select">
												<option>10</option>
												<option>9</option>
												<option>8</option>
												<option>7</option>
												<option>6</option>
												<option>5</option>
												<option>4</option>
												<option>3</option>
												<option>2</option>
												<option selected="selected">1</option>
											</select>
										</div>	
									</div>
								</td>
								<td width=170 align="right">						
									<input type="button" onclick="insert_position();" value="등록"/>
								</td>	
							</tr>
							<tr>
								<td colspan="2" height="10"></td>								
							</tr>
							<tr>
								<td colspan="2" align="center">
									<table id="target_table" border="0" cellspacing="0" cellpadding="0" width="280px">
											
										
									</table>
								</td>
							</tr>
							<tr>
								<td colspan="2" height="15"></td>
							</tr>							
						</table>
					</td>			
				</tr>
				
				
				
				<tr>
					<td colspan=2>
						첨부파일 1 : <input type="file" size="25" name="uploadFile1"/>
					</td>
				</tr>
				<tr>
					<td colspan=2>
						첨부파일 2 : <input type="file" size="25" name="uploadFile2"/>
					</td>
				</tr>
				<tr>
					<td height="20"></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table cellspacing=0 width=400 cellpadding=0>	
	<tr>
		<td height="10"></td>
	</tr>
	<tr>
		<td align="left">
			<a href="/final_project/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0"/>
				<img src="<%=request.getContextPath()%>/images/members/list.gif" border="0" alt="목록으로"/>
			</a>
		</td>
		<td align="right">
			<input type="image" src="<%=request.getContextPath()%>/images/members/projectsubmit.gif" alt="등록"/>
		</td>
	</tr>
</table>
</form>
<br /><br /><br />
</center>
</body>
</html>