package com.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;

/**
 * Servlet implementation class CommetServlet
 */
public class CommetServlet extends HttpServlet implements CometProcessor {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CommetServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    
    MessageSender messageSender=null;
    public void init() throws ServletException {
    	messageSender=MessageSender.getInstance();
    };
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("a");
	}
	@Override
	public void event(CometEvent event) throws IOException, ServletException {
	    HttpServletRequest request = event.getHttpServletRequest(); 
	    HttpServletResponse response = event.getHttpServletResponse(); 
	    String sessionId = request.getSession().getId(); 
	    if (CometEvent.EventType.BEGIN == event.getEventType()) { 
	      // 요청을 최초로 처리할 때 호출됨. 
	      //log("BEGIN event"); 
	    	System.out.println("CommetServlet BEGIN "+sessionId);
	    	response.setContentType("text/html; charset=utf-8"); 
	    	messageSender.addSession(sessionId, event); 
	    } else if (CometEvent.EventType.ERROR == event.getEventType()) { 
	    	//log("ERROR  event"); 
	      // IO 에러가 발생했을 때. 
    	System.out.println("CommetServlet ERROR "+sessionId);
		  response.setContentType("text/html"); 
		  response.getWriter().println("ERROR"); 
	      messageSender.removeSession(sessionId); 
	      event.close(); // 요청 처리 완료. 
	    } else if (CometEvent.EventType.END == event.getEventType()) { 
	      // 요청 처리가 완료되었을 때 
	      //log("End event"); 
	    	System.out.println("CommetServlet END "+sessionId);
	      event.close(); // 요청 처리 완료. 
	    } else if (CometEvent.EventType.READ == event.getEventType()) { 
	    	System.out.println("CommetServlet READ "+sessionId);
	      //log("Read event"); 
	    } 
	}

}
