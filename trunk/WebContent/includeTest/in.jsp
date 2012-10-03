<%@page import="com.kdn.util.property.PropertyUtil"%>
<%@page import="com.kdn.util.debug.LogK"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
»§²Ù¶Ë²Ù
<%
if(request.getParameter("grade")!=null){
String [] grade = request.getParameter("grade").split("\\,");

for(int  i = 0 ; i  < grade.length;i++){
out.print(grade[i].trim());
out.print("<br>");
}
}
//LogK logk  = LogK.getInstans();
System.out.println(PropertyUtil.getClassPath());
%>


