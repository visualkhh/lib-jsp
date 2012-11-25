package khh.web.jsp.db.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class ConnectionWebUtil {

	
	public static Connection getConnectionByJNDI(String name) throws NamingException, SQLException{
		//name   = "jdbc/dcweb"; 
		
		Context  ctx = new InitialContext();
		DataSource ds = (DataSource)ctx.lookup("java:comp/env/"+name);
		return ds.getConnection();
		
		
		/*Context initCtx = new InitialContext();
		Context envCtx = (Context) initCtx.lookup("java:comp/env");
		DataSource ds = (DataSource) envCtx.lookup(name);
		return ds.getConnection();
		*/

		
		
//		<Context docBase="webJSPUtil" path="/webJSPUtil" reloadable="true" source="org.eclipse.jst.jee.server:webJSPUtil">
//	      <Resource auth="Container" driverClassName="oracle.jdbc.driver.OracleDriver" maxActive="100" maxIdle="30" maxWait="10000" name="jdbc/oracle" password="distadmin" type="javax.sql.DataSource" url="jdbc:oracle:thin:@l10.200.34.206:1521:DEVORA" username="distadmin" />
//	      </Context>
		
		
		
		//mysql default port is 3306.
		/*<Context path="/dvdlib" docBase="dvdlib"       debug="5" reloadable="true" crossContext="true">
	       
	    <Resource name="jdbc/<alias>" 
	       auth="Container"
	       type="javax.sql.DataSource"
	       maxActive="100" 
	       maxIdle="30" 
	       maxWait="10000"
	       username="dvdlib"
	       driverClassName="com.mysql.jdbc.Driver"
	       url="jdbc:mysql://<server>:<port>/<database>?autoReconnect=true"/>
	         
	 </Context>*/
		
		
	}
	
	
	
	
	
	
}
