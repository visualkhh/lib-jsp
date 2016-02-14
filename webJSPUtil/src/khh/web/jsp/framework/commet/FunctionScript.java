package khh.web.jsp.framework.commet;

import org.apache.catalina.comet.CometEvent;

import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;


public class FunctionScript extends Function{
	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) {
//		String ip = null;
//		if(getEvent()!=null)
//		{
//			ip=getEvent().getHttpServletRequest().getParameter("ip");
//		}
//		System.out.println("functuion hhk "+ip);
		AdapterMap<String, Object> str=null;
		try {
			str.set("msg", (String) set.get("gun_script"));
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println("FUNCTION HHK  "+str);
		return str;
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}
