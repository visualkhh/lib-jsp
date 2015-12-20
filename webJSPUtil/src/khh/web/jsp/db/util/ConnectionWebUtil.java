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
		
		
		
		
		/*
			1. server.xml
			1.1. GlobalNamingResources에 JDBC Resource 추가하기
			<GlobalNamingResources>
			
			        <Resource name="jdbc/TestDB"
			            auth="Container" 
			            type="javax.sql.DataSource"
			            factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
			            maxActive="30"
			            minIdle="30"
			            maxWait="10000"
			            initialSize="10"
			            validationQuery="SELECT 1 FROM dual"
			            driverClassName="com.mysql.jdbc.Driver"
			            defaultAutoCommit="true"
			            username="test"
			            password="test"
			            url="jdbc:mysql://127.0.0.1:3316/testDB" />
			
			</GlobalNamingResources>
			
			1.2. Context 추가하여 리소스 링크 설정
			<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">
			
			<Context docBase="test" path="/test" reloadable="true" >
			   <ResourceLink global="jdbc/TestDB" name="jdbc/TestDB" type="javax.sql.DataSource" />
			</Context>
			
			</Host>
			
			2. web.xml
			  <resource-ref>
			      <description>DB Connection</description>
			      <res-ref-name>jdbc/TestDB</res-ref-name>
			      <res-type>javax.sql.DataSource</res-type>
			      <res-auth>Container</res-auth>
			  </resource-ref>

		 */
	}
	
	
	
	
	
	
}
