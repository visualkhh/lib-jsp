package com.web;


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
}
