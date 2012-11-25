package khh.web.jsp.framework.fluid;

import khh.std.adapter.Adapter_Std;


public class Template {

	private String nodeid;
	private String value							= null;
	private String extendcategory					= null;
	private Adapter_Std<String,View> viewlist		= new Adapter_Std<String,View>();
//	private LogK log = LogK.getInstance();
	public String getNodeid() {
		return nodeid;
	}
	public void setNodeid(String nodeid) {
		this.nodeid = nodeid;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getExtendcategory() {
		return extendcategory;
	}
	public void setExtendcategory(String extendcategory) {
		this.extendcategory = extendcategory;
	}
	public void addView(String id,View view) throws Exception{
		viewlist.add(id,view);
	}
	public View getView(String id) throws Exception{
		return viewlist.get(id);
	}
	public Adapter_Std<String, View> getViewlist() {
		return viewlist;
	}
	public void setViewlist(Adapter_Std<String, View> viewlist) {
		this.viewlist = viewlist;
	}
	public String getViewValue(String id) throws Exception{
		return viewlist.get(id).getValue();
	}

}
