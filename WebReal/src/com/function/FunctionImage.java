package com.function;

import java.awt.image.BufferedImage;

import khh.debug.LogK;
import khh.file.util.FileUtil;
import khh.image.ImageUtil;
import khh.std.adapter.AdapterMap;
import khh.web.jsp.framework.commet.longpolling.Function;

import org.apache.catalina.CometEvent;

public class FunctionImage extends Function {
	LogK log = LogK.getInstance();
	@Override
	public AdapterMap<String, Object> makeResult(AdapterMap<String, Object> set) throws Exception {
		
	/*	
	   AdapterMap<String, Object>  result=new AdapterMap<String, Object>();
		try {
			result.add("GunString",(String) set.get("GunString"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	*/
		return set;
		
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result) throws Exception {
		
		byte[] bfimg = (byte[])result.get(0);
		//byte[] bytes = ImageUtil.toByteArray(bfimg);
		log.debug("Image bytes"+bfimg.length);
//		String html ="";
//		for (int i = 0; i < result.size(); i++) {
//			html+=result.getString(i);
//		}
		write(event,FileUtil.MIME_IMAGE_JPG,bfimg );
		
	}

}
