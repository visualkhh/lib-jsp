package khh.web.jsp.tag.custom;

import javax.servlet.jsp.tagext.SimpleTagSupport;

public class DefaultCustom extends SimpleTagSupport{
	public static Integer plus(Integer x, Integer y) {
		return x + y;
	}

	public static Integer times(Integer x, Integer y) {
		return x * y;
	}

}
