package com.gun;

import java.net.URLDecoder;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunGetTwitter extends Gun {

	public static BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	@Override
	public Object trigger() throws Exception {
		String message = messages.take();
//		System.out.println(message);
//		System.out.println(URLDecoder.decode(message,"UTF-8"));
//		return  URLDecoder.decode(message,"UTF-8");
		return  message;
	}

}
