package khh.web.jsp.framework.commet;

import org.apache.catalina.comet.CometEvent;

import khh.std.adapter.AdapterMap;
import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;


public class FunctionHHKHH extends Function{

	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) {
//		String str=null;
//		try {
//			str = "gunhhk : "+(String) set.get("gun_hhk");
//			str+= "   gunkhh : "+(String) set.get("gun_khh");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		System.out.println("HHKHH  "+str);
		return set;
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
}
