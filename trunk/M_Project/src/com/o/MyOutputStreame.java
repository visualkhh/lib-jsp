package com.o;

import java.io.IOException;
import java.io.OutputStream;

import khh.file.util.FileUtil;

public class MyOutputStreame extends OutputStream{

OutputStream	out = null;

public MyOutputStreame() {
	super();
	try{
		out = FileUtil.getFileOutputStream("c:\\gg.txt");
	}catch (Exception e) {
	}
}
	@Override
	public void write(int b) throws IOException {
		out.write(b);
		System.out.write(b);
		
	}

}
