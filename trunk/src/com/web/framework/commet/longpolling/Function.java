package com.web.framework.commet.longpolling;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;

import khh.interfaces.StrEvent_Interface;
import khh.std.adapter.Adapter_Std;

import org.apache.catalina.CometEvent;

public abstract class Function extends Thread  implements StrEvent_Interface{

	private String nodeid;
	private String classpath						= null;
	private ArrayList<Gun> gunlist 					= new ArrayList<Gun>();
//	private HashMap<String,Object> rs = new HashMap<String, Object>()
	private Adapter_Std<String, Object> resultlist	= new Adapter_Std<String, Object>();
	private ArrayList<CometEvent> cometEventList	= new ArrayList<CometEvent>();
	private boolean broadcast						= false;
	private boolean standby							= false;
	private boolean pair							= false;
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
					String makeResult = makeResult(resultlist);
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

	
	private void removeGarbageCometEvent() {
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
						e.printStackTrace();
					} // 요청 처리 완료. 
		    } else if (CometEvent.EventType.END == event.getEventType()) { 		// 요청 처리가 완료되었을 때
//		    	getCometEventList().remove(event);
			      try {
			    	  removeCometEvent(event);
			    	  eventlist.remove(event);
			    	  event.close();
				} catch (IOException e) {
					e.printStackTrace();
				} // 요청 처리 완료. 
		    } else if (CometEvent.EventType.READ == event.getEventType()) { 	// 읽을께있을때.
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


	public void sendMessage(String msg) throws IOException{
		//System.out.println("sendMsg" +msg+"     "+getNodeid());
//		if(isPair()){
//			directSendMessage(msg);
//		}else{
//			GunLongPolling.getSenderManager(getId()).send(msg);
//		}
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
				PrintWriter out = null;
				try {
					HttpServletResponse response =event.getHttpServletResponse();
					response.setContentType("text/html"); 
					out = response.getWriter();
					out.println(msg);
					out.flush();
					response.flushBuffer();
				} catch (Exception naive) {
					naive.printStackTrace();
				} finally {
					try {
						out.close();
					} catch (Exception ignore) {
					}
					try {
						event.close();
					} catch (Exception ignore) {
					}
				}
		
		}
		
	}
	
//	private void directSendMessage(String msg) throws IOException {
//	}


	public abstract String makeResult(Adapter_Std<String, Object> set) throws Exception;

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
	
	
	
	public boolean removeCometEvent(CometEvent  cometevent){
		boolean sw=false;
		for (int i = 0; i < getGunlist().size(); i++) {
			sw = getGunlist().get(i).removeCometEvent(cometevent);
		}
		
		sw =  cometEventList.remove(cometevent);

		try{
			cometevent.close();
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
