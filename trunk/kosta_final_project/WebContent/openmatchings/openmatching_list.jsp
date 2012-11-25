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
	
	.formtextarea {
		width:400px;
		height:130;
	    border:1px #999999 solid;
	    padding:3px 3px 1px 3px;
	    color:#4D4D4D;
    }
</style>
<script type="text/javascript">
	function move_page(ea, eb, ec, ed){
		document.test.cur_page.value = ea;
		document.test.search.value = eb;
		document.test.key.value = ec;
		document.test.s_type.value = ed;
		
		test.action = 'openmatching_list.do';
		test.method = 'post';
		test.submit();								
	}
	
	function move_page(ea, eb, ec, ed){
		document.test.cur_page.value = ea;
		document.test.search.value = eb;
		document.test.key.value = ec;
		document.test.s_type.value = ed;
		
		test.action = 'openmatching_list.do';
		test.method = 'post';
		test.submit();								
	}

</script>

</head>
<body>
	<br/><br/>
	<table border=0 cellspacing=0 cellpadding=0 width=600>
		<tr>
			<td height="40" align="left"></td>
		</tr>
		<tr>
			<td>
				<table class = menu2 border=1 cellspacing=0 cellpadding=0 width=560>
					<tr height="25" align='center'>
						<td width="40">구분</td>				
						<td width="295">
							주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제
						</td>
						<td width="100">
							작성자
						</td>
						<td width="90">
							작성일
						</td>								
						<td width="70">
							진행구분
						</td>
					</tr>
				
				<c:set var="cnt" value="0"/>
					
				<c:forEach var="list" items="${page.array}">
				<c:set var="cnt" value="${ cnt + 1 }"/>
					<tr height="25" bgcolor = "rgb(238,243,246)" align='center'>
						<td width="40">
							<c:choose>
								<c:when test='${ list.matching_type == "team" }'>
									<img src="<%=request.getContextPath()%>/images/members/t.gif" alt="team"/>
								</c:when>
								<c:otherwise>
									<img src="<%=request.getContextPath()%>/images/members/compa.gif" alt="company"/>
								</c:otherwise>	
							</c:choose>		
						</td>				
						<td width="250">
							<%--
							<a href="/final_project/openmatching/openmatching_read.do?num=${list.matching_number }">
								${list.matching_title }
							</a>
							--%>
							
							<a href="/final_project/openmatching/openmatching_read.do?num=${list.matching_number }&cur_page=1&search=&key=&s_type=0">
								${list.matching_title }
							</a>
							
							
							
							
							
							
						</td>
						<td width="100">
							${list.matching_writer }
						</td>
						<td width="100">
							${list.matching_regdate }
						</td>								
						<td width="70">
							${list.matching_complete }
						</td>
					</tr>
				</c:forEach>
				<c:forEach var="j" begin="${ cnt }" end="9" step="1">
					<tr bgcolor = rgb(238,243,246) height="25" class='menu2'>
						<td align="center" colspan='5'>					
							No Data!!
						</td>
					</tr>
				</c:forEach>	
				</table>
				
				<form name="test">
				<input type="hidden" name="key"/>
				<input type="hidden" name="cur_page"/>
				<input type="hidden" name="search"/>
				<input type="hidden" name="s_type"/>
				<table border = 0 class="menu2" width='580' border='0'>
					<tr height="25">
						<td align="center" class='menu2'>						
							<a href='javascript:move_page(${page.first }, "${page.search}", "${page.key }", "${page.s_type }");'>&lt;&lt;</a>&nbsp;
							<a href='javascript:move_page(${page.prev }, "${page.search}", "${page.key }", "${page.s_type }");'>&lt;</a>&nbsp;
						
							<c:forEach var="i" begin="${ page.begin }" end="${ page.end }" step="1">
								<c:choose>
									<c:when test="${page.cur_page == i}">
										<a href='javascript:move_page(${i }, "${page.search}", "${page.key }", "${page.s_type }");'><b style="color:red;">${i}</b></a>
									</c:when>
									<c:otherwise>
										<a href='javascript:move_page(${i }, "${page.search}", "${page.key }", "${page.s_type }");'> ${i} </a>
									</c:otherwise>		
								</c:choose>					
							</c:forEach>	
						
						
							<a href='javascript:move_page(${page.next }, "${page.search}", "${page.key }", "${page.s_type }");'>&gt;</a>&nbsp;
							
							<a href='javascript:move_page(${page.last }, "${page.search}", "${page.key }", "${page.s_type }");'>&gt;&gt;</a>
						</td>		
					</tr>
				</table>
				</form>
				<br/>
				<form method="post" action="openmatching_list.do">
					<table>
						<tr>
							<td height="25">
								<select name="s_type">
									<option value="0">전 체</option>
									<option value="1">기 업</option>
									<option value="2">팀</option>
								</select>
								<select name="search">
									<option value="wri">작성자</option>
									<option value="con">제목+내용</option>
									
								</select>
								<input type="text" size="18" name = "key"/>
								<input type="hidden" name="cur_page" value="${page.cur_page}"/>								
								<input type="image" src="<%=request.getContextPath()%>/images/members/search.gif" alt="검색"/>
							</td>				
						</tr>
					</table>
				</form>
								
				
				
				<table cellspacing=0 cellpadding=0 width=560>
					<tr>
						<td colspan="2" height=10></td>
					</tr>
					<tr>
						<td align='left'>
							<a href="/final_project/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0">
								<img src="<%=request.getContextPath()%>/images/members/list.gif" alt="글 목록" border="0"/>
							</a>
						</td>
						<td align='right'>
							<a href="/final_project/openmatching/openmatching_write.do">
								<img src="<%=request.getContextPath()%>/images/members/projectsubmit.gif" alt="프로젝트 등록" border="0"/>
							</a>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td height="30">
				&nbsp;
			</td>
		</tr>
	</table>		
</body>
</html>