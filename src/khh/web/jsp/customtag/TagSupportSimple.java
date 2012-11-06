package khh.web.jsp.tag.custom;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

public class TagSupportSimple extends TagSupport {
//	ServletRequest request =  pageContext.getRequest();
//	ServletResponse response =  pageContext.getResponse();
//	JspWriter writer = pageContext.getOut();
	
	public ServletRequest getRequest() {
		return pageContext.getRequest();
	}

	public ServletResponse getResponse() {
		return pageContext.getResponse();
	}

	public JspWriter getJspWriter(){
		return pageContext.getOut();
	}
	public PageContext getPageContext(){
		return pageContext;
	}
//@Override
//public int doStartTag() throws JspException {
//	// EVAL_BODY_INCLUDE  바디안쪽에 내용 출력
//	//SKIP_BODY 면  안쪽 바디쪽 내용출력안함   : 거의이거씀
//	return super.doStartTag();
//}
//
//@Override
//public int doEndTag() throws JspException {
//	//- 수행이 종료된후 SKIP_PAGE와 EVAL!_PAGE의 두개의 값들이 Return 될수 있는데 
//	// SKIP_PAGE인 경우 현재이후의 JSP 코드를 인식하지 않고 처리하지 않는다. 
//	// 만약 EVAL!_PAGE가 Return되는 경우에는 JSP페이지의 나머지 부분을 수행하게 된다.
//	return super.doEndTag();
//}
//@Override
//public void release() {
////	- JSP 컨테이너는 마지막 단계로 release() 메소듣를 호출한다. 
////	- 태그핸들러가 Resource Pool로 돌아가기 전에 핸들러를 Reset, 사용된 Resource를 해제하는 등의 역할을 수행한다
//	super.release();
//}
}
