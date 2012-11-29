<%@page import="khh.string.util.StringUtil"%>
<%@page import="khh.std.adapter.Adapter_Std"%>
<%@page import="khh.web.jsp.request.RequestUtil"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script type="text/javascript">
/*
try {
    socket = new Socket("127.0.0.1", DaemonConfig.RCV_SVR_PORT);

    // TODO : for test
    String test = "KILL.RECEIVE.DAEMON";
    dos = new DataOutputStream(socket.getOutputStream());
    dos.write(test.getBytes());
    dos.flush();

} catch(Exception e) {
    e.printStackTrace();
} finally {
    socket.close();
    dos.close();
}
*/


gg="aa";
var ga="aaa";

</script>
<title>Insert title here</title>

</head>

<body>
<form method="POST">
<input name="aa" id="ggg" type="text"/>
<input name="bb" id="bb" type="text"/>
<input type="submit"/>
</form>
<%=request.getServerName()%>  
</body>
</html>
<%
	/*
Map map  = request.getParameterMap();
Set keyset = map.keySet();
Iterator i = keyset.iterator();
while(i.hasNext()){
	Object key 		= i.next();
	Object value  	= map.get(key);
	System.out.println("key:"+key+"    value:"+value);	
}
*/
Adapter_Std adapter = RequestUtil.getParameters(request);
for(int  i = 0 ; i < adapter.size();i++){
	
	System.out.println(adapter.getKey(i)+":"+adapter.getString(i));
}



System.out.println( StringUtil.concatenateToParameter(adapter));
%>

방갑습니다 index.jsp입니다.