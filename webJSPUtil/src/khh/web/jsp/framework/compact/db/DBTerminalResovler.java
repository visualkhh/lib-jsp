package khh.web.jsp.framework.compact.db;

import java.util.ArrayList;

import javax.servlet.ServletConfig;

import org.w3c.dom.Document;

import khh.db.connection.ConnectionCreator_I;
import khh.db.terminal.DBTerminal;
import khh.db.terminal.resultset.DBTResultSetContainer;
import khh.debug.LogK;
import khh.std.adapter.AdapterMapBase;

public class DBTerminalResovler {
	private LogK log = LogK.getInstance();
	private ServletConfig servletConfig = null;
	private ConnectionCreator_I connectioncreator = null;
	private String configPath=null;
	
	
	public DBTerminalResovler(ConnectionCreator_I connectioncreator) {
//		super(connectioncreator);
		this.connectioncreator = connectioncreator;
		log.debug("DBTerminalResovler  "+connectioncreator);
		
	}
	
	public DBTerminalResovler(ServletConfig servletConfig,String configPath,ConnectionCreator_I connectioncreator) {
		this.connectioncreator = connectioncreator;
		this.servletConfig=servletConfig;
		this.configPath=configPath;
		log.debug("DBTerminalResovler  "+connectioncreator+"   "+configPath+"  "+connectioncreator);
		init();
		
	}
	

	
	public void init(){
		log.debug("DBTerminalResovler init : "+configPath);
		DBTerminal.addConfigfile(getServletConfig().getServletContext().getRealPath(getConfigPath()));
		//db.addConfigfile(getServletConfig().getServletContext().getRealPath(configPath));
	}
	
	
	
	
	public ServletConfig getServletConfig() {
		return servletConfig;
	}

	public ConnectionCreator_I getConnectioncreator() {
		return connectioncreator;
	}

	public String getConfigPath() {
		return configPath;
	}

	public DBTerminal getDBTerminal(){
		return new DBTerminal(this.connectioncreator);
	}
	
}
