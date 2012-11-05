package khh.web.framework.commet;

import org.apache.catalina.CometEvent;

import khh.std.adapter.Adapter_Std;
import khh.web.framework.commet.longpolling.Function;


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

	@Override
	public void finish(CometEvent event, Adapter_Std<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
}
