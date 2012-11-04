package com.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.file.util.FileUtil;
import khh.string.util.StringUtil;


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
	
	public static void write(HttpServletResponse response,String info) throws IOException{
		write(response,FileUtil.MIME_TEXT_TEXT,info);
	}
	public static void write(HttpServletResponse response,String contenttype_mime,String info) throws IOException{
		//HttpServletResponse response = getCometEvent().getHttpServletResponse();
		if(contenttype_mime!=null)
		response.setContentType(contenttype_mime); 
		PrintWriter out = response.getWriter();
		out.println(info);
		out.flush();
		response.flushBuffer();
		out.close();
	}
	
	public static void write(HttpServletResponse response,byte[] info) throws IOException{
		write(response,FileUtil.MIME_TEXT_TEXT,info);
	}
	public static void write(HttpServletResponse response,String contenttype_mime,byte[] info) throws IOException{
		//HttpServletResponse response = getCometEvent().getHttpServletResponse();
		if(contenttype_mime!=null)
		response.setContentType(contenttype_mime); 
		BufferedOutputStream output = new BufferedOutputStream(response.getOutputStream());
		output.write(info);
//		PrintWriter out = response.getWriter();
//		out.println(info);
//		out.flush();
		response.flushBuffer();
		output.close();
		response.getOutputStream().close();
//		out.close();
		
	}
	

	
	
	
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
//http://localhost:8080/test/index.jsp  ->  localhost
	public static String getServerName(HttpServletRequest request){
		return request.getServerName();
	}
	
	
	//finger
	
    
}
