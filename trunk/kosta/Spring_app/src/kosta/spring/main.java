package kosta.spring;


import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class main {
	public static void main(String[] args) {
	//���������� ��� �ִ����� �����ϴ� ��ü
	Resource resource = new ClassPathResource("applicationContext.xml");
	//��ü�� �������ִ� factory ��ü
	BeanFactory factory = new XmlBeanFactory(resource);
	//�������Ͽ� ������ <bean> �±��� id/name�� ���� ��ü�� �޾ƿ´�.
	WriteService service = (WriteService)factory.getBean("writeService");
		
	}
}
