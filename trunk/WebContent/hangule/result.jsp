
<%@page import="com.kdn.util.conversion.ConversionUtil"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
::result::<p>
<%
String result="";
result = request.getParameter("in");

System.out.println(ConversionUtil.urlEncode("김현하", ConversionUtil.SET_UTF_8));
System.out.println(ConversionUtil.urlDecode(result, ConversionUtil.SET_EUC_KR));

System.out.println("firssest    "+result);

String new_str="";
		try{
			new_str = ConversionUtil.stringConversion(result, ConversionUtil.SET_8859_1, ConversionUtil.SET_KSC5601);
			//String new_str = new String(result.getBytes("8859_1"),"KSC5601" );
		}catch(UnsupportedEncodingException e){
		}catch(Exception e){
    }


System.out.println("hangule    "+result);

%>

<%=new_str %>
<%=ConversionUtil.urlDecode(result, ConversionUtil.SET_EUC_KR) %>
</body>
</html>