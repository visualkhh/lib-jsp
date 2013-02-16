package kosta.spring;


import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class main {
	public static void main(String[] args) {
	//설정파일이 어디 있는지를 저장하는 객체
	Resource resource = new ClassPathResource("applicationContext.xml");
	//객체를 생성해주는 factory 객체
	BeanFactory factory = new XmlBeanFactory(resource);
	//설정파일에 설정한 <bean> 태그의 id/name을 통해 객체를 받아온다.
	WriteService service = (WriteService)factory.getBean("writeService");
		
	}
}
