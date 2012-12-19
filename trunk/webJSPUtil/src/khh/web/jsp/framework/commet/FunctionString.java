package khh.web.jsp.framework.commet;

import org.apache.catalina.CometEvent;

import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;


public class FunctionString extends Function{
	@Override
	public String makeResult(AdapterMap<String, Object> set) {
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

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
}
