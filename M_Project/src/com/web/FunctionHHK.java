package com.web;

import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;

import org.apache.catalina.CometEvent;

public class FunctionHHK extends Function{
	@Override
	public AdapterMap<String, Object>  makeResult(AdapterMap<String, Object> set) {
		AdapterMap<String, Object>  result=new AdapterMap<String, Object>();
		try {
			result.add("gun_string",(String) set.get("gun_string"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public void finish(CometEvent event,AdapterMap<String, Object> result) throws Exception {
		String html ="";
		for (int i = 0; i < result.size(); i++) {
			html+=result.getString(i);
		}
		event.getHttpServletRequest().setAttribute("hhk", html);
		include(event, "ok");
	}
}
