package khh.web.framework.commet;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import khh.web.framework.commet.longpolling.Gun;
import khh.web.jsp.db.util.ConnectionWebUtil;


public class GunScript extends Gun {
	int i=0;
	@Override
	public Object trigger() throws Exception {
		//scott
		Connection c = ConnectionWebUtil.getConnectionByJNDI("jdbc/webutil");
		while(true){
			Object o = null;
			try {
				Thread.sleep(getInterval());
				Statement smt = c.createStatement();
				ResultSet rs = smt.executeQuery("select max(seq) maxseq from SCRIPT");
				int getmax=i;
				while (rs.next()) {
					 getmax = rs.getInt("maxseq");
				}
				rs.close();
				
				if(getmax>i){
					i=getmax;
					
					rs = smt.executeQuery("select script from SCRIPT where seq="+i);
					while (rs.next()) {
						 String script = rs.getString("script");
						 return script;
					}
				}
				
				
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
