package khh.web.jsp.framework.commet;

import javax.servlet.http.HttpServletRequest;

import khh.web.jsp.framework.commet.longpolling.Gun;

import org.apache.catalina.comet.CometEvent;


public class GunHHK extends Gun {

	int ix=0;
	@Override
	public Object trigger() throws Exception  {
		Object o = null;
		while(true){
			try {
				Thread.sleep(getInterval());
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			ix++;
			CometEvent event = getCometEventList().get(0);
			HttpServletRequest request = event.getHttpServletRequest(); 
			o="("+ix+"+'vvvvvv' )"+request.getParameter("ip");;
			
			break;
		}
		return o;
	}
}
