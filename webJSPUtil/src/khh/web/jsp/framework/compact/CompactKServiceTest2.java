package khh.web.jsp.framework.compact;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;
import khh.web.jsp.framework.compact.view.ViewResovler;

public class CompactKServiceTest2 {

	LogK log = LogK.getInstance();
	
	public CompactKServiceTest2() {
		// TODO Auto-generated constructor stub
		log.debug("CompactKServiceTest2 생성");
	}
	public String doRequest(HttpServletRequest request){
		log.debug("CompactKRequestTest222 메소드 실행 doRequest  rq  "+request);
		request.setAttribute(ViewResovler.PARAM_VIEWID, "good");
		return "v_fluid";
	}
//	public String doRequest(Integer i, HttpServletRequest request, HttpServletResponse response){
//		log.debug("CompactKRequestTest 메소드 실행 doRequest int,rq,rs "+request+"   "+response+"  = "+i);
//		return null;
//	}
}
