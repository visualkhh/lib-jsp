package khh.web.jsp.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CommetRequestServlet
 */
public class CommetRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CommetRequestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		  request.getRequestDispatcher("/WEB-INF/jsp/chat.jsp").forward(request, response); 
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */

	MessageSender messageSender=MessageSender.getInstance();
	int i=0;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("=========commetRequestservlet= "+i);
		i++;
		String name = request.getParameter("nick"); 
		  String text = request.getParameter("text"); 
		  
		  String message = "<b>" + name + "</b>: " + text + "<br>"; 
		  System.out.println(message+" "+request.getSession().getId());
		  messageSender.send(message); 
		  
		  response.setContentType("text/html"); 
		  response.getWriter().println("OK"); 

	}

	@Override
	public void init() throws ServletException {
		new Thread(messageSender).start();
	}
}
