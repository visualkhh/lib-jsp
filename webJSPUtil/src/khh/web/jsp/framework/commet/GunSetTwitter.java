package khh.web.jsp.framework.commet;

import javax.servlet.http.HttpServletRequest;

import khh.web.jsp.framework.commet.longpolling.Gun;

import org.apache.catalina.CometEvent;


public class GunSetTwitter extends Gun {
	int i=100;
	@Override
	public Object trigger() throws Exception {
		CometEvent event = getCometEventList().get(0);
		HttpServletRequest request  = event.getHttpServletRequest();
		String msg = request.getParameter("msg")+"    "+i;
//		System.out.println(msg);
		GunTwitter.messages.put(msg);
		i++;
		return "good send("+msg+")";
	}
}
