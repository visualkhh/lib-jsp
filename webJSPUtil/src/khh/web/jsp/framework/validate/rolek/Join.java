package khh.web.jsp.framework.validate.rolek;

import java.util.LinkedHashMap;

public class Join extends LinkedHashMap<String, String>{
	String url;
	String forward;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
	public String getForward() {
		return forward;
	}
	public void setForward(String forward) {
		this.forward = forward;
	}
	@Override
	public String toString() {
		return "Join [url=" + url + ", forward=" + forward
				+ "]"+super.toString();
	}
	
}
