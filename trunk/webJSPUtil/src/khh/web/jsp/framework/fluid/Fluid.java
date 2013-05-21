package khh.web.jsp.framework.fluid;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.callstack.util.StackTraceUtil;
import khh.debug.LogK;
import khh.file.util.FileUtil;
import khh.string.util.StringUtil;
import khh.web.jsp.request.RequestUtil;

public class Fluid extends HttpServlet{
	public final static String CONFIGNAME_LOGK="logkConfigLocation";
	public final static String CONFIGNAME_CONTEXT="contextConfigLocation";
	public final static String CONFIGNAME_CONTEXT_PATTERN="contextConfigLocationPattern";
	public final static String PARAM_NAME_TEMPLATE="fluid_template_dskfj4gkerjk";
	private FluidConfigManager fmg = new FluidConfigManager(); 
//	private FluidConfigManager fmg = FluidConfigManager.getInstance(); 
	private LogK log = LogK.getInstance();
	private static final long serialVersionUID = 1L;
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();
		
	//서블릿컨텍스트에서
    	
    	//logk config
    	String logkconfigpath=config.getServletContext().getInitParameter(CONFIGNAME_LOGK);
    	if(logkconfigpath!=null){
    		log.addConfigfile( config.getServletContext().getRealPath(logkconfigpath) );
    	};
    	
    	
    	
    	//서블릿안쪽에 파라미터에서
    	//longpolling GunConfigPath
    	String contextConfigLocation=config.getInitParameter(CONFIGNAME_CONTEXT);
    	String realpath  = null;
    	if(contextConfigLocation!=null){
    		realpath = config.getServletContext().getRealPath(contextConfigLocation);
    	}else{
    		realpath = config.getServletContext().getRealPath("/WEB-INF/"+config.getServletName()+".xml");
    	}
    	
    	
    	log.debug("Init Param context : "+contextConfigLocation);
    	log.debug("Init Param logkConfig : "+logkconfigpath);
    	
    	//longpolling GunConfig PATTERNPath
    	String configname_context_pattern=config.getInitParameter(CONFIGNAME_CONTEXT_PATTERN);
    	if(configname_context_pattern!=null){
	    	try{
		    	final File pattern = new File(configname_context_pattern);
		    	log.debug("Init Param contextConfigLocationPattern : "+configname_context_pattern+"   parent:"+pattern.getParent()+"     name:"+pattern.getName());
		        FilenameFilter filenamefilter = new FilenameFilter() {
		            public boolean accept(File arg0, String filename) {
		                return StringUtil.isFind(pattern.getName(), filename);
		            }
		        };
		    	File[] files = FileUtil.getFileList(new File(config.getServletContext().getRealPath(pattern.getParent())), filenamefilter);
		    	for (int j = 0; j < files.length; j++) {
		    		log.debug("Init contextConfig Pattern["+j+"]:  " +files[j].getAbsolutePath() );
		    		fmg.addConfigFile(files[j].getAbsolutePath());
				}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}
    	}

    	try{
    		log.debug("ServletrContextPathReal "+config.getServletContext().getRealPath(""));
    		fmg.setServletConfig(config);
    		fmg.addConfigFile(realpath);
        	fmg.setting();
    		
    	}catch (Exception e) {
    		e.printStackTrace();
		}
	}
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doPost(req,resp);
	}
	
	
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		/*
		 HttpSession session = request.getSession();
		PrintWriter writer  =  response.getWriter();
		writer.println(request.toString()+"  <br>  "+response.toString()+"          ");
		writer.println(request.getRequestURI());
		writer.println(request.getRequestURL());
		writer.flush();
		writer.close();
		 */
	
		String id=request.getRequestURI().replaceFirst(request.getContextPath(), "");
		log.debug("Fluid Request "+request.getRequestURI()+"  template id : "+id);
		Template template = null ;
		try{
			template = fmg.getTemplate(id);
			if(template==null){
				PrintWriter writer  =  response.getWriter();
				writer.println("Not Found Template id : "+id);
				writer.println("Fluid Request "+request.getRequestURI()+"  template id : "+id);
				writer.flush();
				writer.close();
				return;
			}
			log.debug("Fluid forward Real :  "+template.getValue());
			request.setAttribute(PARAM_NAME_TEMPLATE, template);
			RequestUtil.forward(request, response, template.getValue());
		}catch (Exception e) {
			PrintWriter writer  =  response.getWriter();
			writer.println("Fluid ERROR Template id : "+id);
			if(template!=null)
			writer.println("Fluid Template value : "+template.getValue());
			writer.println("Fluid Request "+request.getRequestURI()+"  template id : "+id);
			writer.println(StackTraceUtil.getStackTrace(e));
			writer.flush();
			writer.close();
			e.printStackTrace(); 
		}
		//writer.println(StackTraceUtil.getStackTrace(e));
		
//		log.debug("=====start========="+request.getRequestURI().replaceFirst(request.getContextPath(), ""));
	//	RequestUtil.forward(request, response, request.getRequestURI().replaceFirst(request.getContextPath(), ""));
//		RequestUtil.forward(request, response, "/WEB-INF/jsp/NewFile.jsp");
//		RequestUtil.forward(request, response, request.getRequestURL().toString());
		
	}
	
	@Override
	public void destroy() {
		super.destroy();
	}
}
