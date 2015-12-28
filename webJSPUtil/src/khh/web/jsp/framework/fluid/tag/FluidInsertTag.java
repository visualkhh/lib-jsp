package khh.web.jsp.framework.fluid.tag;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;

import khh.callstack.util.StackTraceUtil;
import khh.web.jsp.framework.fluid.Fluid;
import khh.web.jsp.framework.fluid.Template;
import khh.web.jsp.tag.custom.TagSupportSimple;

public class FluidInsertTag extends TagSupportSimple {
	String id;
	String exception	= "false";
	String attribute 	= null;
	String target 		= null;
	String name 		= null;
	String enable		= "true";
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
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
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
		
//		if("true".equals(getEnable()) || "TRUE".equals(getEnable())){
			Template template = (Template) getRequest().getAttribute(Fluid.PARAM_NAME_TEMPLATE);
			try {
				getJspWriter().flush();
			} catch (IOException e1) {
			}
			
			
			if(null==getName()){  //이름없으면  태그부분없앤다.
				return EVAL_BODY_INCLUDE;
			}
			
			
			try {
				String str ="";
				str +="<";
				str += (  getName() + (getAttribute()!=null?" "+getAttribute():"")+" " );
				//getJspWriter().write(value);
				
				String target = getTarget();
				boolean enable = template.isViewEnable(getId());
				//name이없으면 태그 앞부분 안넣는다
				if(enable && isTagEnable()){
					if(null != target){
						String value = template.getViewValue(getId());
						if(value!=null){
							str += (target+" = \""+value+"\"");
						}
					}
					str+=" >";
					getJspWriter().write(str);
				}else{
					return SKIP_BODY;
				}
			} catch (Exception e) {
				try {
					if(isTagException())
					getJspWriter().write(StackTraceUtil.getStackTrace(e));
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			
			
			return EVAL_BODY_INCLUDE;
	}
	
	@Override
	public int doEndTag() throws JspException {
			try {
				Template template = (Template) getRequest().getAttribute(Fluid.PARAM_NAME_TEMPLATE);
				boolean enable = template.isViewEnable(getId());
				
				if(enable && isTagEnable()){
					if(null!=getName()){  //이름없으면  태그부분없앤다.
						getJspWriter().write("</"+getName()+">");
					}
				}
			} catch (Exception e) {
				try {
					if(isTagException())
					getJspWriter().write(StackTraceUtil.getStackTrace(e));
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		return super.doEndTag();
	}
	
}
