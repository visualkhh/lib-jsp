<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="java.util.HashMap"%>
<%
		HashMap hm = (HashMap)session.getAttribute("user");

	
		String session_id = "";
		if(hm != null){
			session_id = hm.get("user_id").toString();
		}
%>   
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
	.formtextarea {
	width:390px;
	height:60px;
    border:1px #999999 solid;
    padding:3px 3px 1px 3px;
    color:#4D4D4D;
    }
    #line{
    	line-height: 22px;
    }
    form{
    	margin:0px;
    }	
    
    .container1 {
			width: 500px;	/*너비*/
			height : 700px;			
			margin: 10px auto 10px;	/*마진(테두리바깥공간): 상,좌우,하*/	
			padding: 0px; 	/*패딩(테두리안쪽공간): 전체*/
			border: 0px solid #3F5F92;	/*테두리: 굵기, 타입, 색깔*/
			text-align: center;	/*내부텍스트정렬: 좌측정렬*/
		}
</style>

<script type="text/javascript" src="/final_project/openmatchings/ajax.js"></script>

<script type="text/javascript">
	var count = -1;
	var xxx = 0;
	
	function check_conf(){
		var view = document.getElementById("opacity");
		var check_app = document.frm_app.ck.checked;
		var bool = false;		
		if(check_app){
			radio = document.frm_app.r1;			
			for(var i=0; i < radio.length; ++i){
				if(radio[i].checked){
					bool = true;
					break;
				}	
			}
			
			if(bool)
				return true;
			else{
				ajax.GUI.setOpacity(view, eval(0.2));
				alert('지원 분야를 선택하세요');
				ajax.GUI.setOpacity(view, eval(1.0));
			}
		}else{
			ajax.GUI.setOpacity(view, eval(0.2));
			alert('정보 열람을 허용하여야 지원가능합니다');
			ajax.GUI.setOpacity(view, eval(1.0));
			document.frm_app.ck.focus();
			return false;
			
			
		}
		return false;
	}
	
	function plus_count(cnt){				
		if(count != cnt){		
			count_row = document.getElementById(cnt);
			get_value = eval(count_row.lastChild.firstChild.getAttribute("value"));			
			count_row.lastChild.firstChild.setAttribute("value", eval(get_value + 1));
			
			document.frm_app.applier_type.value = cnt;			
								
			count_row.lastChild.childNodes[count_row.lastChild.childNodes.length - 2].setAttribute("value", eval(get_value + 1));
			
			if(xxx != 0){
				count_row = document.getElementById(count);
				get_value = eval(count_row.firstChild.nextSibling.firstChild.getAttribute("value"));
				count_row.lastChild.firstChild.setAttribute("value", eval(get_value - 1));
				count_row.lastChild.childNodes[count_row.lastChild.childNodes.length - 2].setAttribute("value", eval(get_value - 1));
			}
			count = cnt;
		}	
		xxx++;		
	}	

</script>
</head>
<body>
<br /><br /><br />
<div class="container1" id="opacity">
<form name="frm_app" method="post" action="openmatching_app.do" onsubmit="return check_conf();">
<input type="hidden" name="matching_number" value="${requestScope.num }"/>
<input type="hidden" name="user_id" value="${sessionScope.user.user_id }"/>
<input type="hidden" name="applier_type"/>
<table border=1 cellspacing=1 width=400 cellpadding=0 bgcolor="white">
	<tr>
		<td align="center">
			<table class="menu2" border=0 width="490" cellspacing=0 cellpadding=0>
				<tr>
					<td colspan=2 height="23"></td>
				</tr>
				<tr>
					<td width=120>주&nbsp;&nbsp;제 :</td>
					<td align=left width=370>${matching.matching_title }</td>
				</tr>
				<tr>
					<td colspan=2 height="4"></td>
				</tr>
				<tr>
					<td>주최자 :</td>
					<td align=left>
					${matching.matching_writer }&nbsp;(기업명/회원명)</td>
				</tr>
				<tr>
					<td colspan=2 height="5"></td>
				</tr>				
				<tr>
					<td colspan=2 height="230">
						
					
						<table border=1 cellspacing=0 width="430" cellpadding=0>
							<tr>
								<td width=350 height="200">
								<textarea readonly="readonly" style='width:430px; height:240px; border:0px #C4CAD1 solid;font-size:9pt;font-family:gulim;line-height:150%;overflow:visible; word-break:break-all;'>${matching.matching_info }</textarea>		
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" height=10></td>
				</tr>
				<c:choose>						
					<c:when test='${ matching.matching_writerid == sessionScope.user.user_id }'>
				
					</c:when>
					<c:otherwise>
						<tr>
							<td colspan="2" align="center">
								<table border="0" width="350" cellspacing="0" cellpadding="0">
									<tr>
										<td width="80">다운로드 : </td>
										<td width="270" id="line">
											<a href="">${matching.matching_filename1 }</a><br/>
											<a href="">${matching.matching_filename2 }</a>
										</td>
									</tr>
								</table>						
							</td>					
						</tr>
						<tr>
							<td height=10></td>
						</tr>
					</c:otherwise>
				</c:choose>
				<tr>
					<td colspan=2 align="center" height="80">
						<table id="insert_spot" border=0 width=390 cellspacing=0 cellpadding=0>	
							<c:forEach var="j" begin="0" end="${matching.job_number -1}" step="1">
								<tr id="${j }" bgcolor = rgb(238,243,246) height="25" class='menu2'>
									<td width=290 height="25" align="left">													
										<c:choose>						
											<c:when test='${ matching.matching_writerid == sessionScope.user.user_id }'>
										
											</c:when>
											<c:otherwise>
												<c:choose>
													<c:when test="${matching.applier_type == null}">
														&nbsp;<input type="radio" name="r1" onclick="plus_count(${j });"/>													
													</c:when>
													<c:otherwise>
																								
													</c:otherwise>												
												</c:choose>													
											</c:otherwise>
										</c:choose>
										&nbsp;${matching.a[j]}
									</td>
									<td>																
										<input type="text"  size=1 value="${matching.c[j] }" style="color:blck; text-align:right;
										font-size: 9pt; background-color:888888; border:1 solid white;height:12px" disabled="disabled"/>
										/${matching.b[j] }명
										<input type="hidden" name="applier_cnt" value="${matching.c[j] }"/>										
									</td>
								</tr>								
							</c:forEach>							
							<tr>
								<td colspan=2 height="15"></td>
							</tr>	
							<c:choose>						
								<c:when test='${ matching.matching_writerid == sessionScope.user.user_id }'>
								</c:when>
								<c:otherwise>							
									<tr>
										<td colspan=2 align="center">
											<table>
												<tr>
													<td align=left width="200">
														연락처 : <input type="text" size="14" name="applier_phone" maxlength="15" value=""
														style="color:blck; font-size: 9pt; background-color:888888; border:1 solid white;height:12px"/>
													</td>
													<td align=right width="140">
														경력 : <input type="text" size="3" name="applier_carreer" value=""
														style="color:blck; text-align:right;font-size: 9pt; background-color:888888; border:1 solid white;height:12px"/> 개월&nbsp;&nbsp;&nbsp;&nbsp;
													</td>
												</tr>									
											</table>
										</td>								
									</tr>	
								</c:otherwise>
							</c:choose>
							
							<tr>
								<td colspan=2 height="10"></td>
							</tr>						
						</table>
					</td>			
				</tr>
				
				
				<c:choose>						
					<c:when test='${ matching.matching_writerid == sessionScope.user.user_id }'>				
					</c:when>
					<c:otherwise>				
						<tr>
							<td colspan=2 height="40" align="left" width="300">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;∴&nbsp;지원과 관련하여 남기고 싶은말
							</td>
						</tr>
						<tr>
							<td colspan=2>
								<textarea class="formtextarea" name="applier_contents" rows="3" cols="54"></textarea>						
							</td>
						</tr>
						<tr>
							<td colspan=2 height=10></td>
						</tr>
						<tr>
							<td colspan=2>
								<table border=0 width="400" cellspacing=0 cellpadding=0>							
									<tr>
										<td align="right" colspan="2">
											정보 열람을 허용합니다.<input type="checkbox" name="ck"/>
										</td>
									</tr>
								</table>												
							</td>
						</tr>				
						<tr>
							<td colspan=2 height=15></td>
						</tr>
					</c:otherwise>					
				</c:choose>
			</table>
			<table border="0" cellspacing="0" cellpadding="0" width="410">
				<tr>
					<td align="left">
						<a href="/final_project/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0"/><img src="<%=request.getContextPath()%>/images/members/list.gif" border="0" alt="목록으로"/></a>
					</td>
					<td align="right">						
						<c:choose>						
							<c:when test='${ matching.matching_writerid == sessionScope.user.user_id }'>
								<a href="/final_project/openmatching/openmatching_result.do?num=${requestScope.num }"><img src="<%=request.getContextPath()%>/images/members/resultview.gif" border="0" alt="결과보기"/></a>
							</c:when>
							<c:otherwise>
								<c:choose>
									<c:when test='${matching.applier_type == null }'>
										<input type="image" src="<%=request.getContextPath()%>/images/members/app.gif" alt="지원하기"/>
									</c:when>
									<c:otherwise>
										<a href="/final_project/openmatching/openmatching_cancel.do?num=${requestScope.num }&applier_type=${matching.applier_type }"><img src="<%=request.getContextPath()%>/images/members/cancel.gif" alt="지원취소" border="0"/></a>										
									</c:otherwise>
								</c:choose>
								
							</c:otherwise>	
						</c:choose>																		
					</td>
				</tr>
				<tr>
					<td colspan=2 height="20"></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</div>
<br /><br />
</body>
</html>