package com.web;

import khh.web.jsp.framework.commet.longpolling.Gun;

public class BoardCastH extends Gun {
	@Override
	public Object trigger() throws Exception {
		String message ="alert('boardcast');";
		return message;
	}
}
