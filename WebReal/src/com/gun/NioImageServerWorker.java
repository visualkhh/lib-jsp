package com.gun;

import java.nio.channels.SelectionKey;
import java.util.HashMap;

import khh.communication.tcp.nio.worker.NioActionWorker;
import khh.communication.tcp.nio.worker.NioWorker;
import khh.communication.tcp.nio.worker.msg.NioActionMsg;

public class NioImageServerWorker extends NioActionWorker{
	GunGetImage gunImage=null;
	public NioImageServerWorker() {
		super(MODE_FIREST_R);
	}
	@Override
	public NioActionMsg onReceiveAction(NioActionMsg msg,SelectionKey selectionKey) throws Exception {
		getGunImage().setImage(msg.getByteArray()) ;
		return null;
	}
	@Override
	public NioActionMsg onSendAction(NioActionMsg msg, SelectionKey selectionKey)
			throws Exception {
		return null;
	}

	@Override
	public void receiveTelegram(HashMap<String, Object> telegram,
			SelectionKey selectionKey) throws Exception {
		// TODO Auto-generated method stub
		
	}
	public void setGunImage(GunGetImage gunImage) {
		this.gunImage = gunImage;
	}
	public GunGetImage getGunImage() {
		return gunImage;
	}

}
