package khh.web.jsp.response;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

public class ResponseUtil {
	public static PrintWriter getWriter(HttpServletResponse response) throws IOException{
		return  response.getWriter();
	}
	public static void sendRedirect(HttpServletResponse response,String abjsppath) throws ServletException, IOException{
		response.sendRedirect(abjsppath);
	}
}
