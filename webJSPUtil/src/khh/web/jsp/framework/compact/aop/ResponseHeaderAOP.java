package khh.web.jsp.framework.compact.aop;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.debug.LogK;

public class ResponseHeaderAOP {
	HashMap<String, String> responseHeader = null;
	LogK log = LogK.getInstance();
	public ResponseHeaderAOP() {
		log.debug("ResponseHeaderAOP create");
		responseHeader = new HashMap<String,String>();
	}
	
	public void putHeader(String name, String value){
		responseHeader.put(name, value);
	}
	
	
	public void before(HttpServletRequest request, HttpServletResponse response){
		log.debug("AOP before");
	}
	public void after(HttpServletRequest request, HttpServletResponse response){
		log.debug("AOP after");
		responseHeader.entrySet().stream().forEach(at->{
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
			response.setHeader(at.getKey(), at.getValue());
		});
	}
	
}
