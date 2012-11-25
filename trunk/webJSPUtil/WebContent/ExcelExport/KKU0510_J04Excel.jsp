<%@ page language="java" contentType = "text/html; charset=euc-kr"%>
<%@ page import = "java.sql.*, java.util.*, java.text.SimpleDateFormat, project.* "%> 
<jsp:useBean id="tech" class="project.kepcoweb.KIU0050_C01_tech"/>
<% 
	response.setContentType("application/vnd.ms-excel; charset=euc-kr");
	String filename1 = "�ذ���Ȳ.xls";
    response.setHeader("Content-Disposition","attachment; filename=\""+filename1+"\";");
	response.flushBuffer();

	String session_id = "";
	if((String)session.getAttribute("compno")!=null) {
		session_id = (String)session.getAttribute("compno");
	}

	String Sort_index = "1";
	if(request.getParameter("Sort_index")!=null) {
		Sort_index = request.getParameter("Sort_index");
	}
	String upNdown = "asc";
	if(request.getParameter("upNdown")!=null) {
		upNdown = request.getParameter("upNdown");
	}
	String ConsNo = "";
	if(request.getParameter("ConsNo")!=null) {
		ConsNo = request.getParameter("ConsNo");
	}
	int currentPage = 1;
	if(request.getParameter("currentPage")!=null) {
		currentPage = Integer.parseInt(request.getParameter("currentPage"));
	}

	int vSize = 0;
	Vector vect = tech.techJungongList_03(Sort_index, upNdown, ConsNo);	
	if(vect != null){
		vSize = vect.size();
	}
	int totalCount = vSize;
	int totalPage = 0;
	int pMax = totalCount;	 // page �� �Ǽ�

	// Data�� �� Page���� ����
	if ((totalCount%pMax) == 0) {
		totalPage = totalCount / pMax;
	} else {
		totalPage = (totalCount / pMax) + 1;
	}
    int currRow = (pMax*(currentPage-1)) + 1;
%>
<html> 
<head>	
	<title>�ذ�����Ϸ� ����� ��ȸ</title> 
</head>
<body leftmargin="0" topmargin="0" >
<form name="form1" method="post">
<table width="800" border="0" cellspacing="0" cellpadding="0" align="center" valign="top"> 
<tr>  
	<td colspan="3">&nbsp;</td> 
</tr> 
<tr>  
	<td align="center" colspan="3"> 
	<table width="750" border="0" cellspacing="0" cellpadding="0"> 
	<tr>  
		<td bgcolor="#8FB788" height="3"></td> 
	</tr> 
	<tr>  
		<td>  
		<table width="800" border="0" cellspacing="1" cellpadding="3" bgcolor="#E2E2E2"  style="text-align:right;">

		<tr bgcolor="#E0EBDE" align="center">  
			<td nowrap height="27" rowspan="2"><b><font color="#345B2D">����</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">����Ҹ�</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">�����ȣ</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">�����</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">������</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">�ذ���</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">������</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">����������</font></b></td> 
			<td nowrap colspan="5"><b><font color="#345B2D">����ݾ�(�����)</font></b></td> 
			<td nowrap colspan="5"><b><font color="#345B2D">�ذ��ݾ�(�����)</font></b></td> 
			<td nowrap rowspan="2"><b><font color="#345B2D">���ݰ�꼭<br>����</font></b></td>
			<td nowrap colspan="3"><b><font color="#345B2D">���� �ܰ��� ����</font></b></td>
		</tr>
		<tr bgcolor="#E0EBDE" align="center">
			<td><b><font color="#345B2D">������</font></b></td>
			<td><b><font color="#345B2D">���ȭ</font></b></td>
			<td><b><font color="#345B2D">��ġ��</font></b></td>
			<td><b><font color="#345B2D">���ް���</font></b></td>
			<td><b><font color="#345B2D">�ΰ���</font></b></td>
			<td><b><font color="#345B2D">������</font></b></td>
			<td><b><font color="#345B2D">���ȭ</font></b></td>
			<td><b><font color="#345B2D">��ġ��</font></b></td>
			<td><b><font color="#345B2D">���ް���</font></b></td>
			<td><b><font color="#345B2D">�ΰ���</font></b></td>
			<td><b><font color="#345B2D">���� �ܰ���</font></b></td>
			<td><b><font color="#345B2D">���ȭ</font></b></td>
			<td><b><font color="#345B2D">��ġ��</font></b></td>
		</tr> 

<%
	Enumeration ev = vect.elements();
	int i=0;
	for(int k = 1; k < currRow; k++) {
		if(ev.hasMoreElements()) {
			String[] data = (String[])ev.nextElement();
		}
	}

	for(int k=currRow; k<(currRow+pMax); ++k) {
		if(ev.hasMoreElements()) {	
			i++;
			String[] data = (String[])ev.nextElement();
%>
		<tr bgcolor="#FFFFFF" height="25">
			<td align="center"><%=k%></td>
			<td nowrap align="center"><%=data[8]%></td>
			<td nowrap align="center"><%=data[1].substring(0,4)%>-<%=data[1].substring(4,8)%>-<%=data[1].substring(8)%></td>
			<td nowrap align="left"><%=data[2]%></td>
			<td nowrap align="center"><%=data[7]%></td>
			<td nowrap align="center"><%=data[3]%></td>
			<td nowrap align="center"><%=data[4]%></td>
			<td nowrap align="right"><%=data[11]%></td>
			<td nowrap align="right"><%=data[18]%></td><!--TECHCOST_COMP-->
			<td nowrap align="right"><%=data[19]%></td><!--MACH_GUY_TECH_COMP-->
			<td nowrap align="right"><%=data[22]%></td><!--ARCH_ABLOCK_TECH_COMP-->
			<td nowrap align="right"><%=data[16]%></td>
			<td nowrap align="right"><%="0".equals(data[16])?"0":data[17]%></td>
			<td nowrap align="right"><%=data[20]%></td><!--DUNITRU_TECHCOST_COMP-->
			<td nowrap align="right"><%=data[21]%></td><!--DMACH_GUY_TECH_COMP-->
			<td nowrap align="right"><%=data[23]%></td><!--DARCH_ABLOCK_TECH_COMP-->
			<td nowrap align="right"><%=data[5]%></td>
			<td nowrap align="right"><%="0".equals(data[5])?"0":data[6]%></td>
<%
			if( "0".equals(data[5]) ){
%>
			<td align="center" colspan=2>�̹�����</td>
<% 
			}
			else{
%>
			<td align="center"><%=data[10]%></td>
<% 
			}			
%>
			<td nowrap align="right"><%=data[24]%></td>
			<td nowrap align="right"><%=data[25]%></td>
			<td nowrap align="right"><%=data[26]%></td>
		</tr>
<%
		}
	}
	if(vSize<=0) {
		out.println("<tr bgcolor=\"#FFFFFF\"><td align=\"center\" colspan=\"19\"><font color=\"red\">�ش��ϴ� �ڷᰡ �����ϴ�.</font></td></tr>");
	}
%>
		</table> 
		</td> 
	</tr> 
	<tr>  
		<td bgcolor="#8FB788" height="1"></td> 
	</tr> 
	</table> 
	</td> 
</tr>
</table> 
<iframe id="excel_iframe" src="about:blank" frameborder="0" width="0" height="0"></iframe>

</form>

</body>
</html>