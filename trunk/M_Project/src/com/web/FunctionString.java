package com.web;

import khh.std.adapter.Adapter_Std;
import khh.web.jsp.framework.commet.longpolling.Function;

import org.apache.catalina.CometEvent;

public class FunctionString extends Function{
	@Override
	public Adapter_Std<String, Object>  makeResult(Adapter_Std<String, Object> set) {
		Adapter_Std<String, Object>  result=new Adapter_Std<String, Object>();
		try {
			result.add("gun_string",(String) set.get("gun_string"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public void finish(CometEvent event,Adapter_Std<String, Object> result) throws Exception {
		String html ="";
		for (int i = 0; i < result.size(); i++) {
			html+=result.getString(i);
		}
		write(event, html);
	}
}
