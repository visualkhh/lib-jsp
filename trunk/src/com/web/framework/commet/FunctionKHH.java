package com.web.framework.commet;

import khh.std.adapter.Adapter_Std;

import com.web.framework.commet.longpolling.Function;

public class FunctionKHH extends Function{

	@Override
	public String makeResult(Adapter_Std<String, Object> set) {
		String str=null;
		try {
			str = (String) set.get("gun_khh")+"      "+getId();
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println("KHH  "+str);
		return str;
	}
}
