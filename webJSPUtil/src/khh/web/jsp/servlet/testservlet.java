package khh.web.jsp.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import khh.web.UtilWeb;
import khh.web.jsp.request.RequestUtil;
import khh.web.jsp.session.LoginManager;


/**
 * Servlet implementation class testservlet
 */
public class testservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public testservlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    int a=1;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		LoginManager loginManager = LoginManager.getInstance();
//		HttpSession session = request.getSession();
//		loginManager.setSession(session,session.getId());
//		PrintWriter writer  =  response.getWriter();
//		writer.println(request.toString()+"  <br>  "+response.toString()+"          "+a);
//		writer.println(request.getRequestURI());
//		writer.println(request.getRequestURL());
//		writer.flush();
//		writer.close();
		//request.getRequestDispatcher("/WEB-INF/jsp/chat.jsp").forward(request, response); 
		request.setAttribute("hhk", "aaaaaa");
		RequestUtil.forward(request, response, "/WEB-INF/jsp/ok.jsp");
		a++;
		response.getWriter().close();
//		while(true){
//			try {
//				Thread.sleep(1000);
//			} catch (InterruptedException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
		//session.invalidate();
		//session.removeAttribute("a");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

}
