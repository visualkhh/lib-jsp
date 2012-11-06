package khh.web.jsp.tag.custom;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.SkipPageException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class SimpleCustom2 extends SimpleTagSupport {
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
		  //getJspContext().getOut().print("This is the lamest use of a custom tag");
		
		//getJspContext().setAttribute("message", "Wear sunscreen");
		//getJspBody().invoke(null);    //태그 몸체를 읽은 후 응답에 출력하라는 의미, 인자가 null이므로 Response로 출
		
		 String[] movies = {"Monsoon Wedding", "Saved!", "Fahrenheit 9/11"};
        for(int i=0 ; i<movies.length ; i++) {
            getJspContext().setAttribute("movie", movies[i]);
            getJspBody().invoke(null);
        }
		 
        
        //throw new SkipPageException();
        //어떤 태그를 호출 했을 경우, 오류가 떨어지더라도 지금까지 출력 된 내용은 화면에 나와야 한다면 SkipPageException을 사용할 수 있다.
	}
}
