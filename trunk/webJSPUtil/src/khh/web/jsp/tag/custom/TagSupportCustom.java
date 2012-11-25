package khh.web.jsp.tag.custom;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

public class TagSupportCustom extends TagSupport {
	String name;
	Integer age;
	String url;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		System.out.println("setName "+name);
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	
//	doStartTag -> doEndTag -> release

public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
@Override
public int doStartTag() throws JspException {
	ServletRequest request =  pageContext.getRequest();
	ServletResponse response =  pageContext.getResponse();
	
	System.out.println(request.getAttribute("gaga"));
	
	
	try {
		pageContext.getOut().flush();
	} catch (IOException e1) {
	}
	
	RequestDispatcher  dis =  pageContext.getServletContext().getRequestDispatcher(getUrl());
	try {
		dis.include(request, response);
	} catch (ServletException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	}
//	public static void forward(HttpServletRequest request, HttpServletResponse response,String path) throws ServletException, IOException{
//		 request.getRequestDispatcher(path).forward(request, response); 
//	}
	// EVAL_BODY_INCLUDE  바디안쪽에 내용 출력
	//SKIP_BODY 면  안쪽 바디쪽 내용출력안함   : 거의이거씀
	return SKIP_BODY;
}

@Override
public int doEndTag() throws JspException {
	//- 수행이 종료된후 SKIP_PAGE와 EVAL!_PAGE의 두개의 값들이 Return 될수 있는데 
	// SKIP_PAGE인 경우 현재이후의 JSP 코드를 인식하지 않고 처리하지 않는다. 
	// 만약 EVAL!_PAGE가 Return되는 경우에는 JSP페이지의 나머지 부분을 수행하게 된다.
	return super.doEndTag();
}
@Override
public void release() {
//	- JSP 컨테이너는 마지막 단계로 release() 메소듣를 호출한다. 
//	- 태그핸들러가 Resource Pool로 돌아가기 전에 핸들러를 Reset, 사용된 Resource를 해제하는 등의 역할을 수행한다
	super.release();
}
}
