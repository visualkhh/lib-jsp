package khh.web.jsp.framework.validate.rolek;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
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
import khh.xml.XMLK;

/**
 * Servlet Filter implementation class Validate
 */
public class RoleK implements Filter {
	public final static String CONFIGNAME_LOGK 				= "logkConfigLocation";
	public final static String CONFIGNAME_CONTEXT 			= "contextConfigLocation";
	public final static String CONFIGNAME_CONTEXT_PATTERN 	= "contextConfigLocationPattern";
	public final static String PARAM_NAME_SESSION			= "ROLEK"; //"ROLEK_SESSION";
	public LogK log 		= LogK.getInstance();
	private XMLK xml 		= new XMLK();
	static private Map<String, Element> targetElement;
	private String 	failPage	= "/";
    public RoleK() {
    }

	public void destroy() {
	}

	public void init(FilterConfig config) throws ServletException {
		//서블릿컨텍스트에서
		xml.setTargetXPath("/roles/role");
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
    	
    	
    	log.debug("RoleK Init Param context : "+contextConfigLocation);
    	log.debug("RoleKInit Param logkConfig : "+logkconfigpath);
    	
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
		    		xml.addConfigFile(files[j].getAbsolutePath());
				}
	    	}catch (Exception e) {
	    		e.printStackTrace();
			}
    	}

    	
    	//중요파트! 여기서 타입별로 분배된다.
    	try{
    		log.debug("ServletrContextPathReal "+config.getServletContext().getRealPath(""));
    		xml.addConfigFile(realpath);
    		xml.setLogicExtendsAddChild((Element parent, Element child)->{
    			//우선 자기걸로 부모꺼 머지든 가져오자.  type이 new가 아닌건 모두다 merge다..  url속성있어야한다.
//    			((ArrayList<Element>)child.getChildElementByTagName("join")).stream().filter(cJE->"new".equals(cJE.getAttr("type"))).forEach(cJE->{
    			((ArrayList<Element>)child.getChildElementByTagName("join")).stream().filter(cJE->!"new".equals(cJE.getAttr("type"))&&cJE.isAttr("url")).forEach(cJE->{//typ이없거나 delete
    				LinkedHashMap<String,Element> fncMap = new LinkedHashMap<String,Element> ();
    				String url = cJE.getAttr("url");
    				((ArrayList<Element>)parent.getChildElementByTagName("join")).//무조꺼에서 join중 나랑같은url가진 join의 fnc를 가져온다
    				stream().filter(pJE->url.equals(pJE.getAttr("url"))).collect(Collectors.toList()).forEach(pJE->{
    					fncMap.putAll( ((ArrayList<Element>)pJE.getChildElementByTagName("fnc")).stream().collect(Collectors.toMap(pJFE->((Element)pJFE).getAttr("id"),pJFE->pJFE)) );
    				});
    				//마지막 자식것이 중요하기때문에 자식걸 마지막 덛칠하다
    				fncMap.putAll( ((ArrayList<Element>)cJE.getChildElementByTagName("fnc")).stream().collect(Collectors.toMap(cJFE->((Element)cJFE).getAttr("id"),cJFE->cJFE)) );
    				//마지막 셋팅
    				cJE.setChildElement(fncMap.entrySet().stream().map(at->at.getValue()).collect(Collectors.toCollection(ArrayList::new)));
    				
    			});
    			
    			//부모join이름이  자식과 겹치지 않는놈들만 아래 내려간다. 즉 자식이 재정의 한거 아닌것만 내려간다.
    			child.addAllChildElement(
    				((ArrayList<Element>)parent.getChildElementByTagName("join")).stream().
    				filter(pJE->child.getChildElementByAttr("url",pJE.getAttr("url")).size()<=0).collect(Collectors.toCollection(ArrayList::new))
                 );
    			
    			//delete지운다.
    			ArrayList<Element> deleteList = new ArrayList<Element>();
    			((ArrayList<Element>)child.getChildElementByAttr("type","delete")).stream().filter(at->at.isAttr("url")).forEach(at->{
    				String url = at.getAttr("url");
    				((ArrayList<Element>)child.getChildElementByTagName("join")).stream().forEach(sat->{
    					if(StringUtil.isMatches(sat.getAttr("url"), url)){
    						deleteList.add(sat);
    					}
    				});
    			});
    			child.removeChildElement(deleteList);
    			
    		});
    		
    		
    		xml.start();
    		log.debug("RoleK!!");
    		xml.loopNode(xml.getTargetElements(),(Element e,Integer depth)->{
    			log.debug(StringUtil.loopString("\t",depth)+e);
    		});
    		
    		
    		//초기화
    		targetElement =  ((ArrayList<Element>)xml.getTargetElements()).stream().collect(Collectors.toMap(i->((Element)i).getAttr("id"),i->i));
    		log.debug("Rolek Size("+targetElement.size()+")");
    		
    		
    	}catch (Exception e) {
    		e.printStackTrace();
		}
	}
	public void doFilter(ServletRequest requesti, ServletResponse responsei, FilterChain chain) throws IOException, ServletException {
		 
        HttpServletRequest request = (HttpServletRequest) requesti;
        HttpServletResponse response = (HttpServletResponse) responsei;
        //String url = request.getServletPath();
        String requestURI = request.getRequestURI()+(request.getQueryString()!=null?"?"+request.getQueryString():"");
        HttpSession session = request.getSession(false);
        if (null == session) {
            response.sendRedirect("/");
            //chain.doFilter(request, response);
            return;
        } 
        Object userRoleSession = session.getAttribute(PARAM_NAME_SESSION);
        if(null == userRoleSession){
        	String roleName="default";
        	log.debug("RoleK init guest join");
    		//url petton, fncName, value
        	ArrayList<Join> userRole = getBaseJoin(roleName);
        	session.setAttribute(PARAM_NAME_SESSION, new Role(userRole));
        }
        
        Role userRole = (Role)session.getAttribute(PARAM_NAME_SESSION);
        userRole.setRequest(request);
        Join join = userRole.getJoin();
        userRole.setPageJoin(join);
        log.debug("RoleK  filter  returl role :"+join);
        if(null==join){
      	    response.sendRedirect(failPage);
        }else if(null != join.getForward()){
        	//String forward = StringUtil.inJection(join.getForward(), "${ROLEK.session.", "}", userRole.getSession());
        	String forward = StringUtil.transRegex(requestURI, join.getForward(), userRole);
        	log.debug("RoleK redirect:"+forward);
        	session.getServletContext().getRequestDispatcher(forward).forward(request,response);
        }else{
        	//userRole.setPageRole(pageRole);
        	chain.doFilter(request, response);
        }
         
	}

	public static ArrayList<Join> getBaseJoin (String roleName){
		ArrayList<Join> userRole = new ArrayList<>();
		//사용자 셋팅
		targetElement.entrySet().stream().filter(at->roleName.equals(at.getKey())).map(at->at.getValue()).collect(Collectors.toList()).stream().forEach(at->{
			((ArrayList<Element>)at.getChildElementByTagName("join")).stream().forEach(aj->{
				Join join = new Join(); 
				join.setUrl(aj.getAttr("url")); 
				join.setForward(aj.getAttr("forward"));
				((ArrayList<Element>)aj.getChildElementByTagName("fnc")).stream().forEach(ajf->{
					join.put(ajf.getAttr("id"), ajf.getAttr("value"));
				});
//				if(join.size()>0)
				userRole.add(join);
			});
		});
		return userRole;
	}
//	public static LinkedHashMap<String, LinkedHashMap<String, String>> getBaseRole (String roleName){
//		LinkedHashMap<String, LinkedHashMap<String, String>> userRole = new LinkedHashMap<>();
//		//사용자 셋팅
//		targetElement.entrySet().stream().filter(at->roleName.equals(at.getKey())).map(at->at.getValue()).collect(Collectors.toList()).stream().forEach(at->{
//			((ArrayList<Element>)at.getChildElementByTagName("join")).stream().forEach(aj->{
//				String url = aj.getAttr("url"); 
//				LinkedHashMap<String, String> join = new LinkedHashMap<String, String>();
//				((ArrayList<Element>)aj.getChildElementByTagName("fnc")).stream().forEach(ajf->{
//					join.put(ajf.getAttr("id"), ajf.getAttr("value"));
//				});
////				if(join.size()>0)
//				userRole.put(url, join);
//			});
//		});
//		return userRole;
//	}


}
