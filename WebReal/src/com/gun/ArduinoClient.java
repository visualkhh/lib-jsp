package com.gun;

import java.nio.channels.SelectionKey;
import java.util.HashMap;

import khh.communication.tcp.nio.worker.NioWorker;
import khh.conversion.util.ConversionUtil;

public class ArduinoClient extends NioWorker {

	@Override
	public void execute(SelectionKey selectionKey) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void receiveTelegram(HashMap<String, Object> telegram,
			SelectionKey selectionKey) throws Exception {
		write( new byte [] { Byte.parseByte((String) telegram.get("control"))});;
	}

}
