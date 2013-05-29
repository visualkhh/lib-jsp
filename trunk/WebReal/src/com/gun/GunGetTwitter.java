package com.gun;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.http.HttpServletRequest;

import khh.web.jsp.framework.commet.longpolling.Gun;

import org.apache.catalina.CometEvent;

public class GunGetTwitter extends Gun {

	public static BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	@Override
	public Object trigger() throws Exception {

		String message =messages.take();
		return message;
	}

}
