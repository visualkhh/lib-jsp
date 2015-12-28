package khh.web.jsp.framework.compact.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;
import khh.web.jsp.request.RequestUtil;

public class ForWardViewResovler extends ViewResovler {
	
	
	private LogK log = LogK.getInstance();
	private String viewPath = null;
	public ForWardViewResovler() {
	}
	
	public String getViewPath() {
		return viewPath;
	}
	public void setViewPath(String viewPath) {
		this.viewPath = viewPath;
	}




	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//String realPath = request.getSession().getServletContext().getRealPath(getViewPath());
		log.debug("ForWordViewResovler doRequest path :  "+getViewPath());
		RequestUtil.forward(request, response, getViewPath());
	}
	
	
}
