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
	
	
	
	public DBTerminalResovler(ConnectionCreator_I connectioncreator) {
//		super(connectioncreator);
		this.connectioncreator = connectioncreator;
		log.debug("DBTerminalResovler  "+connectioncreator);
		
	}
	
	public void setServletConfig(ServletConfig servletConfig) {
		this.servletConfig = servletConfig;
		log.debug("DBTerminalResovler setServletConfig  "+servletConfig);
	}
	public ServletConfig getServletConfig() {
		log.debug("DBTerminalResovler getServletConfig  "+servletConfig);
		return servletConfig;
	}
	
	public void init(String configPath){
		log.debug("DBTerminalResovler init : "+configPath);
		DBTerminal.addConfigfile(getServletConfig().getServletContext().getRealPath(configPath));
		//db.addConfigfile(getServletConfig().getServletContext().getRealPath(configPath));
	}
	
	
	public DBTerminal getDBTerminal(){
		return new DBTerminal(this.connectioncreator);
	}
	
}
