package kosta.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloController {

	@RequestMapping("hello.do")
	public ModelAndView hello(){
		ModelAndView mnv=new ModelAndView();
		mnv.setViewName("hello");
		mnv.addObject("greeting","hello spring");
		return mnv; 
	}
}
