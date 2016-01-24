package khh.web.jsp.framework.fluid;

import java.io.File;
import java.util.ArrayList;

import javax.servlet.ServletConfig;

import khh.conversion.util.ConversionUtil;
import khh.debug.LogK;
import khh.std.adapter.AdapterMap;
import khh.xml.XMLparser;

public class FluidConfigManager {
	private AdapterMap<String,File> configfile			= null;
	private AdapterMap<String,Template> templatelist	= null;
	private ArrayList<Bypass> bypasslist			= null;
	private LogK log = LogK.getInstance();
	private ServletConfig servletConfig 				= null;
	
//	private static FluidConfigManager instance			= null;
//	synchronized static public FluidConfigManager getInstance() {
//		if (instance == null)
//			instance = new FluidConfigManager();
//		return instance;
//	}

	public FluidConfigManager() {
		configfile = new AdapterMap<String, File>();
		templatelist = new AdapterMap<String, Template>();
		bypasslist = new ArrayList<Bypass>();
	}

	public void setting() {
		if (configfile != null && configfile.size() > 0) {
			setConfig();
		}
	}

	public void addConfigFile(String realpath) throws Exception {
		if (realpath != null) {
			addConfigFile(new File(realpath));
		}
	}

	public void addConfigFile(File file) throws Exception {
		if (file != null && file.exists() && file.isFile()) {
			configfile.add(file.getAbsolutePath(), file);
		}
	}

	private void setConfig() {
        String templatepath="//template";
        String bypasspath="//bypass/url";
        for (int i = 0; i < configfile.size(); i++) {
            XMLparser parser = null;
            try {
                parser = new XMLparser((File) configfile.get(i));
                log.debug("Fluid: ConfigFilePath : "+configfile.get(i));
                
                //bypass
                Integer bypasscnt = parser.getInt("count("+bypasspath+")");
                log.debug("templatecnt : "+bypasscnt);
                bypasscnt = bypasscnt==null?0:bypasscnt;
                for(int j = 1; j <= bypasscnt; j++) {
                	Bypass b = new Bypass();
                	b.setPattern(parser.getString(bypasspath+"["+j+"]/@pattern"));
                	b.setForward(parser.getString(bypasspath+"["+j+"]/@forward"));
                	bypasslist.add(b);
                }     
                
                
                //template
                Integer templatecnt = parser.getInt("count("+templatepath+")");
                templatecnt = templatecnt==null?0:templatecnt;
                log.debug("templatecnt : "+templatecnt);
                
                for(int j = 1; j <= templatecnt; j++) {
                    Template template = new Template();
                    
                    template.setNodeid(parser.getString(templatepath+"["+j+"]/@id"));
                    template.setValue(parser.getString(templatepath+"["+j+"]/@value"));
                    Boolean tb = parser.getBoolean(templatepath+"["+j+"]/@enable");
                    template.setEnable(tb==null?true:tb);
                    template.setExtends(parser.getString(templatepath+"["+j+"]/@extends"));
                    
                    log.debug("Fluid: Template Id : "+template.getNodeid()+"  extends : "+template.getExtends());
                    
                    
                    String viewpath=templatepath+"["+j+"]/view";
                    Integer viewcnt = parser.getInt("count("+viewpath+")");
                    viewcnt = viewcnt==null?0:viewcnt;
                    for(int s = 1; s <= viewcnt; s++) {
                    	View view = new View() ;
                    	view.setNodeid(parser.getString(viewpath+"["+s+"]/@id"));
                    	view.setValue(parser.getString(viewpath+"["+s+"]/@value"));
                    	Boolean b = parser.getBoolean(viewpath+"["+s+"]/@enable");
                    	view.setEnable(b==null?true:b);
                    	template.addView(view.getNodeid(),view);
                    }
                    
                    templatelist.add(template.getNodeid(), template);
                }
                
            } catch (Exception e) {
                e.printStackTrace();
                if(parser!=null){
                	parser.close();
                	parser.finalize();
                }
            }finally{
                if(parser!=null){
                    parser.finalize();
                }
            }
        }
		
        
        for (int i = 0; i < templatelist.size(); i++) {
        	try {
				Template template = templatelist.get(i);
				if(template.getExtends() != null){
					Template supertemplate = templatelist.get(template.getExtends());
					if(supertemplate==null){
						continue;
					}
					
					if(template.getValue()==null){
						template.setValue(supertemplate.getValue());
					}
					
					AdapterMap<String, View> superviewlist = supertemplate.getViewlist();
					AdapterMap<String, View> childviewlist = template.getViewlist();
					childviewlist = ConversionUtil.merge(superviewlist, childviewlist);
					template.setViewlist(childviewlist);
					
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}
	



//	public ServletConfig getServletConfig() {
//		return servletConfig;
//	}
//	public void setServletConfig(ServletConfig servletConfig) {
//		this.servletConfig = servletConfig;
//	}
	
	public Template getTemplate(String id) throws Exception{
		return templatelist.get(id);
	}

	public ArrayList<Bypass> getBypasslist() {
		return bypasslist;
	}
	
	
	
	
}
