package general.controller;

import general.model.GeneralDAO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GeneralAnnotationController {
	private GeneralDAO generalDao;

	public void setGeneralDao(GeneralDAO generalDao) {
		this.generalDao = generalDao;
	}
	
	@RequestMapping("/test_main.do")
	public  ModelAndView test_page()throws Exception{
		System.out.println("����");
		//return new ModelAndView("redirect:/message/test_list.jsp");
		/*
		 * ���� ���� ���� message/test_list.jsp ��� �����ٸ�
		 * �̰� WEB-INF/message/message-servlet.xml���� ��Ÿ�� �ڵ鷯�� ��Ʈ�ѷ��� ������ 
		 * ���� ��θ� ã�ư���..!!!! �����Ұ�!
		 */
		return new ModelAndView("redirect:/test_list.jsp");
	}

}
