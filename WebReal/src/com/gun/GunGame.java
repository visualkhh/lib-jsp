package com.gun;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.CometEvent;

import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunGame extends Gun {

	@Override
	public Object trigger() throws Exception {
		CometEvent event = getCometEventList().get(0);
		HttpServletRequest request  = event.getHttpServletRequest();
		String msg = request.getParameter("control");
		return msg;
	}

}
