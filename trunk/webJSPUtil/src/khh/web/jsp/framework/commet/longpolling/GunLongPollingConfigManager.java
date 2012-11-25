package khh.web.jsp.framework.commet.longpolling;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.util.ArrayList;

import javax.servlet.ServletConfig;

import khh.db.connection.ConnectionCreator_I;
import khh.db.connection.pool.ConnectionMultiPool;
import khh.db.terminal.DBTerminal;
import khh.debug.LogK;
import khh.reflection.ReflectionUtil;
import khh.std.adapter.Adapter_Std;
import khh.web.jsp.db.util.ConnectionWebUtil;
import khh.xml.XMLparser;

import org.apache.catalina.CometEvent;

public class GunLongPollingConfigManager {
	private Adapter_Std<String,File> configlist=null;
	private Adapter_Std<CometEvent,Function> pairlist=null;
	private ArrayList<Gun> gunlist=null;
	private Adapter_Std<String,View> viewlist=null;
	private ArrayList<Function> functionlist=null;
	private LogK log = LogK.getInstance();
	
	private ConnectionMultiPool dbpool = ConnectionMultiPool.getInstance(); 
	
	private static GunLongPollingConfigManager instance=null;
   synchronized static public GunLongPollingConfigManager getInstance(){
        if(instance==null)
            instance = new GunLongPollingConfigManager();
        return instance;
    }
   
	//private ExecutorService executor = null;
	private GunLongPollingConfigManager(){
		configlist				= new Adapter_Std<String,File>();
		gunlist					= new ArrayList<Gun>();
		viewlist				= new Adapter_Std<String,View>();
		functionlist			= new ArrayList<Function>();
		pairlist 				= new Adapter_Std<CometEvent,Function> ();
		
		//executor				=	Executors.newFixedThreadPool(10);
	}
	
	
	public void setting() {
		if(configlist!=null && configlist.size()>0){
//			this.configRealPath = configRealPath;
			setConfig();
			setFunction();
		}
	}



	private void setFunction() {
	}


	public void addConfigFile(String realpath) throws Exception{
		if(realpath!=null){
			//log.debug("addConfigFile : "+realpath);
			addConfigFile(new File(realpath));
		}
	}
	public void addConfigFile(File file) throws Exception{
		if(file!=null && file.exists() && file.isFile()){
//			System.out.println("LongPollingGunManager addConfig "+file.getAbsolutePath());
			configlist.add(file.getAbsolutePath(),file);
		}
	}
	
	public void addPairFunction(CometEvent cometEvent, Function function) throws Exception{
		if(function!=null&&function.isPair())
		pairlist.add(cometEvent, function);
	}
	public void removePairFunction(CometEvent cometEvent) throws Exception{
			pairlist.remove(cometEvent);
	}
	public Function getPairFunction(CometEvent cometEvent) throws Exception{
			return pairlist.get(cometEvent);
	}
	public Adapter_Std<CometEvent,Function> getPairFunctionList() throws Exception{
		return pairlist;
	}
	



	private String jndixpath="/shot/db/jndi";
	private String jndisqlmapxpath="/shot/db/jndi/sqlmap";
	private String gunxpath="/shot/gun";
	private String functionxpath="/shot/function";
	private String viewpath="/shot/views/view";
	private void setConfig() {
		
		//global settingConfig
		for (int i = 0; i < configlist.size(); i++) {
			try{
				log.debug("configlist global "+configlist.size()+"    ["+i+"]");
				XMLparser parser = new XMLparser(configlist.get(i));
				
				//global db
				int jndisize = parser.getInt("count("+jndixpath+")");
				log.debug("outer JNDI size : "+jndisize+" path:"+jndixpath);
				for (int j = 1; j <= jndisize; j++) {
					String contextpath	=	jndixpath+"["+j+"]";
					String id  			=	parser.getString(contextpath+"/@id");
					final String name 	=	parser.getString(contextpath+"/@name");
					Integer maxsize 	=	parser.getInt(contextpath+"/@maxsize");
					log.debug("outer JNDI id:"+id+" name: "+name+"   db/jndi["+j+"]   maxsize:"+maxsize);
					dbpool.addConnectionCreator(id, new ConnectionCreator_I() {
						public Connection getMakeConnection() throws Exception {
							return ConnectionWebUtil.getConnectionByJNDI(name);
						}
					}, maxsize==null?50:maxsize); 
					
					
				}
				
				//global  jndisqlmap
				int jndisqlmapsize = parser.getInt("count("+jndisqlmapxpath+")");
				log.debug("outer JNDI sqlmap size : "+jndisqlmapsize+" path:"+jndisqlmapxpath);
				for (int j = 1; j <= jndisqlmapsize; j++) {
					String contextpath	=	jndisqlmapxpath+"["+j+"]";
					final String resource 	=	parser.getString(contextpath+"/@resource");
					log.debug("outer JNDI sqlmap  resource:"+resource);
					DBTerminal.addConfigfile(getServletConfig().getServletContext().getRealPath(resource));
				}
				
				
				
				
				
				
				
				
				
				
				//global gun
				int gunsize = parser.getInt("count("+gunxpath+")");
				log.debug("outer GUN size : "+gunsize);
				for (int j = 1; j <= gunsize; j++) {
					String contextpath	=	gunxpath+"["+j+"]";
					String id  			=	parser.getString(contextpath+"/@id");
					String classpath 	=	parser.getString(contextpath+"/@class");
					Boolean pair 		=	parser.getBoolean(contextpath+"/@pair");
					int interval 		=	parser.getInt(contextpath+"/@interval");
					Gun gun 			=	(Gun) ReflectionUtil.newClass(classpath);
					gun.setNodeid(id);
					gun.setClasspath(classpath);
					gun.setInterval(interval);
					gun.setPair(pair==null?false:pair);
					log.debug("outer "+gun.getNodeid()+" GUN["+j+"]  pair : "+gun.isPair());
					gunlist.add(gun);
				}
				
				
				//global view
				int viewsize = parser.getInt("count("+viewpath+")");
				log.debug("outer VIEW size : "+viewsize);
				for (int j = 1; j <= viewsize; j++) {
					String contextpath	=	viewpath+"["+j+"]";
					String id  			=	parser.getString(contextpath+"/@id");
					String path 		=	parser.getString(contextpath+"/@path");
					View view 			=	new View();
					view.setNodeid(id);
					view.setPath(path);
					log.debug("outer view id:"+view.getNodeid()+" VIEW["+j+"]  PATH : "+view.getPath());
					viewlist.add(id,view);
				}
				
				
				
				
				
				//global function
				int functionsize = parser.getInt("count("+functionxpath+")");
				log.debug("FUNCTION size : "+functionsize);
				for (int j = 1; j <= functionsize; j++) {
					String contextpath	=	functionxpath+"["+j+"]";
					String gunpath		=	functionxpath+"["+j+"]/gun";
					String id			=	parser.getString(contextpath+"/@id");
					String classpath	=	parser.getString(contextpath+"/@class");
					Boolean pair		=	parser.getBoolean(contextpath+"/@pair");
					Boolean broadcast	=	parser.getBoolean(contextpath+"/@broadcast");
					int subgunsize		=	parser.getInt("count("+gunpath+")");
					
					Function fnc 		=	(Function) ReflectionUtil.newClass(classpath);
					fnc.setNodeid(id);
					fnc.setClasspath(classpath);
					fnc.setPair(pair==null?false:pair);
					fnc.setBroadcast(broadcast==null?false:broadcast);
//					System.out.println("config  :  "+fnc.getNodeid()+"      "+fnc.isPair());
					log.debug("function id(url):"+fnc.getNodeid()+"    pair:"+fnc.isPair()+"  broadcast:"+fnc.isBroadcast()+"    GUNsize : "+subgunsize);
					for (int k = 1; k <= subgunsize; k++) {
						String gun_ref  =  parser.getString(gunpath+"["+k+"]/@ref");
						Gun gun=null;
						if(gun_ref==null){
							String gunid  =  parser.getString(gunpath+"["+k+"]/@id");
							String gunclasspath = parser.getString(gunpath+"["+k+"]/@class");
							int guninterval = parser.getInt(gunpath+"["+k+"]/@interval");
							Boolean gunpair = parser.getBoolean(gunpath+"["+k+"]/@pair");
							gun = (Gun) ReflectionUtil.newClass(gunclasspath);
							gun.setNodeid(gunid);
							//gun.setPair(pair==null?false:gunpair);//의심.
							gun.setPair(gunpair==null?false:gunpair);
							gun.setClasspath(gunclasspath);
							gun.setInterval(guninterval);
							log.debug(gun.getNodeid()+" GUN["+k+"]  pair : "+gun.isPair());
							gunlist.add(gun);
						}else{
							for (int x = 0; x < gunlist.size(); x++) {
								if(gunlist.get(x).getNodeid().equals(gun_ref) || gunlist.get(x).getNodeid()==gun_ref){
									gun = gunlist.get(x);
									break;
								}
							}
						}
//						System.out.println(gun+"    "+gunpath+"["+k+"]/@ref"+"      "+parser.getString(gunpath+"["+k+"]/@ref"));
						if(gun!=null)
						fnc.addGun(gun);
					}
					
					functionlist.add(fnc);
				}
				
				
			}catch (Exception e) {
				try {
					log.error("ConfigFile Error "+configlist.get(i).getAbsolutePath(),e);
				} catch (Exception e1) {
					e1.printStackTrace();
				}
				//e.printStackTrace();
			}
		}
		
		
		
		
//		DBTerminal.reload(); setConfig 하면 자동 reload
		
		
		
		
		
		
		
		
		
		//private		이거왜넣은거지....
//		for (int i = 0; i < configlist.size(); i++) {
//			try{
//				log.debug("configlist private "+configlist.size()+"    ["+i+"]");
//				XMLparser parser = new XMLparser(configlist.get(i));
//				//function
//				int functionsize = parser.getInt("count("+functionxpath+")");
//				log.debug("FUNCTION size : "+functionsize);
//				for (int j = 1; j <= functionsize; j++) {
//					String contextpath	=	functionxpath+"["+j+"]";
//					String gunpath		=	functionxpath+"["+j+"]/gun";
//					String id			=	parser.getString(contextpath+"/@id");
//					String classpath	=	parser.getString(contextpath+"/@class");
//					Boolean pair		=	parser.getBoolean(contextpath+"/@pair");
//					Boolean broadcast	=	parser.getBoolean(contextpath+"/@broadcast");
//					int subgunsize		=	parser.getInt("count("+gunpath+")");
//					
//					Function fnc 		=	(Function) ReflectionUtil.newClass(classpath);
//					fnc.setNodeid(id);
//					fnc.setClasspath(classpath);
//					fnc.setPair(pair==null?false:pair);
//					fnc.setBroadcast(broadcast==null?false:broadcast);
////					System.out.println("config  :  "+fnc.getNodeid()+"      "+fnc.isPair());
//					log.debug(fnc.getNodeid()+" FUNCTION   pair:"+fnc.isPair()+"  broadcast:"+fnc.isBroadcast()+"    GUNsize : "+subgunsize);
//					for (int k = 1; k <= subgunsize; k++) {
//						String gun_ref  =  parser.getString(gunpath+"["+k+"]/@ref");
//						Gun gun=null;
//						if(gun_ref==null){
//							String gunid  =  parser.getString(gunpath+"["+k+"]/@id");
//							String gunclasspath = parser.getString(gunpath+"["+k+"]/@class");
//							int guninterval = parser.getInt(gunpath+"["+k+"]/@interval");
//							Boolean gunpair = parser.getBoolean(gunpath+"["+k+"]/@pair");
//							gun = (Gun) ReflectionUtil.newClass(gunclasspath);
//							gun.setNodeid(gunid);
//							//gun.setPair(pair==null?false:gunpair);//의심.
//							gun.setPair(gunpair==null?false:gunpair);
//							gun.setClasspath(gunclasspath);
//							gun.setInterval(guninterval);
//							log.debug(gun.getNodeid()+" GUN["+k+"]  pair : "+gun.isPair());
//							gunlist.add(gun);
//						}else{
//							for (int x = 0; x < gunlist.size(); x++) {
//								if(gunlist.get(x).getNodeid().equals(gun_ref) || gunlist.get(x).getNodeid()==gun_ref){
//									gun = gunlist.get(x);
//									break;
//								}
//							}
//						}
////						System.out.println(gun+"    "+gunpath+"["+k+"]/@ref"+"      "+parser.getString(gunpath+"["+k+"]/@ref"));
//						if(gun!=null)
//						fnc.addGun(gun);
//					}
//					
//					functionlist.add(fnc);
//				}
//			}catch (Exception e) {
//				try {
//					log.error("ConfigFile Error "+configlist.get(i).getAbsolutePath(),e);
//				} catch (Exception e1) {
//					e1.printStackTrace();
//				}
//				//e.printStackTrace();
//			}
//		}
		
		
		
		
		
		
	}
	
	
	
	
	
	public ArrayList<Function> getFunctionlist() {
		return functionlist;
	}
	public Function getFunction(String fncid)  {
		
		ArrayList<Function> functionlist = getFunctionlist();
		Function fnc = null;
		for (int i = 0; i < functionlist.size(); i++) {
			Function atFnc=  functionlist.get(i);
			if(atFnc.getNodeid().equals(fncid) || atFnc.getNodeid()==fncid){
				fnc = atFnc;
				break;
			}
		}
//		System.out.println("getFunction id : "+fncid+"       "+fnc.getId()+"    "+fnc.isPair());
		return fnc;
	}



	public ArrayList<Gun> getGunlist() {
		return gunlist;
	}


	public Adapter_Std<String,View> getViewlist() {
		return viewlist;
	}


	public void start() {
		try {
			ArrayList<Function> functionlist = getFunctionlist();
			for (int i = 0; i < functionlist.size(); i++) {
				Function fnc = functionlist.get(i);
				if(fnc.isPair()){
					continue;
				}
//				FunctionTask task = new FunctionTask();
//				task.setFunction(fnc);
				fnc.start();
			}
			
			
			
			ArrayList<Gun> gunlist = getGunlist();
			for (int i = 0; i < gunlist.size(); i++) {
				Gun gun = gunlist.get(i);
				if(gun.isPair()){
					continue;
				}
//				GunTask task = new GunTask();
//				task.setGun(gunlist.get(i));
//				task.start();
				gun.start();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//페어를 이루는 펑션을 만든다.  파라미터추가되면...여기도.
	public Function newPairFunction(CometEvent event, Function function) throws SecurityException, IllegalArgumentException, NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException{
		if(function.isPair()){
			Function newfnc = (Function) ReflectionUtil.newClass(function.getClasspath());
			newfnc.setNodeid(function.getNodeid());
			newfnc.setPair(function.isPair());
			newfnc.setClasspath(function.getClasspath());
			newfnc.setBroadcast(function.isBroadcast());
			log.debug("new Function pair!!!   "+function.getNodeid()+ "    "+function.toString()+"    "+newfnc.toString()+"      "+newfnc.isPair());
			//System.out.println("new Function pair!!!   "+function.getNodeid()+ "    "+function.toString()+"    "+newfnc.toString()+"      "+newfnc.isPair());
			ArrayList<Gun> gunlist = function.getGunlist();
			for (int i = 0; i < gunlist.size(); i++) {
				Gun gun = gunlist.get(i);
				if(gun.isPair()){  //pair가 아닌거는 이미 쓰레드돌아가니깐 pair인것만 쓰레드.
					Gun newgun =  (Gun) ReflectionUtil.newClass(gun.getClasspath());
					newgun.setNodeid(gun.getNodeid());
					newgun.setPair(gun.isPair());
					newgun.setClasspath(gun.getClasspath());
					newgun.setInterval(gun.getInterval());
					log.debug("new Gun pair!!!   "+gun.getNodeid()+ "    "+gun.toString()+"    "+newgun.toString()+"       "+newgun.isPair());
					//System.out.println("new Gun pair!!!   "+gun.getNodeid()+ "    "+gun.toString()+"    "+newgun.toString()+"       "+newgun.isPair());
					gun = newgun;
//					GunTask task = new GunTask();
//					task.setGun(gun);
//					task.start();
					gun.start();
				}
				newfnc.addGun(gun);
			}
			
			log.debug("new fnc gun  "+newfnc.getNodeid()+"      "+newfnc.getGunlist().size());
			//System.out.println("new fnc gun  "+newfnc.getNodeid()+"      "+newfnc.getGunlist().size());
//			FunctionTask fnctask = new FunctionTask();
//			fnctask.setFunction(newfnc);
//			fnctask.start();
			newfnc.start();
			try {
				addPairFunction(event, newfnc);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return newfnc;
		}
		return null;
		
	}

	private ServletConfig servletConfig =null;
//	private String servletContextRealPath=null;
//	public String getServletContextRealPath() {
//		return servletContextRealPath;
//	}
//	public void setServletContextRealPath(String servletContextRealPath) {
//		this.servletContextRealPath = servletContextRealPath;
//	}


	public ServletConfig getServletConfig() {
		return servletConfig;
	}
	public void setServletConfig(ServletConfig servletConfig) {
		this.servletConfig = servletConfig;
	}
	
	
	
	
}
