package khh.web.jsp.tag.custom;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class SimpleCustom extends SimpleTagSupport {
	String name;
	Integer age;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		System.out.println("setName "+name);
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}


	@Override
	public void doTag() throws JspException, IOException {
		System.out.println("doTag "+getName()+"     "+"hhk".equals(getName()));
		if ("hhk".equals(getName())) {
			    getJspBody().invoke(null);
        }
	       getJspContext().getOut().write(" <br> Hello " + getName() + " <br>");
	       getJspContext().getOut().write(" <br> Your advice is : " + getName()+" <br>");
	       //getParent(); //부모테그꺼.
	}
}
