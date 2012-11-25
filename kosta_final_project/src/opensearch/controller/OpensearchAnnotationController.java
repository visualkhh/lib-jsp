package opensearch.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OpensearchAnnotationController {
	
	@RequestMapping("/opensearch_tiles.do")
	public ModelAndView search_page()throws Exception{
		System.out.println("Search Tiles ½ÇÇà");
		
		return new ModelAndView("opensearch_layout");
	}
	
}
