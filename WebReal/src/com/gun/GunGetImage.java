package com.gun;

import java.util.ArrayList;

import khh.communication.tcp.nio.server.NioServer;
import khh.communication.tcp.nio.worker.NioWorker;
import khh.debug.LogK;
import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunGetImage extends Gun {
	LogK logk = LogK.getInstance();
	NioImageServerWorker imageWorker;
	int afterStatus=0;
	int thisStatus=0;
	private byte[] data; 
	public GunGetImage() {
		ArrayList<NioWorker> list = new ArrayList<NioWorker>();
		imageWorker = new NioImageServerWorker();
		imageWorker.setGunImage(this);
		
		list.add(imageWorker);
		try {
			new NioServer(9876,list).start() ;
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	}
	
	@Override
	public Object trigger() throws Exception {
		while(thisStatus == afterStatus || data==null){
			sleep(1);
		}
		thisStatus=afterStatus;
		return data;
	}

	synchronized public void setImage(byte[] data){
		this.data=data;
		afterStatus++;
		getCometEventList();
	}
}
