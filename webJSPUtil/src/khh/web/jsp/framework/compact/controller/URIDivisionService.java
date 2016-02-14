package khh.web.jsp.framework.compact.controller;

import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
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

public  class URIDivisionService extends ControllerService{
	
	
	public URIDivisionService() {
		log.debug("URIDivisionService Create");
	}
	
	


	//파라미터값에 따라서 매소드 호출한다.
	public String doRequest(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String serviceIdParamName = request.getRequestURI();
		String serviceMethodName		= request.getParameter(getServiceMethodParamName());
		serviceMethodName 				= (null==serviceMethodName ? getDefaultServiceMethod() : serviceMethodName);
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
