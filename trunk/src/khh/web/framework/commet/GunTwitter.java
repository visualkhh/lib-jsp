package khh.web.framework.commet;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import khh.web.framework.commet.longpolling.Gun;
import khh.web.jsp.db.util.ConnectionWebUtil;


public class GunTwitter extends Gun {
	public static BlockingQueue<String> messages = new LinkedBlockingQueue<String>();
	@Override
	public Object trigger() throws Exception {
		String message ="  "+messages.take()+"     "+messages.size() +"        GunTwitter ";
		System.out.println(message);
		return message;
	}
}
