package khh.web.jsp.framework.commet.longpolling;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;




//server.xml
//<Connector connectiontimeout="20000" port="8080" protocol="org.apache.coyote.http11.Http11NioProtocol" redirectPort="8443" useComet="true"/>
/*
<Context docBase="M_Project" path="/M_Project" reloadable="true" source="org.eclipse.jst.jee.server:M_Project">
  <Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" maxActive="100" maxIdle="30" maxWait="10000" name="jdbc/mproject" password="skfkdsk" type="javax.sql.DataSource" url="jdbc:mysql://localhost:3306/cooltrack_godo_co_kr" username="root"/>
  <!-- url="jdbc:mysql://localhost:3306/mproject"  -->
</Context>
 */
public class CommetTest extends HttpServlet  implements CometProcessor{
	private static final long serialVersionUID = 1L;
	public class moni extends Thread{
		public CometEvent list  = null;;
		public moni(){}
		public moni(CometEvent c) {
			this.list=(c);
		}
		@Override
		public void run() {
			while(true){
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
				if (list!=null) {
					forward(list);
				}
				list=null;;
			}
		}
		public void forward(CometEvent event){
			CometEvent event2 = event;
			HttpServletRequest request = event2.getHttpServletRequest();
			HttpServletResponse response = event2.getHttpServletResponse();
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp");
			try {
				dispatcher.forward(request, response);
				event2.close();
				event2=null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		public void addCometEvent(CometEvent c){
			this.list=(c);
		}
	};
	moni m = null;
	
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		m=new moni();m.start();
	}
	
	@Override
	public void event(CometEvent event) throws IOException, ServletException {
		//m.addCometEvent(event);
		m.forward(event);
	}

	/*
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp");
		dispatcher.forward(request, response);
	}
	*/

}
