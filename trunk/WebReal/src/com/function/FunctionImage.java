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
		return set;
	}

	@Override
	public void finish(CometEvent event, AdapterMap<String, Object> result) throws Exception {
		byte[] bfimg = (byte[])result.get(0);
		log.debug("Image bytes"+bfimg.length);
		write(event,FileUtil.MIME_IMAGE_JPG,bfimg );
	}

}
