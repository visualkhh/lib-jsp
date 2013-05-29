package com.web;

import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.util.concurrent.BlockingQueue;

import khh.communication.tcp.nio.worker.NioWorker;

public class NioArduinoClient extends NioWorker {
	public NioArduinoClient() {
		setFirestMode(MODE_FIREST_R);
	}
	@Override
	public void execute(SelectionKey selectionKey) throws Exception {
		ByteBuffer buffer = ByteBuffer.allocate(1);
		read(buffer, 5000);
		GunBoardCast.messages.put(buffer.get(0));
	}

}
