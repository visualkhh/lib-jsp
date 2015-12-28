package khh.web.jsp.framework.compact.view;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;
import khh.web.jsp.framework.fluid.Fluid;

public class FluidURIViewResovler extends ViewResovler {
	
	
	private LogK log = LogK.getInstance();
	private String configPath = null;
	private Fluid fluid = null;
	
	public FluidURIViewResovler() {
		log.debug("FluidViewResovler Start");
	}

	public String getConfigPath() {
		return configPath;
	}

	public void setConfigPath(String configPath) {
		this.configPath = configPath;
		log.debug("FluidViewResovler setConfigPath : "+configPath);
	}

	
	
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		if(fluid==null){ //fluid init
			fluid = new Fluid();
			fluid.getFluidConfigManager().addConfigFile(request.getSession().getServletContext().getRealPath(configPath));
	 		fluid.getFluidConfigManager().setting();
		}
		
		
		String id = request.getRequestURI().replaceFirst(request.getContextPath(), "");
		log.debug("FluidViewResovler request URI :  "+id);
		log.debug("FluidViewResovler doRequest : "+request+"  "+response);
		forwordView(id, request, response);
	}
	
	

	public void forwordView(String id, HttpServletRequest request, HttpServletResponse response) throws IOException {
		fluid.forwordView(id, request, response);
	}
}
