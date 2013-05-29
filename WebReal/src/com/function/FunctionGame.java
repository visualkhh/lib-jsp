package com.function;

import java.io.IOException;
import java.util.HashMap;

import org.apache.catalina.CometEvent;

import com.gun.ArduinoClient;

import khh.communication.tcp.nio.client.NioClient;
import khh.conversion.util.ConversionUtil;
import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;

public class FunctionGame extends Function {
NioClient client = null;
	public FunctionGame() {
		try {
			client = new NioClient("127.0.0.1", 6565, new ArduinoClient());
			client.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) throws Exception {
		HashMap<String,Object> map = new HashMap<String, Object>();
		for(int i=0 ; i < set.size(); i ++){
			map.put("control", set.get(i));
			client.getTelegramQueue().push(map);
		}
		return set;
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result) throws Exception {
		String html ="";
		for (int i = 0; i < result.size(); i++) {
			html+=result.getString(i);
		}
		write(event, html);
	}

}
