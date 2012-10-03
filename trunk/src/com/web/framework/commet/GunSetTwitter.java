package com.web.framework.commet;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.CometEvent;

import com.web.framework.commet.longpolling.Gun;

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
