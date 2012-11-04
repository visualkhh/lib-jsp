





package com.web.framework.commet.longpolling;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;
import khh.file.util.FileUtil;
import khh.string.util.StringUtil;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;

import com.web.UtilWeb;




//server.xml
//<Connector connectiontimeout="20000" port="8080" protocol="org.apache.coyote.http11.Http11NioProtocol" redirectPort="8443" useComet="true"/>
/*
<Context docBase="M_Project" path="/M_Project" reloadable="true" source="org.eclipse.jst.jee.server:M_Project">
  <Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" maxActive="100" maxIdle="30" maxWait="10000" name="jdbc/mproject" password="aaaaaaa" type="javax.sql.DataSource" url="jdbc:mysql://localhost:3306/cooltrack_godo_co_kr" username="root"/>
  <!-- url="jdbc:mysql://localhost:3306/mproject"  -->
</Context>
 */
public class GunLongPolling extends HttpServlet  implements CometProcessor {
	public final static String CONFIGNAME_LOG4J="log4jConfigLocation";
	public final static String CONFIGNAME_LOGK="logkConfigLocation";
	public final static String CONFIGNAME_CONTEXT="contextConfigLocation";
	public final static String CONFIGNAME_CONTEXT_PATTERN="contextConfigLocationPattern";
	
	
	private LogK log = LogK.getInstance();
	private static final long serialVersionUID = 1L;
    public GunLongPolling() {
        super();
    }
    
    
    
    public static GunLongPollingConfigManager lpmg = GunLongPollingConfigManager.getInstance();    
    public static GunJS gunjs = new GunJS();
    @Override
    public void init(ServletConfig config) throws ServletException  {
    	super.init(config);
    	//서블릿컨텍스트에서
    	
    	//logk config
    	String logkconfigpath=config.getServletContext().getInitParameter(CONFIGNAME_LOGK);
    	if(logkconfigpath!=null){
    		log.addConfigfile( config.getServletContext().getRealPath(logkconfigpath) );
    	};
    	
    	//log4j config
    	String log4jconfigpath=config.getServletContext().getInitParameter(CONFIGNAME_LOG4J);
    	
    	
    	//서블릿안쪽에 파라미터에서
    	//longpolling GunConfigPath
    	String contextConfigLocation=config.getInitParameter(CONFIGNAME_CONTEXT);
    	String realpath  = null;
    	if(contextConfigLocation!=null){
    		realpath = config.getServletContext().getRealPath(contextConfigLocation);
    	}else{
    		realpath = config.getServletContext().getRealPath("/WEB-INF/"+config.getServletName()+".xml");
    	}
    	
    	
    	
    	//longpolling GunConfig PATTERNPath
    	String configname_context_pattern=config.getInitParameter(CONFIGNAME_CONTEXT_PATTERN);
    	
    	log.debug("Init Param context : "+contextConfigLocation);
    	log.debug("Init Param log4j : "+log4jconfigpath);
    	log.debug("Init Param logkConfig : "+logkconfigpath);
    	final File pattern = new File(configname_context_pattern);
    	log.debug("Init Param contextConfigLocationPattern : "+configname_context_pattern+"   parent:"+pattern.getParent()+"     name:"+pattern.getName());
        FilenameFilter filenamefilter = new FilenameFilter() {
            public boolean accept(File arg0, String filename) {
                return StringUtil.isFind(pattern.getName(), filename);
            }
        };


    	
    	

    	try{
    		log.debug("ServletrContextPathReal "+config.getServletContext().getRealPath(""));
    		lpmg.setServletConfig(config);
    		//lpmg.setServletContextRealPath(config.getServletContext().getRealPath("/"));
    		lpmg.addConfigFile(realpath);
        	File[] files = FileUtil.getFileList(new File(config.getServletContext().getRealPath(pattern.getParent())), filenamefilter);
        	for (int j = 0; j < files.length; j++) {
        		log.debug("Init contextConfig Pattern["+j+"]:  " +files[j].getAbsolutePath() );
        		lpmg.addConfigFile(files[j].getAbsolutePath());
			}
    		
    		
    		lpmg.setting();
    		lpmg.start();
    		
    		
    		//GunCommetMessageSender Container  setting
//    		ArrayList<Function>functionlist = lpmg.getFunctionlist();
//    				for (int z = 0; z < functionlist.size(); z++) {
//    					Function function = functionlist.get(z);
//    					GunCommetMessageSender sendmanager = new GunCommetMessageSender();
//    					sendmanager.setName(function.getId()+"_Sender");
//    					new Thread(sendmanager).start();
//    					senderList.add(function.getId(), sendmanager);
//					}
    		
    	}catch (Exception e) {
    		e.printStackTrace();
		}
//    	LongPollingManager.getInstance().setting(realpath);
    }



	@Override
	public void destroy() {
		super.destroy();
	}

	
	@Override
	public void event(CometEvent event) throws IOException, ServletException {
	    HttpServletRequest request = event.getHttpServletRequest(); 
	    HttpServletResponse response = event.getHttpServletResponse(); 
	    String sessionId = request.getSession().getId(); 
	    String function  = request.getRequestURI().replaceAll(request.getContextPath(), "");
	    request.getParameter("test");  //이거빼면POST에서 오류남  이유모름 
	    request.getParameter("msg");  //이거빼면POST에서 오류남  이유모름 
	    Function fnc = lpmg.getFunction(function);
	    //request.getReq
	    if(fnc!=null){
	    	String type="";
	    	 if (CometEvent.EventType.BEGIN == event.getEventType()) {  		// 요청을 최초로 처리할 때 호출됨.
	    		 type="begin";
	    		// UtilWeb.write(response, FileUtil.MIME_TEXT_HTML, "aaaaaaa");
//	    		 response.setContentType(FileUtil.MIME_TEXT_HTML); 
//	    			 RequestDispatcher dispatcher =  request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp");
//	    			 dispatcher.forward(request, response);
//	    			 PrintWriter out = response.getWriter();
//	    				response.flushBuffer();
//	    				out.flush();
//	    				event.close();
//	    				event = null;
	    			 //event.close();
		    } else if (CometEvent.EventType.ERROR == event.getEventType()) { 	// IO 에러가 발생했을 때.
		    	type="error";
		    	event.close();
		    } else if (CometEvent.EventType.END == event.getEventType()) { 		// 요청 처리가 완료되었을 때
		    	type="end";
		    	event.close();
		    } else if (CometEvent.EventType.READ == event.getEventType()) { 	// 읽을께있을때.
		    	type="red";
		    }
	    	 log.debug("WELCOMTO fnc "+function+"    fncid : "+fnc.getNodeid()+"     ispair "+ fnc.isPair()+ "    "+type);
	    }else{
	    	if(function.indexOf("gquery.js")>0  && CometEvent.EventType.BEGIN == event.getEventType()){
	    		log.debug("Function Request "+function);
	    		gunjs.setCometEvent(event); 
	    		gunjs.writeScript();
	    	}else if(CometEvent.EventType.BEGIN == event.getEventType()){
	    		log.debug("not Found Request "+function);
				//writer.println(request.toString()+"  <br>  "+response.toString()+"    no GubLongPolling uri");
	    		StringBuffer info = new StringBuffer();
				info.append("error:not found");
				info.append(", funtion:"+function); 
				info.append(", requestURI:" + request.getRequestURI());
				info.append(", requestURL:" + request.getRequestURL());
				UtilWeb.write(response, info.toString());
	    	}else{
	    	}
	    }
	    
	    
	    if (CometEvent.EventType.BEGIN == event.getEventType()) {
	    	event.setTimeout(Integer.MAX_VALUE);
		      // 요청을 최초로 처리할 때 호출됨. 
		    	//log.debug("BEGIN_CommetServlet BEGIN "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	    		//log.debug("BEGIN  request : "+request.getRequestURI()+"   fnc : "+function);//function이없을수도있다 js불를때..
		    	log.debug("BEGIN  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+function+"   fncPair : "+(fnc==null?"not found":fnc.isPair()));
		    	try {
		    		if(fnc!=null){
					 fnc = fnc.isPair()?lpmg.newPairFunction(event,fnc):fnc;
					 log.debug("BEGIN size  Add Event  ,  Set StanBy!   id : "+fnc.getNodeid());
					 fnc.addCometEvent(event);
					 fnc.setStandby(true);
		    		}
				} catch (Exception e) {
					e.printStackTrace();
				}
	    } else if (CometEvent.EventType.ERROR == event.getEventType()) {
			    	//log("ERROR  event"); 
			      // IO 에러가 발생했을 때. 
			    	//log.debug("CommetServlet ERROR "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	    	log.debug("ERROR  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+(fnc==null?"not found":fnc.getNodeid())+"   fncPair : "+(fnc==null?"not found":fnc.isPair())+"    errorTyppe:"+event.getEventSubType());
		    	try {
					 if(fnc!=null&&fnc.isPair()){
							  fnc = lpmg.getPairFunction(event);
							  log.debug("ERROR pair fnc  RemoveEvent fncid : "+fnc.getNodeid()+"   size : "+lpmg.getPairFunctionList().size());
							  lpmg.removePairFunction(event);
					 }
					 log.debug("ERROR fnc RemoveEvent fncid : "+fnc==null?"not found":fnc==null?"not found":fnc.getNodeid());
					 if(fnc!=null){
						 fnc.removeCometEvent(event);
					 }
					 
					 event.close(); //안쪽에서도하지만 여기서도..
				} catch (Exception e) {
					event.close();
					event=null;
				}
	    } else if (CometEvent.EventType.END == event.getEventType()) {
	      // 요청 처리가 완료되었을 때 
	    	//log.debug("CommetServlet END "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	    	log.debug("END  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+(fnc==null?"not found":fnc.getNodeid())+"   fncPair : "+(fnc==null?"not found":fnc.isPair()));
	    	try {
				 if(fnc!=null &&fnc.isPair()){
					  fnc = lpmg.getPairFunction(event);
					  log.debug("END pair fnc RemoveEvent fncid : "+fnc.getNodeid()+"       size : "+lpmg.getPairFunctionList().size());
					  lpmg.removePairFunction(event);
				 }
				 log.debug("END fnc RemoveEvent id : "+(fnc==null?"not found":fnc.getNodeid()));
				 if(fnc!=null){
					 fnc.removeCometEvent(event);
				 }
				 event.close(); //안쪽에서도하지만 여기서도..
				 event=null;
			} catch (Exception e) {
//				e.printStackTrace();
			}
	    } else if (CometEvent.EventType.READ == event.getEventType()) { 
	    	log.debug("READ  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+(fnc==null?"not found":fnc.getNodeid())+"   fncPair : "+(fnc==null?"not found":fnc.isPair()));
	    } 
	    
	    
	    
	}
}
