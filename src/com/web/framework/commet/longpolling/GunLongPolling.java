package com.web.framework.commet.longpolling;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;






public class GunLongPolling extends HttpServlet  implements CometProcessor {
	public final static String CONFIGNAME_LOG4J="log4jConfigLocation";
	public final static String CONFIGNAME_LOGK="logkConfigLocation";
	public final static String CONFIGNAME_CONTEXT="contextConfigLocation";
	
	
	private LogK log = LogK.getInstance();
	private static final long serialVersionUID = 1L;
    public GunLongPolling() {
        super();
    }
    
    
    
//    public static Adapter_Std<String, GunCommetMessageSender> senderList = new Adapter_Std<String, GunCommetMessageSender>();
    public static GunLongPollingConfigManager lpmg = new GunLongPollingConfigManager();    
    public static GunJS gunjs = new GunJS();
   // GunCommetMessageSender commetMessageSender = GunCommetMessageSender.getInstance();    
    @Override
    public void init(ServletConfig config) throws ServletException  {
    	super.init(config);
    	
    	//서블릿컨텍스트에서
    	String logkconfigpath=config.getServletContext().getInitParameter(CONFIGNAME_LOGK);
    	String log4jconfigpath=config.getServletContext().getInitParameter(CONFIGNAME_LOG4J);
    	
    	//서블릿안쪽에 파라미터에서
    	String contextConfigLocation=config.getInitParameter(CONFIGNAME_CONTEXT);
    	if(logkconfigpath!=null){
    		log.addConfigfile( config.getServletContext().getRealPath(logkconfigpath) );
    	};
    	
    	
    	log.debug("Init Param context : "+contextConfigLocation);
    	log.debug("Init Param log4j : "+log4jconfigpath);
    	log.debug("Init Param logkConfig : "+logkconfigpath);
    	
    	
    	
    	String realpath  = null;
    	if(contextConfigLocation!=null){
    		realpath = config.getServletContext().getRealPath(contextConfigLocation);
    	}else{
    		realpath = config.getServletContext().getRealPath("/WEB-INF/"+config.getServletName()+".xml");
    	}
    	try{
    		lpmg.addConfigFile(realpath);
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
	    String[] uri = request.getRequestURI().split("/");
	    String function  = uri[uri.length-1];
	    request.getParameter("test");  //이거빼면POST에서 오류남  이유모름 
	    request.getParameter("msg");  //이거빼면POST에서 오류남  이유모름 
	    Function fnc = lpmg.getFunction(function);
	    
	    if(fnc!=null){
	    	String type="";
	    	 if (CometEvent.EventType.BEGIN == event.getEventType()) {  		// 요청을 최초로 처리할 때 호출됨.
	    		 type="begin";
		    } else if (CometEvent.EventType.ERROR == event.getEventType()) { 	// IO 에러가 발생했을 때.
		    	type="error";
		    } else if (CometEvent.EventType.END == event.getEventType()) { 		// 요청 처리가 완료되었을 때
		    	type="end";
		    } else if (CometEvent.EventType.READ == event.getEventType()) { 	// 읽을께있을때.
		    	type="red";
		    }
	    	 log.debug("WELCOMTO fnc "+function+"    fncid : "+fnc.getNodeid()+"     ispair "+ fnc.isPair()+ "    "+type);
	    }
	    
	    
	    if (CometEvent.EventType.BEGIN == event.getEventType()) {
		      // 요청을 최초로 처리할 때 호출됨. 
		    	//log.debug("BEGIN_CommetServlet BEGIN "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	    		//log.debug("BEGIN  request : "+request.getRequestURI()+"   fnc : "+function);//function이없을수도있다 js불를때..
		    	if(function.equals("gquery.js") || function=="gquery.js"){
		    		gunjs.setCometEvent(event);
		    		gunjs.writeScript();
		    		return;
		    	}
		    	log.debug("BEGIN  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+function+"   fncPair : "+fnc.isPair());
		    	
		    	try {
					 fnc = fnc.isPair()?lpmg.newPairFunction(event,fnc):fnc;
					 log.debug("BEGIN size  Add Event  ,  Set StanBy!   id : "+fnc.getNodeid());
					 fnc.addCometEvent(event);
					 fnc.setStandby(true);
	//				 ArrayList<Gun> gunlist = fnc.getGunlist();
	//				for (int i = 0; i < gunlist.size(); i++) {
	//					Gun gun = gunlist.get(i);
	//					gun.setCometEvent(event);
	//					gun.setStandby(true);
	//				}
				} catch (Exception e) {
					e.printStackTrace();
				}
	//	    	getSenderManager(function).addSession(event);
	//	    	commetMessageSender.addSession(sessionId, event); 
	    } else if (CometEvent.EventType.ERROR == event.getEventType()) {
			    	//log("ERROR  event"); 
			      // IO 에러가 발생했을 때. 
			    	//log.debug("CommetServlet ERROR "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	    	log.debug("ERROR  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+fnc.getNodeid()+"   fncPair : "+fnc.isPair());
		//		  response.setContentType("text/html"); 
		//		  response.getWriter().println("ERROR"); 
		//	    	commetMessageSender.removeSession(sessionId); 
		//	    	getSenderManager(function).removeSession(event);
		    	try {
					 if(fnc.isPair()){
							  fnc = lpmg.getPairFunction(event);
							  log.debug("ERROR pair fnc  RemoveEvent fncid : "+fnc.getNodeid()+"       size : "+lpmg.getPairFunctionList().size());
							  lpmg.removePairFunction(event);
					 }
					 log.debug("ERROR fnc RemoveEvent fncid : "+fnc.getNodeid());
					 fnc.removeCometEvent(event);
					 
					 event.close(); //안쪽에서도하지만 여기서도..
				} catch (Exception e) {
				}
			    	event.close(); // 요청 처리 완료. 
	    } else if (CometEvent.EventType.END == event.getEventType()) {
	      // 요청 처리가 완료되었을 때 
	      //log("End event"); 
	    	//log.debug("CommetServlet END "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	    	log.debug("END  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+fnc.getNodeid()+"   fncPair : "+fnc.isPair());
	    	//getSenderManager(function).removeSession(event);
//	      event.close(); // 요청 처리 완료. 
	    	try {
				 if(fnc.isPair()){
					  fnc = lpmg.getPairFunction(event);
					  log.debug("END pair fnc RemoveEvent fncid : "+fnc.getNodeid()+"       size : "+lpmg.getPairFunctionList().size());
					  lpmg.removePairFunction(event);
				 }
				 log.debug("END fnc RemoveEvent id : "+fnc.getNodeid());
				 fnc.removeCometEvent(event);
				 
				 event.close(); //안쪽에서도하지만 여기서도..
			} catch (Exception e) {
//				e.printStackTrace();
			}
	    } else if (CometEvent.EventType.READ == event.getEventType()) { 
	    	log.debug("READ  sid : "+sessionId+" request : "+request.getRequestURI()+"   fncid : "+fnc.getNodeid()+"   fncPair : "+fnc.isPair());
	    	//log.debug("READ "+sessionId+" request:"+request.toString()+" response:"+response.toString()+"   fnc:"+function+"   cometevent:"+event.toString());
	      //log("Read event"); 
	    } 
	}

	
	
//	public static  GunCommetMessageSender getSenderManager(String function){
//		for (int i = 0; i < senderList.size(); i++) {
//			try {
//				String  atKey_function = senderList.getKey(i);
//					if(atKey_function.equals(function) || atKey_function==function){
//						return senderList.get(atKey_function);
//					}
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			
//		}
//		return null;
//	}
	
	
}
