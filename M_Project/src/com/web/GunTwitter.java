package com.web;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import khh.communication.tcp.nio.client.NioClient;
import khh.communication.tcp.nio.worker.NioWorker;
import khh.debug.LogK;
import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunTwitter extends Gun {
	public static BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	LogK log = LogK.getInstance();
	class NioTwitterWorker extends NioWorker {
		public void execute(SelectionKey selectionKey) throws Exception {
			if( selectionKey.isReadable()){
				ByteBuffer buffer = ByteBuffer.allocate(10);
				read(buffer, 1000, selectionKey);
				buffer.clear();
				byte [] aa  = new byte[10];
				buffer.get(aa);
				messages.add(new String(aa));
				log.debug("-------------받았어");
			}
		}
	}
	
	public GunTwitter() throws Exception {
		setting();
	}
	
	private void setting() throws Exception {
		NioClient cc =  new NioClient("localhost", 888, NioTwitterWorker.class);
		cc.start();
	}

	@Override
	public Object trigger() throws Exception {
		String message =messages.take();
		log.debug("------------캐치했어-받았어");
		return message;
	}
}
