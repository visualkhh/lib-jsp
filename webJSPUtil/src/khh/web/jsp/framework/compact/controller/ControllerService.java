package khh.web.jsp.framework.compact.controller;

import java.util.HashMap;

import khh.debug.LogK;

public class ControllerService {

	LogK log = LogK.getInstance();
	//파라미터 이름들
	String serviceMethodParamName	= "MN";
	String serviceIdParamName		= "IN";
	String serviceViweParamName 	= "VM";
	
	//위파라미터 이름으로 지정된 값이 없을경우 아래 디폴트값으로.. 콜된다.
	String defaultServiceMethod	= "doRequest";
	String defaultServiceId		= "defaultService";
	String defaultServiceViewId	= "8";
	
	HashMap<String, Object> serviceObjects = new HashMap<String, Object>();
	
	
	

	public void putObject(Object targetObject){
		putObject(getDefaultServiceId(),targetObject);
	}
	public void putObject(String id, Object targetObject){
		try {
			getServiceObjects().put(id,targetObject);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}



	public String getServiceMethodParamName() {
		return serviceMethodParamName;
	}
	public String getServiceIdParamName() {
		return serviceIdParamName;
	}

	public String getServiceViweParamName() {
		return serviceViweParamName;
	}

	public String getDefaultServiceMethod() {
		return defaultServiceMethod;
	}


	public void setDefaultServiceMethod(String defaultServiceMethod) {
		this.defaultServiceMethod = defaultServiceMethod;
	}


	public String getDefaultServiceId() {
		return defaultServiceId;
	}


	public void setDefaultServiceId(String defaultServiceId) {
		this.defaultServiceId = defaultServiceId;
	}


	public String getDefaultServiceViewId() {
		return defaultServiceViewId;
	}


	public void setDefaultServiceViewId(String defaultServiceViewId) {
		this.defaultServiceViewId = defaultServiceViewId;
	}


	public HashMap<String, Object> getServiceObjects() {
		return serviceObjects;
	}
	private void setServiceObjects(HashMap<String, Object> serviceObjects) {
		this.serviceObjects = serviceObjects;
	}
	
	
	
	
	
	
	
	
	
}
