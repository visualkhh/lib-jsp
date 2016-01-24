package khh.web.jsp.framework.validate.rolek;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

import khh.debug.LogK;
import khh.string.util.StringUtil;
//session...
public class Role extends LinkedHashMap<String,String>{
	//url petton, 			fncName, value
	private ArrayList<Join> joinList = null;
	//private LinkedHashMap<String, String> session = new LinkedHashMap<>();
	private HttpServletRequest request;
	//그때그때 바뀌는 페이지별 롤...
	private Join pageJoin = null; 
//	private LinkedHashMap<String, String> pageRole	 = null;
	LogK log = LogK.getInstance();
	public Role(ArrayList<Join> joinList){
		this.joinList = joinList;
	}
	public Join getJoin(){
		return getJoin(getRequest());
	}
	public Join getJoin(HttpServletRequest request){
		String requestURI = request.getRequestURI()+(request.getQueryString()!=null?"?"+request.getQueryString():"");
		log.debug("Role service  URI:"+requestURI);
		Join join = null;
		try{
			join = joinList.stream().filter(jn->StringUtil.isMatches(requestURI,jn.getUrl())).findFirst().get();
		}catch(Exception e){
		}
		return join;
	}
	
//	public void putRole(String url,String fncName, String value){
//		LinkedHashMap<String, String> info = new LinkedHashMap<>();
//		try{
//			roleList.entrySet().stream().filter(rJE->StringUtil.isMatches(url,rJE.getKey().getUrl())).forEach(rJE->{
//				info.put(fncName,value);
//			});
//		}catch(Exception e){
//		}
//	}
	
	
	public HttpServletRequest getRequest() {
		return request;
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
//	public LinkedHashMap<String, String> getSession() {
//		return session;
//	}
//	public void setInfo(LinkedHashMap<String, String> session) {
//		this.session = session;
//	}
//	public void putSession(String key, String value){
//		session.put(key, value);
//	}
//	public String getSession(String key){
//		return session.get(key);
//	}
	public ArrayList<Join> getJoinList() {
		return joinList;
	}
	public void setJoinList(ArrayList<Join> joinList) {
		this.joinList = joinList;
	}
	public Join getPageJoin() {
		return pageJoin;
	}
	public void setPageJoin(Join pageJoin) {
		this.pageJoin = pageJoin;
	}
	
	

}
