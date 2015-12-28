package khh.web.jsp.framework.filter.validate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import khh.debug.LogK;
import khh.string.util.StringUtil;

public class Role {
	//roleType,							url petton, 			fncName, value
//	private LinkedHashMap<String, LinkedHashMap<String, LinkedHashMap<String, String>>> roleList = null;
	//url petton, 			fncName, value
	private LinkedHashMap<String, LinkedHashMap<String, String>> roleList = null;
	private LinkedHashMap<String, String> info = new LinkedHashMap<>();;
	LogK log = LogK.getInstance();
	public Role(LinkedHashMap<String, LinkedHashMap<String, String>> roleList){
		this.roleList=roleList;
	}
	public LinkedHashMap<String, String> getPageRole(HttpServletRequest request){
		String requestURI = request.getRequestURI()+(request.getQueryString()!=null?"?"+request.getQueryString():"");
		log.debug("Role service  URI:"+requestURI);
		LinkedHashMap<String, String> info = new LinkedHashMap<>();
		boolean isURLMapping=false;
		try{
			ArrayList<Entry<String, LinkedHashMap<String, String>>> list =  new ArrayList<Entry<String, LinkedHashMap<String, String>>>();
			list.addAll(roleList.entrySet());
			for (int i = 0; i < list.size(); i++) {
				if(StringUtil.isMatches(requestURI,list.get(i).getKey())){
					isURLMapping = true;
					info.putAll(list.get(i).getValue());
				}
			}
//			roleList.entrySet().stream().filter(rJE->StringUtil.isMatches(requestURI,rJE.getKey())).forEach(rJE->{
//				info.putAll(rJE.getValue());
//			});
		}catch(Exception e){
		}
		
		if(isURLMapping==false){ //url못찾으면 널로 보낸다.
			info = null;
		}
		return info;
	}
	
	public void putRole(String url,String fncName, String value){
		LinkedHashMap<String, String> info = new LinkedHashMap<>();
		try{
			roleList.entrySet().stream().filter(rJE->StringUtil.isMatches(url,rJE.getKey())).forEach(rJE->{
				info.put(fncName,value);
			});
		}catch(Exception e){
		}
	}
	public LinkedHashMap<String, String> getInfo() {
		return info;
	}
	public void setInfo(LinkedHashMap<String, String> info) {
		this.info = info;
	}
	public void putInfo(String key, String value){
		info.put(key, value);
	}
	public LinkedHashMap<String, LinkedHashMap<String, String>> getRoleList() {
		return roleList;
	}
	public void setRoleList(LinkedHashMap<String, LinkedHashMap<String, String>> roleList) {
		this.roleList = roleList;
	}

}
