package com.web;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.comm.SerialPortEvent;
import javax.comm.SerialPortEventListener;

import khh.communication.serial.SerialCommunication;
import khh.communication.serial.SerialParameters;
import khh.communication.tcp.nio.client.NioClient;
import khh.communication.tcp.nio.worker.NioWorker;
import khh.property.util.PropertiesUtil;
import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunBoardCast extends Gun  {
	private SerialCommunication sc=null;
	private Byte bByte;
	public static BlockingQueue<Byte> messages = new LinkedBlockingQueue<Byte>();
	
	NioClient client ;
	public GunBoardCast() throws Exception  {
		client = new NioClient("127.0.0.1",9090,NioArduinoClient.class); 
		client.start();
	}
	
	@Override
	public Object trigger() throws Exception {
		
		Byte gByte = messages.take();
		gByte = (byte) (gByte==48?0:1);
		String message="";
		if(gByte.equals(bByte)||gByte==bByte){
			
			message="document.title='NoChange("+gByte+")';";
		}else{
			bByte=gByte;
			message ="alert('ChangeDigitalState"+gByte+"');";
		}
		
		return message;
	}
}
