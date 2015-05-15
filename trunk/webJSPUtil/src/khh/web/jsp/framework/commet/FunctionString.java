package khh.web.jsp.framework.commet;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;

import khh.file.util.FileUtil;
import khh.std.adapter.AdapterMap;
import khh.web.UtilWeb;
import khh.web.jsp.framework.commet.longpolling.Function;


public class FunctionString extends Function{
	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) {
//		String ip = null;
//		if(getEvent()!=null)
//		{
//			ip=getEvent().getHttpServletRequest().getParameter("ip");
//		}
		AdapterMap<String,Object> str=new AdapterMap<String, Object>();
		try {
			str.add("msg",set.getString("gun_string"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("makeResult  "+str.getString("gun_string")+"     "+ getNodeid());
//		System.out.println("FUNCTION HHK  "+str);
		return str;
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result)
			throws Exception {
		HttpServletResponse response =event.getHttpServletResponse();
		UtilWeb.write(response, FileUtil.MIME_TEXT_TEXT, result.getString("msg"));
		response.flushBuffer();
		// TODO Auto-generated method stub
		
	}
}
