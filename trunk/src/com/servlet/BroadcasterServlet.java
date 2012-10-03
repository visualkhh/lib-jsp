package com.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;

/**
 * Servlet implementation class BroadcasterServlet
 */
public class BroadcasterServlet extends HttpServlet implements CometProcessor {
	// ...
	MessageSender messageSender=new MessageSender();
	@Override
	public void event(CometEvent event) throws ServletException, IOException {
		HttpServletRequest request = event.getHttpServletRequest();
		HttpServletResponse response = event.getHttpServletResponse();
		String sessionId = request.getSession().getId();
		if (CometEvent.EventType.BEGIN == event.getEventType()) {
			System.out.println("Broadcaster BEGIN");
			// 요청을 최초로 처리할 때 호출됨.
			response.setContentType("text/html; charset=utf-8");
			messageSender.addSession(sessionId, event);
		} else if (CometEvent.EventType.ERROR == event.getEventType()) {
			System.out.println("Broadcaster ERROR");
			// IO 에러가 발생했을 때.
			messageSender.removeSession(sessionId);
			event.close(); // 요청 처리 완료.
		} else if (CometEvent.EventType.END == event.getEventType()) {
			System.out.println("Broadcaster END");
			// 요청 처리가 완료되었을 때
			log("End event");
		} else if (CometEvent.EventType.READ == event.getEventType()) {
			System.out.println("Broadcaster READ");
			log("Read event");
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("broadcaster");
	}
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req,resp);
	}
	// ...

}
