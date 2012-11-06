package khh.web.jsp.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class testlistener implements ServletContextListener {



	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		//arg0.getServletContext().getInitParameter("");
		System.out.println("contextInitialized"+arg0);
	}

	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		System.out.println("contextDestroyed"+arg0);
	}
}
