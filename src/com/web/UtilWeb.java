package com.web;

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
		//HttpServletResponse response = getCometEvent().getHttpServletResponse();
		PrintWriter out = response.getWriter();
		out.println(info);
		out.flush();
		response.flushBuffer();
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
	
	
	
	//finger

	public static void forword(HttpServletRequest request, HttpServletResponse response,String path) throws ServletException, IOException{
		 request.getRequestDispatcher(path).forward(request, response); 
	}
	
	//cookie
	/**
	 * 지정된 키값에 대한 쿠키의 값을 꺼내 온다
	 *
	 * @param request HttpServletRequest
	 * @param cookieName 가져올 쿠키의 이름
	 * @return String 지정된 쿠키의 값
	 */
	public static String getCookie(HttpServletRequest request, String cookieName) 
		throws Exception {

		Cookie [] cookies = request.getCookies();
		if (cookies == null) return "";
		String value = "";
		for(int i=0 ; i < cookies.length ; i++) {
			if(cookieName.equals(cookies[i].getName())) {
				value = URLDecoder.decode(cookies[i].getValue(), "euc-kr");
				break;
			}
		}
		return value;
	}


	/**
	 * 설정된 쿠키의 전체값을 꺼내 온다
	 *
	 * @param request HttpServletRequest
	 * @return String 쿠키의 값
	 */
    public static String getCookieString(HttpServletRequest request) 
		throws Exception {

        Cookie[] cookies = request.getCookies();
        if(cookies == null || cookies.length==0)return "";
        
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < cookies.length; i++) {
            buffer.append(cookies[i].getName()).append("=").append(cookies[i].getValue()).append("&");
        }
        String rtnValue = buffer.toString();
        if(rtnValue.endsWith("&"))
        	rtnValue = rtnValue.substring(0,rtnValue.length()-1);
        
        return rtnValue;
    	
    }


	/**
	 * 쿠키 값을 추가한다.
	 *
	 * @param    HttpServletRequest
	 * @param    저장할 쿠키 이름
	 * @param    저장할 쿠키 값
	 */
    public static void addCookie(
		HttpServletResponse response, String cookieName, String cookieValue)
		throws Exception {

        if (cookieName != null && cookieValue != null) {
            Cookie cookie = new Cookie(cookieName,cookieValue);
			/* must call addCookie method before calling getWriter */
            response.addCookie(cookie);     
        }
    }


	/**
	* 쿠키를 생성한다.만든다
	*
	* @param response HttpServletResponse
	* @param name 쿠키의 이름
	* @param value 쿠키의 값
	* @param iMinute 쿠키가 유효할 시간(분단위)
	*/
	public static void setCookie(
		HttpServletResponse response, String name, String value, int iMinute)
		throws Exception {

		value = java.net.URLEncoder.encode(value, "euc-kr");
		Cookie cookie = new Cookie(name, value);
		cookie.setMaxAge(60 * iMinute);
		cookie.setPath("/");
		response.addCookie(cookie);
	}


	/**
	 * 쿠키를 만든다. 기본 유효 시간은 15일 이다.
	 *
	 * @param response HttpServletResponse
	 * @param name 쿠키의 이름
	 * @param value 쿠키의 값
	 */
	public static void setCookie(
		HttpServletResponse response, String name, String value) 
		throws Exception {

		setCookie(response, name, value, (60*24*15) );
	}
	
	
	
	 /**
     * <p>지정된 요청 헤더값을 얻음.</p>
	 *
     * @param	요청 객체.
     * @param	값을 찾을 헤더값.
     * @return	지정한 헤더에 대한 값.
     */
    public static String findHeader(HttpServletRequest request, String header) {

        // underscore w/allCap
        String headerValue = request.getHeader(header);
        if (headerValue == null) {
            // underscore w/ title case
            header = headerToTitleCase(header.toLowerCase()); 
            headerValue = request.getHeader(header);
            if (headerValue == null) {           
                // dash w/ title case
                header = StringUtil.replaceAll(header,"_", "-"); 
                headerValue = request.getHeader(header);
                if (headerValue == null) {
                    // dash w/ all caps
                    header = header.toUpperCase(); 
                    headerValue = request.getHeader(header);
                    if (headerValue == null) {
                        // dash w/ all lower
                        header = header.toLowerCase(); 
                        headerValue = request.getHeader(header);
                        if (headerValue == null) {
                            // underscore w/ all lower
                            header = StringUtil.replaceAll(header,"-", "_"); 
                            headerValue = request.getHeader(header);
                        }
                    }
                }
            }
        }
        return headerValue;
    }


    /**
     * Special implemenation - just for request headers.  Capitalizes
     * the first letter of each word.  Depends on words being
     * separated with "_" or "-".  
     * doesn't properly check header name string indices.
     *
     * @param header The HTTP header string to capitalize the distinct
     * words of.
     * @return The modified value of the header.
     */
    public static String headerToTitleCase(String header) {

        int underscoreLoc = header.indexOf("_");
        if (underscoreLoc == -1) underscoreLoc = header.indexOf("-");
        String firstChar = header.substring(0, 1).toUpperCase();

        if (underscoreLoc != -1) {
            String secondChar =
                header.substring(underscoreLoc + 1, underscoreLoc + 2)
                .toUpperCase();
            header = firstChar + header.substring(1, underscoreLoc + 1) +
                secondChar + header.substring(underscoreLoc+2);
        }
        else {
            header = firstChar + header.substring(1);
        }
        return header;
    }
    
}
