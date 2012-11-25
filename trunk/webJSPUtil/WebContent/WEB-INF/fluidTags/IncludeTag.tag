<%--
 --%>
 <%@tag import="khh.web.jsp.framework.fluid.Template"%>
<%@tag import="khh.web.jsp.framework.fluid.FluidConfigManager"%>
<%@tag import="khh.web.jsp.framework.fluid.Fluid"%>
<%@ attribute name="id" required="true" rtexprvalue="true" %>
 
 <%
Template template =(Template)request.getAttribute("fluid_template"); 
 %>
<jsp:include page="${id}" flush="false">
	<jsp:param value="f" name="sad"/>
</jsp:include>

<%="aaaaaaaaaa".length()%>
