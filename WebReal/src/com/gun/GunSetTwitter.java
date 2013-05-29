package com.gun;

import javax.servlet.http.HttpServletRequest;

import khh.web.jsp.framework.commet.longpolling.Gun;

import org.apache.catalina.CometEvent;

public class GunSetTwitter extends Gun {

	@Override
	public Object trigger() throws Exception {
		CometEvent event = getCometEventList().get(0);
		HttpServletRequest request  = event.getHttpServletRequest();
		String msg = request.getParameter("msg");
		GunGetTwitter.messages.put(msg);
		return "good send("+msg+")";
	}

}
