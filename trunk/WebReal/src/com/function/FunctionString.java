package com.function;

import org.apache.catalina.CometEvent;

import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;

public class FunctionString extends Function {

	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) throws Exception {
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
