package com.web.framework.commet;

import khh.std.adapter.Adapter_Std;

import com.web.framework.commet.longpolling.Function;

public class FunctionHHKHH extends Function{

	@Override
	public String makeResult(Adapter_Std<String, Object> set) {
		String str=null;
		try {
			str = "gunhhk : "+(String) set.get("gun_hhk");
			str+= "   gunkhh : "+(String) set.get("gun_khh");
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println("HHKHH  "+str);
		return str;
	}
}
