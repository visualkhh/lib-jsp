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
	private ServletConfig servletConfig = null;
	public FluidURIViewResovler() {
		log.debug("FluidViewResovler Start");
	}
	public FluidURIViewResovler(ServletConfig servletConfig, String configPath) throws Exception {
		log.debug("FluidViewResovler Start  servletConfig, configPath");
		setServletConfig(servletConfig,configPath);
		init();
	}

	private void init() throws Exception {
		fluid = new Fluid();
		fluid.getFluidConfigManager().addConfigFile(servletConfig.getServletContext().getRealPath(configPath));
 		fluid.getFluidConfigManager().setting();
		
	}
//	public String getConfigPath() {
//		return configPath;
//	}

//	public void setConfigPath(String configPath) {
//		this.configPath = configPath;
//		log.debug("FluidViewResovler setConfigPath : "+configPath);
//	}
//	public void setServletConfig(ServletConfig servletConfig) {
//		this.servletConfig = servletConfig;
//		log.debug("FluidViewResovler setServletConfig  "+servletConfig);
//	}
	public void setServletConfig(ServletConfig servletConfig, String configPath) {
		this.servletConfig = servletConfig;
		this.configPath = configPath;
		log.debug("FluidViewResovler setServletConfig,configPath  "+servletConfig+"    "+configPath);
	}
//	public ServletConfig getServletConfig() {
//		log.debug("FluidViewResovler getServletConfig  "+servletConfig);
//		return servletConfig;
//	}

	
	
	public void doRequest(HttpServletRequest request, HttpServletResponse response) throws Exception{
		

		
		
		String id = request.getRequestURI().replaceFirst(request.getContextPath(), "");
		log.debug("FluidViewResovler request URI :  "+id);
		log.debug("FluidViewResovler doRequest : "+request+"  "+response);
		
		fluid.forwardTemplate(id, request, response);
	}
	
	
}
