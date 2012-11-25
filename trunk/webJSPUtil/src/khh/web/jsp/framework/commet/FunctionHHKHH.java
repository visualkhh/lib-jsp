package khh.web.jsp.framework.commet;

import org.apache.catalina.CometEvent;

import khh.std.adapter.Adapter_Std;
import khh.web.jsp.framework.commet.longpolling.Function;


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

	@Override
	public void finish(CometEvent event, Adapter_Std<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
}
