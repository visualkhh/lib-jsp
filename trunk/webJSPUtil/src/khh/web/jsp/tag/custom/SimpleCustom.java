package khh.web.jsp.tag.custom;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
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
		//getJspBody().getJspContext().getAttribute(arg0);
		
		getJspContext().getOut().print("김현하김현하");
	       getJspContext().getOut().write(" <br> Hello " + getName() + " <br>");
	       getJspContext().getOut().write(" <br> Your advice is : " + getName()+" <br>");
	       //getParent(); //부모테그꺼.
	       
	       PageContext pageContext = (PageContext) getJspContext();
	}
	
	
//	심플태그에서 getJspContext() 메소드는 JspContext를 반환합니다.
//	JspContext javax.servlet.jsp.tagext.SimpleTagSupport.getJspContext()
//
//	하지만 내부적으로는 PageContext 객체 입니다.
//	PageContext는 JspContext를 상속 받습니다.
//	때문에 getJspContext()가 반환하는 JspContext 객체를 PageContext로 형변환하여 쓸 수 있습니다.
//	(PageContext)getJspContext().getRequest()
}
