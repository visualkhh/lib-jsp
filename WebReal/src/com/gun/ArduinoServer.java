package com.gun;

import java.nio.channels.SelectionKey;
import java.util.HashMap;

import khh.communication.tcp.nio.worker.NioWorker;
import khh.conversion.util.ConversionUtil;

public class ArduinoServer extends NioWorker {
	public ArduinoServer() {
	}
	@Override
	public void execute(SelectionKey selectionKey) throws Exception {
		if(selectionKey.isReadable()){
			byte[] b = new byte[1];
			if(read(b)==1){
				GunGetTwitter.messages.put("<b>ControlSignal Read(01:good,02:fail):"+String.format("%02X", b[0])+"</b>");
			};
		}

	}

	@Override
	public void receiveTelegram(HashMap<String, Object> telegram,
			SelectionKey selectionKey) throws Exception {
		write( new byte [] { Byte.parseByte((String) telegram.get("control"))});;
	}

}
