package com.web.framework.commet.longpolling;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;

//MessageSender.java 
public class GunCommetMessageSender implements Runnable {
	String name;
	private volatile boolean running = true;
//	Adapter_Std<String,BlockingQueue<String>>  messages = new Adapter_Std<String, LinkedBlockingQueue<String>>();
	private final BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	private final ArrayList<CometEvent> sessions = new ArrayList<CometEvent>();
//	private final Map<String, CometEvent> sessions = new ConcurrentHashMap<String, CometEvent>();
	private final ExecutorService executor = Executors.newFixedThreadPool(5);
	public GunCommetMessageSender() {
	}
//	private static GunCommetMessageSender instance = null;
//	public static GunCommetMessageSender getInstance(){
//		if(instance==null)
//			instance = new GunCommetMessageSender();
//		return instance;
//	}
	
	
	
	
	public void send(String message) {
		try {
			//System.out.println(getName()+"    "+message+"    "+sessions.size());
			if(sessions.size()<=0 || message==null){
				return;
			}
			messages.put(message);
		} catch (InterruptedException ignore) {
			ignore.printStackTrace();
			// ignore
		}
	}

	public void addSession(CometEvent event) {
		sessions.add(event);
		System.out.println("addSession   "+event.toString()+"      "+sessions.size());
	}

	public void removeSession(CometEvent event) {
		try {
			event.close();
		} catch (Exception ignore) {
		}
		sessions.remove(event);
//		System.out.println("removeSession   "+id+"      "+sessions.size());
	}

	public void stop() {
		this.running = false;
		this.executor.shutdown();
	}

	@Override
	public void run() {
		while (running) {
			String message = null;
			try {
				System.out.println("Run"+getName());
				message = messages.take();
				System.out.println("SENDMSG "+message+"      session size"+sessions.size()+"    "+getName());
			} catch (InterruptedException ignore) {
				ignore.printStackTrace();
				break;
				// ignore
			}
			for (int i = 0 ;  i <  sessions.size();i++) {
				//System.out.println("thread start executor "+message+"     "+getName());
				executor.submit(new Task(sessions.get(i),message));
			}
		}
	}

	private class Task implements Runnable {
		private CometEvent session;
		private String message;


		public Task(CometEvent cometEvent, String msg) {
			session = cometEvent;
			message = msg;
		}

		public void run() {
			if (null == session) {
				return;
			}
			HttpServletResponse response = session.getHttpServletResponse();
			PrintWriter out = null;
			try {
				response.setContentType("text/html"); 
				out = response.getWriter();
				out.println(message);
				out.flush();
				response.flushBuffer();
			} catch (IOException naive) {
				naive.printStackTrace();
			} finally {
				try {
					out.close();
				} catch (Exception ignore) {
				}
				try {
					session.close();
				} catch (Exception ignore) {
				}
				sessions.remove(session);
			}
		}
	}

	public ArrayList<CometEvent> getSessions() {
		return sessions;
	}




	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
