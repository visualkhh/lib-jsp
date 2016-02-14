package khh.web.jsp.framework.commet;

import org.apache.catalina.comet.CometEvent;

import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;


public class FunctionKHH extends Function{

	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) {
//		String str=null;
//		try {
//			str = (String) set.get("gun_khh")+"      "+getId();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		System.out.println("KHH  "+str);
		return set;
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
}
