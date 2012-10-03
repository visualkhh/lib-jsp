<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<jsp:include page="/common/include.jsp" flush="false">
<jsp:param name="javascript" value="<%=com.web.UtilWeb.INCLUDE_PARAMVALUE_JQUERY %>" />
</jsp:include>
<title>Insert title here</title>
  <script type="text/javascript">
        $(document).ready(function() {
            $("input").click(function() {
                if($(this).attr("type") == "checkbox") {
                    $(this).next().text("radio");
                    $(this).replaceWith("<input type='radio' name='"+$(this).attr("name")+"'>");
                }
                alert($("body").html());
            });
        });
    </script>
</head>
<body>
    <input type="checkbox" name="check"><b>check box</b>
</body>
</html>
