package khh.web.jsp.framework.filter.validate;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import khh.callstack.util.StackTraceUtil;
import khh.debug.LogK;
import khh.dynamin.Dynamin;
import khh.dynamin.DynaminClass;
import khh.file.util.FileUtil;
import khh.string.util.StringUtil;
import khh.xml.Element;

/**
 * Servlet Filter implementation class Validate
 */
//@WebFilter("/Validate")
public class Validate implements Filter {
	public final static String CONFIGNAME_LOGK 				= "logkConfigLocation";
	public final static String CONFIGNAME_CONTEXT 			= "contextConfigLocation";
	public final static String CONFIGNAME_CONTEXT_PATTERN 	= "contextConfigLocationPattern";
	private final static String SERVICE_METHOD 		= "service-method";
	private final static String INIT_METHOD 		= "init-method";
	private final static String BIND_PARAMETER 		= "bind-parameter";
	private LogK log 			= LogK.getInstance();
	private Dynamin dynamin 	= new Dynamin();
	
	Predicate<Element> filterInjectionClass = (Element et)->{
		if("class".equals(et.getName())&&BIND_PARAMETER.equals(et.getAttr("type"))){
			return true;
		}
		return false;
				
	};
	
    public Validate() {
    }

	public void destroy() {
	}

	public void init(FilterConfig config) throws ServletException {
		//서블릿컨텍스트에서
		dynamin.setRootElementName("/validate");
    	//logk config
    	String logkconfigpath=config.getServletContext().getInitParameter(CONFIGNAME_LOGK);
    	if(logkconfigpath != null){
    		log.addConfigfile( config.getServletContext().getRealPath(logkconfigpath) );
    	};
    	
    	
    	
    	//서블릿안쪽에 파라미터에서
    	//ConfigPath
    	String contextConfigLocation=config.getInitParameter(CONFIGNAME_CONTEXT);
    	String realpath  = null;
    	if(contextConfigLocation!=null){
    		realpath = config.getServletContext().getRealPath(contextConfigLocation);
    	}else{
    		realpath = config.getServletContext().getRealPath("/WEB-INF/"+config.getFilterName()+".xml");
    	}
    	
    	
    	log.debug("Init Param context : "+contextConfigLocation);
    	log.debug("Init Param logkConfig : "+logkconfigpath);
    	
    	//Config folder PATTERNPath
    	String configname_context_pattern = config.getInitParameter(CONFIGNAME_CONTEXT_PATTERN);
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
		    		dynamin.addConfigFile(files[j].getAbsolutePath());
				}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}
    	}

    	
    	//중요파트! 여기서 타입별로 분배된다.
    	try{
    		log.debug("ServletrContextPathReal "+config.getServletContext().getRealPath(""));
    		dynamin.addConfigFile(realpath);
    		dynamin.start();
    		
    		//초기화
    		LinkedHashMap<String, DynaminClass> classList = dynamin.getTargetDClass();
    		log.debug("DClass Size("+classList.size()+")");
    		
    		classList.entrySet().stream().filter(aE->!aE.getValue().isAttr("type")).forEach(aE->{
    			DynaminClass atDclass = aE.getValue();
    			String atDClassId = atDclass.getAttr("id");
				String atDClassType = atDclass.getAttr("type");
				log.debug("atDClass  Id = ("+atDClassId+")    Type = "+atDClassType);
				
				((ArrayList<Element>)atDclass.getElement().getChildElement()).stream().
				filter(aM->"method".equals(aM.getName()) && INIT_METHOD.equals(aM.getAttr("type"))).collect(Collectors.toList()).stream().
				filter(aMC->filterInjectionClass.test(aMC)).
				forEach(aMC->{
						if("javax.servlet.FilterConfig".equals(aMC.getAttr("classpath"))){
							aMC.setObject(config);
						}
				});
				
				try {
					atDclass.call();
					//atDclass.newClass();
				} catch (Exception e) {
					e.printStackTrace();
				}
    		});
    		
    		
    	}catch (Exception e) {
    		e.printStackTrace();
		}
	}
	public void doFilter(ServletRequest requesti, ServletResponse responsei, FilterChain chain) throws IOException, ServletException {
		 
        HttpServletRequest request = (HttpServletRequest) requesti;
        HttpServletResponse response = (HttpServletResponse) responsei;
        String url = request.getServletPath();
        HttpSession session = request.getSession(false);
        
		String requestURI = request.getRequestURI()+(request.getQueryString()!=null?"?"+request.getQueryString():"");
		log.debug("Validate Filter URI:"+requestURI);
		try{
			LinkedHashMap<String, DynaminClass> classList = dynamin.getTargetDClass();
			
    		classList.entrySet().stream().
    		filter(aE->"filter".equals(aE.getValue().getAttr("type"))&&aE.getValue().isAttr("url")&&StringUtil.isMatches(requestURI, aE.getValue().getAttr("url"))). //url맵핑
    		forEach(aE->{//service
    			try {
	    			DynaminClass atDclass = aE.getValue();
	    			String atDClassId = atDclass.getAttr("id");
					String atDClassType = atDclass.getAttr("type");
					log.debug("Service atDClass  Id = ("+atDClassId+")    Type = "+atDClassType);
					//class
					((ArrayList<Element>)atDclass.getElement().getChildElement()).stream().
					filter(aM->"rmethod".equals(aM.getName()) && SERVICE_METHOD.equals(aM.getAttr("type"))).collect(Collectors.toList()).stream().
					filter(aMC->filterInjectionClass.test(aMC)).
					forEach(aMC->{
							if("javax.servlet.http.HttpServletRequest".equals(aMC.getAttr("classpath"))){
								aMC.setObject(request);
							}
							if("javax.servlet.http.HttpServletResponse".equals(aMC.getAttr("classpath"))){
								aMC.setObject(response);
							}
					});
					atDclass.call();
				} catch (Exception e) {
					e.printStackTrace();
				}
				
    		});
			
		}catch(Exception e){
			e.printStackTrace(); 
		}
        //request.
        
//        if(urlList.contains(url)) {
//            allowedRequest = true;
//        }
//             
//        if (!allowedRequest) {
//            HttpSession session = request.getSession(false);
//            if (null == session) {
//                response.sendRedirect("index.jsp");
//            }
//        }
//         
//        chain.doFilter(req, res);
		chain.doFilter(request, response);
	}



}
