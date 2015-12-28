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
	String enable	= "true";
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
	
	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}
	public boolean isTagEnable(){
		return "true".equals(getEnable()) || "TRUE".equals(getEnable());
	}
	public boolean isTagException(){
		return "true".equals(getException()) || "TRUE".equals(getException());
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
			boolean enable 	= template.isViewEnable(getId());
			if(enable && isTagEnable() && value!=null){
				String fileinfo = FileUtil.readeFileToString(getRequest().getRealPath(value));
				getJspWriter().write(fileinfo);
			}
		} catch (Exception e) {
			try {
				if(isTagException())
				getJspWriter().write(StackTraceUtil.getStackTrace(e));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		return SKIP_BODY;
	}
}
