package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;

//MessageSender.java 
public class CopyOfMessageSender implements Runnable {
	private volatile boolean running = true;
	private final BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	private final Map<String, CometEvent> sessions = new ConcurrentHashMap<String, CometEvent>();
	private final ExecutorService executor = Executors.newFixedThreadPool(5);
	private static CopyOfMessageSender instance = null;
	private CopyOfMessageSender() {
	}
	public static CopyOfMessageSender getInstance(){
		if(instance==null)
			instance = new CopyOfMessageSender();
		return instance;
	}
	public void send(String message) {
		try {
			messages.put(message);
			System.out.println("message size"+messages.size());
		} catch (InterruptedException ignore) {
			ignore.printStackTrace();
			// ignore
		}
	}

	public void addSession(String id, CometEvent event) {
		sessions.put(id, event);
		System.out.println("addSession   "+id+"      "+sessions.size());
	}

	public void removeSession(String id) {
		sessions.remove(id);
		System.out.println("removeSession   "+id+"      "+sessions.size());
	}

	public void stop() {
		this.running = false;
		this.executor.shutdown();
	}

	@Override
	public void run() {
		System.out.println(" RUN ");
		while (running) {
			String message = null;
			try {
				message = messages.take();
				System.out.println("MSG "+message+"      session size"+sessions.size());
			} catch (InterruptedException ignore) {
				ignore.printStackTrace();
				// ignore
			}
			for (String id : sessions.keySet()) {
				System.out.println("thread start executor "+message+"     "+id);
				executor.submit(new Task(id, message));
			}
		}
	}

	private class Task implements Runnable {
		private String sessionId;
		private String message;

		public Task(String id, String msg) {
			sessionId = id;
			message = msg;
			System.out.println(" Task "+id+"    "+msg);
		}

		public void run() {
			System.out.println("task Run");
			CometEvent event = sessions.get(sessionId);
			if (null == event) {
				return;
			}
			HttpServletResponse response = event.getHttpServletResponse();
			PrintWriter out = null;
			try {
				/*out = response.getWriter();
				out.println(message);
				out.flush();*/
				response.flushBuffer();
			} catch (IOException naive) {
				naive.printStackTrace();
			} finally {
				try {
					out.close();
				} catch (Exception ignore) {
				}
				try {
					event.close();
				} catch (Exception ignore) {
				}
				sessions.remove(sessionId);
			}
		}
	}
}
