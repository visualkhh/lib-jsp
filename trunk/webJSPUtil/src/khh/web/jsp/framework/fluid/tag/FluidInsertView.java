package khh.web.jsp.framework.fluid.tag;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.jsp.JspException;

import khh.callstack.util.StackTraceUtil;
import khh.web.jsp.framework.fluid.Fluid;
import khh.web.jsp.framework.fluid.Template;
import khh.web.jsp.tag.custom.TagSupportSimple;

public class FluidInsertView extends TagSupportSimple {
	String id;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public int doStartTag() throws JspException {
		Template template = (Template) getRequest().getAttribute(Fluid.PARAM_NAME_TEMPLATE);
		
		try {
			getJspWriter().flush();
		} catch (IOException e1) {
		}
		try {
			String value = template.getViewValue(getId());
			if(value!=null){
				RequestDispatcher  dis =  getPageContext().getServletContext().getRequestDispatcher(value);
				dis.include(getRequest(), getResponse());
			}
		} catch (Exception e) {
			try {
				getJspWriter().write(StackTraceUtil.getStackTrace(e));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		
		return SKIP_BODY;
	}
}
