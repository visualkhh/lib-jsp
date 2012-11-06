package khh.web.jsp.framework.fluid;

import java.io.File;

import javax.servlet.ServletConfig;

import khh.conversion.util.ConversionUtil;
import khh.debug.LogK;
import khh.std.adapter.Adapter_Std;
import khh.xml.XMLparser;

public class FluidConfigManager {
	private Adapter_Std<String,File> configfile			= null;
	private Adapter_Std<String,Template> templatelist	= null;
	private LogK log = LogK.getInstance();
	private ServletConfig servletConfig 				= null;
	
//	private static FluidConfigManager instance			= null;
//	synchronized static public FluidConfigManager getInstance() {
//		if (instance == null)
//			instance = new FluidConfigManager();
//		return instance;
//	}

	public FluidConfigManager() {
		configfile = new Adapter_Std<String, File>();
		templatelist = new Adapter_Std<String, Template>();
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
        for (int i = 0; i < configfile.size(); i++) {
            XMLparser parser = null;
            try {
                parser = new XMLparser((File) configfile.get(i));
                Integer templatecnt = parser.getInt("count("+templatepath+")");
                templatecnt = templatecnt==null?0:templatecnt;
                log.debug("Fluid: ConfigFilePath : "+configfile.get(i)+" \t templatecnt : "+templatecnt);
                
                for(int j = 1; j <= templatecnt; j++) {
                    Template template = new Template();
                    template.setNodeid(parser.getString(templatepath+"["+j+"]/@id"));
                    template.setValue(parser.getString(templatepath+"["+j+"]/@value"));
                    template.setExtendcategory(parser.getString(templatepath+"["+j+"]/@extendcategory"));
                    
                    String viewpath=templatepath+"["+j+"]/view";
                    Integer viewcnt = parser.getInt("count("+viewpath+")");
                    viewcnt = viewcnt==null?0:viewcnt;
                    for(int s = 1; s <= viewcnt; s++) {
                    	View view = new View() ;
                    	view.setNodeid(parser.getString(viewpath+"["+s+"]/@id"));
                    	view.setValue(parser.getString(viewpath+"["+s+"]/@value"));
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
				if(template.getExtendcategory() != null){
					Template supertemplate = templatelist.get(template.getExtendcategory());
					Adapter_Std<String, View> superviewlist = supertemplate.getViewlist();
					Adapter_Std<String, View> childviewlist = template.getViewlist();
					childviewlist = ConversionUtil.merge(superviewlist, childviewlist);
					template.setViewlist(childviewlist);
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}
	



	public ServletConfig getServletConfig() {
		return servletConfig;
	}
	public void setServletConfig(ServletConfig servletConfig) {
		this.servletConfig = servletConfig;
	}
	
	public Template getTemplate(String id) throws Exception{
		return templatelist.get(id);
	}
	
	
	
	
}
