package openpage.controller;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import openpage.model.OpenPageDAO;
import openpage.model.OpenPageListDTO;
import openpage.model.OpenPageListValidate;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class OpenPageAnnotationController {
	private OpenPageDAO openpagedao;
	private OpenPageListValidate validator = new OpenPageListValidate();
	public void setOpenpagedao(OpenPageDAO openpagedao) {
		this.openpagedao = openpagedao;
	}

	@RequestMapping("/index.do")
	public ModelAndView test_page() throws Exception {
		System.out.println("오냐");
		return new ModelAndView("openpage_index");
	}

	// 오픈페이지 생성 쪽//
	@RequestMapping(value = "/openpage_administration/openpage_create.do", method = RequestMethod.GET)
	public ModelAndView openpage_create() throws Exception {
		System.out.println("오냐openpage_create");
		return new ModelAndView("openpage_create");
	}

	@RequestMapping(value = "/openpage_administration/openpage_create.do", method = RequestMethod.POST)
	public ModelAndView openpage_create(@ModelAttribute("openpagelistdto")
	OpenPageListDTO openpagelistdto, BindingResult errors,HttpServletRequest request) throws Exception {
		System.out.println("z1zPOSTz");
		validator.validate(openpagelistdto, errors);
		System.out.println("z2zPOSTz"+openpagelistdto.getSetting_theme()+openpagelistdto.getOpenpage_type());
		
		if (errors.hasErrors()) {
            System.out.println(errors.getModel().toString());
            return new ModelAndView("openpage_create");
		} else {
			HashMap map =(HashMap)request.getSession().getAttribute("user");
			ArrayList openpagelist= (ArrayList)map.get("openpagelist");
			openpagelist.add(openpagelistdto);
			
			map.put("openpagelist", openpagelist);
				
			
            openpagedao.openpage_insert(openpagelistdto);
            return new ModelAndView("redirect:/member/move_main.do");
		}

		
	}

	// 오픈 페이지 생성 끝//

	@RequestMapping("/openpage_administration/openpage_list.do")
	public ModelAndView openpage_list(HttpServletRequest request)
			throws Exception {

		HashMap map =(HashMap)request.getSession().getAttribute("user");
		
		
		int user_number=(Integer)map.get("user_number");
		
		List openpagelist = openpagedao.openpage_list(user_number);

		System.out.println("오냐openpage_list");

		return new ModelAndView("openpage_list", "openpagelist", openpagelist);
	}

			
	//"redirect:/openpage/openpage_administration/openpage_list_ok.jsp");


	
	@RequestMapping("/openpage_administration/openpage_delete.do")
	public ModelAndView openpage_administration_delete(@RequestParam("openpage_url") String openpage_url) throws Exception {
		System.out.println("delete 오냐");
		System.out.println(openpage_url);
		openpagedao.openpage_delete(openpage_url);
		return new ModelAndView("redirect:/member/move_main.do");
	}
	
	
	
	


	@RequestMapping("/openpage_edit/pages.do")
	public ModelAndView openpage_edit_pages(HttpServletRequest request) throws Exception {
		System.out.println("pages 오냐");
		return new ModelAndView("openpage_edit_pages");
	}
	
	@RequestMapping("/openpage_edit/general.do")
	public ModelAndView openpage_edit_general(HttpServletRequest request) throws Exception {
		System.out.println("general 오냐");
		return new ModelAndView("openpage_edit_general");
	}
	
	
	
	@RequestMapping("/openpage_edit/layout.do")
	public ModelAndView openpage_edit_layout(HttpServletRequest request) throws Exception {
		System.out.println("layout 오냐");
		return new ModelAndView("openpage_edit_layout");
	}
	@RequestMapping("/openpage_edit/color.do")
	public ModelAndView openpage_edit_color(HttpServletRequest request) throws Exception {
		System.out.println("color 오냐");
		return new ModelAndView("openpage_edit_color");
	}
	
	
	
	
	
	
	
	@RequestMapping("/admin")
	public ModelAndView openpage_edit_template(HttpServletRequest request) throws Exception {
		/*섹션!! 식이형이오면 수정볼것.
		HashMap map =(HashMap)request.getSession().getAttribute("user");
		request.getSession().setAttribute("openpage_url", openpage_url);
		*/
		System.out.println("edit 오냐");
		return new ModelAndView("openpage_edit_template");
	}
	
	@RequestMapping("/view")
	public ModelAndView openpage_edit_view() throws Exception {
		System.out.println("view 오냐");
		
		return new ModelAndView(
		"openpage_view_index");
	}
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

