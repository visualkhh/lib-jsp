<%--
<%@ attribute name="subTitle" required="true" rtexprvalue="true" %>
<img src="http://wstatic.naver.com/w9/lg_naver_v3.gif"><br>
<em><strong>${subTitle}</strong></em>
attribute로 넘어온 값은 param 이라는 이름 없이 ${subTitle} 과 같이 바로 사용하면 된다. 또한 사용하기 위해서는 상단에 "<%@ attribute name="subTitle" required="true" rtexprvalue="true" %>" 와 같이 attribute 정의를 해 놔야 한다.
tld에 정의한 바와 같이 required는 필수 여부, rtexprvalue는 표현식 사용 여부를 나타내는 것이다.
 --%>

<img src="http://wstatic.naver.com/w9/lg_naver_v3.gif"><br>
<%="aaaaaaaaaa".length()%>
