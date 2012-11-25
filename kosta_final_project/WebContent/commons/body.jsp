<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <%@ page import="java.util.*" %>
    <%@ page import="openpage.model.*" %>
        <%@ taglib prefix="c"uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="sql"uri="http://java.sun.com/jsp/jstl/sql"%>
    
    <sql:setDataSource scope="session" var="con" driver="oracle.jdbc.driver.OracleDriver" url="jdbc:oracle:thin:@192.168.10.95:1521:ORCL" user="scott" password="kosta" />
	<%--  범위 , 커넥션 출력된 이름 , 드라이버, 주소, 아이디,패스워드--%>
    
    <%
    OpenPageDAO openpagedao=new OpenPageDAO();
    
    HashMap map =(HashMap)request.getSession().getAttribute("user");
	
	int user_number=(Integer)map.get("user_number");
	

	System.out.println("오냐openpage_list");
    
    %>
    
    
   <sql:query var="openpagelist" dataSource="${con}">
			select * from openpagelist where user_number =?
			<sql:param><%=user_number%></sql:param>
	</sql:query>
			
			
    
<script type="text/javascript">
	addLoadEvent(function(){
		new ajax.body.load();
		new ajax.dnd.SimpleDragSource("photobox");		
	});
</script>
<div id="body-container">
	<div id="body-left">
		<div class="photobox" id="photobox">
			<img src="<%=request.getContextPath()%>/images/commons/temp/obama1.jpg" />
		</div>
		<div class="sidebox">
			<div class="sidebox-title">
				<p>Information</p>
			</div>
			<div class="subject">
				<p>Name:</p>
			</div>
			<div class="content">
				<p>Barack Obama</p>
			</div>
		</div>
		<div class="sidebox">
			<div class="sidebox-title">
				<p>Network</p>
			</div>
		</div>
		<div class="sidebox-end"></div>		
	</div>
	<div id="body-center">		
		<div class="body-title">
			<p>Barack Obama</p>
		</div>
		<div class="body-menu">
			<div class="body-selected-menu-box" id="menu-box-profile">
				<p>Profile</p>
			</div>
			<div class="body-menu-box" id="menu-box-openpages">
				<p>OpenPages</p>
			</div>
			<div class="body-menu-box" id="menu-box-openresume">
				<p>OpenResume</p>
			</div>
			<div class="body-menu-box" id="menu-box-messages">
				<p>Messages</p>
			</div>
		</div>
		<div id="body-content-profile">
			<div>
			
			<DIV class=login_container id=opacity>
  <DIV class=login_header>
    <h1>OpenPage</h1>
  </DIV>
  <DIV class=login_header_sign>
    <P>OpenPage는 당신의 이력과 경력을 체계적이고 효과적으로 홍보할 수 있는 도구입니다.</P>
  </DIV>
  <STYLE type=text/css>
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
			top: 220px;			
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

	</STYLE>
  <TABLE width="99%" border=0 cellPadding=3 cellSpacing=1 bgcolor="#CCCCCC">
    <TBODY>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>회 원 명 : </strong></TD>
        <TD width=188 height=30 align=middle id=td_name>오바마</TD>
        <TD width=90></TD>
      </TR>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>주 민 번 호 : </strong></TD>
        <TD width=188 height=30 align=middle id=td_jumin>860425 - *******</TD>
        <TD width=90></TD>
      </TR>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>아 이 디 : </strong></TD>
        <TD width=188 height=30 align=middle><INPUT maxLength=15 size=19 value=obama 
name=user_id>
        </TD>
        <TD width=90>(15자 이하)</TD>
      </TR>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>비 밀 번 호 : </strong></TD>
        <TD width=188 height=30 align=middle><INPUT 
name=user_pass type="password" value=1111 size=19 maxLength=15>
        </TD>
        <TD width=90>(15자 이하)</TD>
      </TR>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>비 번 확 인 : </strong></TD>
        <TD width=188 height=30 align=middle><INPUT 
name=user_pass1 type="password" value=1111 size=19 maxLength=15>
        </TD>
        <TD width=90></TD>
      </TR>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>전 화 번 호 : </strong></TD>
        <TD width=188 height=30 align=middle><INPUT size=19 value=018-345-0808 
name=user_phone>
        </TD>
        <TD width=90></TD>
      </TR>
      <TR bgcolor="#FFFFFF">
        <TD width=82 height=30 align=right bgcolor="#EEEEEE"><strong>이 메 일 : </strong></TD>
        <TD width=188 height=30 align=middle><INPUT size=19 value=obama@whitehouse.com 
name=user_email>
        </TD>
        <TD width=90></TD>
      </TR>
    </TBODY>
  </TABLE>
  <p><img src="<%=request.getContextPath() %>/images/commons/edit.gif"></p>
  <DIV class=footer-container><DIV class=footer-item-right></DIV>
  </DIV>
</DIV>
			
			
			</div>
		</div>
		<div id="body-content-openpages">
			<div>
			
			<script type="text/javascript">
 $(document).ready(function() {
            $('a.delete').click(function() {
               if(confirm("정말삭제 하시겠습니까?")){
               window.location="<%=request.getContextPath()%>/openpage/openpage_administration/openpage_delete.do?openpage_url="+this.value;
               }
            });
        });

</script>
			
			<h1>openPages</h1>
			<p>유저가 만든 오픈 페이지 리스트 및 관리 도구 입니다.</p>
<table width="99%" border="0" cellpadding="3" cellspacing="1" bgcolor="#CCCCCC">
	<tr bgcolor="#E3E3E3">
		<td width="87"><strong>name</strong></td>
		<td width="127"><strong>url</strong></td>
		<td width="91"><strong>description</strong></td>
		<td width="161"><strong>shar with</strong></td>
		<td width="161"><strong>edit</strong></td>
  </tr>
	<c:forEach var="data" items="${openpagelist.rows}">
		<tr bgcolor="#FFFFFF">
			<td width="87">${data.openpage_name}</td>
			<td width="127">${data.openpage_url}</td>
			<td width="91">${data.openpage_description}</td>
			<td width="161">${data.openpage_type}</td>
			<td width="161">
			<a href="<%=request.getContextPath() %>/openpage/admin?url=${data.openpage_url}"><img  style="padding:2px" src="<%=request.getContextPath()%>/images/commons/editpage.gif" border="0" alt="관리페이지"></a><br>
			<a href="<%=request.getContextPath()%>/openpage/view?url=${data.openpage_url}"><img  style="padding:2px" src="<%=request.getContextPath()%>/images/commons/gopage.gif" border="0" alt="페이지가기"></a><br>
		  <a class="delete" href="#" value="${data.openpage_url}"><img  style="padding:2px" src="<%=request.getContextPath()%>/images/commons/delete.gif" border="0" alt="삭제"></a></td>
	</tr>
	</c:forEach>
</table>
<p>&nbsp;</p>
		
			<A 
href="<%=request.getContextPath() %>/openpage/openpage_administration/openpage_create.do"><img src="<%=request.getContextPath()%>/images/commons/createopenpage.gif" border="0" alt="오픈페이지 생성하로가기"></A><BR>
<p>&nbsp;</p>	
			</div>
		</div>
		<div id="body-content-openresume" style="position: static">
			<div>
			
			<!--  이력서시작. -->
			
			<h1 align="center">Resume</h1>
			<p>회원 이력서  수정/등록 페이지 입니다.</p>
			
		<div align="center">사진 올리기 
		    <input type="file" name="uploadFile" id="insert_photo"/>
	      </div>
	</div>
	<div id="first">
	  <div align="center">
	    <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
		    <tr bgcolor="#FFFFFF">
			    <td width="30" rowspan="6">인<br/><br/>적<br/><br/>사<br/><br/>항</td>
			    <td width="135" rowspan="6">
				    <img src="/final_project/images/commons/temp/obama1.jpg" border="1"				
				width="120" height="150" id="photo_id" alt="default_photo"/>
			    </td> 
			    <td width="30" rowspan="3">성<br/><br/>명</td>
			    <td width="35" height="25">한글</td>
			    <td width="130" height="25">
				    <input name="resume_name_kor" type="text" value="오바마" size="16"/>
			    </td>			
			    <td width="120" height="25" colspan="2">희&nbsp;망&nbsp;업&nbsp;무</td>			
			    <td height="25" colspan="4">
				    <input name="resume_position" type="text" value="대통령" size="27"/>
			    </td>			
		    </tr>
		    <tr>			
			    <td height="25">영문</td>
			    <td height="25">
				    <input name="resume_name_eng" type="text" value="Obama" size="16"/>
			    </td>			
			    <td height="25" colspan="2">희&nbsp;망&nbsp;연&nbsp;봉</td>			
			    <td height="25" colspan="4">
				    <input name="resume_salary" type="text" value="2000만원" size="27"/>
			    </td>			
		    </tr>
		    <tr>			
			    <td height="25">한자</td>
			    <td height="25">
				    <input type="text" name="resume_name_chc" size="16"/>
			    </td>
			    <td width="35" height="25">성별</td>
			    <td width="85" height="25">
				    <input type="radio" id="radio1" name="radio" value="a" checked="checked"/>남
				    <input type="radio" id="radio2" name="radio" value="b"/>여			
			    </td>
			    <td width="35" height="25">연령</td>
			    <td width="65" height="25">
				    <input name="resume_age" type="text" value="49" size="7"/>
			    </td>
			    <td width="35" height="25">국적</td>			
			    <td width="65" height="25">
				    <input name="resume_nationality" type="text" value="미국" size="7"/>
			    </td>			
		    </tr>
		    <tr>
			    <td height="25" colspan="2">주&nbsp;소</td>
			    <td height="25" colspan="7">
				    <input name="resume_address" type="text" value="전남 구례군 마실리 153" size="63"/>
			    </td>			
		    </tr>
		    <tr>
			    <td height="25" colspan="2">주민번호</td>			
			    <td height="25">
				    <input name="resume_jumin" type="text" value="860425-1586015" size="16"/>
			    </td>			
			    <td height="25" colspan="2">e-mail</td>			
			    <td height="25" colspan="4">
				    <input name="resume_email" type="text" value="obama@whitehouse.com" size="27"/>
			    </td>			
		    </tr>
		    <tr>
			    <td height="25" colspan="2">전화번호</td>			
			    <td height="25">
				    <input name="resume_phone" type="text" value="061-324-0808" size="16"/>
			    </td>			
			    <td height="25" colspan="2">휴&nbsp;대&nbsp;폰</td>			
			    <td height="25" colspan="4">
				    <input type="text" name="resume_call" size="27"/>
			    </td>	
		    </tr>		
	      </table>
	    </div>
	</div>
	<div align="center"><br/>
	  
	</div>
	<div id="second">
	  <div align="center">
	    <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
		    <tr bgcolor="#FFFFFF">
			    <td width="30" rowspan="6">학<br/><br/>력</td>
			    <td width="190" height="25">기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간</td>
			    <td width="150">출&nbsp;신&nbsp;학&nbsp;교</td>
			    <td width="160">전&nbsp;&nbsp;&nbsp;&nbsp;공</td>
			    <td width="70">졸업구분</td>
			    <td width="80">학&nbsp;점</td>	
		    </tr>
		    <tr>
			    <td height="25"><input name="resume_previous1" type="text" value="1982.09.01 ~ 1988.07.20" size="24"/></td>
			    <td><input name="resume_school1" type="text" value="하버드 대학교" size="19"/></td>
			    <td><input name="resume_specialty1" type="text" value="법학" size="20"/></td>
			    <td><input name="resume_location1" type="text" value="졸업" size="7"/></td>
			    <td><input name="resume_credit1" type="text" value="A+" size="9"/></td>
		    </tr>
		    <tr>
			    <td height="25"><input name="resume_previous2" type="text" value="1992.09.02 ~ 1994.03.10" size="24"/></td>
			    <td><input name="resume_school2" type="text" value="하버드 대학교 대학원 " size="19"/></td>
			    <td><input name="resume_specialty2" type="text" value="법학" size="20"/></td>
			    <td><input name="resume_location2" type="text" value="졸업" size="7"/></td>
			    <td><input name="resume_credit2" type="text" value="A" size="9"/></td>
		    </tr>
		    <tr>
			    <td height="25"><input type="text" name="resume_previous3" size="24"/></td>
			    <td><input type="text" name="resume_school3" size="19"/></td>
			    <td><input type="text" name="resume_specialty3" size="20"/></td>
			    <td><input type="text" name="resume_location3" size="7"/></td>
			    <td><input type="text" name="resume_credit3" size="9"/></td>
		    </tr>
	      </table>
	    </div>
	</div>
	<div align="center"><br/>
	  </div>
	<div id="third">
	  <div align="center">
	    <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
		    <tr bgcolor="#FFFFFF">
			    <td width="30" rowspan="6">보<br/>유<br/>기<br/>술</td>
			    <td width="120" height="25">자&nbsp;격&nbsp;면&nbsp;허</td>
			    <td width="120">취&nbsp;&nbsp;득&nbsp;&nbsp;일</td>
			    <td width="130">발&nbsp;&nbsp;행&nbsp;&nbsp;처</td>
			    <td width="3">&nbsp;</td>
			    <td width="187">프&nbsp;로&nbsp;그&nbsp;래&nbsp;밍</td>
			    <td width="90">능&nbsp;&nbsp;력</td>	
		    </tr>
		    <tr>
			    <td height="25"><input name="resume_certificate1" type="text" value="자동차운전면허1종" size="14"/></td>
			    <td><input name="resume_acquisition1" type="text" value="2002.02.02" size="14"/></td>
			    <td><input name="resume_publish1" type="text" value="전남지방교통청" size="15"/></td>
			    <td width="3">&nbsp;</td>
			    <td><input name="resume_programingname1" type="text" value="C/C++" size="24"/></td>
			    <td><input name="resume_programingability1" type="text" value="상" size="10"/></td>
		    </tr>
		    <tr>
			    <td height="25"><input name="resume_certificate2" type="text" value="SCJP" size="14"/></td>
			    <td><input name="resume_acquisition2" type="text" value="2003.02.01" size="14"/></td>
			    <td><input name="resume_publish2" type="text" value="Sun" size="15"/></td>
			    <td width="3">&nbsp;</td>
			    <td><input name="resume_programingname2" type="text" value="Java" size="24"/></td>
			    <td><input name="resume_programingability2" type="text" value="중" size="10"/></td>
		    </tr>
		    <tr>
			    <td height="25"><input type="text" name="resume_certificate3" size="14"/></td>
			    <td><input type="text" name="resume_acquisition3" size="14"/></td>
			    <td><input type="text" name="resume_publish3" size="15"/></td>
			    <td width="3">&nbsp;</td>
			    <td><input type="text" name="resume_programingname3" size="24"/></td>
			    <td><input type="text" name="resume_programingability3" size="10"/></td>
		    </tr>
	      </table>
	    </div>
	</div>
	<div align="center"><br/>
	  </div>
	<div id="fourth">
	  <div align="center">
	    <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
		    <tr>
			    <td rowspan="6" width="30">외<br/>국<br/>어<br/>능<br/>력</td>
			    <td width="179" height="25">외&nbsp;국&nbsp;어&nbsp;명</td>
			    <td width="139">능&nbsp;력</td>
			    <td width="3">&nbsp;</td>
			    <td width="189">외&nbsp;국&nbsp;어&nbsp;시&nbsp;험</td>
			    <td width="140">시&nbsp;험&nbsp;점&nbsp;수</td>
		    </tr>
		    <tr>	
			    <td height="25"><input name="resume_foreign1" type="text" value="영어" size="23"/></td>
			    <td><input name="resume_ability1" type="text" value="유창" size="17"/></td>
			    <td>&nbsp;</td>
			    <td><input name="resume_foreigntest1" type="text" value="토익" size="24"/></td>
			    <td><input name="resume_foreigresult1" type="text" value="640" size="17"/></td>			
		    </tr>
		    <tr>	
			    <td height="25"><input name="resume_foreign2" type="text" value="불어" size="23"/></td>
			    <td><input name="resume_ability2" type="text" value="중간" size="17"/></td>
			    <td>&nbsp;</td>
			    <td><input type="text" name="resume_foreigntest2" size="24"/></td>
			    <td><input type="text" name="resume_foreigresult2" size="17"/></td>			
		    </tr>
		    <tr>	
			    <td height="25"><input type="text" name="resume_foreign3" size="23"/></td>
			    <td><input type="text" name="resume_ability3" size="17"/></td>
			    <td>&nbsp;</td>
			    <td><input type="text" name="resume_foreigntest3" size="24"/></td>
			    <td><input type="text" name="resume_foreigresult3" size="17"/></td>			
		    </tr>	
	      </table>
	    </div>
	</div>
	
	<div id="fifth">
	  <div align="center"><br/>
	      <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
    
		<tr>
			    <td rowspan="6" width="30">병<br/>역</td>
			    <td width="140" height="25">군&nbsp;&nbsp;별</td>
			    <td width="140">계&nbsp;&nbsp;급</td>			
			    <td width="140">병&nbsp;&nbsp;과</td>
			    <td width="230">기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간</td>
		    </tr>
		    <tr>	
			    <td height="25"><input type="text" name="resume_mili_type" size="17"/></td>			
			    <td><input type="text" name="resume_mili_class" size="17"/></td>
			    <td><input type="text" name="resume_mili_trench" size="17"/></td>
			    <td><input type="text" name="resume_mili_pre" size="30"/></td>			
		    </tr>				
	        </table>
	    </div>
	</div>
	<div align="center"><br/>
	  
	</div>
	<div id="message1">
		<div align="center">교육기관에서 교육받은 내용이 있으면 버튼을 누르세요.
		    <img src="/final_project/images/members/bt_test.jpg" style="cursor:hand;" id="button1"/>		
	      </div>
	</div>
	
	
	<div id="sixth" style="display:none">
		<div id="message1">
			<div align="center">교육기관에서 교육받은 내용이 없으면 버튼을 누르세요.
			    <img src="/final_project/images/members/bt_test.jpg" style="cursor:hand;" id="button2"/>
		      </div>
		</div>	
		<div align="center"><br/>
	        <table border="1" cellspacing="0" cellpadding="0" width="680">		
		    <tr>
			    <td rowspan="6" width="30">교<br/>육<br/>내<br/>용</td>
			    <td width="140" height="25">교&nbsp;육&nbsp;과&nbsp;정&nbsp;명</td>
			    <td width="180">교&nbsp;육&nbsp;기&nbsp;간</td>			
			    <td width="210">내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용</td>
			    <td width="120">기&nbsp;관&nbsp;명</td>
		    </tr>
		    <tr>	
			    <td height="25"><input type="text" name="resume_edu1" size="17"/></td>			
			    <td><input type="text" name="resume_edu_pre1" size="23"/></td>
			    <td><input type="text" name="resume_edu_note1" size="27"/></td>
			    <td><input type="text" name="resume_edu_ins1" size="14"/></td>			
		    </tr>		
		    <tr>	
			    <td height="25"><input type="text" name="resume_edu2" size="17"/></td>			
			    <td><input type="text" name="resume_edu_pre2" size="23"/></td>
			    <td><input type="text" name="resume_edu_note2" size="27"/></td>
			    <td><input type="text" name="resume_edu_ins2" size="14"/></td>			
		    </tr>	
		    <tr>	
			    <td height="25"><input type="text" name="resume_edu3" size="17"/></td>			
			    <td><input type="text" name="resume_edu_pre3" size="23"/></td>
			    <td><input type="text" name="resume_edu_note3" size="27"/></td>
			    <td><input type="text" name="resume_edu_ins3" size="14"/></td>			
		    </tr>			
	          </table>
		  </div>
	</div>
	<div align="center"><br/>		
	  </div>
	<div id="seventh">
	  <div align="center">
	    <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
		    <tr>
			    <td rowspan="6" width="30">경<br/><br/>력</td>
			    <td width="140" height="25">회&nbsp;사&nbsp;명</td>
			    <td width="180">근&nbsp;무&nbsp;기&nbsp;간</td>			
			    <td width="210">업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;무</td>
			    <td width="120">퇴&nbsp;사&nbsp;사&nbsp;유</td>
		    </tr>
		    <tr>	
			    <td height="25"><input type="text" name="resume_care_name1" size="17"/></td>			
			    <td><input type="text" name="resume_care_pre1" size="23"/></td>
			    <td><input type="text" name="resume_care_busi1" size="27"/></td>
			    <td><input type="text" name="resume_care_retirement1" size="14"/></td>			
		    </tr>		
		    <tr>	
			    <td height="25"><input type="text" name="resume_care_name2" size="17"/></td>			
			    <td><input type="text" name="resume_care_pre2" size="23"/></td>
			    <td><input type="text" name="resume_care_busi2" size="27"/></td>
			    <td><input type="text" name="resume_care_retirement2" size="14"/></td>
		    </tr>	
		    <tr>	
			    <td height="25"><input type="text" name="resume_care_name3" size="17"/></td>			
			    <td><input type="text" name="resume_care_pre3" size="23"/></td>
			    <td><input type="text" name="resume_care_busi3" size="27"/></td>
			    <td><input type="text" name="resume_care_retirement3" size="14"/></td>
		    </tr>			
	      </table>
	    </div>
	</div>
	<div align="center"><br/>	
  
	</div>
	<div id="eighth">
	  <div align="center">
	    <table width="680" border="1" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">		
		    <tr>
			    <td width="180" height="25">혈&nbsp;액&nbsp;형</td>
			    <td width="180">시&nbsp;&nbsp;력</td>
			    <td width="180">종&nbsp;&nbsp;교</td>			
    
			<td width="200">형&nbsp;제&nbsp;관&nbsp;계</td>			
		    </tr>
		    <tr>	
			    <td height="25"><input name="resume_blood" type="text" value="A형" size="21"/></td>			
			    <td><input name="resume_sight" type="text" value="1.0/1.0" size="21"/></td>
			    <td><input name="resume_religion" type="text" value="기독교" size="21"/></td>
			    <td><input type="text" name="resume_family" size="22"/></td>			
		    </tr>						
	      </table>
	    </div>
	</div>
	<div id="open_resume">
		<div align="center">
		    <input type="checkbox" name="resume_check" checked="checked"/>
		    이력서를 공개합니다.<br><br>
	      </div>
	</div>
	<div>
		<div align="center">
		  <input type="image" src="<%=request.getContextPath() %>/images/commons/submit.gif" alt="작성완료"/>
		  

		  <input type="image" src="<%=request.getContextPath() %>/images/commons/passsubmit.gif" alt="나중에 작성"/>
		   
	    </div>
	</div>
            <div align="center">
              <!--  이력서끝  -->
			  </div>
			</div>
		</div>
		<div id="body-content-messages">
			<div>

<!--   -->

	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/messages/style.css">
	<script type="text/javascript">
	jQuery(document).ready(function() {
	loadCommentList();
            $("#wow").click(function() {
            	hideAddComment();
				ajax.GUI.setOpacity(view, eval(1.0));                
            });
            $("#wow3").blur(function () {
                $(this).val("댓글달기");
          
                hideAddComment2();
                
            });
         });
	
	
	function loadCommentList() {
		new ajax.xhr.Request("<%=request.getContextPath()%>/messages/commentlist.jsp", "", loadCommentResult, 'GET');
	}
	function loadCommentResult(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code').item(0)
				                 .firstChild.nodeValue;
				if (code == 'success') {
					var commentList = eval( "(" +
					    xmlDoc.getElementsByTagName('data').item(0)
					          .firstChild.nodeValue +
					")" );
					var listDiv = document.getElementById('commentList');
					for (var i = 0 ; i < commentList.length ; i++) {
						var commentDiv = makeCommentView(commentList[i]);
						listDiv.insertBefore(commentDiv, listDiv.firstChild);
					}
				} else if (code == 'error') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("댓글 목록 로딩 실패:"+req.status);
			}
		}
	}
	function makeCommentView(comment) {
		var commentDiv = document.createElement('div');
		commentDiv.setAttribute('id', 'c'+comment.id);
		 
		var html = '<td rowspan="6" width="35">'+
			'<img src="<%=request.getContextPath()%>/images/members/default_photo.jpg" border="1"'+				
			'width="55" height="55" id="photo_id" alt=""/>'+
			'</td>'+'<strong>'+comment.name+'</strong><br/>'+
			comment.content.replace(/\n/g, '\n<br/>')+'<br/>'+
			
			
			'<div class="button1" onclick="viewUpdateForm('+comment.id+')"><p>update</p></div>'+
			'<div class="button2" onclick="confirmDeletion('+comment.id+')"><p>delete</p></div>'
			
		
		commentDiv.innerHTML = html;
		commentDiv.comment = comment;
		commentDiv.className = "comment";
		return commentDiv;
	}
	function addComment() {
		var AddFormDiv = document.getElementById('wow2');
		AddFormDiv.style.display = 'none';
		var CommentView = document.getElementById('wow');
		//CommentView.value="이름을 입력하세요...";
		
		
		var name = document.addForm.name.value;
		var content = document.addForm.content.value;
		var params = "name="+encodeURIComponent(name)+"&"+
		             "content="+encodeURIComponent(content);
		
		new ajax.xhr.Request('<%=request.getContextPath()%>/messages/commentadd.jsp', params, addResult, 'POST');
	}
	function hideAddComment2(){
		var AddFormDiv = document.getElementById('wow2');
		AddFormDiv.style.display = 'none';
		var CommentView = document.getElementById('wow');
	}
		

	function addResult(req) {		
		if (req.readyState == 4) {
			if (req.status == 200) {
				
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code').item(0)
				                 .firstChild.nodeValue;
				if (code == 'success') {
					var comment = eval( "(" +
					    xmlDoc.getElementsByTagName('data').item(0)
					          .firstChild.nodeValue +
					")" );
					var listDiv = document.getElementById('commentList');
					var commentDiv = makeCommentView(comment);
					
					listDiv.insertBefore(commentDiv, listDiv.firstChild);
					
					document.addForm.name.value = '';
					document.addForm.content.value = '';
				} else if (code == 'fail') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("서버 에러 발생: " + req.status);
			}
		}
	}
	function viewUpdateForm(commentId) {
		var commentDiv = document.getElementById('c'+commentId);
		var updateFormDiv = document.getElementById('commentUpdate');
		if (updateFormDiv.parentNode != commentDiv) {
			updateFormDiv.parentNode.removeChild(updateFormDiv);
			commentDiv.appendChild(updateFormDiv);
		}
		var comment = commentDiv.comment;
		document.updateForm.id.value = comment.id;
		document.updateForm.name.value = comment.name;
		document.updateForm.content.value = comment.content;
		updateFormDiv.style.display = '';
	}
	function cancelUpdate() {
		hideUpdateForm();
	}
	
	
	function hideUpdateForm() {
		var updateFormDiv = document.getElementById('commentUpdate');
		updateFormDiv.style.display = 'none';
		updateFormDiv.parentNode.removeChild(updateFormDiv);
		document.documentElement.appendChild(updateFormDiv);
	}
	
	function hideAddComment() {
		var CommentView = document.getElementById('wow');
		CommentView.value="";
		var AddFormDiv = document.getElementById('wow2');
		AddFormDiv.style.display = '';
	}
	function updateComment() {
		var id = document.updateForm.id.value;
		var name = document.updateForm.name.value;
		var content = document.updateForm.content.value;
		var params = "id="+encodeURIComponent(id)+"&"+
		             "name="+encodeURIComponent(name)+"&"+
		             "content="+encodeURIComponent(content);
		new ajax.xhr.Request('<%=request.getContextPath()%>/messages/commentupdate.jsp', params, updateResult, 'POST');
	}
	function updateResult(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code')
				                 .item(0).firstChild.nodeValue;
				if (code == 'success') {
					hideUpdateForm();
					var comment = eval( "(" +
					    xmlDoc.getElementsByTagName('data').item(0)
					          .firstChild.nodeValue +
					")" );
					var listDiv = document.getElementById('commentList');
					var newCommentDiv = makeCommentView(comment);
					var oldCommentDiv = 
					        document.getElementById('c'+comment.id);
					listDiv.replaceChild(newCommentDiv, oldCommentDiv);
					var view = document.getElementById("test");
					ajax.GUI.setOpacity(view, eval(0.2));
					alert("수정했습니다!");
					ajax.GUI.setOpacity(view, eval(1.0));
				} else if (code == 'fail') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("서버 에러 발생: " + req.status);
			}
		}
	}
	function confirmDeletion(commentId) {
		var view = document.getElementById("test");
		ajax.GUI.setOpacity(view, eval(0.2));	
		if (confirm("삭제하시겠습니까?")) {
			var params = "id="+commentId;
			new ajax.xhr.Request(
				'<%=request.getContextPath()%>/messages/commentdelete.jsp', params, removeResult, 'POST');
		}else{
		ajax.GUI.setOpacity(view, eval(1.0));
		}
	}
	function removeResult(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var xmlDoc = req.responseXML;
				var code = xmlDoc.getElementsByTagName('code').item(0)
				                 .firstChild.nodeValue;
				if (code == 'success') {
					var deletedId = 
						xmlDoc.getElementsByTagName('id').item(0)
						      .firstChild.nodeValue;
					var commentDiv = document.getElementById("c"+deletedId);
					commentDiv.parentNode.removeChild(commentDiv);
						
					
					alert("삭제했습니다");
					var view = document.getElementById("test");
          			ajax.GUI.setOpacity(view, eval(1.0));
				} else if (code == 'fail') {
					var message = xmlDoc.getElementsByTagName('message')
					                    .item(0).firstChild.nodeValue;
					alert("에러 발생:"+message);
				}
			} else {
				alert("서버 에러 발생: " + req.status);
			}
		}
	}
	
	
	</script>

	<h1>Messages</h1>
	<p>친구들과 여러 대화를 나눌수 있는 쪽지 기능입니다. </p>
<div id="test">


</div>

<div class="container" style="width: 90%">
<div id="wow3" class="titlem">
<div id="commentAdd1" >
	<form action="" name="addForm">
	이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름: <input id ="wow" type="text" name="name" size="20" value ="이름을 입력하세요..."/><br/>
	<div id ="wow2" style="display: none">
	내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용: <textarea id="wow3" name="content" cols="25" rows="2"></textarea><br/>
	<div class="button2" onclick="addComment()"><p>add</p></div>
	<div id="add_photo">
	면상등록:<input type="file" name="resume_photo" id="insert_photo"/>
	</div>

	</div>
	</form>
	</div>
	
</div>

<div id="commentUpdate" style="display: none" class="titlem">
	<form action="" name="updateForm">
	<input type="hidden" name="id" value=""/>
	이름: <input type="text" name="name" size="20"/><br/>
	내용: <textarea name="content" cols="20" rows="2"></textarea><br/>
	<div class="button1" onclick="updateComment()"><p>update</p></div>
	<div class="button1" onclick="cancelUpdate()"><p>cancel</p></div>
	</form>
</div>
</div>


	<div class="container" style="width: 90%">
		<div id="comment">
				<div id="commentList"></div>
		</div>
	</div>


</div>


<!--  -->

	  </div>
  </div>
