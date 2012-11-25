package myclasses;

public class StringUtil {
	public static String toHangul(String str) {
		String value = null;
		if (str == null)
			return null;
		try {
			value = new String(str.getBytes("8859_1"), "KSC5601");
		} catch (java.io.UnsupportedEncodingException e) {
			System.err.println(e);
		}
		return value;
	}

	public static String toEng(String str) {
		String value = null;
		if (str == null)
			return null;
		try {
			value = new String(str.getBytes("KSC5601"), "8859_1");
		} catch (java.io.UnsupportedEncodingException e) {
			System.err.println(e);
		}
		return value;
	}
}