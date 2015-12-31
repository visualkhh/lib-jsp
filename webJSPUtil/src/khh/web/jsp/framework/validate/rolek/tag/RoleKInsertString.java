package khh.web.jsp.framework.validate.rolek.tag;

import java.io.IOException;
import java.util.LinkedHashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;

import khh.callstack.util.StackTraceUtil;
import khh.web.jsp.framework.fluid.Fluid;
import khh.web.jsp.framework.fluid.Template;
import khh.web.jsp.framework.validate.rolek.Role;
import khh.web.jsp.framework.validate.rolek.RoleK;
import khh.web.jsp.tag.custom.TagSupportSimple;

public class RoleKInsertString extends TagSupportSimple {
	String id;
	String exception="false";
	String equals	= null;
//	String value = null;
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
//	public String getValue() {
//		return value;
//	}
//	public void setValue(String value) {
//		this.value = value;
//	}

	public String getEquals() {
		return equals;
	}

	public void setEquals(String equals) {
		this.equals = equals;
	}

	public boolean isRoleException(){
		return "true".equals(getException()) || "TRUE".equals(getException());
	}
	
	@Override
	public int doStartTag() throws JspException {
		
		
		boolean isDisplay = false;
		
		try{
			HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();
			HttpSession session = request.getSession();
			Role role = (Role)session.getAttribute(RoleK.PARAM_NAME_SESSION); //페이지롤가져옴
			//ServletRequest request = getRequest();
	        
			//if(null==enable && null!=role){	//enable안들어오면 값에서..추출
			String value="";
			if(null!=getId()&&null!=role){ //아이디있을시..
				LinkedHashMap<String, String> pageRole = role.getPageRole();
				value = pageRole.get(getId());
				//setValue(value);
			}
			//}
			
			if(null!=getEquals()){ //enable값안들어왔을때.. equals와비교...도한다.
				isDisplay = (getEquals().equals(value)?true:false );
			}else{
				isDisplay = ("true".equals(value) || "TRUE".equals(value));
			}
			
			
		}catch (Exception e) {
			try {
				if(isRoleException())
				getJspWriter().write(StackTraceUtil.getStackTrace(e));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		
		if(isDisplay){	//바디포함
			return EVAL_BODY_INCLUDE;
		}else{//바디미포함
			return SKIP_BODY;
		}
		
	}
	
	
	
}
