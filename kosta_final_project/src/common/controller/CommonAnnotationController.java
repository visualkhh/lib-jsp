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
		System.out.println("tiles 테스트");		//return new ModelAndView("redirect:/message/test_list.jsp");
		/*
		 * 위와 같이 만약 message/test_list.jsp 라고 적었다면
		 * 이건 WEB-INF/message/message-servlet.xml에서 나타낸 핸들러나 컨트롤러의 설정에 
		 * 따라서 경로를 찾아간다..!!!! 참고할것!
		 */
		return new ModelAndView("commons_layout");
	}

}
