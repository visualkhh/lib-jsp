package com.web;

import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;


public class UtilWeb {

	
	final public static String INCLUDE_PARAMSPLIT=",";
	final public static String INCLUDE_PARAM_GRADE="grade";
	final public static String INCLUDE_PARAM_CSS="css";
	final public static String INCLUDE_PARAM_JAVASCRIPT="javascript";
	
	final public static String INCLUDE_PARAMVALUE_JQUERY="jquery";
	final public static String INCLUDE_PARAMVALUE_JQUERYUI="jqueryui";
	final public static String INCLUDE_PARAMVALUE_JQGRID="jqgrid";
	final public static String INCLUDE_PARAMVALUE_JQUTIL="jqutil";
	
	
	

	
	
	
	public static String getIncludeCSS(String path){
		return ("<link rel='stylesheet' type='text/css' media='screen' href='"+path+"'/>");
	}
	public static String getIncludeJavaScript(String path){
		return ("<script src='"+path+"' type='text/javascript'></script>");
	}
	
	//getServletContext
	public static ServletContext getServletContext(ServletConfig config){
		return config.getServletContext();
	}
	public static String getServletName(ServletConfig config){
		return config.getServletName();
	}
	public static String getInitParameter(ServletConfig config,String v_name){
		return config.getInitParameter(v_name);
	}
	public static Enumeration getInitParameterNames(ServletConfig config){
		return config.getInitParameterNames();
	}
	
	//ServletContext
	public static Enumeration getInitParameterNames(ServletContext context){
		return context.getInitParameterNames();
	}
	public static String getInitParameter(ServletContext context,String v_name){
		return context.getInitParameter(v_name);
	}
	
	public static String getContextRealPath(ServletContext context,String filePath){
		return context.getRealPath(filePath);
	}
	public static String getContextPath(HttpServletRequest request){
		return request.getContextPath();
	}
	public static String getBasePath(HttpServletRequest request){
		return request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+getContextPath(request)+"/";
	}
}
