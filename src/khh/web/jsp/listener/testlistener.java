package khh.web.jsp.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class testlistener implements ServletContextListener {

	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		System.out.println("contextDestroyed"+arg0);
	}

	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

		System.out.println("contextInitialized"+arg0);
	}

}
