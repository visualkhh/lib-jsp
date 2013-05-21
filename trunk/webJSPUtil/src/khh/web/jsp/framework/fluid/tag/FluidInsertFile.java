package khh.web.jsp.framework.fluid.tag;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;

import khh.callstack.util.StackTraceUtil;
import khh.file.util.FileUtil;
import khh.web.jsp.framework.fluid.Fluid;
import khh.web.jsp.framework.fluid.Template;
import khh.web.jsp.tag.custom.TagSupportSimple;

public class FluidInsertFile extends TagSupportSimple {
	String id;
	String exception="false";
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
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
			String fileinfo = FileUtil.readeFileToString(getRequest().getRealPath(value));
			if(value!=null){
				getJspWriter().write(fileinfo);
			}
		} catch (Exception e) {
			try {
				if("true".equals(getException()) || "TRUE".equals(getException()))
				getJspWriter().write(StackTraceUtil.getStackTrace(e));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		return SKIP_BODY;
	}
}
