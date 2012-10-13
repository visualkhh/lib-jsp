package com.web.framework.commet.longpolling;

import java.io.IOException;
import java.util.ArrayList;

import khh.interfaces.StrEvent_Interface;

import org.apache.catalina.CometEvent;

public abstract class Gun extends Thread {
	private ArrayList<StrEvent_Interface> listenerlist 	= new ArrayList<StrEvent_Interface>();
	private ArrayList<CometEvent> cometEventList 		= new ArrayList<CometEvent>();
	private int interval 								= 1000;
	private String nodeid								= null;
	private String classpath							= null;
	private boolean standby								= false;
	private boolean pair								= false;

	public void run() {
		while (true) {
			try {
				Thread.sleep(100);
				removeGarbageCometEvent();
//				if(getNodeid().equals("gun_string"))
//				System.out.println("gun  "+this.getNodeid()+"     "+listenerlist.size()+ "      "+cometEventList.size()+"   "+isStandby() +"         "+ isPair());
				if (listenerlist.size() > 0 && cometEventList.size() > 0 && isStandby()) {
					Object o = trigger();
					for (int i = 0; i < listenerlist.size(); i++) {
						listenerlist.get(i).event(nodeid, o);
					}
					setStandby(false);
					if(isPair()==true){
						break;
					}
				}
				
			}catch (InterruptedException e) {
				e.printStackTrace();
				break;
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		
		//System.out.println("breaker  gunName:" +getNodeid()+"    " +isPair()+"     "+cometEventList.size());
	}

	public abstract Object trigger() throws Exception;

	public void addEventListener(StrEvent_Interface listener) {
		synchronized (listenerlist) {
			if(listener==null)
				return;
			listenerlist.add(listener);
		}
	}

	public void removeEventListener(StrEvent_Interface listener){
		synchronized (listenerlist) {
			if(listener==null)
				return;
			listenerlist.remove(listener);
		}
	}
	
	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getInterval() {
		return interval;
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

	public boolean isStandby() {
		return standby;
	}

	public void setStandby(boolean standby) {
		this.standby = standby;
	}


	public boolean isPair() {
		return pair;
	}

	public void setPair(boolean pair) {
		this.pair = pair;
	}

	public ArrayList<CometEvent> getCometEventList() {
		return cometEventList;
	}
	public boolean addCometEvent(CometEvent cometevent) {
		return cometEventList.add(cometevent);
	}
	public boolean removeCometEvent(CometEvent cometevent) {
		return cometEventList.remove(cometevent);
	}

	private void removeGarbageCometEvent() {
		ArrayList<CometEvent> eventlist  = getCometEventList();
		for (int i = 0; i < eventlist.size(); i++) {
			CometEvent event = eventlist.get(i);
		    if (CometEvent.EventType.BEGIN == event.getEventType()) { 
		    } else if (CometEvent.EventType.ERROR == event.getEventType()) { 
		    	//getCometEventList().remove(event);
			    	try {
			    		getCometEventList().remove(event);
						event.close();
					} catch (IOException e) {
						e.printStackTrace();
					} // 요청 처리 완료. 
		    } else if (CometEvent.EventType.END == event.getEventType()) { 
//		    	getCometEventList().remove(event);
			      try {
			    	  getCometEventList().remove(event);
					event.close();
				} catch (IOException e) {
					event=null;
					//e.printStackTrace();
				} // 요청 처리 완료. 
		    } else if (CometEvent.EventType.READ == event.getEventType()) { 
		    } 
		}
		
	}
	// Check_Interface trigger;
	// Check_Interface destory;
	// public Check_Interface getTrigger() {
	// return trigger;
	// }
	// public void setTrigger(Check_Interface trigger) {
	// this.trigger = trigger;
	// }
	// public Check_Interface getDestory() {
	// return destory;
	// }
	// public void setDestory(Check_Interface destory) {
	// this.destory = destory;
	// }

}
