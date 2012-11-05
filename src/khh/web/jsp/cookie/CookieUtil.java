package khh.web.jsp.cookie;

import java.net.URLDecoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtil {
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
	* @param Second 쿠키가 유효할 시간(초단위)
	*/
	public static void setCookie(
		HttpServletResponse response, String name, String value, int second)
		throws Exception {

		if(value!=null)
		value = java.net.URLEncoder.encode(value, "euc-kr");
		Cookie cookie = new Cookie(name, value);
		//cookie.setMaxAge(60 * iMinute);
		cookie.setMaxAge(second);
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
	/*public static void setCookie(
		HttpServletResponse response, String name, String value) 
		throws Exception {

		setCookie(response, name, value, (60*60*24*15) );
	}*/
	
	
	public static void delCookie(
			HttpServletResponse response, String name)
			throws Exception {
		setCookie(response, name, null, (0) );
		}
	
	
}
