package khh.web.jsp.framework.commet.longpolling;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;
import khh.file.util.FileUtil;
import khh.interfaces.StrEvent_Interface;
import khh.std.adapter.AdapterMap;
import khh.string.util.StringUtil;
import khh.web.UtilWeb;
import khh.web.jsp.request.RequestUtil;

import org.apache.catalina.comet.CometEvent;


public abstract class Function extends Thread  implements StrEvent_Interface{

	private String nodeid;
	private String classpath						= null;
	private ArrayList<Gun> gunlist 					= new ArrayList<Gun>();
	private ArrayList<View> viewlist 				= new ArrayList<View>();
//	private HashMap<String,Object> rs = new HashMap<String, Object>()
	private AdapterMap<String, Object> resultlist	= new AdapterMap<String, Object>();
	private ArrayList<CometEvent> cometEventList	= new ArrayList<CometEvent>();
	private boolean broadcast						= false;
	private boolean standby							= false;
	private boolean pair							= false;
	public static GunLongPollingConfigManager lpmg = GunLongPollingConfigManager.getInstance();
	private LogK log = LogK.getInstance();
	// ArrayList<Event_Interface> listener = new ArrayList<Event_Interface>();
	// public ArrayList<Gun> getGun() {
	// return gun;
	// }
	public void run() {
		settingGun();
		while (true) {
			try {
				Thread.sleep(100);
				removeGarbageCometEvent();
//				if(getNodeid().equals("fnc_settwitter"))
//				System.out.println("function "+this.getNodeid()+ "      "+cometEventList.size()+"   "+isStandby() +"      "+gunlist.size()+"     "+resultlist.size()+"    "+ isPair());
				if (cometEventList.size() > 0 && isStandby() && gunlist.size() > 0 && resultlist.size() > 0 && gunlist.size() == resultlist.size()) {
					AdapterMap<String, Object>  makeResult = makeResult(resultlist);
					sendMessage(makeResult);
					resultlist.clear();
					setStandby(false);
					if(isPair()==true){
						removeListener();
						break;
					}	
				}

			}catch (InterruptedException e) {
				e.printStackTrace();
				break;
			}  catch (Exception e) {
				e.printStackTrace();
			}
		}
		//System.out.println("breaker  fncName:" +getNodeid()+"    " +isPair()+"     "+cometEventList.size());
	}

	
	final private void removeGarbageCometEvent() {
		ArrayList<CometEvent> eventlist  = getCometEventList();
		for (int i = 0; i < eventlist.size(); i++) {
			CometEvent event = eventlist.get(i);
			
		    if(CometEvent.EventType.BEGIN == event.getEventType()) {			// 요청을 최초로 처리할 때 호출됨. 
		    }else if (CometEvent.EventType.ERROR == event.getEventType()) { 	// IO 에러가 발생했을 때.
//		    	getCometEventList().remove(event);
			    	try {
			    		removeCometEvent(event);
			    		eventlist.remove(event);
						event.close();
					} catch (IOException e) {
						event=null;
						//e.printStackTrace();
					} // 요청 처리 완료. 
		    } else if (CometEvent.EventType.END == event.getEventType()) { 		// 요청 처리가 완료되었을 때
//		    	getCometEventList().remove(event);
			      try {
			    	  removeCometEvent(event);
			    	  eventlist.remove(event);
			    	  event.close();
			    	  event=null;
				} catch (IOException e) {
					log.debug("function event close Exception",e);
					try {
						event.close();
					} catch (IOException e1) {
						//e1.printStackTrace();
					}
					event=null;
					//e.printStackTrace();
				} // 요청 처리 완료. 
		    } else if (CometEvent.EventType.READ == event.getEventType()) { 	// 읽을께있을때.
		    	String a="a";
		    } 
		}
		
	}


	private void removeListener() {
		for (int i = 0; i < gunlist.size(); i++) {
			Gun gun = gunlist.get(i);
				gun.removeEventListener(this);
		}
	}


	private void settingGun() {
		for (int i = 0; i < gunlist.size(); i++) {
			Gun gun =gunlist.get(i);
			gun.addEventListener(this);
			//gunlist.get(i).addEventListener(this);
//			if(gun.isPair()){
//				new GunTask(gun).start();
//			}
		}
	}


	public void sendMessage(AdapterMap<String, Object>  result) throws IOException{
		ArrayList<CometEvent> eventlist = getCometEventList();
		if(eventlist ==null){
			return;
		}
		
		for (int i = 0; i < eventlist.size(); i++) {
				CometEvent event = eventlist.get(i);
				if(event==null){
					continue;
				}
				
//			    if (CometEvent.EventType.BEGIN == event.getEventType()) { 
//			    } else if (CometEvent.EventType.ERROR == event.getEventType()) { 
//				    	event.close(); // 요청 처리 완료. 
//			    } else if (CometEvent.EventType.END == event.getEventType()) { 
//				      event.close(); // 요청 처리 완료. 
//			    } else if (CometEvent.EventType.READ == event.getEventType()) { 
//			    } 
				try {
//					HttpServletResponse response =event.getHttpServletResponse();
//					UtilWeb.write(response, FileUtil.MIME_TEXT_TEXT, result);
//					response.flushBuffer();
					finish(event,result);
				} catch (Exception naive) {
					naive.printStackTrace();
				} finally {
					try{
					event.close();
					}catch (Exception e) {
					}
					event = null;
				}
		
		}
		
	}
	
	
	
	public abstract AdapterMap<String, Object>  makeResult(AdapterMap<String, Object> set) throws Exception;
	public abstract void  finish(CometEvent event,AdapterMap<String, Object> result) throws Exception;
	
	public void forward(CometEvent event,String viewIdorPath) throws ServletException, IOException{
		HttpServletRequest request 		= event.getHttpServletRequest();
		HttpServletResponse response 	= event.getHttpServletResponse();
		// RequestDispatcher dispatcher =  request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp");
		// dispatcher.forward(request, response);
		View view = null;
		try {
			view = lpmg.getViewlist().get(viewIdorPath);
		} catch (Exception e) {
		}
		//RequestUtil.forward(request, response, view==null?viewIdorPath:view.getPath());
		//response.flushBuffer();
		//response.sendRedirect(view==null?viewIdorPath:view.getPath());
		//UtilWeb.write(response, FileUtil.MIME_TEXT_HTML, "show me the money");
		//response.flushBuffer();
//		view==null?viewIdorPath:view.getPath()
		 RequestDispatcher dispatcher =  request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp");
		 dispatcher.forward(request, response);
		 removeCometEvent(event);
		event.close();
		event = null;
	}
	
	public void include(CometEvent event,String viewIdorPath) throws ServletException, IOException{
		HttpServletRequest request 		= event.getHttpServletRequest();
		HttpServletResponse response 	= event.getHttpServletResponse();
		// RequestDispatcher dispatcher =  request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp");
		// dispatcher.forward(request, response);
		View view = null;
		try {
			view = lpmg.getViewlist().get(viewIdorPath);
		} catch (Exception e) {
		}
		//RequestUtil.forward(request, response, view==null?viewIdorPath:view.getPath());
		//response.flushBuffer();
		//response.sendRedirect(view==null?viewIdorPath:view.getPath());
		//UtilWeb.write(response, FileUtil.MIME_TEXT_HTML, "show me the money");
		//response.flushBuffer();
//		view==null?viewIdorPath:view.getPath()
		response.setHeader("Content-Type", FileUtil.MIME_TEXT_HTML+"; charset="+StringUtil.SET_UTF_8);
		RequestUtil.include(request, response, view.getPath());
		
		//RequestDispatcher dispatcher =  request.getRequestDispatcher(view.getPath());
		 //dispatcher.include(request, response);
		 removeCometEvent(event);
		 try{
			 event.close();
		 }catch (Exception e) {
		 }
		event = null;
		
	}
	
	public void write(CometEvent event,String html) throws ServletException, IOException{
		write(event, FileUtil.MIME_TEXT_HTML, html);
	}
	public void write(CometEvent event,String mime,String html) throws ServletException, IOException{
		HttpServletResponse response =event.getHttpServletResponse();
		UtilWeb.write(response, mime, html);
		response.flushBuffer();
		event.close();
		event = null;
	}
	public void write(CometEvent event,byte[] bytes) throws ServletException, IOException{
		write(event, FileUtil.MIME_TEXT_HTML, bytes);
	}
	public void write(CometEvent event,String mime,byte[] bytes) throws ServletException, IOException{
		HttpServletResponse response =event.getHttpServletResponse();
		UtilWeb.write(response, mime, bytes);
		response.flushBuffer();
		event.close();
		event = null;
	}
	


	public void addGun(Gun gun) {
		this.gunlist.add(gun);
	}

	
	public String getNodeid() {
		return nodeid;
	}


	public void setNodeid(String nodeid) {
		this.nodeid = nodeid;
	}


	public String getClasspath() {
		return classpath;
	}

	public void setClasspath(String classpath) {
		this.classpath = classpath;
	}
	
	

	@Override
	public void event(String id,Object o) {
		try {
			resultlist.add(id, o);
		} catch (Exception e) {
		}
	}
	

	

	
	
	
	
	
	public ArrayList<Gun> getGunlist() {
		return gunlist;
	}







	public ArrayList<CometEvent> getCometEventList() {
		return cometEventList;
	}

	public boolean addCometEvent(CometEvent cometevent) {
		boolean sw =  cometEventList.add(cometevent);
		for (int i = 0; i < getGunlist().size(); i++) {
			sw = getGunlist().get(i).addCometEvent(cometevent);
		}
		return sw;
	}
	
	@Override
	public void interrupt() {
		for (int i = 0; i < getGunlist().size(); i++) {
			getGunlist().get(i).interrupt();
		}
		super.interrupt();
	}
	
	
	
	public boolean removeCometEvent(CometEvent  event){
		boolean sw=false;
		for (int i = 0; i < getGunlist().size(); i++) {
			sw = getGunlist().get(i).removeCometEvent(event);
		}
		sw =  cometEventList.remove(event);
		try{
			event.close();
			event=null;
		}catch (Exception e) {
		}
		return sw;
	}
	
//	public CometEvent getCometEvent(){
//		CometEvent event = null;
//		if(cometEventList.size()>0){
//			event = cometEventList.get(cometEventList.size()-1);
//		}
//		return event;
//	}


	public boolean isBroadcast() {
		return broadcast;
	}


	public void setBroadcast(boolean broadcast) {
		this.broadcast = broadcast;
	}


	public boolean isStandby() {
		return standby;
	}


	public void setStandby(boolean standby) {
		this.standby = standby;
		for (int i = 0; i < gunlist.size(); i++) {
			gunlist.get(i).setStandby(standby);
		}
	}


	public boolean isPair() {
		return pair;
	}


	public void setPair(boolean pair) {
		this.pair = pair;
	}




	
	// public Object getResult(String gunid) throws Exception{
	// return resultlist.get(gunid);
	// }
}
