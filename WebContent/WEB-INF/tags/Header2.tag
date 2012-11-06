<%@ attribute name="fontColor" required="true" %>
<%@ attribute name="subTitle" required="true" %>
<%@ tag body-content="tagdependent" %>

<em><strong><font color="${fontColor}"><jsp:doBody></jsp:doBody></font></strong></em>

<%--
1. WEB-INF/tags 바로 밑
2. WEB-INF/tags의 하위 디렉토리
3. WEB-INF/lib에 JAR 파일로 배포되었다면, JAR파일 META-INF/tags 밑에
4. WEB-INF/lib에 JAR 파일로 배포되었다면, JAR파일 META-INF/tags의 하위 디렉토리

태그 파일이 JAR 파일로 배포 되었다면, 반드시 TLD 파일이 있어야 한다.


--%>