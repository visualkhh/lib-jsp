<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<% request.setAttribute("name","�ֱԹ�");         
		//�� �ҷ����� �� .
  %>
${requestScope.name}





<%-- URL&code=5555  Get ���  ���� post��ĵ� �������.
�� �ҷ����°�--%>
${param.code}
${param.id}
${param["id"]}


<%--
${cookie.ID.value}
EL  ���ٹ��
cookie.ID.value  �ε� �����ϰ�   
cookie[ID] ���̵� �����ϴ�.
 --%>

<%--
${name}
���ϸ� ��������� Scope�� �������൵
���ʴ�� ã�´�. �˾Ƽ�
 --%>


</body>
</html>