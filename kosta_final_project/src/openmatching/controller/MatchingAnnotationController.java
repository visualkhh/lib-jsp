package openmatching.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import openmatching.model.ApplierDTO;
import openmatching.model.MatchingDAO;
import openmatching.model.MatchingDTO;
import openmatching.model.PageDTO;
import openmatching.model.ResultDTO;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MatchingAnnotationController{
	private MatchingDAO matchingDao;
	private MatchingCommandValidator validator = new MatchingCommandValidator();
			
	public void setMatchingDao(MatchingDAO matchingDao) {
		this.matchingDao = matchingDao;
	}
	
		
	@RequestMapping("/openmatching_result.do")
	public ModelAndView openmatching_result(@RequestParam("num") String matching_number)throws Exception{
		System.out.println("글번호 : " + matching_number);
		
		//잡 테이블에서 position명을 뽑아서 가공한다. 그러면 각 배열의 요소에 각 포지션이 담길것이다.
		String job_position = matchingDao.get_job_position(Integer.parseInt(matching_number));
		String position [] = job_position.split(" % ");
		
		
		// 이녀석들을 담을 dto 필요
		
		ArrayList<ApplierDTO> applier_list = new ArrayList<ApplierDTO>();		
		
		ArrayList<ResultDTO> result_array = new ArrayList<ResultDTO>();
		
		MatchingDTO matching = new MatchingDTO();		
		String applier_position_each = "";
		
		
		for(int i = 0; i < position.length; ++i){
			ResultDTO result = new ResultDTO();
			System.out.println("번호["+i+"] : " + position[i]);			
			matching.setApplier_type(i+"");
			matching.setMatching_number(Integer.parseInt(matching_number));	
			
			applier_list = matchingDao.get_applier_info(matching);
			applier_position_each = position[i];
			
			result.setArray(applier_list);
			result.setApplier_position_each(applier_position_each);
			result.setMatching_number(matching_number);
			result_array.add(result);
		}
				
		return new ModelAndView("openmatching_result", "result_array", result_array);
	}
		
	@RequestMapping("/openmatching_app.do")
	public ModelAndView openmatching_app(ApplierDTO applier, HttpServletRequest request)throws Exception{
		System.out.println("경력 : " + applier.getApplier_carreer());
		System.out.println("지원자가 남긴 말  : " + applier.getApplier_contents());
		//System.out.println(" : " + applier.getApplier_flag());
		System.out.println("지원자 아이디  : " + request.getParameter("user_id"));
		System.out.println("전번 : " + applier.getApplier_phone());
		
		//선택 분야는 앞에서 cnt 즉 id 숫자값을 넣어줄거다.
		System.out.println("선택분야 : " + applier.getApplier_type());
		System.out.println("읽은 글번호 : " + request.getParameter("matching_number"));
		
		String matching_number = request.getParameter("matching_number");
		String applier_cnt [] = request.getParameterValues("applier_cnt");
						
		
		String db_value = "";
		if(applier_cnt != null){
			for(int i = 0; i < applier_cnt.length; ++i){			
							
				db_value += applier_cnt[i] + " % ";
			}
		}		
		
		MatchingDTO dto = new MatchingDTO();
		
		dto.setJob_value(db_value);
		dto.setMatching_number(Integer.parseInt(matching_number));
		
		applier.setApplier_id(request.getParameter("user_id"));
		
		matchingDao.update_applier_cnt(dto);
		matchingDao.insert_applier(applier);
				
		return new ModelAndView("redirect:/openmatching/openmatching_read.do?num="+matching_number);
	}
	
	@RequestMapping("/openmatching_list.do")
	public ModelAndView openmatching_list(@RequestParam("cur_page") String cur_page, @RequestParam("search") String search,
									@RequestParam("key") String key,@RequestParam("s_type") String s_type)throws Exception{	
		
		PageDTO pd = matchingDao.get_project_list(cur_page, search, key, s_type);
		
		return new ModelAndView("openmatching_list", "page", pd);
	}
	
	@RequestMapping("/send_result_message.do")
	public ModelAndView send_result_message(HttpServletRequest request)throws Exception{	
		String [] values = request.getParameterValues("ck");
		String message = request.getParameter("message");
		String [] num = request.getParameterValues("matching_number");
		
		System.out.println(num[0]);
		
		
		System.out.println("메세지 ; " + message);
		if(values != null){
			for(int i = 0; i < values.length; ++i){
				System.out.println("["+i+"] : " + values[i]);
			}
		}
		matchingDao.update_complete(Integer.parseInt(num[0]));
		
		return new ModelAndView("redirect:/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0");
	}
	
	
	@RequestMapping("/openmatching_cancel.do")
	public ModelAndView openmatching_cancel(@RequestParam("num") String matching_number, @RequestParam("applier_type") String applier_type, 
			HttpServletRequest request, HttpSession session)throws Exception{
		
		ApplierDTO applier = new ApplierDTO();
		MatchingDTO matching = new MatchingDTO();
		HashMap hm = (HashMap)session.getAttribute("user");
		
		String imsi_userid = "";
		if(hm != null){
			imsi_userid = hm.get("user_id").toString();
		}
		
		System.out.println("세션 아이디 : " + imsi_userid);
		System.out.println("글 번 호 : " + matching_number);
		
		applier.setMatching_number(Integer.parseInt(matching_number));
		applier.setApplier_id(imsi_userid);
		
		matchingDao.cancel_applier(applier);
		
		String job_value = matchingDao.get_job_value(Integer.parseInt(matching_number));
		System.out.println("===============================================");
		System.out.println("job_value : " + job_value);
		
		String [] a = job_value.split(" % ");
		
		job_value="";
		
		
		
		System.out.println("길이 : " + a.length);
		
		for(int i=0; i < a.length; ++i){
			
			if(i != Integer.parseInt(applier_type)){
				job_value += a[i] + " % ";
			}else{
				job_value += (Integer.parseInt(a[i])-1) + " % ";
			}
			
		}
		System.out.println("job_value : " + job_value);
		System.out.println("===============================================");
		matching.setMatching_number(Integer.parseInt(matching_number));
		matching.setJob_value(job_value);
		matchingDao.update_applier_cnt(matching);
		
		return new ModelAndView("redirect:/openmatching/openmatching_read.do?num="+matching_number);
	}
	
	@RequestMapping("/openmatching_read.do")
	public ModelAndView openmatching_read(@RequestParam("num") String matching_number, HttpServletRequest request, HttpSession session)throws Exception{	
		
		MatchingDTO matching = matchingDao.get_matching_info(Integer.parseInt(matching_number));
		
		ApplierDTO applier = new ApplierDTO();		
		
		HashMap hm = (HashMap)session.getAttribute("user");
		
		String imsi_userid = "";
		if(hm != null){
			imsi_userid = hm.get("user_id").toString();
		}
		
		System.out.println("세션 아이디 : " + imsi_userid);
		System.out.println("글 번 호 : " + matching_number);
		
		applier.setMatching_number(Integer.parseInt(matching_number));
		applier.setApplier_id(imsi_userid);
		
		String applier_type = matchingDao.get_applier_type(applier);
		
		System.out.println("지원 분야 : " +  applier_type);
		/*
		if(applier_type == null){
			//matching.setApplier_type(applier_type)
			System.out.println("지원 안한 상태");
		}else{			
			matching.setApplier_type(applier_type);
			System.out.println("지원 한 상태");
		}
		*/
				
		matching.setApplier_type(applier_type);
		
		String imsi_position = matching.getJob_position();
		String imsi_count = matching.getJob_count();
		String imsi_value = matching.getJob_value();
		String [] imsi_a = imsi_position.split(" % ");
		String [] imsi_b = imsi_count.split(" % ");
		String [] imsi_c = imsi_value.split(" % ");
		matching.setJob_number(imsi_a.length+"");		
		matching.setA(imsi_a);
		matching.setB(imsi_b);
		matching.setC(imsi_c);
		request.setAttribute("num", matching_number);
		
		return new ModelAndView("openmatching_read", "matching", matching);
	}

	
	@RequestMapping(value="/openmatching_write.do", method=RequestMethod.GET)
	public ModelAndView openmatching_write()throws Exception{		
		return new ModelAndView("openmatching_write");
	}	
	
	@RequestMapping(value="/openmatching_write.do", method=RequestMethod.POST)
	public ModelAndView openmatching_write_proc(@ModelAttribute("matching") MatchingDTO matching, BindingResult errors, ModelMap model, HttpServletRequest request, HttpSession session)throws Exception{
		ModelAndView mav = new ModelAndView();
		validator.validate(matching, errors);
		
		if(errors.hasErrors()){			
			mav.setViewName("openmatching_write");			
			return mav;
		}else{
			String position_value [] = request.getParameterValues("position");
			String count_value [] = request.getParameterValues("count");
					
			String db_position = "", db_count = "", db_first_value="";
			
			if(position_value != null){
				for(int i = 0; i < position_value.length; ++i){			
					db_position += position_value[i] + " % ";
					db_count += count_value[i] + " % ";			
					db_first_value += 0 + " % ";
				}
			}
			
			System.out.println("포지 구분 : " + db_position);
			System.out.println("칸트 구분 : " + db_count);
			
			
			
			HashMap hm = (HashMap)session.getAttribute("user");
			
			System.out.println("세션 수 : " + hm);
			System.out.println("아이디 : " + hm.get("user_id"));
			
			matching.setMatching_writerid((String)hm.get("user_id"));
			matching.setMatching_complete("진행중");
			
			String original_filename1 = matching.getUploadFile1().getOriginalFilename();
			String original_filename2 = matching.getUploadFile2().getOriginalFilename();
			
			if(original_filename1.length() != 0){	
				//String imsi_ext = original_filename.substring(original_filename.indexOf("."));
				
				File dir = new File(request.getRealPath("openmatchings/files"));
				
				if(!dir.exists())
					dir.mkdir();
				// 이 경로에 파일을 집어넣을 것이다.
				File destFile = new File(dir, original_filename1);
				matching.getUploadFile1().transferTo(destFile);		
				matching.setMatching_filename1(original_filename1);
			}
			
			if(original_filename2.length() != 0){	
				//String imsi_ext = original_filename.substring(original_filename.indexOf("."));
				
				File dir = new File(request.getRealPath("openmatchings/files"));
				
				if(!dir.exists())
					dir.mkdir();
				// 이 경로에 파일을 집어넣을 것이다.
				File destFile = new File(dir, original_filename2);
				matching.getUploadFile2().transferTo(destFile);		
				matching.setMatching_filename2(original_filename2);
			}
			
			matching.setJob_position(db_position);
			matching.setJob_count(db_count);
			matching.setJob_value(db_first_value);
		
			matchingDao.insert_matching_info(matching);
			int result = matchingDao.get_matching_number();
			matching.setMatching_number(result);
			matchingDao.insert_matching_position_info(matching);
							
			System.out.println("진행도(셋으로 진행중이라 표시) : " +  matching.getMatching_complete());
			System.out.println("내용 : " + matching.getMatching_info());
			System.out.println("제목 : " + matching.getMatching_title());
			System.out.println("뽑은인원 : " + matching.getMatching_total());
			System.out.println("팀인지 기업인지  : " + matching.getMatching_type());
			System.out.println("작성자 : " + matching.getMatching_writer());
			System.out.println("id(세션으로받아서 셋팅시킬것) : " + matching.getMatching_writerid());
			System.out.println("첨부 1 : " + matching.getMatching_filename1());
			System.out.println("첨부 2 : " + matching.getMatching_filename2());
			mav.setViewName("redirect:/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0");
		}
		
		return mav;
	}	
}
