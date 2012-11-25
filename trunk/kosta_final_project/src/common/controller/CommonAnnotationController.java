package common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import common.model.CommonDAO;

@Controller
public class CommonAnnotationController {
	private CommonDAO commonDao;
		
	

	public void setCommonDao(CommonDAO commonDao) {
		this.commonDao = commonDao;
	}

	@RequestMapping("/test_tiles.do")
	public  ModelAndView test_page()throws Exception{
		System.out.println("tiles �׽�Ʈ");		//return new ModelAndView("redirect:/message/test_list.jsp");
		/*
		 * ���� ���� ���� message/test_list.jsp ��� �����ٸ�
		 * �̰� WEB-INF/message/message-servlet.xml���� ��Ÿ�� �ڵ鷯�� ��Ʈ�ѷ��� ������ 
		 * ���� ��θ� ã�ư���..!!!! �����Ұ�!
		 */
		return new ModelAndView("commons_layout");
	}

}
