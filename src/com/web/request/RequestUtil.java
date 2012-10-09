package com.web.request;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import khh.std.adapter.Adapter_Std;
import khh.string.util.StringUtil;

public class RequestUtil {
	public static void forword(HttpServletRequest request, HttpServletResponse response,String path) throws ServletException, IOException{
		 request.getRequestDispatcher(path).forward(request, response); 
	}
	
public static Adapter_Std<String, Object> getParameters(HttpServletRequest request) throws Exception{
	 Adapter_Std<String, Object> adapter = new Adapter_Std<String, Object>();
	 	Map map  = request.getParameterMap();
	 	Set keyset = map.keySet();
	 	Iterator i = keyset.iterator();
	 	while(i.hasNext()){
			Object key 		= i.next();
			Object[] value  	= (Object[]) map.get(key);
			adapter.add((String)key, (value)[0] );
		}
	return adapter;
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
