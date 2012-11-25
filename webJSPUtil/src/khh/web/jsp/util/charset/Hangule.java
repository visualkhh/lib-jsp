package khh.web.jsp.util.charset;
/*********************************************************************
 * SYSTEM            : 도서 전력시설 운영관리 시스템
 * PROGRAM ID        : yt.common.util
 * PROGRAM NAME      : Hangule.java
 * DESCRIPTION       : 한글처리 클래스
 * PROGRAMMER        : 
 * PROGRAM DATE      : 
 * UPDATE HISTORY
 *    2002-02-04
 *    2002-03-04 : toHangule(Stirng str, String encoding) 추가
 *    2002-03-30 : 메소드의 예외처리 추가
 ********************************************************************/


import java.io.UnsupportedEncodingException;

/**
 * jsp 와 DB 간의 문자셋 전환 class
 * DB 에서 select 해올 때는 toHangule() 로 "EUC-KR" 로 전환하고
 * DB 로 insert, update 할 때는 fromHangule() 로 "ISO-8859-1" 로 전환한다.
 *
 * @version 1.3, 03/30/02
 * @version 1.2, 03/04/02
 * @version 1.1, 02/04/02
 * @since   PWSITE_Common_Class 1.6.0
 */
public class Hangule{
	/**
	 * 한글 문자셋으로 전환한다. 만일 지원하지 않거나 null 이면 null 를 반환한다.
	 *
	 * @param str  한글로 처리될 String
	 * @return String 한글로 처리된 String
	 */
	public static String toHangule(String str){
		try{
			String new_str = new String(str.getBytes("8859_1"),"EUC-KR");
			return new_str;
		}catch(UnsupportedEncodingException e){
			return null;
		}catch(Exception e){
			return null;
    }
	}

	/**
	 * 한글 문자셋으로 전환한다. 만일 지원하지 않거나 null 이면 null 를 반환한다.
   * 문자셋이 "ISO-8859-1" 인 경우 "EUC-KR" 로 인코딩하고 그 외는 현 문자셋으로 반환하다.
	 *
	 * @param str  한글로 처리될 String
	 * @param charset  문자셋
	 * @return String 한글로 처리된 String
	 */
	public static String toHangule(String str, String charset){
		try{
      if(charset.equalsIgnoreCase("ISO-8859-1")){return new String(str.getBytes("8859_1"),"EUC-KR");}
      if(charset.equalsIgnoreCase("8859_1")){return new String(str.getBytes("8859_1"),"EUC-KR");}
			return str;
		}catch(UnsupportedEncodingException e){
			return null;
		}catch(Exception e){
			return null;
    }
	}

	/**
	 * 한글을 Latin-1 문자셋으로 전환한다. 만일 지원하지 않거나 null 이면 null 를 반환한다.
	 *
	 * @param str Latin-1 문자셋으로 처리될 String
	 * @return String Latin-1 문자셋으로 처리된 String
	 */
	public static String fromHangule(String str){
		try{
			String new_str = new String(str.getBytes("EUC-KR"),"8859_1");
			return new_str;
		}catch(UnsupportedEncodingException e){
			return null;
		}catch(Exception e){
			return null;
    }
	}
}
