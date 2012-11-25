package com.web;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunTwitter extends Gun {
	public static BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	@Override
	public Object trigger() throws Exception {
		String message =messages.take();
		return message;
	}
}
