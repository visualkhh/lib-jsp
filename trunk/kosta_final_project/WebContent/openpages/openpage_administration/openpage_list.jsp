<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%><head>


<script src="<%=request.getContextPath()%>/openpages/js/jquery.js" type="text/javascript"></script>
<script type="text/javascript">
 $(document).ready(function() {
            $('a.delete').click(function() {
               if(confirm("�������� �Ͻðڽ��ϱ�?")){
               window.location="<%=request.getContextPath()%>/openpage/openpage_administration/openpage_delete.do?openpage_url="+this.value;
               }
            });
        });

</script>
</head>


<h1>my openPages</h1>
<table width="476" border="0" cellpadding="1" cellspacing="1" bgcolor="#CCCCCC">
	<tr bgcolor="#FFFFFF">
		<td width="87">name</td>
		<td width="127">url</td>
		<td width="91">description</td>
		<td width="161">shar with</td>
		<td width="161">edit</td>
  </tr>
	<c:forEach var="data" items="${requestScope.openpagelist}">
		<tr bgcolor="#FFFFFF">
			<td width="87">${data.openpage_name}</td>
			<td width="127">${data.openpage_url}</td>
			<td width="91">${data.openpage_description}</td>
			<td width="161">${data.openpage_type}</td>
			<td width="161">
			<a href="<%=request.getContextPath() %>/openpage/admin?url=${data.openpage_url}">����������</a><br>
			<a href="<%=request.getContextPath() %>/openpage/view?url=${data.openpage_url}">����������</a><br>
		  <a class="delete" href="#" value="${data.openpage_url}">����</a></td>
	</tr>
	</c:forEach>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>

