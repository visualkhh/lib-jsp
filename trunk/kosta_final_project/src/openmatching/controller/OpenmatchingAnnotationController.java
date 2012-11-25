package openmatching.controller;

import openmatching.model.OpenmatchingDAO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OpenmatchingAnnotationController {
	private OpenmatchingDAO openmatchingDao;
		
	public void setOpenmatchingDao(OpenmatchingDAO openmatchingDao) {		
		this.openmatchingDao = openmatchingDao;
	}

	@RequestMapping("/test.do")
	public  ModelAndView test_page()throws Exception{
		System.out.println("dddd");		//return new ModelAndView("redirect:/message/test_list.jsp");
		/*
		 * ���� ���� ���� message/test_list.jsp ��� �����ٸ�
		 * �̰� WEB-INF/message/message-servlet.xml���� ��Ÿ�� �ڵ鷯�� ��Ʈ�ѷ��� ������ 
		 * ���� ��θ� ã�ư���..!!!! �����Ұ�!
		 */
		return new ModelAndView("redirect:/openmatchings/test_open.jsp");
	}

}
