package khh.web.jsp.framework.compact;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;
import khh.web.jsp.framework.compact.view.ViewResovler;

public class CompactKServiceTest {

	String nameBean="";
	int age=0;
	String targetBeasn = "";
	LogK log = LogK.getInstance();
	
	
	
	public CompactKServiceTest(String nameBean, Integer age) {
		this.nameBean = nameBean;
		this.age = age;
		log.debug("CompactKRequestTest 생성됨  "+this.nameBean+" "+this.age);
	}
	
	public void setTarget(String targetBeasn){
		this.targetBeasn = targetBeasn;
		log.debug("CompactKRequestTest 메소드 실행 setTarget  "+this.targetBeasn);
	}
	
	public String doRequest(HttpServletRequest request, HttpServletResponse response, Integer i){
		log.debug("CompactKRequestTest 메소드 실행 doRequest  rq,rs,int  "+request+"   "+response+"  = "+i);
		request.setAttribute(ViewResovler.PARAM_VIEWID, "hello");
		return "v_fluid";
	}
}
