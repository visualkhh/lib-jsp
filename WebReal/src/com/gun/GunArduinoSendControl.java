package com.gun;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import khh.communication.tcp.nio.server.NioServer;
import khh.communication.tcp.nio.worker.NioWorker;
import khh.web.jsp.framework.commet.longpolling.Gun;

import org.apache.catalina.CometEvent;

public class GunArduinoSendControl extends Gun {
	public static NioServer server = null;
	public static ArduinoServer serverWorker = new ArduinoServer();
	
	public GunArduinoSendControl() {
		try {
			if(server==null){
				ArrayList<NioWorker> list = new ArrayList<NioWorker>();
				list.add(serverWorker);
				server = new NioServer(6565,list);
				server.setWorkerManagerSize(1);
				server.setSelectorManagerSize(1);
				server.start();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public Object trigger() throws Exception {
		CometEvent event = getCometEventList().get(0);
		HttpServletRequest request  = event.getHttpServletRequest();
		String msg = request.getParameter("control");
		GunGetTwitter.messages.put("<b>ControlSignal Send:"+msg+"</b>");
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("control", msg);
		try{
		server.pushTelegram(map);
		}catch (Exception e) {
			e.printStackTrace();
		}
		//serverWorker.receiveTelegram(map,null);
		return "GunArduinoSendControl send("+msg+")";
	}

}
