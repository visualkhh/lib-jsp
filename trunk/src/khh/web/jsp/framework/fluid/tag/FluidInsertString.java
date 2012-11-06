package khh.web.jsp.framework.fluid.tag;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;

import khh.web.jsp.framework.fluid.Fluid;
import khh.web.jsp.framework.fluid.Template;
import khh.web.jsp.tag.custom.TagSupportSimple;

public class FluidInsertString extends TagSupportSimple {
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
				getJspWriter().write(value);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SKIP_BODY;
	}
}
