package khh.web.jsp.framework.compact.controller;

import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.function.Function;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;


import khh.db.connection.ConnectionCreator_I;
import khh.db.terminal.DBTerminal;
import khh.db.terminal.resultset.DBTResultRecord;
import khh.db.terminal.resultset.DBTResultSetContainer;
import khh.debug.LogK;
import khh.reflection.ReflectionUtil;
import khh.std.Standard;
import khh.std.adapter.AdapterMap;
import khh.web.jsp.db.util.ConnectionWebUtil;
import khh.web.jsp.framework.compact.db.DBTerminalResovler;
import khh.web.jsp.framework.compact.view.ViewResovler;

public  class URIDivisionService {
	LogK log = LogK.getInstance();
	//파라미터 이름들
	final static String serviceMethodParamName	= "MN";
//	final static String serviceIdParamName		= "IN";
	final static String serviceViweParamName 	= "VM";
	
	//위파라미터 이름으로 지정된 값이 없을경우 아래 디폴트값으로.. 콜된다.
	String defaultServiceMethod	= "doRequest";
	String defaultServiceId		= "defaultService";
	String defaultServiceViewId	= "defaultView";
	AdapterMap<String, Object> serviceObjects = new AdapterMap<String, Object>();
	
	public URIDivisionService() {
	}
	
	
	public void addObject(Object targetObject){
		addObject(getDefaultServiceId(),targetObject);
	}
	public void addObject(String id, Object targetObject){
		try {
			getServiceObjects().add(id,targetObject);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}



	public String getServiceMethodParamName() {
		return serviceMethodParamName;
	}




//	public String getServiceIdParamName() {
//		return serviceIdParamName;
//	}






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


	public AdapterMap<String, Object> getServiceObjects() {
		return serviceObjects;
	}
	private void setServiceObjects(AdapterMap<String, Object> serviceObjects) {
		this.serviceObjects = serviceObjects;
	}


	//파라미터값에 따라서 매소드 호출한다.
	public String doRequest(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String serviceIdParamName = request.getRequestURI();
		String serviceMethodName		= request.getParameter(getServiceMethodParamName());
		serviceMethodName 				= (null==serviceMethodName ? getDefaultServiceMethod() : serviceMethodName);
//		String serviceIdParamName		= request.getParameter(getServiceIdParamName());
//		serviceIdParamName 				= (null==serviceIdParamName ? getDefaultServiceId() : serviceIdParamName);
		String serviceViewIdParamName	= request.getParameter(getServiceViweParamName());
		serviceViewIdParamName 			= (null==serviceViewIdParamName ? getDefaultServiceViewId() : serviceViewIdParamName);
		
		
		Object atServiceObject = getServiceObjects().get(serviceIdParamName);
		log.debug("URIDivisionService  URI:"+serviceIdParamName+"  serviceMethodName:"+serviceMethodName+" serviceViewIdParamName:"+serviceViewIdParamName+"getCallObject:"+atServiceObject+" doRequest "+request+" "+response);
		Object returnVal = null;
		if(null!=atServiceObject && null!=serviceMethodName){//실행시킬 서비스오프젝트, 실행시킬메소드이름 있어야된다.
			try{
				returnVal = ReflectionUtil.executeMethod(atServiceObject, serviceMethodName, new Object[]{request,response});
			}catch(Exception e){
				returnVal = ReflectionUtil.executeMethod(atServiceObject, serviceMethodName);
			}
		}
		
		//만약에 호출한곳에서 리턴값으로 String이 넘어오면 이곧으로 view로 변경한다.
		if(returnVal instanceof String){
			serviceViewIdParamName = (String)returnVal;
		}
		log.debug("URIDivisionService   doRequest (rq,rs) viewResolverName :  "+serviceViewIdParamName);
		
		//마지막 리턴은 view 아이디.
		return serviceViewIdParamName;
	}
}
