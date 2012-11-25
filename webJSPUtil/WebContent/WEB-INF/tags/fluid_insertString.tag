<%@tag import="khh.web.jsp.framework.fluid.Template"%>
<%@tag import="khh.web.jsp.framework.fluid.FluidConfigManager"%>
<%@tag import="khh.web.jsp.framework.fluid.Fluid"%>
<%@ attribute   name="id" required="true" rtexprvalue="true" %>
<%=((Template)request.getAttribute("fluid_template")).getViewValue((String)jspContext.getAttribute("id"))%>
