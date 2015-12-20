package khh.web.jsp.framework.commet.longpolling;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.comet.CometEvent;

//MessageSender.java 
public class GunMultiCommetMessageSender implements Runnable {
	String name;
	private volatile boolean running = true;
//	Adapter_Std<String,BlockingQueue<String>>  messages = new Adapter_Std<String, LinkedBlockingQueue<String>>();
	private final BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	private final Map<String, CometEvent> sessions = new ConcurrentHashMap<String, CometEvent>();
	private final ExecutorService executor = Executors.newFixedThreadPool(5);
	public GunMultiCommetMessageSender() {
	}
//	private static GunCommetMessageSender instance = null;
//	public static GunCommetMessageSender getInstance(){
//		if(instance==null)
//			instance = new GunCommetMessageSender();
//		return instance;
//	}
	
	
	
	
	public void send(String message) {
		try {
			if(sessions.size()<=0 || message==null){
				return;
			}
			messages.put(message);
			 
		} catch (InterruptedException ignore) {
			ignore.printStackTrace();
			// ignore
		}
	}

	public void addSession(String id, CometEvent event) {
		sessions.put(id, event);
//		System.out.println("addSession   "+id+"      "+sessions.size());
	}

	public void removeSession(String id) {
		sessions.remove(id);
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
				message = messages.take();
//				System.out.println("SENDMSG "+message+"      session size"+sessions.size()+"    "+getName());
			} catch (InterruptedException ignore) {
				ignore.printStackTrace();
				break;
				// ignore
			}
			for (String id : sessions.keySet()) {
//				System.out.println("thread start executor "+message+"     "+id);
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
		}

		public void run() {
			CometEvent event = sessions.get(sessionId);
			if (null == event) {
				return;
			}
			HttpServletResponse response = event.getHttpServletResponse();
			PrintWriter out = null;
			try {
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
					event.close();
				} catch (Exception ignore) {
				}
				sessions.remove(sessionId);
			}
		}
	}

	public Map<String, CometEvent> getSessions() {
		return sessions;
	}




	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
