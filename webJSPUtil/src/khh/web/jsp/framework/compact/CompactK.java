package khh.web.jsp.framework.compact;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.function.Consumer;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.callstack.util.StackTraceUtil;
import khh.debug.LogK;
import khh.dynamin.Dynamin;
import khh.dynamin.DynaminClass;
import khh.file.util.FileUtil;
import khh.reflection.ReflectionUtil;
import khh.string.util.StringUtil;
import khh.xml.Element;

public class CompactK extends HttpServlet{
	private static final long serialVersionUID 				= 1L;
	public final static String CONFIGNAME_LOGK 				= "logkConfigLocation";
	public final static String CONFIGNAME_CONTEXT 			= "contextConfigLocation";
	public final static String CONFIGNAME_CONTEXT_PATTERN 	= "contextConfigLocationPattern";
	private LogK log 			= LogK.getInstance();
	private Dynamin dynamin 	= new Dynamin();
	
	
	private final static String INIT_CLASS 		= "init";
	private final static String SERVICE_CLASS 	= "service";
	private final static String VIEW_CLASS 		= "view";
	
	private final static String SERVICE_METHOD 		= "service-method";
	private final static String INIT_METHOD 		= "init-method";
	private final static String BIND_PARAMETER 		= "bind-parameter";
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();
		//서블릿컨텍스트에서
		dynamin.setRootElementName("/compact");
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
    		realpath = config.getServletContext().getRealPath("/WEB-INF/"+config.getServletName()+".xml");
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
    		
    		
    		//타입이 없는건 init이다?
    		classList.entrySet().stream().filter(aE->!aE.getValue().isAttr("type")).forEach(aE->{
    			DynaminClass atDclass = aE.getValue();
    			String atDClassId = atDclass.getAttr("id");
				String atDClassType = atDclass.getAttr("type");
				log.debug("atDClass  Id = ("+atDClassId+")    Type = "+atDClassType);
				
				((ArrayList<Element>)atDclass.getElement().getChildElement()).stream().
//				filter(aM->"method".equals(aM.getName()) && INIT_METHOD.equals(aM.getAttr("type"))).
				filter(aM->INIT_METHOD.equals(aM.getAttr("type"))).
				forEach(aM->{
					injection(aM,new Object[]{config});
				});
				 
				try {
					atDclass.call();
				} catch (Exception e) {
					e.printStackTrace();
				}
    		});
    		
    		
    	}catch (Exception e) {
    		e.printStackTrace();
		}
	}
	
	


	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
//		String requestURI = request.getRequestURI();
		String requestURI = request.getRequestURI()+(request.getQueryString()!=null?"?"+request.getQueryString():"");
		log.debug("CompactK service  URI:"+requestURI);
//		log.debug("services size("+services.size()+")");
		try{
			LinkedHashMap<String, DynaminClass> classList = dynamin.getTargetDClass();
			
    		classList.entrySet().stream().
    		filter(aE->"service".equals(aE.getValue().getAttr("type"))&&aE.getValue().isAttr("url")&&StringUtil.isMatches(requestURI, aE.getValue().getAttr("url"))). //url맵핑
    		forEach(aE->{//service
			try {
	    			DynaminClass atDclass = aE.getValue();
	    			String atDClassId = atDclass.getAttr("id");
					String atDClassType = atDclass.getAttr("type");
					log.debug("Service atDClass  Id = ("+atDClassId+")    Type = "+atDClassType);
					//class
					((ArrayList<Element>)atDclass.getElement().getChildElement()).stream().
					filter(aM->"rmethod".equals(aM.getName()) && SERVICE_METHOD.equals(aM.getAttr("type"))).
					forEach(aM->{
						injection(aM,new Object[]{request,response});
					});
					Object returnVal = atDclass.call();
					if(null != returnVal && returnVal instanceof String){
						sendView((String)returnVal,request,response);
					}else if(null==returnVal){
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
    		});
			
		}catch(Exception e){
			PrintWriter writer  =  response.getWriter();
			writer.println("Fluid ERROR RequestURI : "+requestURI);
			writer.println(StackTraceUtil.getStackTrace(e));
			writer.flush();
			writer.close();
			e.printStackTrace(); 
		}
		
	}
	
	
	public void sendView(DynaminClass dclass, HttpServletRequest request, HttpServletResponse response){

			DynaminClass atDclass = dclass;
			String atDClassId = atDclass.getAttr("id");
			String atDClassType = atDclass.getAttr("type");
			log.debug("view atDClass  Id = ("+atDClassId+")    Type = "+atDClassType);
			//class
			((ArrayList<Element>)atDclass.getElement().getChildElement()).stream().
			filter(aM->"rmethod".equals(aM.getName()) && SERVICE_METHOD.equals(aM.getAttr("type"))).
			forEach(aM->{
				injection(aM,new Object[]{request,response});
			});
			try{
				atDclass.call();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
	}
	
	private void sendView(String viewClassName, HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		LinkedHashMap<String, DynaminClass> classList = dynamin.getTargetDClass();
		DynaminClass dy = classList.get(viewClassName);
		if(null==dy){
			classList.entrySet().stream().
			filter( aE->"view".equals(aE.getValue().getAttr("type")) && "default".equals(aE.getValue().getAttr("order")) ). //url맵핑
			forEach(aE->{//service
				sendView(aE.getValue(), request, response);
			});
		}else{
			sendView(dy, request, response);
		}
		
	}
	
	
	private void injection(Element aM, Object[] objects) {
		Consumer<Element> c =(Element aMC)->{
			if(BIND_PARAMETER.equals(aMC.getAttr("type"))){
				Class parentClass = ReflectionUtil.getClass(aMC.getAttr("classpath"));
				for (int oCnt = 0; oCnt < objects.length; oCnt++) {
				Object atObject = objects[oCnt];
					if(parentClass.isInstance(atObject)){
						aMC.setObject(atObject);
					}
				}
			}
		};
		aM.loopNode(c);
		
	}
	@Override
	public void destroy() {
		super.destroy();
	}
}
