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
	public static void write(HttpServletResponse response,String writestr) throws IOException{
//		HttpSession session = request.getSession();
		PrintWriter writer  =  response.getWriter();
		writer.println(writestr);
		writer.flush();
		writer.close();
	}
	public static void setHeader(HttpServletResponse response,String headName,String info){
		response.setHeader(headName, info);
	}
}
