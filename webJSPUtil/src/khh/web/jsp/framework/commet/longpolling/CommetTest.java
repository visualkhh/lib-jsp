package khh.web.jsp.framework.commet.longpolling;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.web.jsp.request.RequestUtil;
import khh.web.jsp.response.ResponseUtil;

import org.apache.catalina.comet.CometEvent;
import org.apache.catalina.comet.CometProcessor;




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
	
	
	
	
	
	
	
	
	
	public class write extends Thread{
		public CometEvent list  = null;;
		public write(CometEvent c) {
			this.list=(c);
		}
		@Override
		public void run() {
			while(true){
				try {
					Thread.sleep(5000);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
				if (list!=null) {
					try {
						HttpServletResponse response = list.getHttpServletResponse();
						HttpServletRequest request= list.getHttpServletRequest();
//						//ResponseUtil.write(list.getHttpServletResponse(), "빵꾸똥꾸");
//						PrintWriter writer  = ResponseUtil.getWriter(response);
//						writer.write("빵꾸");
//						writer.flush();
//						writer.close();
						//ResponseUtil.write(list.getHttpServletResponse(), "빵꾸똥꾸");
//						RequestUtil.forward(request, response, "/WEB-INF/jsp/ok.jsp");
						//RequestUtil.include(request, response, "/WEB-INF/jsp/ok.jsp");
//						RequestUtil.forward(request, response, "/WEB-INF/jsp/ok.jsp");
						// request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp").forward(request, response); 
						//request.getRequestDispatcher("/WEB-INF/jsp/ok.jsp").include(request, response);
						list.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				list=null;;
			}
		}
		public void addCometEvent(CometEvent c){
			this.list=(c);
		}
	};
	
	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		m=new moni();m.start();
	}
	
	@Override
	public void event(CometEvent event) throws IOException, ServletException {
		//m.addCometEvent(event);
		//m.forward(event);
		
		HttpServletResponse response = event.getHttpServletResponse();
		HttpServletRequest request= event.getHttpServletRequest();
		//PrintWriter writer = ResponseUtil.getWriter(response);
		
		String type="";
		
   	 if (CometEvent.EventType.BEGIN == event.getEventType()) {  		// 요청을 최초로 처리할 때 호출됨.
   	// 요청을 최초로 처리할 때 호출됨. 
		 type="begin";
		new write(event).start();
		 //RequestUtil.forward(request, response, "/WEB-INF/jsp/ok.jsp");
			//RequestUtil.include(request, response, "/WEB-INF/jsp/ok.jsp");

    } else if (CometEvent.EventType.ERROR == event.getEventType()) { 	// IO 에러가 발생했을 때.
    	// IO 에러가 발생했을 때. 
    	type="error";
    	event.close();
    } else if (CometEvent.EventType.END == event.getEventType()) { 		// 요청 처리가 완료되었을 때
    	// 요청 처리가 완료되었을 때 
    	type="end";
//    	writer.flush();
//    	writer.close();
//    	RequestUtil.forward(request, response, "/WEB-INF/jsp/ok.jsp");
    	event.close();
    } else if (CometEvent.EventType.READ == event.getEventType()) { 	// 읽을께있을때.
    	//읽을께있을때..
    	type="red";
    }
   	 
   	 System.out.println(type);
   	 
   	 
   	 
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
