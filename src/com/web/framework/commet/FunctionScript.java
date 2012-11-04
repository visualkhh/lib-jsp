package com.web.framework.commet;

import org.apache.catalina.CometEvent;

import khh.std.adapter.Adapter_Std;

import com.web.framework.commet.longpolling.Function;

public class FunctionScript extends Function{
	@Override
	public String makeResult(Adapter_Std<String, Object> set) {
//		String ip = null;
//		if(getEvent()!=null)
//		{
//			ip=getEvent().getHttpServletRequest().getParameter("ip");
//		}
//		System.out.println("functuion hhk "+ip);
		String str=null;
		try {
			str = (String) set.get("gun_script");
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println("FUNCTION HHK  "+str);
		return str;
	}

	@Override
	public void finish(CometEvent event, Adapter_Std<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
}
