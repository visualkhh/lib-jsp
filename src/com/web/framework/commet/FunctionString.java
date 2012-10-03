package com.web.framework.commet;

import khh.std.adapter.Adapter_Std;

import com.web.framework.commet.longpolling.Function;

public class FunctionString extends Function{
	@Override
	public String makeResult(Adapter_Std<String, Object> set) {
//		String ip = null;
//		if(getEvent()!=null)
//		{
//			ip=getEvent().getHttpServletRequest().getParameter("ip");
//		}
		String str=null;
		try {
			str = (String) set.get("gun_string");
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("makeResult  "+str+"     "+ getNodeid());
//		System.out.println("FUNCTION HHK  "+str);
		return str;
	}
}
